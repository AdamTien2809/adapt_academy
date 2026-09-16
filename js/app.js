/**
 * ADAPT ACADEMY - SHARED APPLICATION ENGINE
 * Handles navigation, question-by-question progress tracking,
 * and local storage persistence across all pages.
 */

const STORAGE_KEY_PROGRESS = 'adapt_academy_progress_v2';
const STORAGE_KEY_USER = 'adapt_academy_user_v1';

// Default initial state
function getDefaultState() {
  return {
    answeredQuestions: {},  // e.g. { 'm1_q1': 'B', 'm2_q2': 'A' }
    completedQuizzes: {},   // e.g. { 'module1': 100, 'module2': 100 }
    completedVideos: {},    // e.g. { '1.1': true }
    assessmentResult: null, // e.g. { score: 90, passed: true, date: '...' }
    currentModule: 'module1'
  };
}

// Retrieve state from localStorage
function getCourseState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return getDefaultState();
    return { ...getDefaultState(), ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error reading course state', e);
    return getDefaultState();
  }
}

// Save state to localStorage
function saveCourseState(state) {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(state));
    updateGlobalProgressUI();
  } catch (e) {
    console.error('Error saving course state', e);
  }
}

// Record an individual question answer immediately & update progress bar
function recordQuestionAnswer(qid, choiceId, moduleId) {
  const state = getCourseState();
  if (!state.answeredQuestions) {
    state.answeredQuestions = {};
  }
  state.answeredQuestions[qid] = choiceId;
  saveCourseState(state);
  updateGlobalProgressUI(moduleId);
}

// Module questions mapping
const MODULE_QUESTIONS = {
  module1: [
    'm1_q1', 'm1_q2', 'm1_q3', 'm1_q4', 'm1_q5',
    'm1_q6', 'm1_q7', 'm1_q8', 'm1_q9', 'm1_q10',
    'm1_q11', 'm1_q12', 'm1_q13', 'm1_q14', 'm1_q15'
  ],
  module2: [
    'm2_q1', 'm2_q2', 'm2_q3', 'm2_q4', 'm2_q5',
    'm2_q6', 'm2_q7', 'm2_q8', 'm2_q9', 'm2_q10',
    'm2_q11', 'm2_q12', 'm2_q13', 'm2_q14', 'm2_q15'
  ],
  module3: [
    'm3_q1', 'm3_q2', 'm3_q3', 'm3_q4', 'm3_q5',
    'm3_q6', 'm3_q7', 'm3_q8', 'm3_q9', 'm3_q10'
  ],
  assessment: [
    'final_q1', 'final_q2', 'final_q3', 'final_q4', 'final_q5',
    'final_q6', 'final_q7', 'final_q8', 'final_q9', 'final_q10',
    'final_q11', 'final_q12', 'final_q13', 'final_q14', 'final_q15'
  ]
};

// Detect current page context
function getCurrentPageContext() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('module1')) return 'module1';
  if (path.includes('module2')) return 'module2';
  if (path.includes('module3')) return 'module3';
  if (path.includes('ld-hub')) return 'ld-hub';
  if (path.includes('assessment')) return 'assessment';
  if (path.includes('certificate')) return 'certificate';
  return 'home';
}

// Calculate Progress based on questions done in current module or overall
function calculateProgress(pageContext) {
  const state = getCourseState();
  const answered = state.answeredQuestions || {};

  // If on L&D Module Hubs reference page
  if (pageContext === 'ld-hub') {
    return { percent: 100, label: 'L&D Frameworks Reference Guide' };
  }

  // If on a specific module page, update according to questions done in that module
  if (pageContext === 'module1' || pageContext === 'module2' || pageContext === 'module3') {
    const qList = MODULE_QUESTIONS[pageContext] || [];
    let count = 0;
    qList.forEach(qid => {
      if (answered[qid] !== undefined) count++;
    });

    const percent = Math.round((count / qList.length) * 100);
    let label = `${percent}% – Progress (${count}/${qList.length} Questions)`;

    if (pageContext === 'module1') {
      label = `${percent}% – ${percent === 100 ? 'Module 1 Complete' : 'Theory Review'} (${count}/${qList.length} Cases)`;
    } else if (pageContext === 'module2') {
      label = `${percent}% – ${percent === 100 ? 'Module 2 Complete' : 'Scenario Practice'} (${count}/${qList.length} Cases)`;
    } else if (pageContext === 'module3') {
      label = `${percent}% – ${percent === 100 ? 'Module 3 Complete' : 'Digital Handover & Transfer'} (${count}/${qList.length} Cases)`;
    }

    return { percent, label };
  }

  // If on Final Assessment page
  if (pageContext === 'assessment') {
    const qList = MODULE_QUESTIONS.assessment;
    let count = 0;
    qList.forEach(qid => {
      if (answered[qid] !== undefined) count++;
    });
    const percent = Math.round((count / qList.length) * 100);
    const label = `${percent}% – Assessment Progress (${count}/${qList.length} Questions)`;
    return { percent, label };
  }

  // For Home & Certificate: Calculate overall progress across all questions
  let totalQuestions = 0;
  let totalAnswered = 0;
  Object.keys(MODULE_QUESTIONS).forEach(group => {
    MODULE_QUESTIONS[group].forEach(qid => {
      totalQuestions++;
      if (answered[qid] !== undefined) totalAnswered++;
    });
  });

  const percent = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;
  let statusText = 'In Progress';
  if (percent >= 100) statusText = 'Course Completed';
  else if (percent >= 75) statusText = 'Ready for Certification';
  else if (percent >= 50) statusText = 'Applying the Framework';
  else if (percent >= 25) statusText = 'Foundations In-Progress';

  const label = `${percent}% – ${statusText} (${totalAnswered}/${totalQuestions} Questions)`;
  return { percent, label };
}

// Update Topbar Progress UI
function updateGlobalProgressUI(pageContextOverride) {
  const context = pageContextOverride || getCurrentPageContext();
  const { percent, label } = calculateProgress(context);

  const fillEl = document.getElementById('global-progress-fill');
  const labelEl = document.getElementById('global-progress-label');

  if (fillEl) fillEl.style.width = percent + '%';
  if (labelEl) labelEl.textContent = label;
}

// Set up the sidebar active link & completed status icons
function setupSidebar(currentPageId) {
  const state = getCourseState();

  // Mobile drawer toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('main-sidebar');
  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Navigation items: All unlocked and freely navigable
  const navItems = [
    { id: 'home', el: document.getElementById('nav-home') },
    { id: 'module1', el: document.getElementById('nav-module1') },
    { id: 'module2', el: document.getElementById('nav-module2') },
    { id: 'module3', el: document.getElementById('nav-module3') },
    { id: 'assessment', el: document.getElementById('nav-assessment') },
    { id: 'certificate', el: document.getElementById('nav-certificate') }
  ];

  navItems.forEach(item => {
    if (!item.el) return;

    // Active state
    if (item.id === currentPageId) {
      item.el.classList.add('active');
    } else {
      item.el.classList.remove('active');
    }

    // Always keep accessible
    item.el.classList.remove('locked');

    // Show completion checkmark
    const statusIcon = item.el.querySelector('.nav-status-icon');
    if (statusIcon) {
      let isDone = false;
      if (item.id === 'module1' && state.completedQuizzes['module1']) isDone = true;
      if (item.id === 'module2' && state.completedQuizzes['module2']) isDone = true;
      if (item.id === 'module3' && state.completedQuizzes['module3']) isDone = true;
      if (item.id === 'assessment' && state.assessmentResult && state.assessmentResult.passed) isDone = true;
      if (item.id === 'certificate' && state.assessmentResult && state.assessmentResult.passed) isDone = true;

      if (isDone) {
        statusIcon.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#10B981">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>`;
        statusIcon.className = 'nav-status-icon completed';
      } else {
        statusIcon.innerHTML = '';
      }
    }
  });

  // Ensure progress bar initializes with correct page context
  updateGlobalProgressUI(currentPageId);
}

// User Profile Storage
function getUserProfile() {
  const defaultUser = { name: "Learner", role: "O&M Engineer, 3 Shifts / 5 Teams" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    return raw ? { ...defaultUser, ...JSON.parse(raw) } : defaultUser;
  } catch(e) {
    return defaultUser;
  }
}

function saveUserProfile(name) {
  const profile = getUserProfile();
  profile.name = name;
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
  const nameEl = document.getElementById('header-user-name');
  if (nameEl) nameEl.textContent = name;
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  const ctx = getCurrentPageContext();
  updateGlobalProgressUI(ctx);
  const profile = getUserProfile();
  const nameEl = document.getElementById('header-user-name');
  if (nameEl) nameEl.textContent = profile.name;
});
