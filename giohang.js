document.addEventListener("DOMContentLoaded", () => {
	// ===================================
	// PHẦN 1: XỬ LÝ LOGIC GIỎ HÀNG
	// ===================================

	// --- 1. KHAI BÁO BIẾN ---
	const cartTable = document.getElementById("cart-table");
	const totalElement = document.getElementById("total");
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkoutBtn = document.getElementById("checkout-btn");

	// --- 2. CÁC HÀM CẬP NHẬT DỮ LIỆU ---

	// Lưu giỏ hàng vào localStorage
	function saveCart() {
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	// Thay đổi số lượng sản phẩm
	function changeQuantity(index, newQty) {
		if (newQty >= 1) {
			cart[index].qty = newQty;
		}
		saveCart();
		renderCart();
	}

	// Xóa sản phẩm khỏi giỏ hàng
	function removeItem(index) {
		cart.splice(index, 1);
		saveCart();
		renderCart();
	}

	// --- 3. HÀM HIỂN THỊ GIỎ HÀNG (RENDER) ---
	function renderCart() {
		// Xóa nội dung cũ để vẽ lại
		cartTable.innerHTML = "";
		let totalPrice = 0;

		// Nếu giỏ hàng rỗng
		if (cart.length === 0) {
			cartTable.innerHTML = `
        <tr>
          <td colspan="4" class="text-center py-4">
            <p class="text-muted">Giỏ hàng của bạn đang trống.</p>
            <a href="kesach.html" class="btn btn-success">Tiếp tục mua sắm</a>
          </td>
        </tr>
      `;
			totalElement.innerText = "0đ";
			return;
		}

		// Lặp qua từng sản phẩm để tạo HTML
		cart.forEach((item, index) => {
			const itemTotal = item.price * item.qty;
			totalPrice += itemTotal;

			const row = document.createElement("tr");
      
			row.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <img src="${item.img}" alt="${item.name}" style="width: 80px; height: 110px; object-fit: cover;" class="me-3 rounded">
            <div>
              <p class="fw-bold mb-1">${item.name}</p>
              <a href="#" class="remove-link" data-index="${index}">Xóa</a>
            </div>
          </div>
        </td>
        <td>
          <p class="price mb-0">${item.price.toLocaleString('vi-VN')}đ</p>
        </td>
        <td>
          <div class="d-flex align-items-center">
            <button class="btn-qty btn-minus" data-index="${index}">-</button>
            <input type="number" value="${item.qty}" class="qty-input mx-2" data-index="${index}" min="1">
            <button class="btn-qty btn-plus" data-index="${index}">+</button>
          </div>
        </td>
        <td>
          <p class="price mb-0">${itemTotal.toLocaleString('vi-VN')}đ</p>
        </td>
      `;
			cartTable.appendChild(row);
		});
    if (cart.length === 0) {
        cartTable.innerHTML = `
        <tr>
          <td colspan="4" class="text-center py-4">
            <p class="text-muted">Giỏ hàng của bạn đang trống.</p>
            <a href="kesach.html" class="btn btn-success">Tiếp tục mua sắm</a>
          </td>
        </tr>
      `;
        totalElement.innerText = "0đ";
        
        // === THÊM MỚI: VÔ HIỆU HÓA NÚT THANH TOÁN ===
        checkoutBtn.classList.add("disabled");
        checkoutBtn.setAttribute('aria-disabled', 'true');
        // ==========================================

        return;
    }
    checkoutBtn.classList.remove("disabled");
    checkoutBtn.removeAttribute('aria-disabled');

		// Cập nhật tổng tiền
		totalElement.innerText = totalPrice.toLocaleString('vi-VN') + "đ";
	}

	// --- 4. GẮN SỰ KIỆN (EVENT LISTENERS) ---
	cartTable.addEventListener('click', (e) => {
		const target = e.target;
		const index = parseInt(target.dataset.index);

		if (isNaN(index)) return;

		if (target.classList.contains('btn-plus')) {
			changeQuantity(index, cart[index].qty + 1);
		} else if (target.classList.contains('btn-minus')) {
			changeQuantity(index, cart[index].qty - 1);
		} else if (target.classList.contains('remove-link')) {
			e.preventDefault();
			if (confirm(`Bạn có chắc muốn xóa "${cart[index].name}"?`)) {
				removeItem(index);
			}
		}
	});

	cartTable.addEventListener('change', (e) => {
		if (e.target.classList.contains('qty-input')) {
			const index = parseInt(e.target.dataset.index);
			let newQty = parseInt(e.target.value);
			if (isNaN(newQty) || newQty < 1) {
				newQty = 1;
			}
			changeQuantity(index, newQty);
		}
	});


	// ===================================
	// PHẦN 2: PANEL CHỌN CỬA HÀNG
	// ===================================
	const deliverySelect = document.getElementById("delivery-option");
	const deliveryTimeBox = document.getElementById("delivery-time");
	const storeLink = document.getElementById("store-link");
	const storePanel = document.getElementById("store-panel");
	const storeList = document.getElementById("store-list");
	const closeBtn = document.getElementById("close-panel");

	const storeData = {
		hanoi: [
			"Cửa hàng Đống Đa 1 (Trụ sở chính) - Số 3 Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội",
			"Cửa hàng Đống Đa 2 - Skyline Building, 36 Hoàng Cầu, Chợ Dừa, Đống Đa, Hà Nội",
			"Cửa hàng Cầu Giấy 1 - Chung cư F5 Trung Kính, Yên Hoà, Cầu Giấy, Hà Nội",
			"Cửa hàng Cầu Giấy 2 - 80 Xuân Thủy, Cầu Giấy, Hà Nội",
			"Cửa hàng Thanh Xuân - 12 Nguyễn Trãi, Thanh Xuân, Hà Nội",
			"Cửa hàng Ba Đình - 25 Kim Mã, Ba Đình, Hà Nội",
			"Cửa hàng Tây Hồ - 579b Lạc Long Quân, Tây Hồ, Hà Nội",
			"Cửa hàng Nam Từ Liêm - Tòa nhà C'land, 81 Lê Đức Thọ, Nam Từ Liêm, Hà Nội",
			"Cửa hàng Hoàng Mai - 697 Giải Phóng, Giáp Bát, Hoàng Mai, Hà Nội",
			"Cửa hàng Hà Đông - 10 Trần Phú, Mộ Lao, Hà Đông, Hà Nội"
		],

		hcm: [
			"Cửa hàng Quận 1 - 45 Lê Lợi, Q.1, TP.HCM",
			"Cửa hàng Quận 3 - 123 Nguyễn Thông, Q.3, TP.HCM"
		],

		haiphong: [
			"Cửa hàng Hồng Bàng - 56 Điện Biên Phủ, Hồng Bàng, Hải Phòng",
			"Cửa hàng Lê Chân - 90 Trần Nguyên Hãn, Lê Chân, Hải Phòng"
		],

		danang: [
			"Cửa hàng Hải Châu - 78 Bạch Đằng, Hải Châu, Đà Nẵng",
			"Cửa hàng Sơn Trà - 22 Võ Văn Kiệt, Sơn Trà, Đà Nẵng"
		]
	};

	// Khi thay đổi phương thức giao hàng
	// Khi thay đổi phương thức giao hàng
	deliverySelect.addEventListener("change", updateDeliveryUI);

	// Hàm cập nhật giao diện giao hàng
	function updateDeliveryUI() {
		const deliveryInfo = document.getElementById("delivery-info");
		const deliveryTime = document.getElementById("delivery-time");

		if (deliverySelect.value === "pickup") {
			// Nhận tại cửa hàng → ẩn ngày giờ, ẩn form, hiện link
			deliveryInfo.style.display = "none";
			deliveryTime.style.display = "none";
			storeLink.style.display = "block";
		} else {
			// Giao tận nơi → hiện form, hiện ngày giờ, ẩn link
			deliveryInfo.style.display = "block";
			deliveryTime.style.display = "block";
			storeLink.style.display = "none";
		}
	}

	// GỌI LUÔN KHI TRANG MỚI TẢI
	updateDeliveryUI();



	storeLink.addEventListener("click", () => {
		storePanel.classList.add("active");
		renderProvinceList();
	});

	closeBtn.addEventListener("click", () => {
		storePanel.classList.remove("active");
	});

	function renderProvinceList() {
		storeList.innerHTML = `
      <div class="mb-3">
        <label for="province-select" class="form-label fw-bold">Chọn tỉnh/thành phố</label>
        <select id="province-select" class="form-select mb-3">
          <option value="">-- Chọn tỉnh/thành phố --</option>
          <option value="hanoi">Hà Nội</option>
          <option value="hcm">TP. Hồ Chí Minh</option>
          <option value="haiphong">Hải Phòng</option>
          <option value="danang">Đà Nẵng</option>
        </select>
        <div id="branch-list" class="mt-3"></div>
        <div class="text-center mt-3">
          <button id="map-link" class="btn btn-outline-success btn-sm">Xem chi tiết trên bản đồ</button>
        </div>
      </div>
    `;

		const provinceSelect = document.getElementById("province-select");
		const branchList = document.getElementById("branch-list");
		const mapBtn = document.getElementById("map-link");

		provinceSelect.addEventListener("change", () => {
			const val = provinceSelect.value;
			branchList.innerHTML = "";
			if (!val) return;
			const list = storeData[val];
			if (!list) {
				branchList.innerHTML = `<p>Không có dữ liệu cửa hàng.</p>`;
				return;
			}
			list.forEach(addr => {
				branchList.innerHTML += `
          <div class="border rounded p-2 mb-2">
            <i class="fa-solid fa-store text-success"></i> ${addr}
          </div>
        `;
			});
		});

		mapBtn.addEventListener("click", () => {
			window.location.href = "footer/hethongcuahang.html";
		});
	}

	// --- CHẠY LẦN ĐẦU KHI TẢI TRANG ---
	renderCart();
	// ==========================
	// KIỂM TRA THÔNG TIN GIAO HÀNG
	// ==========================
	// ==========================
	// KIỂM TRA THÔNG TIN GIAO HÀNG TRỰC TIẾP
	// ==========================

	// Regex kiểm tra định dạng
	const phoneRegex = /^0\d{9}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Hàm kiểm tra từng trường
	function validateField(input, type) {
		const errorEl = document.getElementById(`error-${type}`);
		let value = input.value.trim();
		let valid = true;

		// Reset trạng thái
		input.classList.remove("is-invalid", "is-valid");
		errorEl.style.display = "none";

		switch (type) {
			case "name":
				if (value === "") {
					errorEl.textContent = "Họ và tên không được để trống";
					errorEl.style.display = "block";
					input.classList.add("is-invalid");
					valid = false;
				} else {
					input.classList.add("is-valid");
				}
				break;

			case "phone":
				if (value === "") {
					errorEl.textContent = "SĐT không được để trống";
					errorEl.style.display = "block";
					input.classList.add("is-invalid");
					valid = false;
				} else if (!phoneRegex.test(value)) {
					errorEl.textContent = "SĐT chưa đúng định dạng";
					errorEl.style.display = "block";
					input.classList.add("is-invalid");
					valid = false;
				} else {
					input.classList.add("is-valid");
				}
				break;

			case "email":
				if (value === "") {
					errorEl.textContent = "Email không được để trống";
					errorEl.style.display = "block";
					input.classList.add("is-invalid");
					valid = false;
				} else if (!emailRegex.test(value)) {
					errorEl.textContent = "Email chưa đúng định dạng";
					errorEl.style.display = "block";
					input.classList.add("is-invalid");
					valid = false;
				} else {
					input.classList.add("is-valid");
				}
				break;

			case "address":
				if (value === "") {
					errorEl.textContent = "Địa chỉ không được để trống";
					errorEl.style.display = "block";
					input.classList.add("is-invalid");
					valid = false;
				} else {
					input.classList.add("is-valid");
				}
				break;
		}

		return valid;
	}

	// Gán sự kiện “input” cho các trường
	["fullname", "phone", "email", "address"].forEach((id) => {
		const el = document.getElementById(id);
		const type = id === "fullname" ? "name" : id;
		el.addEventListener("input", () => validateField(el, type));
	});

	// =============================
	// KIỂM TRA THÔNG TIN TRƯỚC KHI THANH TOÁN
	// =============================
	// =============================
// KIỂM TRA THÔNG TIN TRƯỚC KHI THANH TOÁN
// =============================
checkoutBtn.addEventListener("click", function(e) {
    // === THÊM MỚI: KIỂM TRA GIỎ HÀNG TRƯỚC TIÊN ===
    if (cart.length === 0) {
        e.preventDefault(); // Ngăn chặn chuyển trang
        alert("Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán!");
        return; // Dừng hàm tại đây
    }
    // ==========================================

    // Chỉ kiểm tra form khi chọn giao tận nơi
    const deliverySelect = document.getElementById("delivery-option");
    if (deliverySelect.value === "delivery") {
        const fullname = document.getElementById("fullname").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();

        // ... (phần code kiểm tra form giữ nguyên) ...

        let errorMsg = "";

        if (!fullname || !phone || !email || !address) {
            errorMsg = "Vui lòng nhập đầy đủ thông tin giao hàng!";
        } else if (!phoneRegex.test(phone)) {
            errorMsg = "Số điện thoại không hợp lệ! Phải có 10 số và bắt đầu bằng 0.";
        } else if (!emailRegex.test(email)) {
            errorMsg = "Email không hợp lệ!";
        }

        if (errorMsg) {
            e.preventDefault(); 
            alert(errorMsg);
            return;
        }
    }
    
    // Nếu không có lỗi, dòng này không cần thiết vì thẻ <a> đã có href
    // window.location.href = "thanhtoan.html";
});


});