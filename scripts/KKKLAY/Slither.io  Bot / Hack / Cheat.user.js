// ==UserScript==
// @name         Slither.io  Bot / Hack / Cheat 
// @namespace    http://slither.io/
// @version      1.0.4
// @description  DOWNLOAD HERE: https://jlyse.net/?s7D4N4W
// @author       
// @match        http://slither.io/
// @grant        none
DOWNLOAD THE WORKING SLITHER.IO HACK HERE:
https://jlyse.net/?s7D4N4W
// ==/UserScript==

const TARGET_FPS = 30;

// Custom logging function - disabled by default
window.log = function() {
    if (window.logDebugging) {
        console.log.apply(console, arguments);
    }
};

window.getSnakeLength = function() {
    return (Math.floor(
        150 *
        (window.fpsls[window.snake.sct] + window.snake.fam / window.fmlts[window.snake.sct] - 1) -
        50) / 10);
};
window.getSnakeWidth = function(sc) {
    if (sc === undefined) sc = window.snake.sc;
    return sc * 29.0;
};

var canvas = window.canvas = (function() {
    return {
        // Ratio of screen size divided by canvas size.
        canvasRatio: {
            x: window.mc.width / window.ww,
            y: window.mc.height / window.hh
        },

        // Spoofs moving the mouse to the provided coordinates.
        setMouseCoordinates: function(point) {
            window.xm = point.x;
            window.ym = point.y;
        },

        // Convert snake-relative coordinates to absolute screen coordinates.
        mouseToScreen: function(point) {
            var screenX = point.x + (window.ww / 2);
            var screenY = point.y + (window.hh / 2);
            return { x: screenX, y: screenY };
        },

        // Convert screen coordinates to canvas coordinates.
        screenToCanvas: function(point) {
            var canvasX = window.csc *
                (point.x * canvas.canvasRatio.x) - parseInt(window.mc.style.left);
            var canvasY = window.csc *
                (point.y * canvas.canvasRatio.y) - parseInt(window.mc.style.top);
            return { x: canvasX, y: canvasY };
        },

        // Convert map coordinates to mouse coordinates.
        mapToMouse: function(point) {
            var mouseX = (point.x - window.snake.xx) * window.gsc;
            var mouseY = (point.y - window.snake.yy) * window.gsc;
            return { x: mouseX, y: mouseY };
        },

        // Map cordinates to Canvas cordinate shortcut
        mapToCanvas: function(point) {
            var c = canvas.mapToMouse(point);
            c = canvas.mouseToScreen(c);
            c = canvas.screenToCanvas(c);
            return c;
        },

        // Map to Canvas coordinate conversion for drawing circles.
        // Radius also needs to scale by .gsc
        circleMapToCanvas: function(circle) {
            var newCircle = canvas.mapToCanvas(circle);
            return canvas.circle(
                newCircle.x,
                newCircle.y,
                circle.radius * window.gsc
            );
        },

        // Constructor for point type
        point: function(x, y) {
            var p = {
                x: Math.round(x),
                y: Math.round(y)
            };

            return p;
        },

        // Constructor for rect type
        rect: function(x, y, w, h) {
            var r = {
                x: Math.round(x),
                y: Math.round(y),
                width: Math.round(w),
                height: Math.round(h)
            };

            return r;
        },

        // Constructor for circle type
        circle: function(x, y, r) {
            var c = {
                x: Math.round(x),
                y: Math.round(y),
                radius: Math.round(r)
            };

            return c;
        },

        // Fast atan2
        fastAtan2: function(y, x) {
            const QPI = Math.PI / 4;
            const TQPI = 3 * Math.PI / 4;
            var r = 0.0;
            var angle = 0.0;
            var abs_y = Math.abs(y) + 1e-10;
            if (x < 0) {
                r = (x + abs_y) / (abs_y - x);
                angle = TQPI;
            } else {
                r = (x - abs_y) / (x + abs_y);
                angle = QPI;
            }
            angle += (0.1963 * r * r - 0.9817) * r;
            if (y < 0) {
                return -angle;
            }

            return angle;
        },

        // Adjusts zoom in response to the mouse wheel.
        setZoom: function(e) {
            // Scaling ratio
            if (window.gsc) {
                window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
                window.desired_gsc = window.gsc;
            }
        },

        // Restores zoom to the default value.
        resetZoom: function() {
            window.gsc = 0.9;
            window.desired_gsc = 0.9;
        },

        // Maintains Zoom
        maintainZoom: function() {
            if (window.desired_gsc !== undefined) {
                window.gsc = window.desired_gsc;
            }
        },

        // Sets background to the given image URL.
        // Defaults to slither.io's own background.
        setBackground: function(url) {
            url = typeof url !== 'undefined' ? url : '/s/bg45.jpg';
            window.ii.src = url;
        },

        // Draw a rectangle on the canvas.
        drawRect: function(rect, color, fill, alpha) {
            if (alpha === undefined) alpha = 1;

            var context = window.mc.getContext('2d');
            var lc = canvas.mapToCanvas({x: rect.x, y: rect.y});

            context.save();
            context.globalAlpha = alpha;
            context.strokeStyle = color;
            context.rect(lc.x, lc.y, rect.width * window.gsc, rect.height * window.gsc);
            context.stroke();
            if (fill) {
                context.fillStyle = color;
                context.fill();
            }
            context.restore();
        },

        // Draw a circle on the canvas.
        drawCircle: function(circle, color, fill, alpha) {
            if (alpha === undefined) alpha = 1;
            if (circle.radius === undefined) circle.radius = 5;

            var context = window.mc.getContext('2d');
            var drawCircle = canvas.circleMapToCanvas(circle);

            context.save();
            context.globalAlpha = alpha;
            context.beginPath();
            context.strokeStyle = color;
            context.arc(drawCircle.x, drawCircle.y, drawCircle.radius, 0, Math.PI * 2);
            context.stroke();
            if (fill) {
                context.fillStyle = color;
                context.fill();
            }
            context.restore();
        },

        // Draw an angle.
        // @param {number} start -- where to start the angle
        // @param {number} angle -- width of the angle
        // @param {bool} danger -- green if false, red if true
        drawAngle: function(start, angle, color, fill, alpha) {
            if (alpha === undefined) alpha = 0.6;

            var context = window.mc.getContext('2d');

            context.save();
            context.globalAlpha = alpha;
            context.beginPath();
            context.moveTo(window.mc.width / 2, window.mc.height / 2);
            context.arc(window.mc.width / 2, window.mc.height / 2, window.gsc * 100, start, angle);
            context.lineTo(window.mc.width / 2, window.mc.height / 2);
            context.closePath();
            context.stroke();
            if (fill) {
                context.fillStyle = color;
                context.fill();
            }
            context.restore();
        },

        // Draw a line on the canvas.
        drawLine: function(p1, p2, color, width) {
            if (width === undefined) width = 5;

            var context = window.mc.getContext('2d');
            var dp1 = canvas.mapToCanvas(p1);
            var dp2 = canvas.mapToCanvas(p2);

            context.save();
            context.beginPath();
            context.lineWidth = width * window.gsc;
            context.strokeStyle = color;
            context.moveTo(dp1.x, dp1.y);
            context.lineTo(dp2.x, dp2.y);
            context.stroke();
            context.restore();
        },

        // Given the start and end of a line, is point left.
        isLeft: function(start, end, point) {
            return ((end.x - start.x) * (point.y - start.y) -
             (end.y - start.y) * (point.x - start.x)) > 0;

        },

        // Get distance squared
        getDistance2: function(x1, y1, x2, y2) {
            var distance2 = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
            return distance2;
        },

        getDistance2FromSnake: function(point) {
            point.distance = canvas.getDistance2(window.snake.xx, window.snake.yy,
                point.xx, point.yy);
            return point;
        },

        // Check if point in Rect
        pointInRect: function(point, rect) {
            if (rect.x <= point.x && rect.y <= point.y &&
                rect.x + rect.width >= point.x && rect.y + rect.height >= point.y) {
                return true;
            }
            return false;
        },

        // Check if circles intersect
        circleIntersect: function(circle1, circle2) {
            var bothRadii = circle1.radius + circle2.radius;

            // Pretends the circles are squares for a quick collision check.
            // If it collides, do the more expensive circle check.
            if (circle1.x + bothRadii > circle2.x &&
                circle1.y + bothRadii > circle2.y &&
                circle1.x < circle2.x + bothRadii &&
                circle1.y < circle2.y + bothRadii) {

                var distance2 = canvas.getDistance2(circle1.x, circle1.y, circle2.x, circle2.y);

                if (distance2 < bothRadii * bothRadii) {
                    if (window.visualDebugging) {
                        var collisionPointCircle = canvas.circle(
                            ((circle1.x * circle2.radius) + (circle2.x * circle1.radius)) /
                                bothRadii,
                            ((circle1.y * circle2.radius) + (circle2.y * circle1.radius)) /
                                bothRadii,
                            5
                        );
                        canvas.drawCircle(circle2, 'red', true);
                        canvas.drawCircle(collisionPointCircle, 'cyan', true);
                    }
                    return true;
                }
            }
            return false;
        }
    };
})();

var bot = window.bot = (function() {
    return {
        isBotRunning: false,
        isBotEnabled: true,
        lookForFood: false,
        collisionPoints: [],
        collisionAngles: [],
        scores: [],
        foodTimeout: undefined,
        sectorBoxSide: 0,
        defaultAccel: 0,
        sectorBox: {},
        currentFood: {},
        MID_X: 0,
        MID_Y: 0,
        MAP_R: 0,

        quickRespawn: function() {
            window.dead_mtm = 0;
            window.login_fr = 0;

            bot.isBotRunning = false;
            window.forcing = true;
            window.connect();
            window.forcing = false;
        },

        // angleBetween - get the smallest angle between two angles (0-pi)
        angleBetween: function(a1, a2) {
            var r1 = 0.0;
            var r2 = 0.0;

            r1 = (a1 - a2) % Math.PI;
            r2 = (a2 - a1) % Math.PI;

            return r1 < r2 ? -r1 : r2;
        },

        // Avoid headPoint
        avoidHeadPoint: function(collisionPoint) {
            var cehang = canvas.fastAtan2(
                collisionPoint.yy - window.snake.yy, collisionPoint.xx - window.snake.xx);
            var diff = bot.angleBetween(window.snake.ehang, cehang);

            // var dir = diff > 0 ? -Math.PI / 2 : Math.PI / 2;
            // bot.changeHeading(dir);
            // return;

            if (Math.abs(diff) > 3 * Math.PI / 4) {
                var dir = diff > 0 ? -Math.PI / 2 : Math.PI / 2;
                bot.changeHeading(dir);
            } else {
                bot.avoidCollisionPoint(collisionPoint);
            }
        },

        // Change heading by ang
        // +0-pi turn left
        // -0-pi turn right

        changeHeading: function(angle) {
            var heading = {
                x: window.snake.xx + 500 * window.snake.cos,
                y: window.snake.yy + 500 * window.snake.sin
            };

            var cos = Math.cos(-angle);
            var sin = Math.sin(-angle);

            window.goalCoordinates = {
                x: Math.round(
                    cos * (heading.x - window.snake.xx) -
                    sin * (heading.y - window.snake.yy) + window.snake.xx),
                y: Math.round(
                    sin * (heading.x - window.snake.xx) +
                    cos * (heading.y - window.snake.yy) + window.snake.yy)
            };

            canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
        },

        // Avoid collison point by ang
        // ang radians <= Math.PI (180deg)
        avoidCollisionPoint: function(collisionPoint, ang) {
            if (ang === undefined || ang > Math.PI) {
                ang = Math.PI;
            }

            var end = {
                x: window.snake.xx + 2000 * window.snake.cos,
                y: window.snake.yy + 2000 * window.snake.sin
            };

            if (window.visualDebugging) {
                canvas.drawLine(
                    {x: window.snake.xx, y: window.snake.yy},
                    end,
                    'orange', 5);
                canvas.drawLine(
                    {x: window.snake.xx, y: window.snake.yy},
                    {x: collisionPoint.xx, y: collisionPoint.yy},
                    'red', 5);
            }

            var cos = Math.cos(ang);
            var sin = Math.sin(ang);

            if (canvas.isLeft(
                { x: window.snake.xx, y: window.snake.yy }, end,
                { x: collisionPoint.xx, y: collisionPoint.yy })) {
                sin = -sin;
            }

            window.goalCoordinates = {
                x: Math.round(
                    cos * (collisionPoint.xx - window.snake.xx) -
                    sin * (collisionPoint.yy - window.snake.yy) + window.snake.xx),
                y: Math.round(
                    sin * (collisionPoint.xx - window.snake.xx) +
                    cos * (collisionPoint.yy - window.snake.yy) + window.snake.yy)
            };

            canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
        },

        // Sorting by  property 'distance'
        sortDistance: function(a, b) {
            return a.distance - b.distance;
        },

        // get collision angle index, expects angle +/i 0 to Math.PI
        getAngleIndex: function(angle) {
            const ARCSIZE = Math.PI / 4;
            var index;

            if (angle < 0) {
                angle += 2 * Math.PI;
            }

            index = Math.round(angle * (1 / ARCSIZE));

            if (index === (2 * Math.PI) / ARCSIZE) {
                return 0;
            }
            return index;
        },

        // Add to collisionAngles if distance is closer
        addCollisionAngle: function(sp) {
            var ang = canvas.fastAtan2(
                Math.round(sp.yy - window.snake.yy),
                Math.round(sp.xx - window.snake.xx));
            var aIndex = bot.getAngleIndex(ang);

            var actualDistance = Math.round(
                sp.distance - (Math.pow(window.getSnakeWidth(window.snakes[sp.snake].sc), 2) / 2));

            if (bot.collisionAngles[aIndex] === undefined) {
                bot.collisionAngles[aIndex] = {
                    x: Math.round(sp.xx),
                    y: Math.round(sp.yy),
                    ang: ang,
                    snake: sp.snake,
                    distance: actualDistance
                };
            } else if (bot.collisionAngles[aIndex].distance > sp.distance) {
                bot.collisionAngles[aIndex].x = Math.round(sp.xx);
                bot.collisionAngles[aIndex].y = Math.round(sp.yy);
                bot.collisionAngles[aIndex].ang = ang;
                bot.collisionAngles[aIndex].snake = sp.snake;
                bot.collisionAngles[aIndex].distance = actualDistance;
            }
        },

        // Get closest collision point per snake.
        getCollisionPoints: function() {
            var scPoint;

            bot.collisionPoints = [];
            bot.collisionAngles = [];


            for (var snake = 0, ls = window.snakes.length; snake < ls; snake++) {
                scPoint = undefined;

                if (window.snakes[snake].id !== window.snake.id &&
                    window.snakes[snake].alive_amt === 1) {
                    if (window.visualDebugging) {
                        canvas.drawCircle(canvas.circle(
                            window.snakes[snake].xx,
                            window.snakes[snake].yy,
                            window.getSnakeWidth(window.snakes[snake].sc) / 2),
                            'red', false);
                    }
                    scPoint = {
                        xx: window.snakes[snake].xx,
                        yy: window.snakes[snake].yy,
                        snake: snake
                    };
                    canvas.getDistance2FromSnake(scPoint);
                    bot.addCollisionAngle(scPoint);

                    for (var pts = 0, lp = window.snakes[snake].pts.length; pts < lp; pts++) {
                        if (!window.snakes[snake].pts[pts].dying &&
                            canvas.pointInRect(
                                {x: window.snakes[snake].pts[pts].xx,
                                    y: window.snakes[snake].pts[pts].yy}, bot.sectorBox)
                            ) {
                            var collisionPoint = {
                                xx: window.snakes[snake].pts[pts].xx,
                                yy: window.snakes[snake].pts[pts].yy,
                                snake: snake
                            };

                            if (window.visualDebugging && true === false) {
                                canvas.drawCircle(canvas.circle(