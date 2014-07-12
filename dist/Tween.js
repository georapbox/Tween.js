/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 George Raptis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*jslint white: true */
/*global requestAnimFrame */

/*
 * Tween.js - Animations micro library
 * @desc Micro (experimental) library for animations using requestAnimationFrame where possible for better performance.
 * @author George Raptis | http://georap.gr
 */
window.requestAnimFrame = (function (win) {
    'use strict';

    return win.requestAnimationFrame ||
        win.webkitRequestAnimationFrame ||
        win.mozRequestAnimationFrame ||
        win.oRequestAnimationFrame ||
        win.msRequestAnimationFrame ||
        function (callback, element) {
            win.setTimeout(callback, 1000 / 60);
        };
}(window));

var Tween = (function (win) {
    'use strict';

    /**
     * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
     * @param {function} fn The callback function
     * @param {int} delay The delay in milliseconds
     */
    function requestInterval(fn, delay) {
        if (!win.requestAnimationFrame &&
                !win.webkitRequestAnimationFrame &&
                !(win.mozRequestAnimationFrame && win.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
                !win.oRequestAnimationFrame &&
                !win.msRequestAnimationFrame) {
            return win.setInterval(fn, delay);
        }

        var start = new Date().getTime(),
            handle = {};

        function loop() {
            handle.value = requestAnimFrame(loop);

            var current = new Date().getTime(),
                delta = current - start;

            if (delta >= delay) {
                fn.call();
                start = new Date().getTime();
            }
        }

        handle.value = requestAnimFrame(loop);
        return handle;
    }

    /**
     * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
     * @param {int|object} fn The callback function
     */
    function clearRequestInterval(handle) {
        win.cancelAnimationFrame ? win.cancelAnimationFrame(handle.value) :
            win.webkitCancelAnimationFrame ? win.webkitCancelAnimationFrame(handle.value) :
            win.webkitCancelRequestAnimationFrame ? win.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
            win.mozCancelRequestAnimationFrame ? win.mozCancelRequestAnimationFrame(handle.value) :
            win.oCancelRequestAnimationFrame ? win.oCancelRequestAnimationFrame(handle.value) :
            win.msCancelRequestAnimationFrame ? win.msCancelRequestAnimationFrame(handle.value) :
            clearInterval(handle);
    }

    function linear(progress) {
        return progress;
    }

    function quad(progress) {
        return Math.pow(progress, 2);
    }

    function circ(progress) {
        return 1 - Math.sin(Math.acos(progress));
    }

    function back(progress, x) {
        return Math.pow(progress, 2) * ((x + 1) * progress - x);
    }

    function bounce(progress) {
        var a = 0,
            b = 1;
        for (a, b; true; a += b, b /= 2) {
            if (progress >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
            }
        }
    }

    function elastic(progress, x) {
        return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
    }

    function easeOut(delta) {
        return function (progress) {
            return 1 - delta(1 - progress);
        };
    }

    function easeInOut(delta) {
        return function (progress) {
            if (progress < 0.5) {
                return delta(2 * progress) / 2;
            } else {
                return (2 - delta(2 * (1 - progress))) / 2;
            }
        };
    }

    return {
        linear: linear,
        quad: quad,
        circ: circ,
        back: back,
        elastic: elastic,
        bounce: bounce,
        easeOut: easeOut,
        easeInOut: easeInOut,

        /*
         * @param {Object} opts
         *       delay: Time between frames (in ms, 1/1000 of second).
         *       duration: The full time the animation should take, in ms.
         *       delta(progress): The fraction of animation time that has already passed, calculated on every frame as timePassed/duration.
         *                        Gradually moves from 0 to 1. For example, value progress = 0.5 means that half of duration time is out.
         *       step: The function, which actually does the job. It takes the result of delta and applies it.
         */
        animate: function (opts) {
            var start,
                id;

            opts.duration = opts.duration || 1000;
            start = new Date();

            id = requestInterval(function () {
                var timePassed = new Date() - start,
                    progress = timePassed / opts.duration,
                    delta;

                if (progress > 1) {
                    progress = 1;
                }

                delta = opts.delta ? opts.delta(progress) : delta = Tween.linear(progress);
                opts.step && opts.step(delta);

                if (progress === 1) {
                    clearRequestInterval(id);
                }
            }, opts.delay || 10);
        }
    };
}(window));



