/* Caliph Academy — shared interactions */
(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Curriculum tabs
  var tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
        window.scrollTo({ top: window.scrollY, behavior: 'instant' });
      });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (r) { obs.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('in'); });
  }

  // Scroll progress bar + sticky header shrink
  var progress = document.querySelector('.scroll-progress');
  var header = document.querySelector('.site-header');
  function onScroll() {
    var st = window.scrollY || document.documentElement.scrollTop;
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
    }
    if (header) header.classList.toggle('scrolled', st > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animated number counters
  var counters = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(0)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cObs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cObs.observe(c); });
  }

  // Curriculum: course counts + animated credit-load meters
  var semBlocks = document.querySelectorAll('.sem-block');
  if (semBlocks.length) {
    var MAX_CREDITS = 20; // heaviest semester, for meter scaling
    semBlocks.forEach(function (block) {
      var head = block.querySelector('.sem-head');
      var crEl = head ? head.querySelector('.cr') : null;
      if (!head || !crEl) return;
      var credits = parseInt((crEl.textContent.match(/\d+/) || [0])[0], 10);
      var courseCount = block.querySelectorAll('td.course-name').length;
      // insert course count before the credit chip
      var cn = document.createElement('span');
      cn.className = 'courses-n';
      cn.textContent = courseCount + (courseCount === 1 ? ' course' : ' courses');
      crEl.parentNode.insertBefore(cn, crEl);
      // meter bar
      var meter = document.createElement('div');
      meter.className = 'meter';
      meter.setAttribute('data-w', Math.min(100, Math.round((credits / MAX_CREDITS) * 100)));
      head.appendChild(meter);
    });
    if ('IntersectionObserver' in window) {
      var mObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var m = e.target.querySelector('.meter');
            if (m) m.style.width = m.getAttribute('data-w') + '%';
            mObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.35 });
      semBlocks.forEach(function (b) { mObs.observe(b); });
    } else {
      semBlocks.forEach(function (b) { var m = b.querySelector('.meter'); if (m) m.style.width = m.getAttribute('data-w') + '%'; });
    }
  }

  // Contact / enquiry form (front-end demo only)
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = document.getElementById('form-success');
      form.style.display = 'none';
      if (ok) ok.style.display = 'block';
    });
  }
})();
