// ==UserScript==
// @name         RYM: Auto count average tracks rating with modifiers
// @namespace    http://tampermonkey.net/
// @version      0.3.9
// @description  .
// @author       https://rateyourmusic.com/~PusH
// @match        https://rateyourmusic.com/release/*
// @match        https://rateyourmusic.com/collection/*
// @match        https://rateyourmusic.com/collection_t/*
// @match        https://rateyourmusic.com/list/*
// @match        https://rateyourmusic.com/lists/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    /*
    Use recountRating(...ratings) in console to manually count any rating combinations. Function returns object with ratings info.
    For example: recountRating(1,2,3,4,5,6,7,8,9,10) will prints this object:
        averageRating: 5.5 - raw average rating counted by adding all rating values then multiplying by number of ratings
        bonusRating: 0.45 - added bonus rating for some number of tracks rated higher than average rating
        highestPercent: [30, 3] - array with two values. First is the percent of ratings and second is number of ratings higher or equal to the avarage rating
        ratingsArray: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10" - shows string of entered values
        realAverageRating: "7.38" - real counted average rating with all modifiers, excluding bonus rating, not converted to 10-grade scale
        shownAverageRating: "5.99" - final rating
        suggestedAverageRating: 7 - which rating will be suggested by script with that ratings combination

        So, avarage rating is 7 and ratings 7,8,9,10 are counted in highestPercent array. Release need more than 33.33% of highestPercent ratings to get counted suggested average rating.
        Also bonus rating is 0.45. Rating 8 gives additional +0.11, 9 adds +0.14 and 10 adds +0.2
    */

    //By how much single track rating will be multiplied.
    //For example, rating 5/10 will be multiplied by 0.9 and will result in 4.5. Otherwise, 9 will be multiplied by 1.7 what will result in 15.30.
    //Also, 10 * 2 is the highest rating (and 1 * 0.65 is the minimum rating), so ratings goes from 0 to 20. As result, script suggests RYM ratings going from 1 to 10.
    const ratingsModifiers = {
        1: .65,
        2: .7,
        3: .75,
        4: .8,
        5: .9,
        6: 1.1,
        7: 1.25,
        8: 1.4,
        9: 1.7,
        10: 2
    };

    //Script will suggest overall release rating by average track rating values multiplied by rating modifiers, which are specified in ratingsModifiers object.
    //Example: album with all 9 ratings will have these multiplied by 1.7 modifier received from ratingsModifiers object. So, average multiplied rating will be 15.30.
    //This means, 15.30 > 13 but less than 16.25, so script will show 9 as suggested rating.
    //Also, release need at least one track of some rating to be elegible for that rating.
    const suggestedRatingValues = {
        1: 0,
        2: 1.1,
        3: 1.9,
        4: 2.85,
        5: 3.8,
        6: 5.1,
        7: 7.4,
        8: 9.75,
        9: 13,
        10: 16.25
    };

    //Script can suggest higher release average rating by this modifier if there is any tracks higher than average rating.
    //For example: recountRating(7, 7, 8, 9, 8, 8, 10, 7, 9, 9) results in 12.57 average rating, which is lower for 9/10 rating (13).
    //But release has one 10/10 track, so suggested average rating is reduced by modifier 0.6, 13 - 0.6 = 12.40, and script will suggest 9/10 for this release, because 12.57 > 12.40.
    //This is edge cases, I don't have much release ratings changed by these modifiers.
    const suggestedMinimumRatingValueModifier = .6;

    //Also, there are bonus rating for releases with low average rating, but with some tracks with higher ratings. Mostly, this is a rather small value, but sometimes it makes a difference.
    //This means, for example, what for any tracks rated 10 on any release with average rating 9 or less, this rating gets + 0.2 points.
    //The purpose of this is to increase avarage rating of releases with high number of tracks. Releases with 15+ tracks tends to have much lower average rating, and bonus rating makes these albums comparable to releases with less number of tracks.
    //Bonus rating are added to releases with 5 or more tracks.
    const bonusRatings = {
        6: .04,
        7: .08,
        8: .11,
        9: .14,
        10: .2
    };




















    //----------------------------
    //----------------------------
    //----------------------------

    //Correctly show average track rating on mass edit collection page (https://rateyourmusic.com/collection_t/*)
    if (document.getElementById('mass_tag_form')) {
        const tracksHeader = document.createElement('th');
        tracksHeader.textContent = 'Track ratings';
        const ratingsHeader = document.querySelector('.or_q_header:nth-child(4)');
        ratingsHeader.parentNode.insertBefore(tracksHeader, ratingsHeader.nextSibling);

        const ratingCol = document.querySelectorAll('.or_q_rating');
        [...ratingCol].forEach(item => {
            const reviewCol = document.createElement('td');
            reviewCol.classList.add('or_q_review_td');
            item.parentNode.insertBefore(reviewCol, item.nextSibling);
        });

        const tracksCol = document.querySelectorAll('.or_q_review_td[colspan="5"]');
        [...tracksCol].forEach(item => {
            const parentRow = item.parentNode;
            const previousRow = parentRow.previousSibling;
            const reviewInner = item.querySelector('.or_q_review');

            const reviewsCol = previousRow.querySelector('.or_q_review_td');
            reviewsCol.appendChild(reviewInner);

            const tagsCol = item.nextSibling;
            previousRow.appendChild(tagsCol);

            parentRow.remove();
        });
    }

    let pagetype;
    if (document.querySelector('.release_page')) pagetype = 'release';
    else if (document.querySelector('.printbutton') || document.getElementById('mass_tag_form')) pagetype = 'collection';
    else if (document.getElementById('user_list') || document.getElementById('list_content')) pagetype = 'list';

    const highestPercentCount = (averageRating, ratingsArray) => {
        let highestRatingCount = 0;

        ratingsArray.forEach(rating => {
            if (rating >= averageRating) highestRatingCount++;
        });

        return [parseFloat((highestRatingCount / ratingsArray.length * 100).toFixed(2)), highestRatingCount];
    };

    //Main recount function. Can be used in console with provided track ratings as arguments. Example: recountRating(8, 9, 8, 7)
    window.recountRating = (ratingBlock, ...ratings) => {
        if (!ratingBlock) return console.error('"ratingBlock" is not defined');
        const ratingIsElement = ratingBlock instanceof Element;

        let trackRatings;
        let ratingsAverage;
        let suggestedRating;
        if (ratingIsElement) {
            ratingsAverage = ratingBlock.querySelectorAll('.track_rating_average');
            suggestedRating = ratingBlock.querySelector('.release_rating_suggestion');
            if (pagetype === 'release') {
                trackRatings = ratingBlock.querySelectorAll('.tracklisting .rating_num');
            }

            else if (pagetype === 'collection' || pagetype === 'list') {
                trackRatings = ratingBlock.querySelectorAll('.trackratings td:last-child');
            }
        }

        const ratingsArray = ratingIsElement ? [] : [ratingBlock, ...ratings];
        let countedTracks = ratingIsElement ? trackRatings.length : ratingsArray.length;
        let totalRating = 0;
        let averageRating;
        let ratingPercent;
        let suggestedTotalRating = 0;
        let suggestedAverageRating;
        let suggestedAverageRatingValue = 0;
        let highestRating = 0;
        let bonusRating = 0.00;
        let highestPercent;

        if (ratingIsElement) {
            [...trackRatings].forEach(element => {
                let ratingValue;
                let ratingText = '';

                if (pagetype === 'release') {
                    ratingText = element.textContent;
                    if (ratingText === '---') {
                        countedTracks--;
                        return;
                    }
                }

                else if (pagetype === 'collection' || pagetype === 'list') {
                    ratingText = element.querySelector('img') && parseFloat(element.querySelector('img').getAttribute('title'));
                    if (!ratingText) {
                        countedTracks--;
                        return;
                    }
                }

                ratingValue = parseFloat(ratingText) * 2;
                ratingsArray.push(ratingValue);
            });
        }

        ratingsArray.forEach(ratingValue => {
            let albumRatingTrackValue;
            if (ratingValue > highestRating) highestRating = ratingValue;
            totalRating += ratingValue;
            albumRatingTrackValue = ratingValue * ratingsModifiers[ratingValue];
            suggestedTotalRating += albumRatingTrackValue;
        });

        if (ratingIsElement && countedTracks === 0) {
            suggestedRating.style.display = 'none';
            return [...ratingsAverage].forEach(item => {
                item.style.display = 'none';
            });
        }

        averageRating = parseFloat((totalRating / countedTracks).toFixed(2));
        suggestedAverageRatingValue = parseFloat((suggestedTotalRating / countedTracks).toFixed(2));

        if (ratingIsElement) {
            [...ratingsAverage].forEach(item => {
                item.style.display = 'inline';
                item.querySelector('span').innerHTML = `<b>${averageRating.toFixed(2)}</b> from ${countedTracks}/${trackRatings.length}`;
            });
        }

        //Bonus rating added to releases with 5 or more tracks
        if (ratingsArray.length > 4) {
            ratingsArray.forEach(rating => {
                if (bonusRatings[rating] && suggestedAverageRatingValue <= suggestedRatingValues[rating] - (rating === 10 ? 0 : suggestedMinimumRatingValueModifier)) {
                    bonusRating += bonusRatings[rating];
                }
            });
            bonusRating = parseFloat(bonusRating.toFixed(2));
            suggestedAverageRatingValue = parseFloat((suggestedAverageRatingValue + bonusRating).toFixed(2));
        }

        suggestedAverageRating = (() => {
            let checkedRating = highestRating;
            while (suggestedAverageRatingValue < (suggestedRatingValues[checkedRating] - ((checkedRating === 10 || checkedRating <= 6) ? 0 : suggestedMinimumRatingValueModifier)) && highestRating === (checkedRating + 1) ||
                suggestedAverageRatingValue < suggestedRatingValues[checkedRating] && highestRating === checkedRating) {
                checkedRating--;
            }
            return checkedRating;
        })();

        const currentSuggestedMinimumRatingValueModifier = (suggestedAverageRating === 10 || suggestedAverageRating <= 6) ? 0 : suggestedMinimumRatingValueModifier;
        highestPercent = highestPercentCount(suggestedAverageRating, ratingsArray);
        //Decreases suggested average rating if there are less than 33.33% of tracks (or number is less than 3) higher than average rating (except for releases with 3 tracks)
        if ((highestPercent[0] < 33.33 && suggestedAverageRatingValue < ((suggestedRatingValues[suggestedAverageRating + 1] || 20) - currentSuggestedMinimumRatingValueModifier)) ||
            (ratingsArray.length > 6 && highestPercent[1] < 3) || (ratingsArray.length === 3 && highestPercent[1] < 2)) {
            suggestedAverageRating--;
        }
        highestPercent = highestPercentCount(suggestedAverageRating, ratingsArray);

        const starsRating = (suggestedAverageRating / 2).toFixed(1);
        const ratingValueSpan = (suggestedRatingValues[suggestedAverageRating + 1] || 20) - suggestedRatingValues[suggestedAverageRating];
        const ratingValueRest = suggestedAverageRatingValue - bonusRating - suggestedRatingValues[suggestedAverageRating];
        const shownAverageRating = ((suggestedAverageRating - 1 + (ratingValueRest / ratingValueSpan)) / 2).toFixed(2);
        const realAverageRating = (suggestedAverageRatingValue - bonusRating).toFixed(2);

        //Print html to browser page
        if (ratingIsElement) {
            suggestedRating.style.display = 'inline-block';
            suggestedRating.innerHTML = `Suggested rating: <b>${starsRating}</b> <small>` +
                `(<span class="release_rating_suggestion_value" title="counted average tracks ratings multiplied by modifiers. Unconverted rating: ${realAverageRating}">${shownAverageRating}</span>, ` +
                `<span title="bonus rating">+${bonusRating}</span>, <span title="perecent of ratings equal to or higher than average rating">${highestPercent[0]}%</span>)</small>`;
            ratingPercent = parseInt(countedTracks / trackRatings.length * 100);
            suggestedRating.style.opacity = ratingPercent === 100 ? 1 : (ratingPercent >= 50 ? .66 : .33);
        }

        //Return info values
        return {
            ratingsArray: ratingsArray.join(', '),
            averageRating,
            suggestedAverageRating,
            shownAverageRating,
            realAverageRating,
            bonusRating,
            highestPercent
        };
    };

    (() => {
        //Create DOM elements on release page
        if (pagetype === 'release') {
            const trackRatingsButton = document.getElementById('track_rating_btn');
            const trackRatingsSaveButton = document.getElementById('track_ratings_save_btn');
            const trackRatingsSuccess = document.getElementById('track_rating_success');
            let ratingsSaveInterval;
            let ratingsSaveIntervalIndex = 0;

            const ratingsAverage = [];
            ratingsAverage.push(document.createElement('span'));
            ratingsAverage[0].classList.add('track_rating_average');
            ratingsAverage[0].style.display = 'none';
            ratingsAverage[0].innerHTML = ': <span></span>';

            ratingsAverage.push(ratingsAverage[0].cloneNode(true));
            ratingsAverage[1].innerHTML = `Average${ratingsAverage[1].innerHTML}`;
            ratingsAverage[1].style.fontSize = '11px';
            ratingsAverage[1].style.marginLeft = '5px';

            trackRatingsButton.appendChild(ratingsAverage[0]);
            trackRatingsSuccess.parentNode.insertBefore(ratingsAverage[1], trackRatingsSuccess.nextSibling);

            const suggestedRating = document.createElement('span');
            const catalogTopDiv = document.querySelector('.release_my_catalog');
            suggestedRating.classList.add('release_rating_suggestion');
            suggestedRating.style.fontSize = '11px';
            suggestedRating.style.marginTop = '2px';
            suggestedRating.style.cursor = 'pointer';
            suggestedRating.style.opacity = .3;
            catalogTopDiv.parentNode.insertBefore(suggestedRating, catalogTopDiv.nextSibling);
            //document.getElementById('release_touch_catalog_guidance').style.display = 'none';

            trackRatingsSaveButton.addEventListener('click', () => {
                window.recountRating(document.getElementById('my_catalog'));

                ratingsSaveInterval = setInterval(() => {
                    ratingsSaveIntervalIndex++;
                    if (trackRatingsSaveButton.getAttribute('disabled') || ratingsSaveIntervalIndex >= 15) {
                        console.log(window.recountRating(document.getElementById('my_catalog')));
                        clearInterval(ratingsSaveInterval);
                        ratingsSaveIntervalIndex = 0;
                    }
                }, 300);
            });

            //Add copy button functionality
            const copyFunction = spoilerOnly => {
                let ratingSelectionInput = catalogTopDiv.querySelector('.selection_textarea');
                    if (!ratingSelectionInput) {
                        ratingSelectionInput = document.createElement('textarea');
                        ratingSelectionInput.classList.add('selection_textarea');
                        ratingSelectionInput.style.position = 'absolute';
                        ratingSelectionInput.style.top = '-9999px';
                        ratingSelectionInput.style.left = '-9999px';
                        catalogTopDiv.appendChild(ratingSelectionInput);
                    }

                    let inputValueString = '';
                    if (!spoilerOnly) {
                        inputValueString +=
                            `${document.querySelector('.release_pri_genres').textContent}\n\n` +
                            `[b]${parseFloat(document.querySelector('.release_my_catalog .rating_num').textContent) * 2}/10[/b]`;
                    }
                    inputValueString += ` [spoiler]${document.querySelector('#my_review .album_shortcut').value}[/spoiler]`;
                    ratingSelectionInput.value = inputValueString;

                    ratingSelectionInput.select();
                    document.execCommand('copy');
            };
            Array.from(document.getElementById('add_to_list_lists').querySelectorAll('a'), listLink => {
                listLink.setAttribute('target', '_blank');
                listLink.addEventListener('click', () => copyFunction());
            });
            document.getElementById('add_to_list_btn').addEventListener('click', event => {
                Array.from(document.getElementById('add_to_list_lists').querySelectorAll('a')).some(link => {
                    const currentDate = document.querySelector('.album_info td[colspan="2"] b').textContent;
                    if (link.textContent.startsWith(currentDate)) {
                        link.setAttribute('target', '_blank');
                        link.click();
                        return true;
                    }
                });
            });
            suggestedRating.addEventListener('click', () => {
                suggestedRating.style.backgroundColor = '#ddd';
                setTimeout(() => {
                    suggestedRating.style.backgroundColor = 'transparent';
                }, 150);
                copyFunction(true);
            });

            console.log(window.recountRating(document.getElementById('my_catalog')));
        }

        //Create DOM elements on collection page
        else if (pagetype === 'collection') {
            const resultsArray = [];
            const trackRatingsButton = document.querySelectorAll('.or_q_review');

            [...trackRatingsButton].forEach(item => {
                const trackRatingsHeader = item.querySelector('.track_rating_header');
                if (!trackRatingsHeader) return;
                const titleDiv = trackRatingsHeader.querySelector('div[style="float:left;"]');

                const suggestedRating = document.createElement('span');
                suggestedRating.classList.add('release_rating_suggestion');
                suggestedRating.style.marginLeft = '25px';
                suggestedRating.style.color = '#000';
                suggestedRating.style.opacity = .3;
                titleDiv.parentNode.insertBefore(suggestedRating, titleDiv.nextSibling);

                const ratingsAverage = document.createElement('span');
                ratingsAverage.classList.add('track_rating_average');
                ratingsAverage.style.marginLeft = '25px';
                ratingsAverage.style.fontSize = '11px';
                ratingsAverage.style.color = '#000';
                ratingsAverage.style.display = 'none';
                ratingsAverage.innerHTML = 'Average: <span></span>';
                titleDiv.parentNode.insertBefore(ratingsAverage, titleDiv.nextSibling);

                resultsArray.push(window.recountRating(item));
            });

            console.table(resultsArray);
        }

        //Create DOM elements on list pages
        else if (pagetype === 'list') {
            const loadingFunction = () => {
                const resultsArray = [];
                const spoilers = document.querySelectorAll('.spoiler');

                [...spoilers].forEach(item => {
                    if (!item.offsetParent) return;
                    const spoilerContent = item.parentNode.nextSibling;
                    const trackRatingsWrapper = spoilerContent.querySelector('.rsummaryframe .mbgen > tbody > tr > td[style]');
                    if (!trackRatingsWrapper) return;

                    const trackRatingsTable = spoilerContent.querySelector('.trackratings');
                    if (!trackRatingsTable) return;

                    const suggestedRating = document.createElement('span');
                    suggestedRating.classList.add('release_rating_suggestion');
                    suggestedRating.style.color = '#000';
                    suggestedRating.style.opacity = .3;
                    trackRatingsWrapper.appendChild(suggestedRating);

                    resultsArray.push(window.recountRating(spoilerContent));

                    item.textContent = `(${spoilerContent.querySelector('.release_rating_suggestion_value').textContent})`;
                    item.parentNode.setAttribute('title', `${spoilerContent.querySelector('.artist').textContent} — ${spoilerContent.querySelector('.album').textContent} | ${spoilerContent.querySelector('.release_rating_suggestion').textContent}`);
                    spoilerContent.remove();
                    item.style.pointerEvents = 'none';
                });

                console.table(resultsArray);

                [...document.querySelectorAll('.show-for-small-table-row')].forEach(row => {
                    row.remove();
                });
            };

            const loadingDiv = document.getElementById('list_loading');
            let loadingInterval = setInterval(() => {
                if (loadingDiv && loadingDiv.offsetParent) return;

                clearInterval(loadingInterval);

                loadingFunction();
            }, 100);

            //Load ratings on lists' pages change
            const navbar = document.getElementById('navbar');
            if (navbar) {
                const backButtonLi = document.createElement('li');
                const backButton = document.createElement('a');
                backButton.textContent = 'Back to lists';
                backButton.setAttribute('href', `https://rateyourmusic.com/list/${rym.session.username}/`);
                backButtonLi.appendChild(backButton);
                document.querySelector('#breadcrumb ul').insertBefore(backButtonLi, document.querySelector('.breadcrumb ul li'));

                navbar.addEventListener('click', event => {
                    if (event.target.tagName !== 'A') return;

                    clearInterval(loadingInterval);

                    const currentPage = document.querySelector('.navlinkcurrent').textContent;
                    loadingInterval = setInterval(() => {
                        if (currentPage === document.querySelector('.navlinkcurrent').textContent) return;

                        clearInterval(loadingInterval);

                        loadingFunction();
                    }, 100);
                });
            }
        }
    })();
})();