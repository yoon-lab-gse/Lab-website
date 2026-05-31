document.addEventListener('DOMContentLoaded', () => {
  // Mobile hamburger
  const ham = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (ham && links) {
    ham.addEventListener('click', () => {
      links.classList.toggle('open');
      ham.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('nav.site-nav')) links.classList.remove('open');
    });
  }

  // Active nav
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Project accordions
  document.querySelectorAll('.proj-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('.proj-card');
      const body = card.querySelector('.proj-body');
      const open = body.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      btn.querySelector('.ti').textContent = open ? '−' : '+';
    });
  });

  // Team tabs
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      const grp = tab.dataset.group;
      const target = tab.dataset.tab;
      document.querySelectorAll(`[data-tab][data-group="${grp}"]`).forEach(t => {
        t.classList.remove('active'); t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      document.querySelectorAll(`[data-section][data-group="${grp}"]`).forEach(s => {
        s.style.display = s.dataset.section === target ? '' : 'none';
      });
      // fix display type
      const active = document.querySelector(`[data-section="${target}"][data-group="${grp}"]`);
      if (active) {
        if (target === 'current') active.style.display = 'grid';
        else if (target === 'collab') active.style.display = 'grid';
        else active.style.display = 'flex';
      }
    });
  });

  // Pub year filter
  document.querySelectorAll('[data-yr]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-yr]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const yr = btn.dataset.yr;
      document.querySelectorAll('[data-year]').forEach(g => {
        g.style.display = (yr === 'all' || g.dataset.year === yr) ? '' : 'none';
      });
    });
  });

  // Project category filter
  document.querySelectorAll('[data-pfilter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-pfilter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.pfilter;
      document.querySelectorAll('.proj-card').forEach(c => {
        c.style.display = (f === 'all' || (c.dataset.cat || '').includes(f)) ? '' : 'none';
      });
      document.querySelectorAll('.sec-divider').forEach(d => {
        const next = d.nextElementSibling;
        if (!next) return;
        const visible = [...next.querySelectorAll('.proj-card')].some(c => c.style.display !== 'none');
        d.style.display = visible ? '' : 'none';
      });
    });
  });
});
