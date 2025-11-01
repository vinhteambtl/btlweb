// === FOOTER JS ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.newsletter-input');
  const input = form.querySelector('input');
  const button = form.querySelector('button');

  // Kiểm tra có tồn tại phần tử không (phòng lỗi nếu footer bị xóa)
  if (!form || !input || !button) return;

  // Mảng lưu email đã đăng ký (dùng localStorage)
  let registeredEmails = JSON.parse(localStorage.getItem("emails")) || [];

  // Tạo vùng hiển thị thông báo
  const message = document.createElement('p');
  message.style.marginTop = "5px";
  message.style.fontSize = "14px";
  form.appendChild(message);

  // Khi nhấn nút "Đăng ký"
  button.addEventListener('click', () => {
    const email = input.value.trim();
    message.style.color = "red";

    // 1️⃣ Không nhập gì
    if (email === "") {
      message.textContent = "⚠️ Vui lòng nhập email.";
      return;
    }

    // 2️⃣ Sai định dạng email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      message.textContent = "⚠️ Email không hợp lệ.";
      return;
    }

    // 3️⃣ Email đã tồn tại
    if (registeredEmails.includes(email)) {
      message.textContent = "🔁 Email này đã được đăng ký.";
      return;
    }

    // 4️⃣ Gửi thành công
    registeredEmails.push(email);
    localStorage.setItem("emails", JSON.stringify(registeredEmails));
    message.style.color = "limegreen";
    message.textContent = "✅ Gửi thành công!";

    // Xóa input + thông báo sau 2.5 giây
    setTimeout(() => {
      input.value = "";
      message.textContent = "";
    }, 2500);
  });
});
