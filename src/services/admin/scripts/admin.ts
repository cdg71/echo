(function () {
  // Copy security code
  const copyBtn = document.getElementById("copyBtn");
  const securityCodeContainer = document.getElementById("passwordContainer");
  if (copyBtn && securityCodeContainer) {
    copyBtn.addEventListener("click", () => {
      copyBtn.classList.toggle("swap-active");
      const securityCode = securityCodeContainer.innerText;
      navigator.clipboard
        .writeText(securityCode)
        .then(() => {
          setTimeout(() => copyBtn.classList.toggle("swap-active"), 1000);
        })
        .catch(() => null);
    });
  }

  // Delete survey dialog
  const deleteSurveyBtn = document.getElementById("deleteSurveyBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const deleteSurveyModal = document.getElementById("deleteSurveyModal");
  if (deleteSurveyBtn && cancelDeleteBtn && deleteSurveyModal) {
    deleteSurveyBtn.addEventListener("click", () => {
      deleteSurveyModal.classList.toggle("modal-open");
    });
    cancelDeleteBtn.addEventListener("click", () => {
      deleteSurveyModal.classList.toggle("modal-open");
    });
  }
})();
