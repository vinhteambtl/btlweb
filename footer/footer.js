document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter-form");
  const input = form?.querySelector(".newsletter-input");
  const button = form?.querySelector(".btn-signup");
  const errorEl = form?.querySelector(".newsletter-error");

  if (!form || !input || !button || !errorEl) return;

  let registeredEmails = JSON.parse(localStorage.getItem("emails")) || [];

  button.addEventListener("click", () => {
    const email = input.value.trim();
    errorEl.textContent = "";
    errorEl.classList.remove("show");
    errorEl.style.color = "#ff4d4f";

    // 1. Kiểm tra rỗng
    if (!email) {
      errorEl.textContent = "Vui lòng nhập email.";
      errorEl.classList.add("show");
      return;
    }

    // 2. Kiểm tra định dạng
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errorEl.textContent = "Email không hợp lệ.";
      errorEl.classList.add("show");
      return;
    }

    // 3. Kiểm tra miền
    const domain = email.split("@")[1]?.toLowerCase();
    const allowed = ["gmail.com", "yahoo.com", "icloud.com", "outlook.com"];
    if (!allowed.includes(domain)) {
      errorEl.textContent = "Chỉ chấp nhận Gmail, Yahoo, iCloud, Outlook.";
      errorEl.classList.add("show");
      return;
    }

    // 4. Kiểm tra trùng
    if (registeredEmails.includes(email)) {
      errorEl.textContent = "Email này đã được đăng ký.";
      errorEl.classList.add("show");
      return;
    }

    // Thành công
    registeredEmails.push(email);
    localStorage.setItem("emails", JSON.stringify(registeredEmails));
    errorEl.style.color = "limegreen";
    errorEl.textContent = "Gửi thành công!";
    errorEl.classList.add("show");

    // Reset sau 2.5s
    setTimeout(() => {
      input.value = "";
      errorEl.textContent = "";
      errorEl.classList.remove("show");
    }, 2500);
  });
});
