const choreographers = [
  { name: 'Choreographer One', zh: '编舞老师一', role: 'Classical Ballet · 古典芭蕾' },
  { name: 'Choreographer Two', zh: '编舞老师二', role: 'Contemporary · 当代舞' },
  { name: 'Choreographer Three', zh: '编舞老师三', role: 'Junior Repertoire · 儿童舞目' },
  { name: 'Choreographer Four', zh: '编舞老师四', role: 'Ensemble Works · 群舞' },
  { name: 'Choreographer Five', zh: '编舞老师五', role: 'Classical Ballet · 古典芭蕾' },
  { name: 'Choreographer Six', zh: '编舞老师六', role: 'Character Dance · 性格舞' },
  { name: 'Choreographer Seven', zh: '编舞老师七', role: 'Contemporary · 当代舞' },
  { name: 'Choreographer Eight', zh: '编舞老师八', role: 'Finale · 终曲' }
];

const seasonInfo = {
  spring: { mark: '春', label: 'Spring · 春' },
  summer: { mark: '夏', label: 'Summer · 夏' },
  autumn: { mark: '秋', label: 'Autumn · 秋' },
  winter: { mark: '冬', label: 'Winter · 冬' }
};

const danceTitles = [
  ['Copycat', ' 跟风'], ['Petals in the Wind', '风中花瓣'], ['Little Waltz', '小圆舞曲'], ['Garden of Dreams', '梦之花园'], ['Awakening', '初醒'], ['Bloom', '绽放'],
  ['Sunlit Steps', '日光之舞'], ['Sea Glass', '海之琉璃'], ['Radiance', '光芒'], ['Midsummer Joy', '盛夏之喜'], ['Azure', '蔚蓝'], ['Golden Hour', '金色时刻'],
  ['Turning Leaves', '叶落旋舞'], ['Harvest Moon', '秋月'], ['Ember', '余烬'], ['Amber Waltz', '琥珀圆舞曲'], ['Passing Seasons', '流转之季'], ['Russet', '赭红'],
  ['Snowfall', '初雪'], ['Stillness', '静'], ['Crystal Waltz', '水晶圆舞曲'], ['Winter Sky', '冬日之空'], ['Quiet Stars', '寂星'], ['Grace in Motion', '动中之恩']
];

const schools = ['Agapé Music & Ballet School', 'Pink Ballet Studio', 'Victoria Dance Arts'];

const dances = danceTitles.map((title, i) => {
  const season = ['spring','summer','autumn','winter'][Math.floor(i / 6)];
  return {
    number: i + 1,
    en: title[0],
    zh: title[1],
    season,
    school: schools[i % 3],
    level: ['Pre-Primary', 'Grade 1–2', 'Grade 3–4', 'Grade 5+', 'Open / Ensemble'][i % 5],
    choreographer: choreographers[i % choreographers.length].name
  };
});

const credits = [
  ['Artistic Direction · 艺术总监', 'Name Placeholder'],
  ['Production Manager · 制作经理', 'Name Placeholder'],
  ['Stage Manager · 舞台监督', 'Name Placeholder'],
  ['Lighting · 灯光', 'Name Placeholder'],
  ['Sound · 音响', 'Name Placeholder'],
  ['Costume · 服装', 'Name Placeholder'],
  ['Photography · 摄影', 'Name Placeholder'],
  ['Front of House · 前台统筹', 'Name Placeholder'],
  ['Graphic / Web · 平面与网站', 'Name Placeholder'],
  ['Special Thanks · 特别鸣谢', 'Name / Organisation']
];

const choreographerGrid = document.querySelector('#choreographer-grid');
choreographerGrid.innerHTML = choreographers.map((c, i) => `
  <article class="profile-card">
    <div class="profile-photo watercolor-frame"><span>Portrait ${i+1}<br>照片</span></div>
    <h3><span class="en">${c.name}</span><span class="zh" lang="zh-Hans"> ${c.zh}</span></h3>
    <p class="role">${c.role}</p>
    <p class="en">Short biography placeholder. Add training, teaching experience and creative interests.</p>
    <p class="zh" lang="zh-Hans">简短个人介绍示意文字，可加入学习背景、教学经验与创作方向。</p>
  </article>
`).join('');

const programmeGrid = document.querySelector('#programme-grid');
programmeGrid.innerHTML = dances.map(d => `
  <article class="dance-card ${d.season}-card" data-season="${d.season}" data-index="${d.number - 1}" data-season-mark="${seasonInfo[d.season].mark}" tabindex="0" role="button" aria-label="Open details for ${d.en}">
    <span class="num">${String(d.number).padStart(2,'0')} · ${seasonInfo[d.season].label}</span>
    <h3><span class="en">${d.en}</span><span class="zh zh-title" lang="zh-Hans"> ${d.zh}</span></h3>
    <p class="meta">${d.school}<br>${d.level}</p>
    <span class="card-arrow" aria-hidden="true">›</span>
  </article>
`).join('');

const galleryGrid = document.querySelector('#gallery-grid');
galleryGrid.innerHTML = dances.map((d, i) => `
  <article class="gallery-card" data-index="${i}" tabindex="0" role="button" aria-label="Open details for ${d.en}">
    <div class="gallery-photo watercolor-frame"><span>Group photo ${String(i+1).padStart(2,'0')}<br>舞者合照</span></div>
    <div class="caption">
      <strong><span class="en">${d.en}</span><span class="zh" lang="zh-Hans">${d.zh}</span></strong>
      <span>${d.school}</span>
    </div>
  </article>
`).join('');

const creditsGrid = document.querySelector('#credits-grid');
creditsGrid.innerHTML = credits.map(([role, name]) => `
  <div class="credit-item"><span>${role}</span><strong>${name}</strong></div>
`).join('');

// Language modes
const languageButtons = document.querySelectorAll('[data-mode]');
languageButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.body.dataset.lang = button.dataset.mode;
    languageButtons.forEach(b => b.classList.toggle('active', b === button));
  });
});

// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const setMenuOpen = (open) => {
  nav.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
};
menuToggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false);
    if (dialog.open) dialog.close();
  }
});

// Programme filter
const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.toggle('active', b === button));
    document.querySelectorAll('.dance-card').forEach(card => {
      const show = button.dataset.filter === 'all' || card.dataset.season === button.dataset.filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// Dance detail dialog
const dialog = document.querySelector('#dance-dialog');
const openDance = (index) => {
  const d = dances[index];
  dialog.querySelector('.dialog-number').textContent = `Dance ${String(d.number).padStart(2,'0')} · ${seasonInfo[d.season].label}`;
  dialog.querySelector('.dialog-title').textContent = d.en;
  dialog.querySelector('.dialog-subtitle').textContent = d.zh;
  dialog.querySelector('.dialog-meta').innerHTML = `${d.school}<br>${d.level}<br>Choreography · 编舞: ${d.choreographer}`;
  dialog.showModal();
};

document.querySelectorAll('.dance-card').forEach(card => {
  card.addEventListener('click', () => openDance(Number(card.dataset.index)));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDance(Number(card.dataset.index));
    }
  });
});
document.querySelectorAll('.gallery-card').forEach(card => {
  card.addEventListener('click', () => openDance(Number(card.dataset.index)));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDance(Number(card.dataset.index));
    }
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
