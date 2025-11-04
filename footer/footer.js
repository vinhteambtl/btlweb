// === FOOTER JS ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".newsletter-form");
  const input = form?.querySelector(".newsletter-input");
  const button = form?.querySelector(".btn-signup");

  if (!form || !input || !button) return;

  // Thêm thẻ hiển thị thông báo ngay sau input
  let message = document.createElement("small");
  message.className = "newsletter-error text-danger d-block mt-1";
  form.insertBefore(message, button.nextSibling);

  // Lấy danh sách email đã đăng ký
  let registeredEmails = JSON.parse(localStorage.getItem("emails")) || [];

  // Sự kiện click nút "Đăng ký"
  button.addEventListener("click", () => {
    const email = input.value.trim();
    message.style.color = "red";

    // 1️⃣ Kiểm tra rỗng
    if (email === "") {
      message.textContent = "⚠️ Vui lòng nhập email.";
      return;
    }

    // 2️⃣ Kiểm tra định dạng
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      message.textContent = "⚠️ Email không hợp lệ.";
      return;
    }

    // 3️⃣ Kiểm tra miền hợp lệ
    const allowedDomains = ["gmail.com", "yahoo.com", "icloud.com", "outlook.com"];
    const domain = email.split("@")[1]?.toLowerCase();
    if (!allowedDomains.includes(domain)) {
      message.textContent = "🚫 Chỉ chấp nhận email Gmail, Yahoo, iCloud hoặc Outlook.";
      return;
    }

    // 4️⃣ Kiểm tra trùng lặp
    if (registeredEmails.includes(email)) {
      message.textContent = "🔁 Email này đã được đăng ký.";
      return;
    }

    // ✅ Nếu hợp lệ
    registeredEmails.push(email);
    localStorage.setItem("emails", JSON.stringify(registeredEmails));

    message.style.color = "limegreen";
    message.textContent = "✅ Gửi thành công!";

    // Xóa input & reset sau 2.5 giây
    setTimeout(() => {
      input.value = "";
      message.textContent = "";
    }, 2500);
  });
});
