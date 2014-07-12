Tween.js
========

Tween.js is a micro (experimental) library for animations using requestAnimationFrame where possible for better performance.

####Example usage

<pre>
function move(element, duration, delta) {
    'use strict';
    var to = 500;
  
    Tween.animate({
        delay: 10,
        duration: duration,
        delta: delta,
        step: function (delta) {
            element.style.left = to * delta + 'px';
        }
    });
}
                  
var el = document.querySelector('.example_path');

el.addEventListener('click', function () {
    'use strict';
    var self = this;

    move(self.children[0], 2000, Tween.easeOut(function (p) {
        return Tween.bounce(p);
    }));
}, false);    
</pre>