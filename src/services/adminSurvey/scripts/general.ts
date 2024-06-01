// Copy security code
const copyBtn = document.getElementById("copyBtn");
const securityCodeContainer = document.getElementById("securityCodeContainer");
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
