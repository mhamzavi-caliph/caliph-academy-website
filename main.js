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
    var showSuccess = function () {
      var ok = document.getElementById('form-success');
      form.style.display = 'none';
      if (ok) ok.style.display = 'block';
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      var body = new URLSearchParams(new FormData(form)).toString();
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
        .then(function (r) { if (!r.ok) throw new Error('bad status'); showSuccess(); })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = 'Send Enquiry'; }
          alert('Sorry, we could not send your enquiry just now. Please email info@caliphgroup.com and we will get back to you.');
        });
    });
    // show thank-you if Netlify redirected back after a no-JS submit
    if (/[?&]sent=1/.test(location.search)) showSuccess();
  }

  // Visitor counter (self-hosted Netlify Function + Blobs) — increments once per browser/day
  var vcEl = document.getElementById('visitor-count');
  if (vcEl) {
    var wrap = document.querySelector('.footer-visitors');
    var dayKey = 'ca_visit_' + new Date().toISOString().slice(0, 10);
    var alreadyCounted = false;
    try { alreadyCounted = localStorage.getItem(dayKey) === '1'; } catch (e) {}
    var url = '/api/visits' + (alreadyCounted ? '' : '?hit=1');

    var animateVisitor = function (el, target) {
      var dur = 1600, start = null;
      var fmt = function (n) { return Math.round(n).toLocaleString('en-US'); };
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target);
      }
      requestAnimationFrame(tick);
    };

    fetch(url)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (d) {
        var val = d && typeof d.value === 'number' ? d.value : null;
        if (val === null) return;
        if (!alreadyCounted) { try { localStorage.setItem(dayKey, '1'); } catch (e) {} }
        animateVisitor(vcEl, val);
        var lbl = document.querySelector('.fv-label');
        if (lbl) lbl.textContent = val === 1 ? 'visitor' : 'visitors';
        if (wrap) wrap.hidden = false;
      })
      .catch(function () { /* service down — leave the line hidden */ });
  }

  // Curriculum: click a course to expand a brief description
  var courseCells = document.querySelectorAll('table.courses td.course-name');
  if (courseCells.length) {
    var COURSE_DESC = {
      'financial literacy': 'Foundations of personal and business finance — budgeting, saving, credit and sound financial decision-making from a Shariah-conscious perspective.',
      'principles of takaful': 'The core concepts of Takaful (Islamic insurance): its Shariah basis, key contracts (tabarru’, wakalah, mudarabah) and how it differs from conventional insurance.',
      'basic arabic for muamalat': 'Essential Arabic vocabulary and terminology used in Islamic commercial and finance texts, giving you access to primary Muamalat sources.',
      'aqidah islamiyyah': 'Islamic creed and belief — the fundamentals of faith that ground a Muslim professional’s worldview and ethics.',
      'qawaid fiqhiyyah': 'The major legal maxims of Islamic jurisprudence and how these guiding principles apply to real financial and commercial cases.',
      'fiqh muamalat': 'Islamic commercial jurisprudence — the rules governing trade, contracts, partnerships and permissible (halal) business dealings.',
      'usul fiqh': 'The principles and methodology of deriving Islamic rulings from the Qur’an, Sunnah and other sources — the science behind fiqh.',
      'principles of accounting': 'Fundamentals of financial accounting — recording transactions, the accounting cycle and preparing basic financial statements.',
      'application of qawaid fiqhiyyah for takaful practices': 'Applying Islamic legal maxims directly to Takaful operations, product structuring and day-to-day industry practice.',
      'islamic economics': 'Economic theory through an Islamic lens — the principles, values and systems that shape a Shariah-based economy.',
      'family takaful business and operation': 'How family (life) Takaful products are designed, underwritten and managed, including savings and protection plans.',
      'general takaful': 'The operation of general Takaful — protection for property, motor and liability risks under Shariah-compliant contracts.',
      'penghayatan etika dan peradaban': 'A national MPU course on ethics and civilisation, fostering integrity, shared values and appreciation of a diverse society.',
      'kursus integriti dan anti rasuah / kiar': 'A national MPU course on integrity and anti-corruption — recognising, preventing and rejecting corrupt practices.',
      'english for professional communication': 'Building the written and spoken English skills needed for confident professional and workplace communication.',
      'co-curriculum': 'Co-curricular activities that develop teamwork, leadership and soft skills alongside your academic study.',
      'investment from islamic perspective': 'Principles of Shariah-compliant investing — screening, instruments such as sukuk and equities, and avoiding riba and gharar.',
      'mathematics in takaful': 'The quantitative and actuarial foundations used in Takaful — probability, contributions and fund calculations.',
      'accounting and reporting for takaful business': 'Specialised accounting and financial reporting standards for Takaful operators and their participant funds.',
      'risk management': 'Identifying, assessing and managing risk in financial institutions, with emphasis on Takaful and Islamic finance.',
      'akhlaq dan tasawwuf': 'Islamic ethics and spirituality — cultivating good character and inner discipline for personal and professional life.',
      'islamic entrepreneurship': 'Launching and running ventures on Islamic principles — opportunity, innovation and ethical, halal enterprise.',
      'marketing for takaful products and services': 'Marketing strategy and customer engagement tailored to Takaful products and Islamic financial services.',
      'principles and practices of retakaful': 'How Takaful operators share and cede risk through Retakaful (Islamic reinsurance) arrangements.',
      'technologies for takaful industry': 'Emerging technologies transforming Takaful — digital platforms, insurtech and data-driven operations.',
      'innovation in takaful industry': 'Trends, product innovation and future directions shaping the growth of the Takaful sector.',
      'industrial training': 'A supervised industry placement that applies your classroom learning in a real Takaful or Islamic finance workplace.'
    };
    var normCourse = function (s) {
      return s.toLowerCase().replace(/\s*\(mpu[^)]*\)/, '').replace(/\s+/g, ' ').trim();
    };
    courseCells.forEach(function (td) {
      var tr = td.parentNode;
      var desc = COURSE_DESC[normCourse(td.textContent)];
      if (!desc || tr.classList.contains('has-desc')) return;
      tr.classList.add('has-desc');
      tr.setAttribute('tabindex', '0');
      tr.setAttribute('role', 'button');
      tr.setAttribute('aria-expanded', 'false');
      var caret = document.createElement('span');
      caret.className = 'course-caret';
      caret.setAttribute('aria-hidden', 'true');
      caret.textContent = '›';
      td.insertBefore(caret, td.firstChild);
      var dr = document.createElement('tr');
      dr.className = 'course-desc';
      var cell = document.createElement('td');
      cell.colSpan = 3;
      var inner = document.createElement('div');
      inner.className = 'course-desc-inner';
      inner.textContent = desc;
      cell.appendChild(inner);
      dr.appendChild(cell);
      tr.parentNode.insertBefore(dr, tr.nextSibling);
      var toggle = function () {
        var open = tr.classList.toggle('open');
        dr.classList.toggle('open', open);
        tr.setAttribute('aria-expanded', open ? 'true' : 'false');
      };
      tr.addEventListener('click', toggle);
      tr.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
  }
})();
