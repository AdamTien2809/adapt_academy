/**
 * ADAPT ACADEMY - MODULE & QUIZ CONTROLLER
 * Handles interactive video tab switching, lesson completion tracking,
 * practice quizzes, and immediate explanation reveals.
 */

class ModuleController {
  constructor(moduleId) {
    this.moduleId = moduleId;
    this.moduleData = window.courseData?.modulesData[moduleId];
    this.userAnswers = {};
    this.currentVideoIndex = 0;
  }

  init() {
    if (!this.moduleData) {
      console.error(`Module data for ${this.moduleId} not found`);
      return;
    }

    setupSidebar(this.moduleId);
    this.renderLearningOutcomes();
    this.initVideoPlayer();
    this.renderQuiz();
  }

  // --------------------------------------------------------------------------
  // RENDER LEARNING OUTCOMES
  // --------------------------------------------------------------------------
  renderLearningOutcomes() {
    const container = document.getElementById('learning-outcomes-container');
    if (!container || !this.moduleData.learningOutcomes) return;

    container.innerHTML = this.moduleData.learningOutcomes.map((item, idx) => `
      <div class="outcome-card">
        <div class="outcome-icon-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h4 class="outcome-card-title">${item.title}</h4>
        <p class="outcome-card-desc">${item.desc}</p>
      </div>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // VIDEO PLAYER & TABS
  // --------------------------------------------------------------------------
  initVideoPlayer() {
    const tabsContainer = document.getElementById('video-tabs-bar');
    if (!tabsContainer || !this.moduleData.videos) return;

    // Render tab buttons
    tabsContainer.innerHTML = this.moduleData.videos.map((vid, idx) => `
      <button class="video-tab-btn ${idx === 0 ? 'active' : ''}" data-video-index="${idx}">
        <span class="tab-badge-num">${vid.id}</span>
        <span>${vid.label}</span>
      </button>
    `).join('');

    // Attach click handlers
    const buttons = tabsContainer.querySelectorAll('.video-tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-video-index'), 10);
        this.switchVideo(index);
      });
    });

    // Load first video
    this.switchVideo(0);
  }

  switchVideo(index) {
    this.currentVideoIndex = index;
    const video = this.moduleData.videos[index];
    if (!video) return;

    // Update active tab styling
    const tabs = document.querySelectorAll('.video-tab-btn');
    tabs.forEach((tab, i) => {
      if (i === index) tab.classList.add('active');
      else tab.classList.remove('active');
    });

    // Update embed / video element
    const wrapper = document.querySelector('.video-embed-wrapper');
    if (wrapper) {
      const isDirectFile = video.videoUrl && video.videoUrl.match(/\.(mov|mp4|webm)(\?.*)?$/i);
      if (isDirectFile) {
        const safeUrl = encodeURI(video.videoUrl);
        wrapper.innerHTML = `
          <video id="main-video-player" controls playsinline preload="metadata" style="position: absolute; top:0; left:0; width:100%; height:100%; background:#000;">
            <source src="${safeUrl}" type="video/mp4">
            <source src="${safeUrl}" type="video/quicktime">
            Your browser does not support HTML5 video playback.
          </video>
        `;
      } else {
        // Auto-normalize any YouTube URL (watch, share, or embed)
        let embedUrl = video.videoUrl || '';
        const ytMatch = embedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/i);
        if (ytMatch) {
          embedUrl = `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
        }
        wrapper.innerHTML = `
          <iframe id="main-video-embed" src="${embedUrl}" title="Module Video Player" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        `;
      }
    }

    // Update title & metadata
    const titleEl = document.getElementById('video-meta-title');
    const durationEl = document.getElementById('video-meta-duration');
    const overviewEl = document.getElementById('video-meta-overview');
    const keypointsEl = document.getElementById('video-keypoints-list');

    if (titleEl) titleEl.textContent = video.title;
    if (durationEl) durationEl.textContent = `Duration: ${video.duration}`;
    if (overviewEl) overviewEl.textContent = video.overview;

    if (keypointsEl && video.keyPoints) {
      keypointsEl.innerHTML = video.keyPoints.map(kp => `<li>${kp}</li>`).join('');
    }

    // Save video watch state
    const state = getCourseState();
    state.completedVideos[video.id] = true;
    saveCourseState(state);
  }

  // --------------------------------------------------------------------------
  // PRACTICE QUIZ ENGINE
  // --------------------------------------------------------------------------
  renderQuiz() {
    const quizContainer = document.getElementById('module-quiz-content');
    if (!quizContainer || !this.moduleData.quiz) return;

    const questions = this.moduleData.quiz;
    const state = getCourseState();
    const answered = state.answeredQuestions || {};

    // Grouping by lesson if questions specify lessonId
    const distinctLessons = [];
    questions.forEach(q => {
      if (q.lessonId && !distinctLessons.includes(q.lessonId)) {
        distinctLessons.push(q.lessonId);
      }
    });

    let filterTabsHtml = '';
    if (distinctLessons.length > 1) {
      filterTabsHtml = `
        <div class="quiz-filter-bar">
          <button type="button" class="quiz-filter-btn active" data-filter="all">
            All Practice Cases (${questions.length})
          </button>
          ${distinctLessons.map(les => {
            const count = questions.filter(q => q.lessonId === les).length;
            return `
              <button type="button" class="quiz-filter-btn" data-filter="${les}">
                Lesson ${les} (${count} Cases)
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    quizContainer.innerHTML = `
      ${filterTabsHtml}
      <form id="module-quiz-form">
        ${questions.map((q, qIndex) => {
          const prevAnswer = answered[q.id];
          return `
          <div class="quiz-question-card" id="card-${q.id}" data-lesson="${q.lessonId || ''}">
            <div class="quiz-card-top-row">
              <div class="quiz-card-meta-tags">
                <span class="question-number-badge">${qIndex + 1}</span>
                ${q.lessonLabel ? `<span class="quiz-lesson-badge">${q.lessonLabel}</span>` : ''}
                ${q.caseTitle ? `<strong class="quiz-case-title">${q.caseTitle}</strong>` : ''}
              </div>
            </div>

            ${q.scenario ? `
              <div class="scenario-context-callout">
                <strong class="scenario-callout-heading">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 5px; vertical-align: -2px;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  Operational Scenario
                </strong>
                <p class="scenario-callout-text">${q.scenario}</p>
              </div>
            ` : ''}

            <div class="question-text-row">
              ${q.scenario ? `<span class="question-prompt-lead">Decision Prompt:</span> ` : ''}${q.question}
            </div>
            
            <div class="choices-list">
              ${q.choices.map(choice => `
                <label class="choice-option-label ${prevAnswer === choice.id ? 'selected' : ''}" data-qid="${q.id}" data-cid="${choice.id}">
                  <input type="radio" name="${q.id}" value="${choice.id}" ${prevAnswer === choice.id ? 'checked' : ''}>
                  <span class="choice-letter-badge">${choice.id}</span>
                  <span class="choice-text">${choice.text}</span>
                </label>
              `).join('')}
            </div>

            <div class="explanation-drawer" id="explain-${q.id}">
              <div class="drawer-correct-header">
                <strong>✓ Correct Answer: Option ${q.correctAnswer}</strong>
              </div>
              <div class="drawer-explanation-body">${q.explanation}</div>
            </div>
          </div>
        `}).join('')}

        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 24px; flex-wrap: wrap; gap: 16px;">
          <div id="quiz-status-feedback" style="font-size: 0.95rem; font-weight: 700;"></div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <button type="submit" id="btn-submit-quiz" class="btn btn-primary btn-lg">
              Check Answers & Submit
            </button>
            <a id="btn-next-module" class="btn btn-success btn-lg" style="display: none;">
              Next Section &rarr;
            </a>
          </div>
        </div>
      </form>
    `;

    // Filter tabs event listeners
    const filterBtns = quizContainer.querySelectorAll('.quiz-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter');
        const cards = quizContainer.querySelectorAll('.quiz-question-card');
        cards.forEach(card => {
          if (filterVal === 'all' || card.getAttribute('data-lesson') === filterVal) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Immediately update progress bar for current module
    updateGlobalProgressUI(this.moduleId);

    // Radio change visual handler + instant progress tracking
    const labels = quizContainer.querySelectorAll('.choice-option-label');
    labels.forEach(lbl => {
      lbl.addEventListener('click', () => {
        const qid = lbl.getAttribute('data-qid');
        const cid = lbl.getAttribute('data-cid');
        const siblingLabels = quizContainer.querySelectorAll(`.choice-option-label[data-qid="${qid}"]`);
        siblingLabels.forEach(l => l.classList.remove('selected'));
        lbl.classList.add('selected');
        const radio = lbl.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        // Record question answer immediately and update progress bar!
        recordQuestionAnswer(qid, cid, this.moduleId);
      });
    });

    // Form submission
    const form = document.getElementById('module-quiz-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.gradeQuiz();
    });

    // Check if previously completed
    if (state.completedQuizzes[this.moduleId] !== undefined) {
      const statusEl = document.getElementById('quiz-status-feedback');
      if (statusEl) {
        statusEl.innerHTML = `<span style="color: #059669;">✓ Practice Quiz Previously Completed (${state.completedQuizzes[this.moduleId]}%)</span>`;
      }
      this.revealNextButton();
    }
  }

  gradeQuiz() {
    const questions = this.moduleData.quiz;
    let score = 0;
    let answeredAll = true;

    questions.forEach(q => {
      const selected = document.querySelector(`input[name="${q.id}"]:checked`);
      if (!selected) {
        answeredAll = false;
        return;
      }

      const userVal = selected.value;
      const isCorrect = (userVal === q.correctAnswer);
      if (isCorrect) score++;

      // Highlight options
      const choices = document.querySelectorAll(`.choice-option-label[data-qid="${q.id}"]`);
      choices.forEach(lbl => {
        const cid = lbl.getAttribute('data-cid');
        lbl.classList.remove('correct', 'incorrect');
        if (cid === q.correctAnswer) {
          lbl.classList.add('correct');
        } else if (cid === userVal && !isCorrect) {
          lbl.classList.add('incorrect');
        }
      });

      // Show explanation
      const explainDrawer = document.getElementById(`explain-${q.id}`);
      if (explainDrawer) {
        explainDrawer.classList.add('visible');
      }
    });

    if (!answeredAll) {
      alert(`Please select an answer for all ${questions.length} cases before submitting.`);
      // Switch to 'all' filter so the user can see unanswered questions
      const allBtn = document.querySelector('.quiz-filter-btn[data-filter="all"]');
      if (allBtn) allBtn.click();
      return;
    }

    const percentage = Math.round((score / questions.length) * 100);
    const feedbackEl = document.getElementById('quiz-status-feedback');
    if (feedbackEl) {
      const statusColor = percentage >= 80 ? '#059669' : '#0284C7';
      feedbackEl.innerHTML = `
        <span style="color: ${statusColor}; font-size: 1rem;">
          Your Score: ${score}/${questions.length} (${percentage}%) – Detailed Explanations Revealed Below
        </span>
      `;
    }

    // Save in progress state
    const state = getCourseState();
    state.completedQuizzes[this.moduleId] = percentage;
    saveCourseState(state);

    // Show next button
    this.revealNextButton();
  }

  revealNextButton() {
    const nextBtn = document.getElementById('btn-next-module');
    if (!nextBtn) return;

    nextBtn.style.display = 'inline-flex';
    if (this.moduleId === 'module1') {
      nextBtn.href = 'module2.html';
      nextBtn.innerHTML = 'Proceed to Module 2 &rarr;';
    } else if (this.moduleId === 'module2') {
      nextBtn.href = 'module3.html';
      nextBtn.innerHTML = 'Proceed to Module 3 &rarr;';
    } else if (this.moduleId === 'module3') {
      nextBtn.href = 'ld-hub.html';
      nextBtn.innerHTML = 'Proceed to L&D Module Hubs &rarr;';
    }
  }
}
