/**
 * ADAPT ACADEMY - L&D MODULE HUBS CONTROLLER
 * Handles interactive tabs, expandable parameter panels,
 * Quick Reflex Check evaluation, and Shift Transfer Check Likert survey.
 */

document.addEventListener('DOMContentLoaded', () => {
  initQuickTabs();
  initExpandablePanels();
  initReflexCheck();
  initTransferCheckModal();
});

/* --------------------------------------------------------------------------
   1. INTERACTIVE QUICK TABS
   -------------------------------------------------------------------------- */
function initQuickTabs() {
  const tabButtons = document.querySelectorAll('.quick-tab-btn');
  if (!tabButtons.length) return;
  const sections = [
    document.getElementById('card-kirkpatrick'),
    document.getElementById('card-702010'),
    document.getElementById('card-ltem')
  ];

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Highlight tab on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 180;
    sections.forEach((sec, idx) => {
      if (!sec) return;
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        tabButtons.forEach(b => b.classList.remove('active'));
        if (tabButtons[idx]) tabButtons[idx].classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. EXPANDABLE DETAILS PANELS
   -------------------------------------------------------------------------- */
function initExpandablePanels() {
  const expandBtns = document.querySelectorAll('.btn-expand-detail');

  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const panel = document.getElementById(targetId);

      if (panel) {
        const isCurrentlyActive = panel.classList.contains('active');
        panel.classList.toggle('active');

        const iconSpan = btn.querySelector('.expand-icon');
        if (iconSpan) {
          iconSpan.textContent = isCurrentlyActive ? '+' : '−';
        }
        btn.setAttribute('aria-expanded', !isCurrentlyActive);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. QUICK REFLEX CHECK (LEVEL 4 vs LEVEL 7)
   -------------------------------------------------------------------------- */
function initReflexCheck() {
  const optionBtns = document.querySelectorAll('.reflex-option-btn');
  if (!optionBtns.length) return;
  const feedbackBox = document.getElementById('reflex-feedback-box');
  const feedbackContent = document.getElementById('reflex-feedback-content');

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';

      // Reset all option styles
      optionBtns.forEach(b => {
        b.classList.remove('correct', 'incorrect');
      });

      if (isCorrect) {
        btn.classList.add('correct');
        if (feedbackBox) {
          feedbackBox.className = 'reflex-feedback-box show pass';
          if (feedbackContent) {
            feedbackContent.innerHTML = `
              <strong>✓ Correct Reflex (Level 7 Transfer):</strong><br>
              Operator A is trapped in <strong>Level 4 Compliance Defense</strong>—relying strictly on static thresholds ("no alarm, no action") while ignoring the clear 11°C 4-hour thermal trend. Operator B demonstrates <strong>Level 7 Transfer Decision-Making</strong>: anticipating parameter drift before an unannounced trip occurs, safeguarding the incoming shift with proactive SBAR handovers.
            `;
          }
        }
      } else {
        btn.classList.add('incorrect');
        if (feedbackBox) {
          feedbackBox.className = 'reflex-feedback-box show fail';
          if (feedbackContent) {
            feedbackContent.innerHTML = `
              <strong>✗ Incomplete Operational Judgement:</strong><br>
              Waiting for an alarm to ring when a parameter is clearly drifting (from 61°C to 72°C) is a textbook symptom of the <strong>Procedural-Defensive Trap (LTEM Level 4)</strong>. At AES Mong Duong, high-reliability operations demand that engineers exercise <strong>Level 7 Transfer Decision-Making</strong> by acting on trend vectors before emergency trip thresholds are breached.
            `;
          }
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. SHIFT TRANSFER CHECK MODAL (LEVEL 1 REACTION TOOL)
   -------------------------------------------------------------------------- */
function initTransferCheckModal() {
  const modal = document.getElementById('transfer-check-modal');
  if (!modal) return;
  const openBtns = document.querySelectorAll('.btn-open-transfer-check');
  const closeBtn = document.getElementById('btn-close-transfer-modal');
  const form = document.getElementById('transfer-check-form');
  const successState = document.getElementById('transfer-success-state');

  // Open modal
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('active');
    });
  });

  // Close modal
  const closeModal = () => {
    if (modal) modal.classList.remove('active');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Handle radio selection styling
  document.querySelectorAll('.likert-radio-label').forEach(label => {
    label.addEventListener('click', () => {
      const row = label.closest('.likert-options-row');
      if (row) {
        row.querySelectorAll('.likert-radio-label').forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');
      }
    });
  });

  // Form submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect scores
      let totalRating = 0;
      let ratedCount = 0;
      for (let i = 1; i <= 5; i++) {
        const checked = form.querySelector(`input[name="q${i}"]:checked`);
        if (checked) {
          totalRating += parseInt(checked.value, 10);
          ratedCount++;
        }
      }

      if (ratedCount < 5) {
        alert('Please provide a rating for all 5 operational readiness indicators before submitting.');
        return;
      }

      const avg = (totalRating / 5).toFixed(1);

      // Save to localStorage
      try {
        const transferData = {
          date: new Date().toISOString(),
          averageRating: avg,
          totalQuestions: 5
        };
        localStorage.setItem('adapt_academy_transfer_check', JSON.stringify(transferData));
      } catch (err) {
        console.warn('Error saving transfer check', err);
      }

      if (form) form.style.display = 'none';
      if (successState) {
        successState.style.display = 'block';
        const scoreDisplay = document.getElementById('transfer-score-display');
        if (scoreDisplay) {
          scoreDisplay.textContent = `${avg} / 5.0`;
        }
      }
    });
  }
}
