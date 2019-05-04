// ==UserScript==
// @name         Slither.io-bot 0.8.3 / Slitheriogameplay.com
// @namespace    http://slither.io/
// @version      0.8.30
// @description  Slither.io bot 0.8.3 / Slitheriogameplay.com
// @author       Slitheriogameplay.com | Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==
// Functions needed for the bot
// Custom logging function - disabled by default
window.log = function() {
    if (window.logDebugging) {
        console.log.apply(console, arguments);
    }
};

window.getWidth = function() {
    return window.ww;
};
window.getHeight = function() {
    return window.hh;
};

window.getSnakeLength = function(snake) {
    return (Math.floor(150 * (window.fpsls[snake.sct] + window.snake.fam / window.fmlts[snake.sct] - 1) - 50) / 10);
};
window.getSnakeWidth = function() {
    return window.snake.sc * 29 * canvas.getScale();
};

window.getSnakeWidthSqr = function() {
	var w = window.getSnakeWidth();
    return w*w;
};

window.getX = function() {
    return window.snake.xx;
};
window.getY = function() {
    return window.snake.yy;
};

var canvas = (function() {
    return {
        // Ratio of screen size divided by canvas size.
        canvasRatio: [window.mc.width / window.getWidth(), window.mc.height / window.getHeight()],

        // Spoofs moving the mouse to the provided coordinates.
        setMouseCoordinates: function(x, y) {
            window.xm = x;
            window.ym = y;
        },

        // Convert snake-relative coordinates to absolute screen coordinates.
        mouseToScreen: function(x, y) {
            var screenX = x + (window.getWidth() / 2);
            var screenY = y + (window.getHeight() / 2);
            return [screenX, screenY];
        },

        // Convert screen coordinates to canvas coordinates.
        screenToCanvas: function(x, y) {
            var canvasX = window.csc * (x * canvas.canvasRatio[0]) - parseInt(window.mc.style.left);
            var canvasY = window.csc * (y * canvas.canvasRatio[1]) - parseInt(window.mc.style.top);
            return [canvasX, canvasY];
        },

        // Convert map coordinates to mouse coordinates.
        mapToMouse: function(x, y) {
            var mouseX = (x - window.getX()) * window.gsc;
            var mouseY = (y - window.getY()) * window.gsc;
            return [mouseX, mouseY];
        },

        // Adjusts zoom in response to the mouse wheel.
        setZoom: function(e) {
            // Scaling ratio
            if (window.gsc) {
                window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
            }
        },

        // Restores zoom to the default value.
        resetZoom: function() {
            window.gsc = 0.9;
        },

        // Sets background to the given image URL.
        // Defaults to slither.io's own background.
        setBackground: function(url) {
            url = typeof url !== 'undefined' ? url : '/s/bg45.jpg';
            window.ii.src = url;
        },

        // TODO what does window scale mean?
        getScale: function() {
            return window.gsc;
        },

        // Manual mobile rendering
        mobileRendering: function() {
            // Set render mode
            if (window.mobileRender) {
                canvas.setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
                window.render_mode = 1;
            } else {
                canvas.setBackground();
                window.render_mode = 2;
            }
        },

        // Draw a dot on the canvas.
        drawDot: function(x, y, radius, colour, fill) {
            var context = window.mc.getContext('2d');
            context.beginPath();
            context.strokeStyle = colour;
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.closePath();
            if (fill) {
                context.fillStyle = ('green red white yellow black cyan blue'.indexOf(colour) < 0) ? 'white' : colour;
                context.fill();
            }
            context.stroke();
        },

        // Draw an angle.
        // @param {number} start -- where to start the angle
        // @param {number} angle -- width of the angle
        // @param {bool} danger -- green if false, red if true
        drawAngle: function(start, angle, danger) {
            var context = window.mc.getContext('2d');
            context.globalAlpha = 0.6;
            context.beginPath();
            context.moveTo(window.mc.width / 2, window.mc.height / 2);
            context.arc(window.mc.width / 2, window.mc.height / 2, window.gsc * 100, start, angle);
            context.lineTo(window.mc.width / 2, window.mc.height / 2);
            context.closePath();
            context.fillStyle = (danger) ? 'red' : 'green';
            context.fill();
            context.stroke();
            context.globalAlpha = 1;
        },

        // Draw a line on the canvas.
        drawLine: function(x2, y2, colour) {
            var context = window.mc.getContext('2d');
            var center = [window.mc.height / 2, window.mc.width / 2];
            context.beginPath();
            context.lineWidth = 5 * canvas.getScale();
            context.strokeStyle = (colour === 'green') ? '#00FF00' : '#FF0000';
            context.moveTo(center[1], center[0]);
            context.lineTo(x2, y2);
            context.stroke();
            context.lineWidth = 1;
        },

        // Check if a point is between two vectors.
        // The vectors have to be anticlockwise (sectorEnd on the left of sectorStart).
        isBetweenVectors: function(point, sectorStart, sectorEnd) {
            var center = [window.snake.xx, window.snake.yy];
            if (point.xx) {
                // Point coordinates relative to center
                var relPoint = {
                    x: point.xx - center[0],
                    y: point.yy - center[1]
                };
                return (!canvas.areClockwise(sectorStart, relPoint) &&
                    canvas.areClockwise(sectorEnd, relPoint));
            }
            return false;
        },

        // Angles are given in radians. The overall angle (endAngle-startAngle)
        // cannot be above Math.PI radians (180°).
        isInsideAngle: function(point, startAngle, endAngle) {
            // calculate normalized vectors from angle
            var startAngleVector = {
                x: Math.cos(startAngle),
                y: Math.sin(startAngle)
            };
            var endAngleVector = {
                x: Math.cos(endAngle),
                y: Math.sin(endAngle)
            };
            // Use isBetweenVectors to check if the point belongs to the angle
            return canvas.isBetweenVectors(point, startAngleVector, endAngleVector);
        },

        // Given two vectors, return a truthy/falsy value depending on their position relative to each other.
        areClockwise: function(vector1, vector2) {
            //Calculate the dot product.
            return -vector1.x * vector2.y + vector1.y * vector2.x > 0;
        },

        // Given an object (of which properties xx and yy are not null),
        // return the object with an additional property 'distance'.
        setDistanceFromSnake: function(point) {
            if (point === null) return null;
            point.distance = canvas.getDistanceFromSnake(point.xx, point.yy);
            return point;
        },

        getDistanceFromSnake: function(x1, y1){
            return canvas.getDistance(window.getX(), window.getY(), x1, y1);
        },
        
        // Get a distance from point (x1; y1) to point (x2; y2).
        getDistance: function(x1, y1, x2, y2) {
            // Calculate the vector coordinates.
            var xDistance = (x1 - x2);
            var yDistance = (y1 - y2);
			
			return xDistance*xDistance + yDistance*yDistance;
        },

        // Screen to Canvas coordinate conversion - used for collision detection
        collisionScreenToCanvas: function(circle) {
            var newCircle = canvas.mapToMouse(circle.x, circle.y);
            newCircle = canvas.mouseToScreen(newCircle[0], newCircle[1]);
            newCircle = canvas.screenToCanvas(newCircle[0], newCircle[1]);
            return {
                x: newCircle[0],
                y: newCircle[1],
                radius: circle.radius
            };
        },

        // Check if circles intersect
        circleIntersect: function(circle1, circle2) {
            var bothRadii = circle1.radius + circle2.radius;
			var bothRadiiSqr = bothRadii*bothRadii;
			var xDist = circle1.x - circle2.x;
			var yDist = circle1.y - circle2.y;
			var distance = xDist*xDist + yDist*yDist;
			
			if (distance < bothRadiiSqr) {
			    if (window.visualDebugging) {
				    var collisionPointX = ((circle1.x * circle2.radius) + (circle2.x * circle1.radius)) / bothRadii;
				    var collisionPointY = ((circle1.y * circle2.radius) + (circle2.y * circle1.radius)) / bothRadii;
				    canvas.drawDot(collisionPointX, collisionPointY, circle2.radius, 'cyan', true);
				    canvas.drawDot(circle2.x, circle2.y, circle2.radius, 'red', true);
				}
				return true;
			}
            return false;
        }
    };
})();

var bot = (function() {
    // Save the original slither.io onmousemove function so we can re enable it back later
    var original_onmousemove = window.onmousemove;

    return {
        ranOnce: false,
        tickCounter: 0,
        isBotRunning: false,
        isBotEnabled: true,
        collisionPoints: [],
        speedingMultiplierIncreaseValue: 3.0,
        
        startBot: function() {
            if (window.autoRespawn && !window.playing && bot.isBotEnabled && bot.ranOnce && !bot.isBotRunning) {
                bot.connectBot();
            }
        },

        launchBot: function() {
            window.log('Starting Bot.');
            bot.isBotRunning = true;
            // Removed the onmousemove listener so we can move the snake manually by setting coordinates
            window.onmousemove = function() {};
        },

        // Stops the bot
        stopBot: function() {
            window.log('Stopping Bot.');
            window.setAcceleration(0); // Disable the "sprint"
            bot.isBotRunning = false;
            // Re-enable the original onmousemove function
            window.onmousemove = original_onmousemove;
        },

        // Connects the bot
        connectBot: function() {
            if (!window.autoRespawn) return;
            bot.stopBot(); // Just in case
            window.log('Connecting...');
            window.connect();

            // Wait until we're playing to start the bot
            window.botCanStart = setInterval(function() {
                if (window.playing) {
                    bot.launchBot();
                    clearInterval(window.botCanStart);
                }
            }, 100);
        },

        forceConnect: function() {
            if (!window.connect) {
                return;
            }
            window.forcing = true;
            if (!window.bso) {
                window.bso = {};
            }
            window.currentIP = window.bso.ip + ":" + window.bso.po;
            var srv = window.currentIP.trim().split(":");
            window.bso.ip = srv[0];
            window.bso.po = srv[1];
            window.connect();
        },

        quickRespawn: function() {
            window.dead_mtm = 0;
            window.login_fr = 0;
            window.forceConnect();
        },

        changeSkin: function() {
            if (window.playing && window.snake !== null) {
                var skin = window.snake.rcv,
                    max = window.max_skin_cv || 30;
                skin++;
                if (skin > max) {
                    skin = 0;
                }
                window.setSkin(window.snake, skin);
            }
        },

        changeClusteringAlgorithm: function() {
            bot.foodClusteringMode = 1 - bot.foodClusteringMode;
        },

        rotateSkin: function() {
            if (!window.rotateskin) {
                return;
            }
            bot.changeSkin();
            setTimeout(bot.rotateSkin, 500);
        },

        // Adjust goal direction
        changeGoalCoords: function(collisionPoint) {
            window.goalCoordinates = canvas.mapToMouse(window.snake.xx + (window.snake.xx - collisionPoint.xx), window.snake.yy + (window.snake.yy - collisionPoint.yy));
            window.setAcceleration(0);
            canvas.setMouseCoordinates(goalCoordinates[0], goalCoordinates[1]);
        },

        // Sorting function for food
        sortFoodDistance: function(a, b) {
            return a.distance - b.distance;
        },

        // Sorting function for food, from property 'clusterCount'
        sortFoodClusters: function(a, b) {
            return (a.clusterScore == b.clusterScore ? 0 : a.clusterScore / a.distance > b.clusterScore / b.distance ? -1 : 1);
        },

        // Sorting function for prey, from property 'distance'
        sortDistance: function(a, b) {
            return a.distance - b.distance;
        },


        canAccelerate: function() {
            if (!window.collisionDetection)
                return true;

            if (bot.collisionPoints.length===0)
                return true;

            var extendedBodyCircle = canvas.collisionScreenToCanvas({
                x: window.getX(),
                y: window.getY(),
                radius: window.getSnakeWidth() * (window.bodyCollisionRadiusMultiplier + bot.speedingMultiplierIncreaseValue)
            });

            var somethingInTheArea = bot.checkCollision2(extendedBodyCircle, bot.collisionPoints[0]);

            if (somethingInTheArea)
                return false;
            else
                return true;
        },
        
        checkCollision2: function(circle, collisionPoint){
            var collisionCircle = canvas.collisionScreenToCanvas({
                x: collisionPoint.xx,
                y: collisionPoint.yy,
                radius: 20 * collisionPoint.sc * canvas.getScale()
            });
            
            if (canvas.circleIntersect(circle, collisionCircle)) {
                bot.changeGoalCoords(collisionPoint);
                return true;
            }

            return false;
        },

        // Checks to see if you are going to collide with anything in the collision detection radius
        checkCollision: function(headCircle, bodyCircle) {

            if (!window.collisionDetection)
                return false;

            if (window.visualDebugging) {
                canvas.drawDot(bodyCircle.x, bodyCircle.y, bodyCircle.radius, 'blue', false);
                canvas.drawDot(headCircle.x, headCircle.y, headCircle.radius, 'yellow', false);
            }

            if (bot.collisionPoints.length > 0) {


                // first check if anything is in the inner circle. TODO: We need longer distance the more the collisionPoint is straight ahead of us. If the collision point is in the back, we don't have to care at all.
                if (bot.checkCollision2(bodyCircle, bot.collisionPoints[0]))
                    return true;

                // then check if a snake head is inside the outer circle.
                if (bot.closestHeadPoint !== null)

                    if (bot.checkCollision2(headCircle, bot.closestHeadPoint)) {
                        // accelereate if there is room to accelerate. <strike>and the other snake is bigger</strike>
                        // Note that it seems to also make sense to run screaming away from smaller snakes.
                        if (bot.canAccelerate())
                            window.setAcceleration(1);
                        else
                            window.setAcceleration(0);
                        return true;
                    }
            }

            return false;
        },

        setCollisionPoints: function() {
            bot.closestHeadPoint = null;

            var onlyNeedOneCollisionPoint = true;
            
            var closestHeadPointDistance = Number.MAX_VALUE;
            var collisionPoints = [];

            for (var snakenum in window.snakes) {
                var snake = window.snakes[snakenum];

                if (snake.nk != window.snake.nk && !snake.dying) {

                    // head
                    var headPoint = {
                        xx: snake.xx,
                        yy: snake.yy,
                        sc: snake.sc,
                        sp: snake.sp
                    };
                    canvas.setDistanceFromSnake(headPoint);
                    if (headPoint.distance < closestHeadPointDistance){
                        bot.closestHeadPoint = headPoint;
                        closestHeadPointDistance = headPoint.distance;
                    }

                    // body
                    for (var ptsnum in snake.pts) {
                        var pts = snake.pts[ptsnum];

                        if (!pts.dying) {
                            var collisionPoint = {
                                xx: pts.xx,
                                yy: pts.yy,
                                sc: snake.sc,
                                sp: snake.sp
                            };

                            canvas.setDistanceFromSnake(collisionPoint);

                            if (onlyNeedOneCollisionPoint && collisionPoints.length==1 && collisionPoint.distance < collisionPoints[0].distance)
                                collisionPoints[0] = collisionPoint;
                            else
                                collisionPoints.push(collisionPoint);
                        }
                    }
                }
            }

            //Sort collision points based on distance
            bot.collisionPoints = collisionPoints.sort(bot.sortDistance);
        },

        // Sort food based on distance
        getFood: function() {
            // Filters the nearest food by getting the distance
            return window.foods.filter(function(food) {
                if (food === null || food === undefined)
                    return false;

                canvas.setDistanceFromSnake(food);
                
                if (food.distance <= 22500){
                    
                    // Missing comment. What is happening in here?
                    
                    if (canvas.isInsideAngle(food, window.snake.ang - 3 * Math.PI / 4, window.snake.ang - Math.PI / 4))
                        return false;
                    
                    if (canvas.isInsideAngle(food, window.snake.ang + Math.PI / 4, window.snake.ang + 3 * Math.PI / 4))
                        return false;
                }

                return true;
            });
        },


        computeFoodGoal: function() {

            var sortedFood = bot.getFood().sort(bot.sortFoodDistance);
            
            var bestClusterIndx = 0;
            var bestClusterScore = 0;
            var bestClusterAbsScore = 0;
            var bestClusterX = 0;
            var bestClusterY = 0;

            // there is no need to view more points (for performance)
            var nIter = Math.min(sortedFood.length, 250);
            for (var i = 0; i < nIter; i += 3) {
                var clusterScore = 0;
                var clusterSize = 0;
                var clusterAbsScore = 0;
                var clusterSumX = 0;
                var clusterSumY = 0;

                var p1 = sortedFood[i];
                for (var j = 0; j < nIter; ++j) {
                    var p2 = sortedFood[j];
                    var dist = canvas.getDistance(p1.xx, p1.yy, p2.xx, p2.yy);
                    if (dist < 22500) {
                        clusterScore += p2.sz;
                        clusterSumX += p2.xx * p2.sz;
                        clusterSumY += p2.yy * p2.sz;
                        clusterSize += 1;
                    }
                }
                clusterAbsScore = clusterScore;
                clusterScore /= Math.pow(p1.distance, 1.5);
                if (clusterSize > 2 && clusterScore > bestClusterScore) {
                    bestClusterScore = clusterScore;
                    bestClusterAbsScore = clusterAbsScore;
                    bestClusterX = clusterSumX / clusterAbsScore;
                    bestClusterY = clusterSumY / clusterAbsScore;
                    bestClusterIndx = i;
                }
            }

            window.currentFoodX = bestClusterX;
            window.currentFoodY = bestClusterY;
            window.currentFoodScore = bestClusterAbsScore;
        },


        foodClusters: function(food, allNearFood) {
            if (!food.clustered) {
                food.clusterScore = 0;
                food.clusterxx = food.xx;
                food.clusteryy = food.yy;

                var clusterSumX = 0;
                var clusterSumY = 0;
                var count = 0;

                for (var index in allNearFood) {
                    nearFood = allNearFood[index];
                    if (nearFood !== null && nearFood.id !== food.id) {
                        foodDistance = canvas.getDistance(food.xx, food.yy, nearFood.xx, nearFood.yy);

                        if (foodDistance <= window.getSnakeWidthSqr() * 5) {
                            count++;
                            food.clusterScore += nearFood.sz;
                            clusterSumX += nearFood.xx * nearFood.sz;
                            clusterSumY += nearFood.yy * nearFood.sz;
                            nearFood.clusterxx = nearFood.xx;
                            nearFood.clusteryy = nearFood.yy;
                            nearFood.clusterScore = nearFood.sz;
                            nearFood.clustered = true;
                        }
                    }
                }

                if (count > 0) {
                    food.clusterxx = clusterSumX / food.clusterScore;
                    food.clusteryy = clusterSumY / food.clusterScore;
                }
            }

            food.clustered = true;
            return food;
        },

        // Sort prey based on distance
        getSortedPrey: function() {
            // Filters the nearest food by getting the distance
            return window.preys.filter(function(val) {
                return val !== null;
            }).map(canvas.setDistanceFromSnake).sort(bot.sortDistance);
        },

        // Defense mode - bot turns around in a circle
        playDefence: function(dir) {
            window.kd_l = (dir === 'l');
            window.kd_r = (dir === 'r');
            canvas.setMouseCoordinates(window.getWidth() / 2, window.getHeight() / 2);
        },

        
        // Called by the window loop, this is the main logic of the bot.
        thinkAboutGoals: function() {
            // If no enemies or obstacles, go after what you are going after
            var speedingMultiplierAdd = (window.snake.sp > 10) ? bot.speedingMultiplierIncreaseValue : 0.0;
            
            var headCircle = canvas.collisionScreenToCanvas({
                x: window.getX(),
                y: window.getY(), 
                radius: window.getSnakeWidth() * window.headCollisionRadiusMultiplier
            });
            var bodyCircle = canvas.collisionScreenToCanvas({
                x: window.getX(),
                y: window.getY(),
                radius: window.getSnakeWidth() * (window.bodyCollisionRadiusMultiplier + speedingMultiplierAdd)
            });

            bot.setCollisionPoints();
            // If no enemies or obstacles, go after what you are going after
            if (!bot.checkCollision(headCircle, bodyCircle)) {

                // Save CPU by only calculating every Nth frame
                bot.tickCounter++;
                if (bot.tickCounter > 15) {
                    bot.tickCounter = 0;

                    var accelerationClusterSize;
                    if (bot.foodClusteringMode == 1) {
                        bot.computeFoodGoal();
                        accelerationClusterSize = 120;
                    } else {
                        var allNearFood = bot.getFood().sort(bot.sortFoodDistance).slice(0,150);  // To avoid lagging, we only use the closest 150 food bites
                        var foodClusters = allNearFood.map(function(food){
                            return bot.foodClusters(food, allNearFood);
                        });
                        window.sortedFood = foodClusters.sort(bot.sortFoodClusters);
                        window.currentFood = window.sortedFood[0];
                        window.currentFoodX = window.currentFood.clusterxx;
                        window.currentFoodY = window.currentFood.clusteryy;
                        window.currentFoodScore = window.currentFood.clusterScore;
                        accelerationClusterSize = 70;
                    }


                    var coordinatesOfClosestFood = canvas.mapToMouse(window.currentFoodX, window.currentFoodY);
                    window.goalCoordinates = coordinatesOfClosestFood;
                    
                    // Sprint
                    //use speed to go to larger clusters
                    var doSpeed = 1;
                    if (window.currentFood.clusterScore < accelerationClusterSize) // It's too little food
                        doSpeed = 0;
                    else if (canvas.getDistanceFromSnake(window.currentFoodX,window.currentFoodY) > Math.pow(window.getSnakeLength(window.snake), 2) / 2) // It's too far away (how?)
                        doSpeed = 0;
                    else if (window.currentFood.distance >= 375) // it's too far away
                        doSpeed = 0;
                    else if (!bot.canAccelerate()) // There's another snake very close
                        doSpeed = 0;

                    if (doSpeed==1)
                        console.log("Accelerating");
		    window.setAcceleration(doSpeed);

                    // Check for preys, enough "length", dont go after prey if current cluster is large
                    if (window.preys.length > 0 && window.huntPrey && window.currentFoodScore < accelerationClusterSize) {
                        // Sort preys based on their distance relative to player's snake
                        window.sortedPrey = bot.getSortedPrey();
                        // Current prey
                        window.currentPrey = window.sortedPrey[0];
                        // Convert coordinates of the closest prey using mapToMouse
                        var coordinatesOfClosestPrey = canvas.mapToMouse(window.currentPrey.xx, window.currentPrey.yy);
                        // Check for the distance
                        if (window.currentPrey.distance <= Math.pow(window.getSnakeLength(window.snake), 2) / 2) {
                            // Set the mouse coordinates to the coordinates of the closest prey
                            window.goalCoordinates = coordinatesOfClosestPrey;
                            // "Sprint" enabled
                            if (bot.canAccelerate())
                                window.setAcceleration(1);
                        }
                    }
                    window.kd_l = false;
                    window.kd_r = false;
                    canvas.setMouseCoordinates(window.goalCoordinates[0], window.goalCoordinates[1]);
                }
            }
        }
    };
})();

var userInterface = (function() {
    // Save the original slither.io functions so we can modify them, or reenable them later.
    var original_keydown = document.onkeydown;
    var original_onmouseDown = window.onmousedown;
    var original_oef = window.oef;

    return {
        // Save variable to local storage
        savePreference: function(item, value) {
            window.localStorage.setItem(item, value);
        },

        // Load a variable from local storage
        loadPreference: function(preference, defaultVar) {
            var savedItem = window.localStorage.getItem(preference);
            if (savedItem !== null) {
                if (savedItem == 'true') {
                    window[preference] = true;
                } else if (savedItem == 'false') {
                    window[preference] = false;
                } else {
                    window[preference] = savedItem;
                }
                window.log('Setting found for ' + preference + ': ' + window[preference]);
            } else {
                window[preference] = defaultVar;
                window.log('No setting found for ' + preference + '. Used default: ' + window[preference]);
            }
            return window[preference];
        },

        // Saves username when you click on "Play" button
        playButtonClickListener: function() {
            userInterface.saveNick();
            userInterface.loadPreference('autoRespawn', false);
        },

        // Preserve nickname
        saveNick: function() {
            var nick = document.getElementById('nick').value;
            userInterface.savePreference('savedNick', nick);
        },

        // Add interface elements to the page.
        // @param {string} id
        // @param {string} className
        // @param style
        appendDiv: function(id, className, style) {
            var div = document.createElement('div');
            if (id) div.id = id;
            if (className) div.className = className;
            if (style) div.style = style;
            document.body.appendChild(div);
        },

        // Store FPS data
        framesPerSecond: {
            startTime: 0,
            frameNumber: 0,
            filterStrength: 40,
            lastLoop: 0,
            frameTime: 0,
            getFPS: function() {
                var thisLoop = performance.now();
                var thisFrameTime = thisLoop - this.lastLoop;
                this.frameTime += (thisFrameTime - this.frameTime) / this.filterStrength;
                this.lastLoop = thisLoop;
                return (1000 / this.frameTime).toFixed(0);
            }
        },

        onkeydown: function(e) {
            // Original slither.io onkeydown function + whatever is under it
            original_keydown(e);
            if (document.activeElement.parentElement !== window.nick_holder) {
                // Letter `T` to toggle bot
                if (e.keyCode === 84) {
                    if (bot.isBotRunning) {
                        bot.stopBot();
                        bot.isBotEnabled = false;
                    } else {
                        bot.launchBot();
                        bot.isBotEnabled = true;
                    }
                }

                // Letter 'U' to toggle debugging (console)
                if (e.keyCode === 85) {
                    window.logDebugging = !window.logDebugging;
                    console.log('Log debugging set to: ' + window.logDebugging);
                    userInterface.savePreference('logDebugging', window.logDebugging);
                }
                // Letter 'Y' to toggle debugging (visual)
                if (e.keyCode === 89) {
                    window.visualDebugging = !window.visualDebugging;
                    window.log('Visual debugging set to: ' + window.visualDebugging);
                    userInterface.savePreference('visualDebugging', window.visualDebugging);
                }
                // Letter 'I' to toggle autorespawn
                if (e.keyCode === 73) {
                    window.autoRespawn = !window.autoRespawn;
                    window.log('Automatic Respawning set to: ' + window.autoRespawn);
                    userInterface.savePreference('autoRespawn', window.autoRespawn);
                }
                // Letter 'W' to auto rotate skin
                if (e.keyCode == 87) {
                    window.rotateskin = !window.rotateskin;
                    window.log('Auto skin rotator set to: ' + window.rotateskin);
                    userInterface.savePreference('rotateskin', window.rotateskin);
                    bot.rotateSkin();
                }
                // Letter 'O' to change rendermode (visual)
                if (e.keyCode === 79) {
                    window.mobileRender = !window.mobileRender;
                    window.log('Mobile rendering set to: ' + window.mobileRender);
                    userInterface.savePreference('mobileRender', window.mobileRender);
                    canvas.mobileRendering();
                }
                // Letter 'P' to toggle hunting Prey
                if (e.keyCode === 80) {
                    window.huntPrey = !window.huntPrey;
                    window.log('Prey hunting set to: ' + window.huntPrey);
                    userInterface.savePreference('huntPrey', window.huntPrey);
                }
                // Letter 'C' to toggle Collision detection / enemy avoidance
                if (e.keyCode === 67) {
                    window.collisionDetection = !window.collisionDetection;
                    window.log('collisionDetection set to: ' + window.collisionDetection);
                    userInterface.savePreference('collisionDetection', window.collisionDetection);
                }
                // Letter 'A' to increase head collision detection radius
                if (e.keyCode === 65) {
                    window.headCollisionRadiusMultiplier++;
                    window.log('headCollisionRadiusMultiplier set to: ' + window.headCollisionRadiusMultiplier);
                    userInterface.savePreference('headCollisionRadiusMultiplier', window.headCollisionRadiusMultiplier);
                }
                // Letter 'S' to decrease head collision detection radius
                if (e.keyCode === 83) {
                    if (window.headCollisionRadiusMultiplier > 1) {
                        window.headCollisionRadiusMultiplier--;
                        window.log('headCollisionRadiusMultiplier set to: ' + window.headCollisionRadiusMultiplier);
                        userInterface.savePreference('headCollisionRadiusMultiplier', window.headCollisionRadiusMultiplier);
                    }
                }
                // Letter 'E' to increase body collision detection radius
                if (e.keyCode === 69) {
                    window.bodyCollisionRadiusMultiplier++;
                    window.log('bodyCollisionRadiusMultiplier set to: ' + window.bodyCollisionRadiusMultiplier);
                    userInterface.savePreference('bodyCollisionRadiusMultiplier', window.bodyCollisionRadiusMultiplier);
                }
                // Letter 'R' to decrease collision detection radius
                if (e.keyCode === 82) {
                    if (window.bodyCollisionRadiusMultiplier > 1) {
                        window.bodyCollisionRadiusMultiplier--;
                        window.log('bodyCollisionRadiusMultiplier set to: ' + window.bodyCollisionRadiusMultiplier);
                        userInterface.savePreference('bodyCollisionRadiusMultiplier', window.bodyCollisionRadiusMultiplier);
                    }
                }
                // Letter 'D' to toggle defence mode
                if (e.keyCode === 68) {
                    window.defence = !window.defence;
                    window.log('Defence set to: ' + window.defence);
                    userInterface.savePreference('defence', window.defence);
                }
                // Letter 'Z' to reset zoom
                if (e.keyCode === 90) {
                    canvas.resetZoom();
                }
                // Letter 'Q' to quit to main menu
                if (e.keyCode == 81) {
                    window.autoRespawn = false;
                    userInterface.quit();
                }
                // 'ESC' to quickly respawn
                if (e.keyCode == 27) {
                    bot.quickRespawn();
                }
                // Letter 'X' to change skin
                if (e.keyCode == 88) {
                    bot.changeSkin();
                }

                if (e.keyCode == 70) {
                    bot.changeClusteringAlgorithm();
                }
                // Save nickname when you press "Enter"
                if (e.keyCode == 13) {
                    userInterface.saveNick();
                }
            }
        },

        onmousedown: function(e) {
            original_onmouseDown(e);
            e = e || window.event;
            if (window.playing) {
                switch (e.which) {
                    // "Left click" to manually speed up the slither
                    case 1:
                        window.setAcceleration(1);
                        window.log('Manual boost...');
                        break;
                        // "Right click" to toggle bot in addition to the letter "T"
                    case 3:
                        if (bot.isBotRunning) {
                            bot.stopBot();
                            bot.isBotEnabled = false;
                        } else {
                            bot.launchBot();
                            bot.isBotEnabled = true;
                        }
                        break;
                }
            }
        },

        onFrameUpdate: function() {
            // Botstatus overlay
            var generalStyle = '<span style = "opacity: 0.35";>';
            window.botstatus_overlay.innerHTML = generalStyle + '(T / Right Click) Bot: </span>' + userInterface.handleTextColor(bot.isBotRunning);
            window.visualdebugging_overlay.innerHTML = generalStyle + '(Y) Visual debugging: </span>' + userInterface.handleTextColor(window.visualDebugging);
            window.logdebugging_overlay.innerHTML = generalStyle + '(U) Log debugging: </span>' + userInterface.handleTextColor(window.logDebugging);
            window.autorespawn_overlay.innerHTML = generalStyle + '(I) Auto respawning: </span>' + userInterface.handleTextColor(window.autoRespawn);
            window.rotateskin_overlay.innerHTML = generalStyle + '(W) Auto skin rotator: </span>' + userInterface.handleTextColor(window.rotateskin);
            window.rendermode_overlay.innerHTML = generalStyle + '(O) Mobile rendering: </span>' + userInterface.handleTextColor(window.mobileRender);
            window.huntprey_overlay.innerHTML = generalStyle + '(P) Prey hunting: </span>' + userInterface.handleTextColor(window.huntPrey);
            window.collision_detection_overlay.innerHTML = generalStyle + '(C) Collision detection: </span>' + userInterface.handleTextColor(window.collisionDetection);
            window.head_collision_radius_multiplier_overlay.innerHTML = generalStyle + '(A/S) Head avoidance radius multiplier: ' + window.headCollisionRadiusMultiplier + ' </span>';
            window.body_collision_radius_multiplier_overlay.innerHTML = generalStyle + '(E/R) Body avoidance radius multiplier: ' + window.bodyCollisionRadiusMultiplier + ' </span>';
            window.defence_overlay.innerHTML = generalStyle + '(D) Defence: </span>' + userInterface.handleTextColor(window.defence);
            window.resetzoom_overlay.innerHTML = generalStyle + '(Z) Reset zoom </span>';
            window.scroll_overlay.innerHTML = generalStyle + '(Mouse Wheel) Zoom in/out </span>';
            window.quittomenu_overlay.innerHTML = generalStyle + '(Q) Quit to menu </span>';
            window.changeskin_overlay.innerHTML = generalStyle + '(X) Change skin </span>';

            window.clusteringchange_overlay.innerHTML = generalStyle + '(F) Switch clustering algorithm: ' + (bot.foodClusteringMode == 0 ? 'chancity' : 'ksofiyuk') + '</span>';
            window.quickResp_overlay.innerHTML = generalStyle + '(ESC) Quick Respawn </span>';
            window.fps_overlay.innerHTML = generalStyle + 'FPS: ' + userInterface.framesPerSecond.getFPS() + '</span>';

            if (window.position_overlay && window.playing) {
                // Display the X and Y of the snake
                window.position_overlay.innerHTML = generalStyle + 'X: ' + (Math.round(window.snake.xx) || 0) + ' Y: ' + (Math.round(window.snake.yy) || 0) + '</span>';
            }
            if (window.playing && window.ip_overlay) {
                window.ip_overlay.innerHTML = generalStyle + 'Server: ' + window.bso.ip + ':' + window.bso.po;
            }
            if (window.playing && window.visualDebugging && bot.isBotRunning) {
                // Only draw the goal when a bot has a goal.
                if (window.goalCoordinates && window.goalCoordinates.length == 2) {
                    var drawGoalCoordinates = canvas.mouseToScreen(window.goalCoordinates[0], window.goalCoordinates[1]);
                    drawGoalCoordinates = canvas.screenToCanvas(drawGoalCoordinates[0], drawGoalCoordinates[1]);
                    canvas.drawLine(drawGoalCoordinates[0], drawGoalCoordinates[1], 'green');
                    canvas.drawDot(drawGoalCoordinates[0], drawGoalCoordinates[1], 5, 'red', true);
                    canvas.drawAngle(window.snake.ang + Math.PI / 4, window.snake.ang + 3 * Math.PI / 4, true);
                    canvas.drawAngle(window.snake.ang - 3 * Math.PI / 4, window.snake.ang - Math.PI / 4, true);
                }
            }
        },

        oef: function() {
            // Original slither.io oef function + whatever is under it
            // requestAnimationFrame(window.loop);
            original_oef();
            if (bot.isBotRunning) window.loop();
            userInterface.onFrameUpdate();
        },

        // Quit to menu
        quit: function() {
            if (window.playing && window.resetGame) {
                window.want_close_socket = true;
                window.dead_mtm = 0;
                if (window.play_btn) {
                    window.play_btn.setEnabled(true);
                }
                window.resetGame();
            }
        },

        // Update the relation between the screen and the canvas.
        onresize: function() {
            window.resize();
            // Canvas different size from the screen (often bigger).
            canvas.canvasRatio = [window.mc.width / window.getWidth(),
                window.mc.height / window.getHeight()
            ];
        },

        handleTextColor: function(enabled) {
            return '<span style=\"opacity: 0.8; color:' + (enabled ? 'green;\">enabled' : 'red;\">disabled') + '</span>';
        }
    };
})();
window.play_btn.btnf.addEventListener('click', userInterface.playButtonClickListener);
document.onkeydown = userInterface.onkeydown;
window.onmousedown = userInterface.onmousedown;
window.oef = userInterface.oef;
window.onresize = userInterface.onresize;


// Loop for running the bot
window.loop = function() {
    // If the game and the bot are running
    if (window.playing && bot.isBotEnabled) {
        bot.ranOnce = true;

        // TODO: Check some condition to see if we should play defence
        // Right now this just uses the manual toggle
        if (window.defence) {
            bot.playDefence('l');
            return;
        }
        bot.thinkAboutGoals();
    } else {
        if (bot.ranOnce) {
            //window.startInterval = setInterval(bot.startBot, 1000);
            bot.stopBot();
        }
    }
};

// Main
(function() {
    // Load preferences
    userInterface.loadPreference('logDebugging', false);
    userInterface.loadPreference('visualDebugging', false);
    userInterface.loadPreference('autoRespawn', false);
    userInterface.loadPreference('mobileRender', false);
    userInterface.loadPreference('huntPrey', true);
    userInterface.loadPreference('collisionDetection', true);
    userInterface.loadPreference('headCollisionRadiusMultiplier', 8);
    userInterface.loadPreference('bodyCollisionRadiusMultiplier', 3);
    userInterface.loadPreference('defence', false);
    userInterface.loadPreference('rotateskin', false);
    window.nick.value = userInterface.loadPreference('savedNick', 'Slitheriogameplay.com Bot');

    // Overlays

    // Top left
    window.generalstyle = 'color: #FFF; font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif; font-size: 14px; position: fixed; z-index: 7;';
    userInterface.appendDiv('botstatus_overlay', 'nsi', window.generalstyle + 'left: 30; top: 65px;');
    userInterface.appendDiv('visualdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 80px;');
    userInterface.appendDiv('logdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 95px;');
    userInterface.appendDiv('autorespawn_overlay', 'nsi', window.generalstyle + 'left: 30; top: 110px;');
    userInterface.appendDiv('rendermode_overlay', 'nsi', window.generalstyle + 'left: 30; top: 125px;');
    userInterface.appendDiv('rotateskin_overlay', 'nsi', window.generalstyle + 'left: 30; top: 140px;');
    userInterface.appendDiv('collision_detection_overlay', 'nsi', window.generalstyle + 'left: 30; top: 155px;');
    userInterface.appendDiv('head_collision_radius_multiplier_overlay', 'nsi', window.generalstyle + 'left: 30; top: 170px;');
    userInterface.appendDiv('body_collision_radius_multiplier_overlay', 'nsi', window.generalstyle + 'left: 30; top: 185px;');
    userInterface.appendDiv('huntprey_overlay', 'nsi', window.generalstyle + 'left: 30; top: 200px;');
    userInterface.appendDiv('defence_overlay', 'nsi', window.generalstyle + 'left: 30; top: 215px;');
    userInterface.appendDiv('resetzoom_overlay', 'nsi', window.generalstyle + 'left: 30; top: 230px;');
    userInterface.appendDiv('scroll_overlay', 'nsi', window.generalstyle + 'left: 30; top: 245px;');
    userInterface.appendDiv('quickResp_overlay', 'nsi', window.generalstyle + 'left: 30; top: 260px;');
    userInterface.appendDiv('changeskin_overlay', 'nsi', window.generalstyle + 'left: 30; top: 275px;');
    userInterface.appendDiv('clusteringchange_overlay', 'nsi', window.generalstyle + 'left: 30; top: 290px;');
    userInterface.appendDiv('quittomenu_overlay', 'nsi', window.generalstyle + 'left: 30; top: 305px;');

    // Bottom right
    userInterface.appendDiv('position_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 120px;');
    userInterface.appendDiv('ip_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 150px;');
    userInterface.appendDiv('fps_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 170px;');

    // Listener for mouse wheel scroll - used for setZoom function
    document.body.addEventListener('mousewheel', canvas.setZoom);
    document.body.addEventListener('DOMMouseScroll', canvas.setZoom);

    // Set render mode
    if (window.mobileRender) {
        canvas.setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
        window.render_mode = 1;
    } else {
        canvas.setBackground();
        window.render_mode = 2;
    }

    bot.foodClusteringMode = 0;
    // Unblocks all skins without the need for FB sharing.
    window.localStorage.setItem('edttsg', '1');

    // Remove social
    window.social.remove();

    // Start!
    bot.launchBot();
    window.startInterval = setInterval(bot.startBot, 1000);
	
	
		function setMenu() {
        var login = document.getElementById("login");
        if (login) {
            var div = document.createElement("div");
            div.style.width = "700px";
            div.style.color = "#85f9ae";
            div.style.fontFamily = "'Arial'";
            div.style.fontSize = "13px";
            div.style.textAlign = "center";
            div.style.opacity = "2";
            div.style.margin = "0 auto";
            div.style.padding = "5px 0";
            div.style.lineHeight = "18px";
		    login.appendChild(div);
            var stmenu = document.createElement("div");
            stmenu.style.width = "400px";
            stmenu.style.color = "#8058D0";            
            stmenu.style.borderRadius = "4px";
            stmenu.style.fontFamily = "'Arial'";
            stmenu.style.fontSize = "14px";
            stmenu.style.textAlign = "center";
            stmenu.style.margin = "0 auto 100px auto";
            stmenu.style.padding = "0 14px";
            stmenu.innerHTML = "Here is the best bot hacks <a style='color:#8058D0;' target='_blank' href='https://slitheriogameplay.com'>Slitheriogameplay.com [CLICK LOOK]</a>";
            login.appendChild(stmenu);
            stmenu.appendChild(div);
			stmenu.innerHTML += '<a href="https://slitheriogameplay.com" target="_blank" style="color:#00cbea;opacity:2;text-decoration:none;">MOD from: Slitheriogameplay.com </a> | <a href="http://agariom.net" target="_blank" style="color:#85f9ae;opacity:2;text-decoration:none;">PVP from: Agariom.net </a>'; 
    }
	}
	setMenu();
})();