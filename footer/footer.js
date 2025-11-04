// newsletter.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter-form");
  const input = form?.querySelector(".newsletter-input");
  const button = form?.querySelector(".btn-signup");
  const errorEl = form?.querySelector(".newsletter-error");

  if (!form || !input || !button || !errorEl) return;

  let registeredEmails = JSON.parse(localStorage.getItem("emails")) || [];
  let timeoutId = null; // Dùng để clear timeout

  button.addEventListener("click", () => {
    const email = input.value.trim();
    clearTimeout(timeoutId); // Xóa timeout cũ
    errorEl.textContent = "";
    errorEl.classList.remove("show");
    errorEl.style.color = "#ff4d4f";

    if (!email) {
      showError("Vui lòng nhập email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("Email không hợp lệ.");
      return;
    }

    const domain = email.split("@")[1]?.toLowerCase();
    if (!["gmail.com", "yahoo.com", "icloud.com", "outlook.com"].includes(domain)) {
      showError("Chỉ chấp nhận Gmail, Yahoo, iCloud, Outlook.");
      return;
    }

    if (registeredEmails.includes(email)) {
      showError("Email này đã được đăng ký.");
      return;
    }

    // Thành công
    registeredEmails.push(email);
    localStorage.setItem("emails", JSON.stringify(registeredEmails));
    errorEl.style.color = "limegreen";
    errorEl.textContent = "Gửi thành công!";
    errorEl.classList.add("show");

    // Tự động reset sau 4 giây
    timeoutId = setTimeout(() => {
      input.value = "";
      errorEl.textContent = "";
      errorEl.classList.remove("show");
    }, 4000);
  });

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.add("show");

    // Tự động ẩn sau 4 giây (kể cả lỗi)
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      errorEl.classList.remove("show");
    }, 4000);
  }
});
