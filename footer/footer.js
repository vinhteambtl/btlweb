// newsletter.js
document.addEventListener("DOMContentLoaded", () => {
  const formCol = document.getElementById("newsletter-form-col");
  const form = formCol.querySelector(".newsletter-form");
  const input = form.querySelector(".newsletter-input");
  const button = form.querySelector(".btn-signup");
  const errorEl = form.querySelector(".newsletter-error");

  if (!formCol || !form || !input || !button || !errorEl) return;

  let registeredEmails = JSON.parse(localStorage.getItem("emails")) || [];
  let resetTimeout = null;

  // Hàm reset hoàn toàn như ban đầu
  const resetToInitial = () => {
    input.value = "";
    input.placeholder = "Nhập email ưu đãi";
    errorEl.textContent = "";
    errorEl.classList.remove("show");
    formCol.classList.add("collapsed"); // Thu nhỏ lại
  };

  // Hàm hiển thị lỗi + tự reset
  const showError = (msg) => {
    errorEl.textContent = msg;
    errorEl.classList.add("show");
    formCol.classList.remove("collapsed"); // Mở rộng khi có lỗi
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(resetToInitial, 5000);
  };

  button.addEventListener("click", () => {
    const email = input.value.trim();
    clearTimeout(resetTimeout);
    errorEl.classList.remove("show");
    formCol.classList.remove("collapsed"); // Mở rộng khi click

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
    resetTimeout = setTimeout(resetToInitial, 5000);
  });

  // Nếu người dùng nhập → hủy reset
  input.addEventListener("input", () => {
    clearTimeout(resetTimeout);
    formCol.classList.remove("collapsed");
  });
});
