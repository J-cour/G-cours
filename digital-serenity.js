/**
 * digital-serenity.js
 * Shared interactive layer: word animation, mouse gradient, ripple on click.
 * Include on every page before </body>.
 */
(function () {
  'use strict';

  // ── 1. WORD-BY-WORD ENTRANCE ANIMATION ──
  function runWordAnimations() {
    document.querySelectorAll('.word-animate').forEach(function (el) {
      var delay = parseInt(el.dataset.delay, 10) || 0;
      setTimeout(function () {
        el.style.animation = 'word-appear 0.8s cubic-bezier(0.22,1,0.36,1) forwards';
      }, delay);
    });
  }
  // slight pause so the rest of the page has rendered
  setTimeout(runWordAnimations, 300);

  // hover glow on animated words
  document.addEventListener('mouseover', function (e) {
    if (e.target && e.target.classList && e.target.classList.contains('word-animate')) {
      e.target.style.textShadow = '0 0 22px rgba(203,213,225,0.5)';
    }
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target && e.target.classList && e.target.classList.contains('word-animate')) {
      e.target.style.textShadow = 'none';
    }
  });

  // ── 2. MOUSE-FOLLOWING RADIAL GRADIENT ──
  var grad = document.getElementById('mouse-gradient');
  if (grad) {
    var rafId;
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;

    document.addEventListener('mousemove', function (e) {
      tx = e.clientX;
      ty = e.clientY;
      grad.style.opacity = '1';
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function () {
        grad.style.left = tx + 'px';
        grad.style.top  = ty + 'px';
      });
    });

    document.addEventListener('mouseleave', function () {
      grad.style.opacity = '0';
    });
  }

  // ── 3. CLICK RIPPLE ──
  document.addEventListener('click', function (e) {
    // skip interactive elements
    if (e.target && e.target.closest('a,button,input,select,textarea,label')) return;
    var r = document.createElement('div');
    r.className = 'ds-ripple';
    r.style.left = e.clientX + 'px';
    r.style.top  = e.clientY + 'px';
    document.body.appendChild(r);
    setTimeout(function () { r.parentNode && r.parentNode.removeChild(r); }, 1100);
  });
})();
