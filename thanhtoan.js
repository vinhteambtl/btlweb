document.addEventListener("DOMContentLoaded", () => {
	const amountEl = document.getElementById("payment-amount");
	const qrDisplay = document.getElementById("qr-display");
	const bankItems = document.querySelectorAll(".bank-item");
	const popup = document.getElementById("thankyou-popup");
	const confirmBtn = document.getElementById("confirm-btn");

	// Lấy tổng tiền từ localStorage (nếu có)
	// ==========================
	// LẤY TỔNG TIỀN TỪ GIỎ HÀNG (localStorage)
	// ==========================
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	let total = 0;

	if (cart.length > 0) {
		total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
		amountEl.textContent = total.toLocaleString() + "đ";
	} else {
		amountEl.textContent = "0đ";
		qrDisplay.innerHTML = `<p class="text-muted fst-italic">Giỏ hàng của bạn trống</p>`;
	}


	// Mẫu QR theo ngân hàng
	const qrImages = {
		"Techcombank": "image/payments/qr-techcombank.png",
		"MBBank": "image/payments/qr-mbbank.png",
		"Vietcombank": "image/payments/qr-vietcombank.png",
		"Agribank": "image/payments/qr-agribank.png",
		"MOMO": "image/payments/qr-momo.png",
		"ZaloPay": "image/payments/qr-zalopay.png"
	};

	// Chọn ngân hàng
	bankItems.forEach(item => {
		item.addEventListener("click", () => {
			bankItems.forEach(b => b.classList.remove("active"));
			item.classList.add("active");
			const bank = item.getAttribute("data-bank");
			qrDisplay.innerHTML = `
        <img src="${qrImages[bank]}" alt="QR ${bank}" class="rounded mb-2">
        <p class="fw-semibold">${bank}</p>
      `;
		});
	});

	// Nút xác nhận thanh toán
	confirmBtn.addEventListener("click", () => {
		popup.style.display = "flex";
		setTimeout(() => {
			popup.style.display = "none";
			localStorage.removeItem("cart");
			window.location.href = "kesach.html";
		}, 2500);
	});
});