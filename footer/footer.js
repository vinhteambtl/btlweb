// === FOOTER JS ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.newsletter-controls'); // ✅ chọn đúng vùng bao input + button
  const input = form.querySelector('input');
  const button = form.querySelector('button');

  if (!form || !input || !button) return;

  let registeredEmails = JSON.parse(localStorage.getItem("emails")) || [];

  const message = document.createElement('p');
  message.style.marginTop = "5px";
  message.style.fontSize = "14px";
  form.appendChild(message);

  button.addEventListener('click', () => {
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

    if (registeredEmails.includes(email)) {
      message.textContent = "🔁 Email này đã được đăng ký.";
      return;
    }

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
e.textContent = "✅ Gửi thành công!"; setTimeout(() => { input.value = ""; message.textContent = ""; }, 2500); }); });
