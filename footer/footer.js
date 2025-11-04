// newsletter.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter-form");
  const input = form?.querySelector(".newsletter-input");
  const button = form?.querySelector(".btn-signup");
  const errorEl = form?.querySelector(".newsletter-error");

  if (!form || !input || !button || !errorEl) return;

  let registeredEmails = JSON.parse(localStorage.getItem("emails")) || [];
  let resetTimeout = null;

  // Hàm reset form
  const resetForm = () => {
    input.value = "";
    input.placeholder = "Nhập email ưu đãi"; // Đảm bảo placeholder hiện lại
    errorEl.textContent = "";
    errorEl.classList.remove("show");
  };

  // Hàm hiển thị lỗi + tự ẩn
  const showError = (msg) => {
    errorEl.textContent = msg;
    errorEl.classList.add("show");
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(resetForm, 5000); // 5 giây
  };

  button.addEventListener("click", () => {
    const email = input.value.trim();
    clearTimeout(resetTimeout);
    errorEl.classList.remove("show");

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

    // Reset sau 5 giây
    resetTimeout = setTimeout(resetForm, 5000);
  });

  // Nếu người dùng nhập lại → hủy reset
  input.addEventListener("input", () => {
    clearTimeout(resetTimeout);
  });
});
