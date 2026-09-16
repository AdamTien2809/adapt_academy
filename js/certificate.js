/**
 * ADAPT ACADEMY - CERTIFICATE CONTROLLER & EXPORTER
 * Supports persistent local storage, custom recipient name editing,
 * access control gated by Final Assessment completion (score >= 80%),
 * direct PDF / Print export, and HTML5 Canvas high-res PNG download with official AES Việt Nam branding.
 */

class CertificateController {
  constructor() {
    this.certId = 'AES-ADAPT-2026-' + Math.floor(10000 + Math.random() * 90000);
    this.completionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    this.finalScore = 0;
    this.recipientName = 'O&M Engineer';
    this.isUnlocked = false;
  }

  init() {
    if (typeof setupSidebar === 'function') {
      setupSidebar('certificate');
    }
    this.loadSavedData();
    this.bindControls();
  }

  loadSavedData() {
    const state = (typeof getCourseState === 'function') ? getCourseState() : {};
    const userProfile = (typeof getUserProfile === 'function') ? getUserProfile() : null;

    // Check if user has completed and passed the assessment (score >= 80%)
    const passedAssessment = Boolean(
      state.assessmentResult &&
      state.assessmentResult.passed &&
      (state.assessmentResult.score >= 80)
    );

    // Support Instructor / Reviewer preview mode stored in sessionStorage
    const isPreview = sessionStorage.getItem('adapt_cert_preview_mode') === 'true';

    this.isUnlocked = passedAssessment || isPreview;

    const lockedWarning = document.getElementById('cert-locked-warning');
    const certContainer = document.getElementById('cert-main-container');
    const saveBtn = document.getElementById('btn-save-recipient');
    const printBtn = document.getElementById('btn-print-cert');
    const downloadImgBtn = document.getElementById('btn-download-img');

    if (!this.isUnlocked) {
      if (lockedWarning) lockedWarning.style.display = 'block';
      if (certContainer) certContainer.style.display = 'none';

      if (saveBtn) saveBtn.disabled = true;
      if (printBtn) printBtn.disabled = true;
      if (downloadImgBtn) downloadImgBtn.disabled = true;
      return;
    }

    // Unlocked state
    if (lockedWarning) lockedWarning.style.display = 'none';
    if (certContainer) {
      certContainer.style.display = 'block';
      // Trigger border glow celebration animation
      certContainer.classList.add('cert-unlocked');
    }

    if (saveBtn) saveBtn.disabled = false;
    if (printBtn) printBtn.disabled = false;
    if (downloadImgBtn) downloadImgBtn.disabled = false;

    // Retrieve score and date if assessment completed
    if (state.assessmentResult) {
      this.finalScore = state.assessmentResult.score || 90;
      this.completionDate = state.assessmentResult.completionDate || this.completionDate;
    } else if (isPreview) {
      this.finalScore = 95; // Demo score for preview mode
    }

    if (userProfile && userProfile.name) {
      this.recipientName = userProfile.name;
    } else if (isPreview && this.recipientName === 'O&M Engineer') {
      this.recipientName = 'Teacher Reviewer';
    }

    // Check if certId already generated
    const savedCertId = localStorage.getItem('adapt_academy_cert_id');
    if (savedCertId) {
      this.certId = savedCertId;
    } else {
      localStorage.setItem('adapt_academy_cert_id', this.certId);
    }

    this.renderCertificate();
  }

  renderCertificate() {
    const nameEl = document.getElementById('cert-display-name');
    const nameInput = document.getElementById('input-recipient-name');
    const dateEl = document.getElementById('cert-display-date');
    const scoreEl = document.getElementById('cert-display-score');
    const idEl = document.getElementById('cert-display-id');

    if (nameEl) nameEl.textContent = this.recipientName;
    if (nameInput) nameInput.value = this.recipientName;
    if (dateEl) dateEl.textContent = `Issued on: ${this.completionDate}`;
    if (scoreEl) scoreEl.textContent = `Score Achieved: ${this.finalScore}% (Pass Threshold: ≥80%)`;
    if (idEl) idEl.textContent = `Verification ID: ${this.certId}`;
  }

  bindControls() {
    const nameInput = document.getElementById('input-recipient-name');
    const saveBtn = document.getElementById('btn-save-recipient');
    const printBtn = document.getElementById('btn-print-cert');
    const downloadImgBtn = document.getElementById('btn-download-img');
    const copyIdBtn = document.getElementById('btn-copy-cert-id');
    const previewBtn = document.getElementById('btn-preview-cert');
    const toast = document.getElementById('cert-toast-msg');

    // Instructor preview button on locked screen
    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        sessionStorage.setItem('adapt_cert_preview_mode', 'true');
        this.loadSavedData();
      });
    }

    // Update name dynamically
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        if (!this.isUnlocked) return;
        this.recipientName = e.target.value.trim() || 'Learner';
        const nameEl = document.getElementById('cert-display-name');
        if (nameEl) nameEl.textContent = this.recipientName;
      });
    }

    // Save button
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (!this.isUnlocked) {
          alert('You must finish and pass the Final Assessment before saving certificate details.');
          return;
        }

        const val = nameInput ? nameInput.value.trim() : this.recipientName;
        if (!val) {
          alert('Please enter your name.');
          return;
        }
        this.recipientName = val;
        if (typeof saveUserProfile === 'function') {
          saveUserProfile(this.recipientName);
        }
        this.renderCertificate();

        if (toast) {
          toast.textContent = '✓ Saved! Your certificate is permanently preserved in web storage.';
          toast.style.display = 'block';
          setTimeout(() => { toast.style.display = 'none'; }, 4000);
        }
      });
    }

    // Print / PDF Button
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        if (!this.isUnlocked) {
          alert('Certificate printing/PDF download is locked until you complete and pass the Final Assessment with ≥80%.');
          return;
        }
        window.print();
      });
    }

    // Download PNG Button
    if (downloadImgBtn) {
      downloadImgBtn.addEventListener('click', () => {
        if (!this.isUnlocked) {
          alert('Certificate image download is locked until you complete and pass the Final Assessment with ≥80%.');
          return;
        }
        this.generateCertificateImage();
      });
    }

    // Copy ID Button
    if (copyIdBtn) {
      copyIdBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(this.certId).then(() => {
          alert(`Certificate ID ${this.certId} copied to clipboard!`);
        });
      });
    }
  }

  // Generate high-resolution 1920x1080 canvas for image download
  async generateCertificateImage() {
    if (!this.isUnlocked) return;

    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1920, 1080);

    // Subtle Radial Background
    const gradient = ctx.createRadialGradient(960, 540, 100, 960, 540, 900);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.85, '#FAFCFF');
    gradient.addColorStop(1, '#EDF3F9');
    ctx.fillStyle = gradient;
    ctx.fillRect(40, 40, 1840, 1000);

    // Outer Dark Navy Border
    ctx.strokeStyle = '#07152B';
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, 1840, 1000);

    // Inner Electric Blue Border
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 4;
    ctx.strokeRect(70, 70, 1780, 940);

    // Decorative Corner L-shapes
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 8;
    // Top-Left
    ctx.beginPath(); ctx.moveTo(56, 120); ctx.lineTo(56, 56); ctx.lineTo(120, 56); ctx.stroke();
    // Top-Right
    ctx.beginPath(); ctx.moveTo(1800, 56); ctx.lineTo(1864, 56); ctx.lineTo(1864, 120); ctx.stroke();
    // Bottom-Left
    ctx.beginPath(); ctx.moveTo(56, 960); ctx.lineTo(56, 1024); ctx.lineTo(120, 1024); ctx.stroke();
    // Bottom-Right
    ctx.beginPath(); ctx.moveTo(1800, 1024); ctx.lineTo(1864, 1024); ctx.lineTo(1864, 960); ctx.stroke();

    // Organization Branding Header
    ctx.textAlign = 'center';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#07152B';
    ctx.fillText('AES MONG DUONG   |   ADAPT ACADEMY', 960, 150);

    // Award Title
    ctx.font = '800 46px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#0B172B';
    ctx.fillText('CERTIFICATE OF OPERATIONAL EXCELLENCE', 960, 240);

    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('FROM SOP TO SMART DECISIONS — ADAPTIVE OPERATIONS FRAMEWORK', 960, 285);

    // Presentation text
    ctx.font = 'italic 26px Georgia, serif';
    ctx.fillStyle = '#475569';
    ctx.fillText('This official credential is proudly awarded to:', 960, 365);

    // Recipient Name
    ctx.font = 'bold 62px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#0284C7';
    ctx.fillText(this.recipientName, 960, 460);

    // Name underline
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(460, 485);
    ctx.lineTo(1460, 485);
    ctx.stroke();

    // Statement Paragraph
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('For demonstrating exceptional operational proficiency across dynamic crisis management,', 960, 550);
    ctx.fillText('boiler outage coordination, cross-functional supply chain alignment, and digital shift handover protocols', 960, 588);
    ctx.fillText(`within high-reliability power generation systems with a verified examination score of ${this.finalScore}%.`, 960, 626);

    // Official AES Việt Nam Logo (Center)
    const logoImg = new Image();
    logoImg.src = 'assets/aes_vietnam_logo.png';
    if (!logoImg.complete) {
      await new Promise((resolve) => {
        logoImg.onload = resolve;
        logoImg.onerror = resolve;
      });
    }

    if (logoImg.naturalWidth > 0) {
      const logoW = 280;
      const aspect = logoImg.naturalHeight / logoImg.naturalWidth;
      const logoH = logoW * aspect;
      const logoX = 960 - (logoW / 2);
      const logoY = 820 - (logoH / 2);
      ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);
    }

    // Signatures
    // Left: Operations Director (Joseph Uddo)
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(260, 825); ctx.lineTo(580, 825); ctx.stroke();
    ctx.font = 'italic 34px "Brush Script MT", cursive, Georgia, serif';
    ctx.fillStyle = '#0F213E';
    ctx.fillText('Joseph Uddo', 420, 810);
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#07152B';
    ctx.fillText('Joseph Uddo', 420, 855);
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('General Director', 420, 880);

    // Right: Training Superintendent (Huyen Bui)
    ctx.beginPath(); ctx.moveTo(1340, 825); ctx.lineTo(1660, 825); ctx.stroke();
    ctx.font = 'italic 34px "Brush Script MT", cursive, Georgia, serif';
    ctx.fillStyle = '#0F213E';
    ctx.fillText('Huyen Bui', 1500, 810);
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#07152B';
    ctx.fillText('Huyen Bui', 1500, 855);
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('Superintendent of Training', 1500, 880);

    // Credential Verification Metadata Bar
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath(); ctx.moveTo(100, 935); ctx.lineTo(1820, 935); ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    ctx.font = '17px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748B';
    ctx.textAlign = 'left';
    ctx.fillText(`VERIFICATION ID: ${this.certId}`, 100, 970);
    ctx.textAlign = 'center';
    ctx.fillText(`SCORE: ${this.finalScore}% (PASS THRESHOLD: ≥80%)`, 960, 970);
    ctx.textAlign = 'right';
    ctx.fillText(`ISSUED ON: ${this.completionDate}`, 1820, 970);

    // Trigger PNG download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const safeName = this.recipientName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `AES_VietNam_ADAPT_Certificate_${safeName}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
