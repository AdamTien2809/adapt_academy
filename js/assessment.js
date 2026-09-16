/**
 * ADAPT ACADEMY - FINAL ASSESSMENT CONTROLLER
 * High-Stakes Examination Engine (15 Questions: 10 MCQ + 5 Case Studies)
 * 
 * Features:
 * 1. Fixed Header: 60-min timer with orange/red warnings, live progress monitor,
 *    top-right submit button with 2-step confirmation modal, and Quit Exam button.
 * 2. Question Navigation Panel: 15 boxes divided into Section 1 (MCQ, Q1–10) & Section 2 (Case Study, Q11–15),
 *    color-coded Green (answered), Gray (unanswered), Yellow (flagged), Active ring.
 * 3. Dynamic Main Workspace: Section 1 scenario MCQs & Section 2 Rich Text case studies
 *    with live word counter (min 200, max 1000 words) and rubric preview.
 * 4. Fixed Bottom Support Bar: Auto-save timestamp, flag toggle, and smooth navigation.
 * 5. Comprehensive grading engine (4 pts per MCQ, 12 pts per Case Study, total 100 pts, >=80% unlocks Certificate).
 * 6. Timer persistence across refresh using Date.now() - examStartTime.
 * 7. Quit Exam button with warning confirmation dialog (discards progress and resets attempt).
 */

class AssessmentController {
  constructor() {
    this.data = window.courseData?.finalAssessmentData;
    this.questions = this.data?.questions || [];
    this.totalQuestions = this.questions.length || 15;
    this.currentIndex = 0;

    // Readiness & Exam started flag
    this.examStarted = false;
    this.examStartTime = null;

    // State storage: { 0: 'B', 10: '<p>My response...</p>' }
    this.userAnswers = {};
    // Flags: { 0: true, 11: true }
    this.flagged = {};

    // 60-Minute Countdown Timer (3600 seconds)
    this.totalDuration = 60 * 60;
    this.timeRemaining = this.totalDuration;
    this.timerInterval = null;

    // Auto-save debouncing & interval
    this.autoSaveTimer = null;
    this.autoSaveInterval = null;
    this.lastSavedTime = null;
  }

  init() {
    // Restore any previously stored draft
    this.loadSavedDraft();

    // Render palette grid (Section 1 & Section 2)
    this.renderQuestionPalette();

    // Update progress monitor and stats
    this.updateProgressIndicator();

    // Load initial or active question
    this.loadQuestion(this.currentIndex || 0);

    const prestartOverlay = document.getElementById('exam-prestart-overlay');
    const timerDisplay = document.getElementById('exam-timer-display');

    // Only start timer and auto-save if exam was already started/resumed
    if (this.examStarted) {
      if (this.timeRemaining <= 0) {
        if (prestartOverlay) prestartOverlay.classList.add('hidden');
        alert('Your examination time expired while you were away! Submitting for evaluation.');
        this.submitAssessment();
        return;
      }
      if (prestartOverlay) prestartOverlay.classList.add('hidden');
      this.startCountdownTimer();
      this.startAutoSaveLoop();
    } else {
      if (prestartOverlay) prestartOverlay.classList.remove('hidden');
      if (timerDisplay) timerDisplay.textContent = '60:00 / 60:00 (Ready)';
    }

    // Bind event listeners (navigation, toolbar, submit, modal, prestart, quit)
    this.bindEvents();
  }

  startExam() {
    this.examStarted = true;
    this.examStartTime = Date.now();
    this.timeRemaining = this.totalDuration;

    const prestartOverlay = document.getElementById('exam-prestart-overlay');
    if (prestartOverlay) prestartOverlay.classList.add('hidden');

    // Start 60-minute countdown timer
    this.startCountdownTimer();

    // Start background auto-save loop (every 30 seconds)
    this.startAutoSaveLoop();

    // Trigger initial auto-save timestamp
    this.triggerAutoSave();
  }

  // ==========================================================================
  // 1. LIVE COUNTDOWN TIMER (60:00 with Orange <=10m and Red <=3m alerts)
  //    Calculated from Date.now() - examStartTime for seamless refresh persistence
  // ==========================================================================
  startCountdownTimer() {
    const timerDisplay = document.getElementById('exam-timer-display');
    const timerBox = document.getElementById('exam-countdown-box');

    const updateTimer = () => {
      if (this.examStartTime) {
        const elapsedSeconds = Math.floor((Date.now() - this.examStartTime) / 1000);
        this.timeRemaining = Math.max(0, this.totalDuration - elapsedSeconds);
      } else {
        this.timeRemaining--;
      }

      if (this.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.timeRemaining = 0;
        if (timerDisplay) timerDisplay.textContent = '00:00 / 60:00';
        alert('Time is up! Submitting your examination for evaluation.');
        this.submitAssessment();
        return;
      }

      // Format remaining time: MM:SS / 60:00
      const minutes = Math.floor(this.timeRemaining / 60);
      const seconds = this.timeRemaining % 60;
      const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} / 60:00`;

      if (timerDisplay) {
        timerDisplay.textContent = formatted;
      }

      // Warning styling thresholds:
      // <= 10 minutes (600s): Turns Orange
      // <= 3 minutes (180s): Flashes Red
      if (timerBox) {
        if (this.timeRemaining <= 180) {
          timerBox.classList.remove('warning');
          timerBox.classList.add('critical');
        } else if (this.timeRemaining <= 600) {
          timerBox.classList.add('warning');
          timerBox.classList.remove('critical');
        } else {
          timerBox.classList.remove('warning', 'critical');
        }
      }
    };

    updateTimer();
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(updateTimer, 1000);
  }

  // ==========================================================================
  // 2. QUESTION NAVIGATION PALETTE (15 Numbered Boxes: Section 1 & Section 2)
  // ==========================================================================
  renderQuestionPalette() {
    const gridPart1 = document.getElementById('palette-grid-part1');
    const gridPart2 = document.getElementById('palette-grid-part2');

    if (gridPart1) {
      // Questions 1 to 10 (Section 1: MCQs)
      const part1HTML = this.questions.slice(0, 10).map((q, idx) => {
        return `<button type="button" class="palette-box" id="palette-box-${idx}" data-index="${idx}">${idx + 1}</button>`;
      }).join('');
      gridPart1.innerHTML = part1HTML;
    }

    if (gridPart2) {
      // Questions 11 to 15 (Section 2: Case Studies)
      const part2HTML = this.questions.slice(10, 15).map((q, i) => {
        const idx = 10 + i;
        return `<button type="button" class="palette-box" id="palette-box-${idx}" data-index="${idx}">${idx + 1}</button>`;
      }).join('');
      gridPart2.innerHTML = part2HTML;
    }

    // Attach click listeners to all 15 palette boxes
    document.querySelectorAll('.palette-box').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'), 10);
        this.saveCurrentDraft();
        this.loadQuestion(index);
      });
    });

    // Refresh palette colors from saved answers
    this.updateAllPaletteBoxes();
  }

  updateAllPaletteBoxes() {
    this.questions.forEach((q, idx) => {
      this.updatePaletteBox(idx);
    });
    this.updateSectionBadges();
  }

  updatePaletteBox(index) {
    const box = document.getElementById(`palette-box-${index}`);
    if (!box) return;

    const answer = this.userAnswers[index];
    const isAnswered = answer && (typeof answer === 'string' ? answer.trim().length > 0 : true);

    // Green if answered, default gray if not
    if (isAnswered) {
      box.classList.add('answered');
    } else {
      box.classList.remove('answered');
    }

    // Yellow if flagged
    if (this.flagged[index]) {
      box.classList.add('flagged');
    } else {
      box.classList.remove('flagged');
    }

    // Active outline for current question
    if (index === this.currentIndex) {
      box.classList.add('active');
    } else {
      box.classList.remove('active');
    }
  }

  updateSectionBadges() {
    let p1Count = 0;
    let p2Count = 0;

    for (let i = 0; i < 10 && i < this.questions.length; i++) {
      const ans = this.userAnswers[i];
      if (ans && (typeof ans === 'string' ? ans.trim().length > 0 : true)) p1Count++;
    }
    for (let i = 10; i < 15 && i < this.questions.length; i++) {
      const ans = this.userAnswers[i];
      if (ans && (typeof ans === 'string' ? ans.trim().length > 0 : true)) p2Count++;
    }

    const b1 = document.getElementById('part1-count-badge');
    const b2 = document.getElementById('part2-count-badge');
    if (b1) b1.textContent = `${p1Count}/10`;
    if (b2) b2.textContent = `${p2Count}/5`;
  }

  // ==========================================================================
  // 3. PROGRESS INDICATOR MONITOR
  // ==========================================================================
  updateProgressIndicator() {
    let completedCount = 0;
    this.questions.forEach((q, idx) => {
      const ans = this.userAnswers[idx];
      if (ans && (typeof ans === 'string' ? ans.trim().length > 0 : true)) completedCount++;
    });

    const percent = Math.round((completedCount / this.questions.length) * 100);
    const progressText = document.getElementById('exam-progress-text');
    const progressFill = document.getElementById('exam-progress-fill');

    if (progressText) {
      progressText.textContent = `${completedCount}/${this.questions.length} completed (${percent}%)`;
    }
    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }

    // Update global app progress if needed
    if (typeof updateGlobalProgressUI === 'function') {
      updateGlobalProgressUI('assessment');
    }
  }

  // ==========================================================================
  // 4. LOAD AND RENDER QUESTION (DYNAMIC WORKSPACE: MCQ vs CASE STUDY)
  // ==========================================================================
  loadQuestion(index) {
    if (index < 0 || index >= this.questions.length) return;
    this.currentIndex = index;

    const q = this.questions[index];
    if (!q) return;

    // Update palette active states
    document.querySelectorAll('.palette-box').forEach((box, i) => {
      if (i === index) box.classList.add('active');
      else box.classList.remove('active');
    });

    // Replay fade-in animation on workspace for smooth question transitions
    const workspaceInner = document.getElementById('exam-question-workspace');
    if (workspaceInner) {
      workspaceInner.style.animation = 'none';
      workspaceInner.offsetHeight; // trigger reflow
      workspaceInner.style.animation = '';
      workspaceInner.style.animationName = 'questionFadeIn';
      workspaceInner.style.animationDuration = '0.28s';
      workspaceInner.style.animationTimingFunction = 'cubic-bezier(0.22, 1, 0.36, 1)';
      workspaceInner.style.animationFillMode = 'both';
    }

    // Update Question Meta Bar
    const numPill = document.getElementById('q-num-pill');
    const typeBadge = document.getElementById('q-type-badge');
    const pointsBadge = document.getElementById('q-points-badge');
    const cardFlagBtn = document.getElementById('q-card-flag-btn');
    const cardFlagIcon = document.getElementById('q-card-flag-icon');
    const cardFlagText = document.getElementById('q-card-flag-text');

    if (numPill) numPill.textContent = `Question ${index + 1} of ${this.questions.length}`;
    if (typeBadge) {
      typeBadge.textContent = q.part === 1 ? 'Section 1: Scenario-Based MCQ' : 'Section 2: Field Scenario Case Study';
    }
    if (pointsBadge) pointsBadge.textContent = `${q.points || (q.part === 1 ? 4 : 12)} Points`;

    // Flag button state
    const isFlagged = !!this.flagged[index];
    if (cardFlagBtn) {
      if (isFlagged) {
        cardFlagBtn.classList.add('flagged');
        if (cardFlagIcon) cardFlagIcon.textContent = '★';
        if (cardFlagText) cardFlagText.textContent = 'Flagged for Review';
      } else {
        cardFlagBtn.classList.remove('flagged');
        if (cardFlagIcon) cardFlagIcon.textContent = '☆';
        if (cardFlagText) cardFlagText.textContent = 'Flag for Review';
      }
    }
    // Synchronize bottom flag button
    const bottomFlagBtn = document.getElementById('btn-bottom-flag');
    const bottomFlagIcon = document.getElementById('bottom-flag-icon');
    const bottomFlagText = document.getElementById('bottom-flag-text');
    if (bottomFlagBtn) {
      if (isFlagged) {
        bottomFlagBtn.classList.add('flagged');
        if (bottomFlagIcon) bottomFlagIcon.textContent = '★';
        if (bottomFlagText) bottomFlagText.textContent = 'Flagged for Review';
      } else {
        bottomFlagBtn.classList.remove('flagged');
        if (bottomFlagIcon) bottomFlagIcon.textContent = '☆';
        if (bottomFlagText) bottomFlagText.textContent = 'Flag for Review';
      }
    }

    // Render Scenario Context Box
    const scenarioBox = document.getElementById('scenario-context-box');
    const scenarioText = document.getElementById('scenario-body-text');
    if (scenarioText) {
      scenarioText.textContent = q.scenario || 'Read the following operational problem and select the most appropriate response according to plant safety and LTEM/ADAPT standards.';
    }

    // Render Main Question Text
    const questionText = document.getElementById('exam-main-question');
    if (questionText) {
      questionText.textContent = q.question;
    }

    // Dynamic Workspace Switcher
    const mcqContainer = document.getElementById('mcq-options-container');
    const caseStudyWorkspace = document.getElementById('case-study-workspace');

    if (q.type === 'mcq') {
      // ----------------------------------------------------------------------
      // Section 1: Scenario-Based Multiple Choice (Questions 1–10)
      // ----------------------------------------------------------------------
      if (mcqContainer) mcqContainer.style.display = 'flex';
      if (caseStudyWorkspace) caseStudyWorkspace.style.display = 'none';

      const currentSelected = this.userAnswers[index] || '';
      if (mcqContainer) {
        mcqContainer.innerHTML = (q.choices || []).map(choice => `
          <label class="mcq-option-card ${currentSelected === choice.id ? 'selected' : ''}" data-choice="${choice.id}">
            <input type="radio" class="mcq-radio-input" name="mcq-option" value="${choice.id}" ${currentSelected === choice.id ? 'checked' : ''}>
            <span class="mcq-letter-badge">${choice.id}</span>
            <span class="mcq-choice-text">${choice.text}</span>
          </label>
        `).join('');

        // Attach click handlers to radio option cards
        mcqContainer.querySelectorAll('.mcq-option-card').forEach(card => {
          card.addEventListener('click', () => {
            const choiceId = card.getAttribute('data-choice');
            this.userAnswers[index] = choiceId;

            // UI selection toggle
            mcqContainer.querySelectorAll('.mcq-option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const radio = card.querySelector('input');
            if (radio) radio.checked = true;

            // Immediate palette and progress update
            this.updatePaletteBox(index);
            this.updateSectionBadges();
            this.updateProgressIndicator();

            // Record to persistent storage & update auto-save
            if (typeof recordQuestionAnswer === 'function') {
              recordQuestionAnswer(q.id, choiceId, 'assessment');
            }
            this.triggerAutoSave();
          });
        });
      }
    } else {
      // ----------------------------------------------------------------------
      // Section 2: Field-Based Scenario Case Studies (Questions 11–15)
      // ----------------------------------------------------------------------
      if (mcqContainer) mcqContainer.style.display = 'none';
      if (caseStudyWorkspace) caseStudyWorkspace.style.display = 'flex';

      // Render Rubric Criteria
      const rubricList = document.getElementById('rubric-criteria-list');
      if (rubricList) {
        if (q.rubric && q.rubric.length > 0) {
          rubricList.innerHTML = q.rubric.map(item => `<li>${item}</li>`).join('');
        } else {
          rubricList.innerHTML = `<li>Provide a structured technical rationale applying ADAPT & plant-level optimization principles.</li>`;
        }
      }

      // Rich Text Response Editor setup
      const editor = document.getElementById('case-study-editor');
      const minWords = q.minWords || 200;
      const maxWords = q.maxWords || 1000;
      const suggestedNote = document.getElementById('suggested-length-note');
      if (suggestedNote) {
        suggestedNote.textContent = `Required response length: ${minWords} – ${maxWords} words`;
      }

      if (editor) {
        editor.innerHTML = this.userAnswers[index] || '';
        this.updateWordCountUI(editor, minWords, maxWords);

        // Editor input & debounced save listener
        editor.oninput = () => {
          const content = editor.innerHTML;
          this.userAnswers[index] = content;
          this.updateWordCountUI(editor, minWords, maxWords);

          // Update palette box status immediately if words entered
          this.updatePaletteBox(index);
          this.updateSectionBadges();
          this.updateProgressIndicator();

          // Debounced auto-save
          clearTimeout(this.autoSaveTimer);
          this.autoSaveTimer = setTimeout(() => {
            if (typeof recordQuestionAnswer === 'function') {
              recordQuestionAnswer(q.id, content, 'assessment');
            }
            this.triggerAutoSave();
          }, 600);
        };
      }
    }

    // Update Previous / Next Navigation button states
    const prevBtn = document.getElementById('btn-prev-question');
    const nextBtn = document.getElementById('btn-next-question');

    if (prevBtn) {
      prevBtn.disabled = (index === 0);
    }
    if (nextBtn) {
      if (index === this.questions.length - 1) {
        nextBtn.innerHTML = `<span>Review & Submit</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"></path></svg>`;
        nextBtn.style.background = '#10B981';
        nextBtn.style.borderColor = '#34D399';
      } else {
        nextBtn.innerHTML = `<span>Next</span> &rarr;`;
        nextBtn.style.background = '#0284C7';
        nextBtn.style.borderColor = '#38BDF8';
      }
    }
  }

  // ==========================================================================
  // 5. RICH TEXT EDITOR WORD COUNTER (200 - 1000 Words Constraint)
  // ==========================================================================
  updateWordCountUI(editor, minWords = 200, maxWords = 1000) {
    const text = editor.innerText || editor.textContent || '';
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = text.trim().length === 0 ? 0 : words.length;

    const badge = document.getElementById('word-counter-badge');
    const badgeText = document.getElementById('word-counter-text');

    if (badge && badgeText) {
      if (wordCount < minWords) {
        badge.className = 'word-counter-badge below-min';
        const remaining = minWords - wordCount;
        badgeText.textContent = `Word Count: ${wordCount} / Min required: ${minWords} words (${remaining} more words needed)`;
      } else if (wordCount <= maxWords) {
        badge.className = 'word-counter-badge met-min';
        badgeText.textContent = `✓ Word Count: ${wordCount} (Requirement Met: ${minWords}–${maxWords} words)`;
      } else {
        badge.className = 'word-counter-badge over-max';
        const over = wordCount - maxWords;
        badgeText.textContent = `⚠️ Word Count: ${wordCount} / Max limit: ${maxWords} words (${over} words over limit)`;
      }
    }
  }

  saveCurrentDraft() {
    const q = this.questions[this.currentIndex];
    if (!q) return;

    if (q.type === 'case_study') {
      const editor = document.getElementById('case-study-editor');
      if (editor) {
        this.userAnswers[this.currentIndex] = editor.innerHTML;
        if (typeof recordQuestionAnswer === 'function') {
          recordQuestionAnswer(q.id, editor.innerHTML, 'assessment');
        }
      }
    }
    this.persistDraftToStorage();
  }

  // ==========================================================================
  // 6. AUTO-SAVE ENGINE & DRAFT PERSISTENCE
  // ==========================================================================
  startAutoSaveLoop() {
    this.autoSaveInterval = setInterval(() => {
      this.saveCurrentDraft();
      this.triggerAutoSave();
    }, 30000); // 30 seconds
  }

  triggerAutoSave() {
    const dot = document.getElementById('auto-save-dot');
    const text = document.getElementById('auto-save-text');

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    this.lastSavedTime = `${hours}:${minutes}:${seconds}`;

    if (dot) {
      dot.classList.add('saving');
      setTimeout(() => dot.classList.remove('saving'), 600);
    }

    if (text) {
      text.textContent = `Automatically saved at ${this.lastSavedTime}`;
    }

    this.persistDraftToStorage();
  }

  persistDraftToStorage() {
    try {
      const draft = {
        examStarted: this.examStarted,
        examStartTime: this.examStartTime,
        userAnswers: this.userAnswers,
        flagged: this.flagged,
        currentIndex: this.currentIndex,
        savedAt: this.lastSavedTime
      };
      localStorage.setItem('adapt_academy_assessment_draft', JSON.stringify(draft));
    } catch (e) {
      console.warn('Error saving draft to storage', e);
    }
  }

  loadSavedDraft() {
    try {
      // Restore from module progress state if present
      const state = typeof getCourseState === 'function' ? getCourseState() : {};
      if (state.answeredQuestions) {
        this.questions.forEach((q, idx) => {
          if (state.answeredQuestions[q.id] !== undefined) {
            this.userAnswers[idx] = state.answeredQuestions[q.id];
          }
        });
      }

      // Restore from draft if available
      const raw = localStorage.getItem('adapt_academy_assessment_draft');
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft.examStarted !== undefined) this.examStarted = draft.examStarted;
        if (draft.examStartTime) {
          this.examStartTime = draft.examStartTime;
          const elapsed = Math.floor((Date.now() - this.examStartTime) / 1000);
          this.timeRemaining = Math.max(0, this.totalDuration - elapsed);
        }
        if (draft.userAnswers) this.userAnswers = { ...this.userAnswers, ...draft.userAnswers };
        if (draft.flagged) this.flagged = draft.flagged;
        if (draft.currentIndex !== undefined && draft.currentIndex >= 0 && draft.currentIndex < this.questions.length) {
          this.currentIndex = draft.currentIndex;
        }
      }
    } catch (e) {
      console.warn('Error loading assessment draft', e);
    }
  }

  // ==========================================================================
  // 7. QUIT EXAM & RESET WORKFLOW
  // ==========================================================================
  quitExam() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.autoSaveInterval) clearInterval(this.autoSaveInterval);
    clearTimeout(this.autoSaveTimer);

    // Completely remove the saved assessment draft
    localStorage.removeItem('adapt_academy_assessment_draft');

    // Remove recorded assessment answers from persistent courseState so learner can restart cleanly
    if (typeof getCourseState === 'function' && typeof saveCourseState === 'function') {
      const state = getCourseState();
      if (state.answeredQuestions) {
        this.questions.forEach(q => {
          delete state.answeredQuestions[q.id];
        });
      }
      if (state.assessmentResult) {
        delete state.assessmentResult;
      }
      saveCourseState(state);
    }

    // Redirect user back to home
    window.location.href = 'index.html';
  }

  // ==========================================================================
  // 8. EVENT BINDINGS (TOOLBAR, NAVIGATION, MODALS, PRE-START, QUIT)
  // ==========================================================================
  bindEvents() {
    // ------------------------------------------------------------------------
    // Pre-Exam Start Screen & Start Warning Confirmation Modal
    // ------------------------------------------------------------------------
    const prestartTrigger = document.getElementById('btn-prestart-trigger');
    const startWarningOverlay = document.getElementById('start-warning-overlay');
    const startModalNo = document.getElementById('btn-start-modal-no');
    const startModalYes = document.getElementById('btn-start-modal-yes');

    if (prestartTrigger && startWarningOverlay) {
      prestartTrigger.addEventListener('click', () => {
        // Show warning confirmation popup
        startWarningOverlay.classList.add('active');
      });
    }

    if (startModalNo && startWarningOverlay) {
      startModalNo.addEventListener('click', () => {
        // User clicked "No": modal closes, test does NOT start
        startWarningOverlay.classList.remove('active');
      });
    }

    if (startModalYes && startWarningOverlay) {
      startModalYes.addEventListener('click', () => {
        // User clicked "Yes": modal closes, test begins immediately
        startWarningOverlay.classList.remove('active');
        this.startExam();
      });
    }

    // ------------------------------------------------------------------------
    // Quit Exam Button & Warning Modal
    // ------------------------------------------------------------------------
    const quitBtn = document.getElementById('btn-quit-exam');
    const quitWarningOverlay = document.getElementById('quit-warning-overlay');
    const quitModalCancel = document.getElementById('btn-quit-modal-cancel');
    const quitModalConfirm = document.getElementById('btn-quit-modal-confirm');

    if (quitBtn && quitWarningOverlay) {
      quitBtn.addEventListener('click', () => {
        quitWarningOverlay.classList.add('active');
      });
    }

    if (quitModalCancel && quitWarningOverlay) {
      quitModalCancel.addEventListener('click', () => {
        quitWarningOverlay.classList.remove('active');
      });
    }

    if (quitModalConfirm) {
      quitModalConfirm.addEventListener('click', () => {
        if (quitWarningOverlay) quitWarningOverlay.classList.remove('active');
        this.quitExam();
      });
    }

    // Rich Text Editor Toolbar Buttons
    const toolbar = document.getElementById('rich-editor-toolbar');
    if (toolbar) {
      toolbar.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const cmd = btn.getAttribute('data-cmd');
          const val = btn.getAttribute('data-val') || null;
          document.execCommand(cmd, false, val);
          const editor = document.getElementById('case-study-editor');
          if (editor) editor.focus();
        });
      });
    }

    // Flag for Review Toggles
    const toggleFlag = () => {
      this.flagged[this.currentIndex] = !this.flagged[this.currentIndex];
      this.loadQuestion(this.currentIndex);
      this.updatePaletteBox(this.currentIndex);
      this.persistDraftToStorage();
    };

    const cardFlagBtn = document.getElementById('q-card-flag-btn');
    const bottomFlagBtn = document.getElementById('btn-bottom-flag');
    if (cardFlagBtn) cardFlagBtn.addEventListener('click', toggleFlag);
    if (bottomFlagBtn) bottomFlagBtn.addEventListener('click', toggleFlag);

    // Prev / Next Navigation Buttons
    const prevBtn = document.getElementById('btn-prev-question');
    const nextBtn = document.getElementById('btn-next-question');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentIndex > 0) {
          this.saveCurrentDraft();
          this.loadQuestion(this.currentIndex - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentIndex < this.questions.length - 1) {
          this.saveCurrentDraft();
          this.loadQuestion(this.currentIndex + 1);
        } else {
          // On Question 15, click triggers confirmation modal
          this.openSubmitModal();
        }
      });
    }

    // Top-right Submit Exam Button
    const topSubmitBtn = document.getElementById('btn-submit-exam-top');
    if (topSubmitBtn) {
      topSubmitBtn.addEventListener('click', () => {
        this.openSubmitModal();
      });
    }

    // Two-Step Confirmation Modal Buttons
    const cancelBtn = document.getElementById('btn-confirm-cancel');
    const step1NextBtn = document.getElementById('btn-confirm-step1-next');
    const step2BackBtn = document.getElementById('btn-confirm-step2-back');
    const finalCheckbox = document.getElementById('final-confirm-checkbox');
    const step2FinalizeBtn = document.getElementById('btn-confirm-step2-finalize');

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.closeSubmitModal());
    }

    if (step1NextBtn) {
      step1NextBtn.addEventListener('click', () => {
        document.getElementById('confirm-step-1').style.display = 'none';
        document.getElementById('confirm-step-2').style.display = 'block';
      });
    }

    if (step2BackBtn) {
      step2BackBtn.addEventListener('click', () => {
        document.getElementById('confirm-step-2').style.display = 'none';
        document.getElementById('confirm-step-1').style.display = 'block';
      });
    }

    if (finalCheckbox && step2FinalizeBtn) {
      finalCheckbox.addEventListener('change', () => {
        step2FinalizeBtn.disabled = !finalCheckbox.checked;
        step2FinalizeBtn.style.opacity = finalCheckbox.checked ? '1' : '0.5';
      });

      step2FinalizeBtn.addEventListener('click', () => {
        this.closeSubmitModal();
        this.submitAssessment();
      });
    }
  }

  // ==========================================================================
  // 9. TWO-STEP CONFIRMATION POPUP MODAL
  // ==========================================================================
  openSubmitModal() {
    this.saveCurrentDraft();

    let answeredCount = 0;
    const unansweredQuestions = [];
    let flaggedCount = 0;

    this.questions.forEach((q, idx) => {
      const ans = this.userAnswers[idx];
      const isAnswered = ans && (typeof ans === 'string' ? ans.trim().length > 0 : true);
      if (isAnswered) {
        answeredCount++;
      } else {
        unansweredQuestions.push(idx + 1);
      }
      if (this.flagged[idx]) flaggedCount++;
    });

    const unansweredCount = this.questions.length - answeredCount;

    // Populate Step 1 UI
    const statAnswered = document.getElementById('confirm-stat-answered');
    const statUnanswered = document.getElementById('confirm-stat-unanswered');
    const statFlagged = document.getElementById('confirm-stat-flagged');
    const warningBanner = document.getElementById('confirm-warning-banner');
    const unansweredList = document.getElementById('confirm-unanswered-list');

    if (statAnswered) statAnswered.textContent = answeredCount;
    if (statUnanswered) statUnanswered.textContent = unansweredCount;
    if (statFlagged) statFlagged.textContent = flaggedCount;

    if (warningBanner && unansweredList) {
      if (unansweredCount > 0) {
        warningBanner.style.display = 'block';
        unansweredList.textContent = `Questions: ${unansweredQuestions.join(', ')}`;
      } else {
        warningBanner.style.display = 'none';
      }
    }

    // Reset to Step 1
    const step1 = document.getElementById('confirm-step-1');
    const step2 = document.getElementById('confirm-step-2');
    const checkbox = document.getElementById('final-confirm-checkbox');
    const finalizeBtn = document.getElementById('btn-confirm-step2-finalize');

    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
    if (checkbox) checkbox.checked = false;
    if (finalizeBtn) {
      finalizeBtn.disabled = true;
      finalizeBtn.style.opacity = '0.5';
    }

    const overlay = document.getElementById('confirm-modal-overlay');
    if (overlay) overlay.classList.add('active');
  }

  closeSubmitModal() {
    const overlay = document.getElementById('confirm-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  // ==========================================================================
  // 10. EXAM EVALUATION & SCORING (100 Points: 10 MCQs x 4 pts + 5 Case Studies x 12 pts)
  //     >=80% REQUIRED TO PASS & UNLOCK OFFICIAL CERTIFICATE
  // ==========================================================================
  submitAssessment() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.autoSaveInterval) clearInterval(this.autoSaveInterval);

    let totalPoints = 0;
    const maxPoints = 100;
    const reviewDetails = [];

    this.questions.forEach((q, idx) => {
      const userResponse = this.userAnswers[idx] || '';

      if (q.type === 'mcq') {
        // Section 1: Scenario-Based MCQ Evaluation (4 points each)
        const isCorrect = (userResponse === q.correctAnswer);
        const earned = isCorrect ? 4 : 0;
        totalPoints += earned;

        reviewDetails.push({
          number: idx + 1,
          type: 'mcq',
          title: q.question,
          userAnswer: userResponse || 'Not answered',
          correctAnswer: q.correctAnswer,
          isCorrect: isCorrect,
          earnedPoints: earned,
          maxPoints: 4,
          explanation: q.explanation
        });
      } else {
        // Section 2: Case Study Evaluation (12 points each)
        // Minimum 200 words, Maximum 1000 words
        const plainText = userResponse.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').trim();
        const words = plainText.split(/\s+/).filter(w => w.length > 0);
        const wordCount = plainText.length === 0 ? 0 : words.length;

        const minWords = q.minWords || 200;
        const maxWords = q.maxWords || 1000;

        let points = 0;
        if (wordCount >= minWords && wordCount <= maxWords) {
          points = 12; // Complete response meeting all word count criteria
        } else if (wordCount > maxWords) {
          points = 10; // Exceeded maximum 1000 words threshold
        } else if (wordCount >= 100) {
          points = 8;  // Partial response
        } else if (wordCount >= 40) {
          points = 4;  // Minimal draft
        } else if (wordCount > 0) {
          points = 2;  // Incomplete attempt
        } else {
          points = 0;  // Not answered
        }

        totalPoints += points;
        const isPass = (points >= 8);

        reviewDetails.push({
          number: idx + 1,
          type: 'case_study',
          title: q.title || `Case Study ${idx - 9}`,
          scenario: q.scenario || '',
          question: q.question,
          userResponseHtml: userResponse || '<p class="text-muted">No response provided.</p>',
          wordCount: wordCount,
          minWords: minWords,
          maxWords: maxWords,
          earnedPoints: points,
          maxPoints: 12,
          isCorrect: isPass,
          rubric: q.rubric || [],
          modelAnswer: q.modelAnswer || ''
        });
      }
    });

    const finalPercentage = Math.round((totalPoints / maxPoints) * 100);
    const passed = (finalPercentage >= 80);

    // Save final completion result to course state
    if (typeof getCourseState === 'function' && typeof saveCourseState === 'function') {
      const state = getCourseState();
      const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      state.assessmentResult = {
        score: finalPercentage,
        points: totalPoints,
        maxPoints: maxPoints,
        passed: passed,
        completionDate: today
      };
      saveCourseState(state);
    }

    // Clean up draft storage upon final submission
    localStorage.removeItem('adapt_academy_assessment_draft');

    // Show Results Modal
    this.renderResultsModal(passed, finalPercentage, totalPoints, maxPoints, reviewDetails);
  }

  // ==========================================================================
  // 11. RENDER RESULTS MODAL WITH DETAILED REVIEW
  // ==========================================================================
  renderResultsModal(passed, percentage, score, total, reviewDetails) {
    const modal = document.getElementById('results-modal');
    if (!modal) return;

    modal.classList.add('active');

    const circle = document.getElementById('results-score-circle');
    const scoreVal = document.getElementById('results-score-val');
    const statusLabel = document.getElementById('results-status-label');
    const headline = document.getElementById('results-headline');
    const feedback = document.getElementById('results-feedback');
    const statCorrect = document.getElementById('stat-correct-ratio');
    const statPercent = document.getElementById('stat-percentage');
    const statReq = document.getElementById('stat-requirement');
    const actionPrimary = document.getElementById('results-action-primary');
    const actionSecondary = document.getElementById('results-action-secondary');
    const reviewList = document.getElementById('results-review-list');

    if (circle) circle.className = `score-visual-circle ${passed ? 'pass' : 'fail'}`;
    if (statusLabel) statusLabel.textContent = passed ? 'PASSED' : 'DID NOT PASS';
    if (statCorrect) statCorrect.textContent = `${score} / ${total} pts`;
    if (statPercent) statPercent.textContent = `${percentage}%`;
    if (statReq) statReq.textContent = '≥ 80%';

    // Animated score count-up: ticks from 0 → percentage over ~1.4s with easeOutCubic
    if (scoreVal) {
      scoreVal.textContent = '0%';
      circle.style.animation = 'none'; // reset any existing animation
      // Apply pop animation after a short delay for dramatic effect
      requestAnimationFrame(() => {
        circle.style.animation = '';
        circle.style.animationName = 'scorePop';
        circle.style.animationDuration = '0.6s';
        circle.style.animationTimingFunction = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
        circle.style.animationFillMode = 'both';
      });

      const duration = 1400; // ms
      const startTime = performance.now();

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(easeOutCubic(progress) * percentage);
        scoreVal.textContent = `${current}%`;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          scoreVal.textContent = `${percentage}%`;
        }
      };

      requestAnimationFrame(tick);
    }

    if (passed) {
      if (headline) headline.textContent = 'Congratulations! You Have Passed';
      if (feedback) feedback.textContent = `You scored ${percentage}%, meeting the ≥80% threshold required for AES Mong Duong operational certification. Your official credential is now unlocked and ready to customize, download, or print.`;
      if (actionPrimary) {
        actionPrimary.textContent = 'Claim & View Certificate →';
        actionPrimary.className = 'btn btn-primary btn-lg';
        actionPrimary.onclick = () => window.location.href = 'certificate.html';
      }
    } else {
      if (headline) headline.textContent = 'Assessment Not Passed';
      if (feedback) feedback.textContent = `You scored ${percentage}%. AES Mong Duong requires a minimum score of 80% to earn the Certificate of Operational Excellence. Please review the detailed question breakdowns below, then retake the assessment.`;
      if (actionPrimary) {
        actionPrimary.textContent = 'Retake Assessment ⟳';
        actionPrimary.className = 'btn btn-danger btn-lg';
        actionPrimary.onclick = () => window.location.reload();
      }
    }

    if (actionSecondary) {
      actionSecondary.onclick = () => {
        const reviewSec = document.getElementById('results-review-section');
        if (reviewSec) reviewSec.scrollIntoView({ behavior: 'smooth' });
      };
    }

    // Render detailed review list
    if (reviewList) {
      reviewList.innerHTML = reviewDetails.map(item => {
        if (item.type === 'mcq') {
          return `
            <div class="review-item ${item.isCorrect ? 'pass' : 'fail'}">
              <div class="review-q-title">
                Q${item.number} (MCQ): ${item.title}
              </div>
              <div class="review-ans-row">
                <span><strong>Your Selection:</strong> Choice ${item.userAnswer} ${item.isCorrect ? '✓ (+4 pts)' : '✗ (0 pts)'}</span>
                ${!item.isCorrect ? `<span style="color: #059669;"><strong>Correct Answer:</strong> Choice ${item.correctAnswer}</span>` : ''}
              </div>
              <div class="review-explanation">
                <strong>Technical Explanation:</strong> ${item.explanation}
              </div>
            </div>
          `;
        } else {
          return `
            <div class="review-item ${item.isCorrect ? 'pass' : 'fail'}">
              <div class="review-q-title">
                Q${item.number} (Case Study): ${item.title}
              </div>
              <div class="review-ans-row">
                <span><strong>Score:</strong> ${item.earnedPoints} / ${item.maxPoints} pts</span>
                <span><strong>Words:</strong> ${item.wordCount} words (Requirement: ${item.minWords}–${item.maxWords} words)</span>
              </div>
              <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 10px 14px; margin-bottom: 8px; font-size: 0.82rem; color: #1E293B;">
                <strong>Your Submitted Response:</strong>
                <div style="margin-top: 6px; line-height: 1.6;">${item.userResponseHtml}</div>
              </div>
              <div class="review-explanation">
                <strong>Model Answer & Evaluation Rubric:</strong>
                <div style="white-space: pre-line; margin-top: 6px; line-height: 1.5;">${item.modelAnswer}</div>
              </div>
            </div>
          `;
        }
      }).join('');
    }
  }
}
