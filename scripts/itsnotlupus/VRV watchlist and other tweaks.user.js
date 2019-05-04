// ==UserScript==
// @name VRV watchlist and other tweaks
// @namespace Itsnotlupus Scripts
// @description UI tweaks for VRV. put new episodes at the top of the watchlist and series pages.
// @match https://vrv.co/*
// @version 0.16
// @@require https://unpkg.com/moduleraid@4.0.1/moduleraid.js
// @require https://unpkg.com/redom@3.14.2/dist/redom.min.js
// @require https://unpkg.com/moment@2.22.2/min/moment.min.js
// @require https://unpkg.com/moment-duration-format@2.2.2/lib/moment-duration-format.js
// @run-at document-start
// ==/UserScript==

/*jshint ignore:start */

const h = '__REACT_DEVTOOLS_GLOBAL_HOOK__';
let reactRoot;
if (window[h]) {
  const ocfr = window[h].onCommitFiberRoot.bind(window[h]);
  window[h].onCommitFiberRoot = (_, root) => {
    reactRoot = window.root = root;
    return ocfr(_, root);
  };
} else {
  window[h] = {
    inject: ()=>0,
    checkDCE: ()=>0,
    onCommitFiberRoot: (_, root) => reactRoot = window.root = root,
    onCommitFiberUnmount: ()=>0,
    supportsFiber: true,
  };
}

function getProp(name) {
  if (!reactRoot) return;
  if (!reactRoot.current) return;
  let node = reactRoot.current;
  while (node.child) {
    const child = node.child, props = child.memoizedProps;
    if (props && props[name]) return props[name];
    node = node.child;
  }
}
window.getProp = getProp;


const { el, svg, mount, setChildren } = redom;

const f = n => function(q) { return this[n] ? this[n](q) : document[n](q); };
const $ = Node.prototype.$ = f('querySelector');
const $$ = Node.prototype.$$ = f('querySelectorAll');
Element.prototype.attr = function(k,v) { return v==null?this.getAttribute(k):this.setAttribute(k,v) }; // why am I like this
const until = async (f, w = 100) => { while (!f()) await new Promise(r=>setTimeout(r, w)) };

const t = (s,o) => o?s.replace(/\{([^{]*)\}/g,(a,b)=>o[b]||a):s; // someday this will do something

window.addEventListener('load', () => {
  mount(document.head, el('script', { src: 'https://unpkg.com/moduleraid@4.0.1/moduleraid.js', onload: go }));   
});

async function go() {
  if (window.__APP_CONFIG__) __APP_CONFIG__.availableRoutes.push('/related/*');

  const [module] = mR.findModule('Core');
  if (!module) {
    // 404. happens occasionally with our custom made-up pages. recover ungracefully.
    const [_,page] = location.pathname.split('/');
    if (page === 'related') {
      document.body.style.display='none';
      localStorage.nextPage = location.pathname;
      location.replace('/');
    }
    return;
  } else if (localStorage.nextPage) {
    document.body.style.display='none';
    await until(()=>getProp('history'));
    getProp('history').replace(localStorage.nextPage);
    localStorage.removeItem('nextPage');
    document.body.style.display='';
  }
  
  const { default: { Core, Disc, CMS } } = module;
  window.Core = Core;
  window.Disc = Disc;
  window.CMS = CMS;
  
  let account_id;
  try {
    account = getProp('store').getState().accounts.currentUser.account;
    account_id = account ? account.id : '-';
  } catch (e) {
    try {
      ({ data: { id: account_id } } = await Core.request({header:{}, method:'GET', url: '/core/account'}));
    } catch (e) {
      account_id = '-';
    }
  }
  // check frequently for tweaks to apply to various pages. each check must be fast.
  setInterval(()=>{ decorateWatchlist(); decorateSeriesPage(); fixPlayer(); buildRelatedPage(); }, 100);

  // utility methods used in multiple pages
  const urlize = s => escape(s.replace(/\s+/g, '-').replace(/\W/g, ''));
  const tagIcon = () => svg('svg.tag-icon', { viewBox: '0 0 24 24' }, svg('path', {d: 'M22.4,0H1.6L0,1.6V22.4L1.6,24H22.4L24,22.4V1.6ZM16,13.6h4.8V16H16Zm-12.8,0H13.6V16H3.2ZM8,20.8H3.2V18.4H8Zm12.8,0H10.4V18.4H20.8Z' } ));
  const annotation = (flag, text) => flag && el('.erc-tag-annotation', el('.erc-tag.annotation', [tagIcon(), el('span.tag-title', text)]));
  
  async function decorateWatchlist() {
    let decorated = false;
    const decorations = [];
    for (const card of $$('.erc-watchlist .card:not(.decorated)')) {
      const [_,mode,series_id] = card.$('.card-link').attr('href').split('/');
      card.classList.add('decorated');
      if (mode === 'series') decorations.push(decorateSeries(card, series_id));
      decorated = true;
    }
    if (decorated) {
      // gratuitous layout change.
      $('.erc-watchlist .watchlist-background').style.position = 'fixed';
      await Promise.all(decorations);
      // sort our decorated cards.
      Array.from($$('.erc-watchlist .card[lastAirDate]')).sort((a,b)=> {
        const sortByWatched = a.attr('watched')-b.attr('watched');
        if (sortByWatched) return sortByWatched;
        const sortByAirDate = b.attr('lastAirDate') - a.attr('lastAirDate');
        return a.attr('watched') == 1 ? -sortByAirDate : sortByAirDate;
      }).forEach(card => card.parentNode.appendChild(card));
    }
  }
  
  async function decorateSeries(card, series_id) {
    const { data: { panel : { completion_status, episode_metadata: ep, images: {thumbnail: [imgs]}, title }} } = 
      await Core.getUpNext({account_id, mode: 'series', series_id});
    const lastAirDate = new Date(ep.episode_air_date);
    const ts = lastAirDate.getTime();
    card.attr('lastAirDate', ts);
    if (completion_status) {
      // 2 weeks. why? because this is the original air date, and VRV doesn't provide a date of local availability.
      // So.. we wing it and assume most shows become available within a week of their original air date. sadness.
      if (Date.now() - lastAirDate < 14*24*3600*1000) { 
        card.attr('watched', '1');
        // half-dullify and show original air date.
        card.style = 'filter: grayscale(90%);opacity:.9';
        const metadata = card.$('.description-metadata');
        setChildren(metadata, [
          el('h1', { style: 'white-space: nowrap; text-overflow: ellipsis; position: absolute; right: 0; left: 126px' }, ep.series_title),
          el('h1', { style: 'font-size:.8rem; margin-top: 1.5rem' }, moment(lastAirDate).format('dddd LT'))
        ]);
      } else {
        card.attr('watched', '2');
        // old shows, fully watched.
        // dullify thoroughly.
        card.style = 'filter: grayscale(90%);opacity:0.5';
      }
    } else {
      // use next episode image, title & number to decorate watchlist item. iffy CSS.
      card.attr('watched', '0');
      const metadata = card.$('.description-metadata');
      card.$('.h-thumbnail img').src = imgs.find(obj=>obj.width===800).source;
      setChildren(metadata, [
        el('h1', { style: 'white-space: nowrap; text-overflow: ellipsis; position: absolute; right: 0; left: 126px' }, ep.series_title),
        el('h1', { style: 'font-size:.8rem; margin-top: 1.5rem' }, `S${ep.season_number || 1}E${ep.episode_number || 1} - ${title}`)
      ]);
      metadata.style.margin = 'auto';
      metadata.parentNode.style.paddingTop = 0;
      
    }
  }
  
  // If a player page doesn't have any player within 5000ms, reload
  let playerWaitCount = 50;
  function fixPlayer() {
    const [_,page] = location.pathname.split('/');
    if (page !== 'watch') return playerWaitCount = 50;
    if (playerWaitCount-- === 0) {
      if (!$('.app-body-wrapper').childNodes.length) location.reload();
    }
  }
  
  // your watchlist can link to a dead series page. detect that and offer a way out.
  // take our time to detect it, because a slow loading page looks a lot like a dead series page.
  let seriesWaitCount = 50; 
  async function decorateSeriesPage() {
    const [_,page,series_id] = location.pathname.split('/');
    if (page !== 'series') return seriesWaitCount = 50;
    const parent = $('.series-page-container .content');
    if (!parent) return;
    const playIcon = parent.$('.art-overlay .c-svg-play-icon');
    if (!playIcon) {
      if (!parent.$('.action-buttons') && seriesWaitCount-- === 0) {
        // The Funimation ruminations
        parent.$('.text-wrapper .title').textContent = t('Series Deleted');
        parent.$('.text-wrapper').append(
          el('.action-buttons',
            el('.erc-add-to-watchlist-button action-button action-secondary-no-hover remove-from-watchlist c-button -type-one-weak', { role: 'button', tabindex: 0, 'data-t': 'watchlist-btn' },
              el('.remove-hover', t('REMOVE')),
              svg('.check-icon', { viewBox: '0 0 20 20', 'data-t': 'check-svg' }, svg('polygon', {points: '17.33 3.67 7.33 13.67 2.67 9 1.33 9 1.33 10.33 7.33 16.33 18.67 5 18.67 3.67 17.33 3.67'})),
              svg('.watchlist-icon', { viewBox: '0 0 24 24', 'data-t': 'watchlist-svg' }, svg('path', { d: 'M9.6,12,16,15.2,9.6,18.4ZM3.2,21.6H20.8V8.8H3.2ZM6.4,4H17.6V2.4H6.4ZM4.8,7.2H19.2V5.6H4.8Z' })),
              el('span', t('In Watchlist'))
            )
          )
        );
        parent.$('.remove-from-watchlist').addEventListener('click', async () => {
          await Core.deleteAccountWatchlistItem({ accountId: account_id, itemId: series_id });
          history.go(-1);
        });
      }
      return;
    }
    
    // remove the XL status of the first episode of the season, because why is that even a thing.
    // this needs to keep happening even after we put our "up next" card together, because VRV can reset an XL card at anytime.
    const xlcard = parent.$('.erc-tabs .xl-card');
    if (xlcard) xlcard.classList.remove('xl-card');
    const xlarticle = parent.$('.erc-tabs article.xl-episode');
    if (xlarticle) xlarticle.classList.remove('xl-episode');
    
    // craft a plausible "Up Next" XL showcard that immediately shows what will play next
    if (parent.classList.contains('decorated')) return; // don't overfetch the API
    parent.classList.add('decorated');    
    const data = await Core.getUpNext({account_id, mode: 'series', series_id});
    const { data: { playhead, panel : { id, description, completion_status, episode_metadata: ep, images: {thumbnail: [imgs]}, title } } } = data;
    const timeString = sec => moment.duration(sec, 'seconds').format('hh:mm:ss');
    const duration = timeString(ep.duration_ms/1000);

    parent.insertBefore(el('.upnext.item-list-wrapper', [
      el('.erc-upsell-title', t('Up Next')),
      el('.item-list', el('.media-list-element.xl-card', el('article.erc-episode-card.xl-episode', [
        el('a.card-link', { title, href: `/watch/${id}/${urlize(ep.series_title)}:${urlize(title)}` }),
        el('.h-thumbnail', { style: `border-color: ${parent.$('.h-thumbnail').style.borderColor}` },
          el('img.image.c-content-image', { src: imgs.find(obj=>obj.width===800).source, alt: title }),
          el('.art-overlay', e=>e.innerHTML=playIcon.outerHTML),
          el('.episode-state-info' + ( playhead ? '.state-progress-bar' : ''),
            playhead ? 
              el('.erc-progress-bar', [
                el('.progress-wrapper', el('.progress-bar', { style: `width: ${~~(playhead/ep.duration_ms*1e9)/1e4 + '%'}` })),
                el('.progress-info', `${timeString(playhead)} / ${duration}`)
              ]) :
              el('span.duration', duration)
          )
        ),
        el('section.info',
          el('.series-title', ep.series_title),
          el('.erc-content-title episode-title', `S${ep.season_number || 1}E${ep.episode_number || 1} - ${title}`),
          el('p.episode-description', description),
          el('.details-metadata', el('.media-tag-group', [
              el('.erc-tag episode', el('span.tag-title', 'episode')),
              annotation(ep.is_dubbed, t('dubbed')),
              annotation(ep.is_subbed, t('subtitled'))
          ]))
        )
      ])))
    ]), parent.$('.information-tabs-wrapper'));
    
    // past this point, we need some react monkey-patching. bail out if we don't have it.
    const history = getProp('history');
    if (!history) return;
    // since we're here, add more buttons.
    parent.$('.text-wrapper .action-buttons').append(
      el('.action-button show-similar action-secondary-no-hover c-button -type-one-weak', { role: 'button', tabindex: 0 },
        el('span', t('More Like This'))
      )
    );
    parent.$('.show-similar').addEventListener('click', async () => {
      history.push(`/related/${series_id}/${urlize(ep.series_title)}`);
    });
  }
  
  // a slightly more ambitious effort: draw a brand new page rather than modify existing ones.
  async function buildRelatedPage() {
    const [_,page,series_id] = location.pathname.split('/');
    const parent = $('.related-page-container');
    if (page !== 'related') {
      if (parent) parent.remove();
      return;
    }
    if (parent) return;
    const root = $('.app-body-wrapper');
    if (!root) return; // let's hope this appears later, or we won't render.. :'(
    while (root.firstChild) root.firstChild.remove();
    root.append(el('.related-page-container', [
      el('.related-background.bg', { style: 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1'}),
      el('.erc-feed-container', el('.erc-shelf-feed-item', { style: 'padding-top: 3.75rem;' }))
    ]));
    // 
    const { data: { items: similarItems } } = await Disc.request({url: `${Disc.links.similar_to.href}?guid=${series_id}&n=20&start=0` });
    const { data: series } = await CMS.request({ url: CMS.links.channels.href.replace('channels', `series/${series_id}`) });
    const shelf = root.$('.erc-shelf-feed-item');
    shelf.append(el('h1.feed-title', { style: 'text-shadow: 1px 1px 1px black;font-size: 1.55rem; color:#fff'},t('Shows similar to  {title}', series)));
    shelf.append(el('.erc-cards-collection'));
    const collection = shelf.$('.erc-cards-collection');
    const channels = getProp('store').getState().cmsChannels.byId;
    root.$('.bg').style.background = 'linear-gradient(180deg,rgba(27,26,38,.7),#1b1a26), top / contain no-repeat url('+series.images.poster_wide[0].find(obj=>obj.width===1920).source+')';
    similarItems.forEach(({
      title, type, id, channel_id, images: {poster_wide: [wide], poster_tall: [tall]}, series_metadata: series
    }) => {
      const channel = channels[channel_id];
      const is_subbed = series.is_subbed;
      const is_dubbed = series.is_dubbed;
      collection.append(el('.card', el('div', el('article.erc-series-movie-card', [
        el('a.card-link', { title, href: `/series/${id}/${urlize(title)}`}),
        el('.watch-tag-list', el('.erc-info-tags-group')),
        el('.h-thumbnail', { style: `border-color: ${channel.primary_background_color}` },
            el('img.image.c-content-image', { src: wide.find(obj=>obj.width===800).source, alt: title }),
            el('a.erc-channel-icon', { href: `/${channel.id}` },
              el('.channel-mask',
                el('.channel-background', { style: `background-color: ${channel.primary_background_color}` }),
                el('img.channel-icon', { src: channel.images.logo_mark_simple[92], alt: t('{channel} icon', { channel:channel.name }) }),
                el('span.channel-name', channel.name)
              )
            )
        ),
        el('.body-section',
          el('.poster-image',
            el('img.c-content-image', { src: tall.find(obj=>obj.width===240).source, alt: title })
          ),
          el('.info',
            el('.description-metadata', el('h1', title)),
            el('.details-metadata',
              el('.media-tag-group',
                 el('.erc-tag series', el('span.tag-title', t(type))),
                annotation(is_dubbed&&!is_subbed, t('dubbed')),
                annotation(is_subbed&&!is_dubbed, t('subtitled')),
                annotation(is_subbed&&is_dubbed, t('sub | dub')),
              ),
            )
          )
        )
      ]))));
    });
    // avoid actual page navigation
    collection.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        getProp('history').push(event.target.getAttribute('href'));
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);
    // act like you belong.
    Array.from($$('.erc-channel-icon')).forEach(icon => {
      icon.addEventListener('mouseenter', e => icon.style.width = icon.firstChild.scrollWidth + 'px');
      icon.addEventListener('mouseleave', e => icon.style.width = '');
    });
  }
}