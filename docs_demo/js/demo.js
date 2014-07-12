/*global Tween*/

(function () {
    'use strict';
    
    function move(element, duration, delta) {
        var to = 530;

        Tween.animate({
            delay: 10,
            duration: duration,
            delta: delta,
            step: function (delta) {
                element.style.left = to * delta + 'px';
            }
        });
    }

    var demo1 = document.getElementById('demo1'),
        demo2 = document.getElementById('demo2'),
        demo3 = document.getElementById('demo3'),
        demo4 = document.getElementById('demo4'),
        demo5 = document.getElementById('demo5'),
        demo6 = document.getElementById('demo6'),
        demo7 = document.getElementById('demo7'),
        demo8 = document.getElementById('demo8'),
        demo9 = document.getElementById('demo9'),
        demo10 = document.getElementById('demo10'),
        demo11 = document.getElementById('demo11'),
        demo12 = document.getElementById('demo12'),
        durationInput = document.getElementById('durationInput'),
        durationOutput = document.getElementById('durationOutput'),
        duration = durationInput.value || 2000;
    
    durationOutput.innerHTML = duration;
    
    function updateDurationText(val) {
        var durationPlaces = document.querySelectorAll('pre .durationPlace'),
            i = 0,
            len = durationPlaces.length,
            dp;
            
        for (i; i < len; i += 1) {
            durationPlaces[i].innerHTML = val;
        }
    }
    
    durationInput.addEventListener('change', function () {
        var self = this,
            val = self.value;
        
        durationOutput.innerHTML = val;
        duration = parseInt(val, 10);
        updateDurationText(val);
    }, false);

    // Ease out bounce
    demo1.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, Tween.easeOut(Tween.bounce));
    }, false);

    // Bounce
    demo2.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, Tween.bounce);
    }, false);

    // Ease in out bounce
    demo3.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, Tween.easeInOut(Tween.bounce));
    }, false);

    // Back
    demo4.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, function (p) {
            return Tween.back(p, 1.5);
        });
    }, false);

    // EaseOut back
    demo5.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, Tween.easeOut(function (p) {
            return Tween.back(p, 1.5);
        }));
    }, false);

    // EaseInOut back
    demo6.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, Tween.easeInOut(function (p) {
            return Tween.back(p, 1.5);
        }));
    }, false);

    // Elastic
    demo7.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, function (p) {
            return Tween.elastic(p, 1.5);
        });
    }, false);

    // EaseOut elastic
    demo8.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, Tween.easeOut(function (p) {
            return Tween.elastic(p, 1.5);
        }));
    }, false);

    // EaseInOut elastic
    demo9.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, Tween.easeInOut(function (p) {
            return Tween.elastic(p, 1.5);
        }));
    }, false);

    // Linear
    demo10.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, Tween.linear);
    }, false);

    // Quad Linear
    demo11.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, Tween.quad);
    }, false);

    // Circ Linear
    demo12.addEventListener('click', function () {
        var self = this;

        move(self.children[0], duration, Tween.circ);
    }, false);
    
}());