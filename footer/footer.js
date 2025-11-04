// === FOOTER JS ===
document.addEventListener("DOMContentLoaded", () => {
 const form = document.querySelector('.newsletter-form');
  const input = form?.querySelector('input');
  const button = form?.querySelector('button');

  if (!form || !input || !button) return;

  let registeredEmails = JSON.parse(localStorage.getItem("emails")) || [];

  const message = document.createElement('p');
  message.style.marginTop = "5px";
  message.style.fontSize = "14px";
  form.appendChild(message);

  button.addEventListener('click', () => {
   e.preventDefault(); // 🚫 Ngăn form gửi → không reload trang
    const email = input.value.trim();
    message.style.color = "red";

    if (email === "") {
      message.textContent = "⚠️ Vui lòng nhập email.";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      message.textContent = "⚠️ Email không hợp lệ.";
      return;
    }

    // ✅ Kiểm tra miền hợp lệ
    const allowedDomains = ["gmail.com", "yahoo.com", "icloud.com", "outlook.com"];
    const domain = email.split("@")[1]?.toLowerCase();

    if (!allowedDomains.includes(domain)) {
      message.textContent = "🚫 Chỉ chấp nhận email Gmail, Yahoo, iCloud hoặc Outlook.";
      return;
    }

    if (registeredEmails.includes(email)) {
      message.textContent = "🔁 Email này đã được đăng ký.";
      return;
    }

    // ✅ Nếu hợp lệ thì lưu
    registeredEmails.push(email);
    localStorage.setItem("emails", JSON.stringify(registeredEmails));
    message.style.color = "limegreen";
    message.textContent = "✅ Gửi thành công!";

    setTimeout(() => {
      input.value = "";
      message.textContent = "";
    }, 2500);
  });
});


