// === Xử lý trang Đăng nhập ===
$(document).ready(function() {

    // === 1️⃣ Ẩn / hiện mật khẩu ===
    $('#togglePassword').click(function() {
        const passwordInput = $('#password');
        const icon = $(this).find('i');
        const button = $(this);
        
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            icon.removeClass('bi-eye').addClass('bi-eye-slash');
            button.addClass('active');
        } else {
            passwordInput.attr('type', 'password');
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
            button.removeClass('active');
        }

        // Focus lại input để tiếp tục nhập
        passwordInput.focus();
    });

    // === 2️⃣ Xử lý khi nhấn nút Đăng nhập ===
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        // Reset lỗi
        $('.form-control').removeClass('is-invalid');
        $('.invalid-feedback').hide();

        let isValid = true;

        // Lấy dữ liệu
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#email').addClass('is-invalid').next('.invalid-feedback').show();
            isValid = false;
        }

        // Validate password
        if (password.length < 6) {
            $('#password').addClass('is-invalid');
            $('#password').closest('.password-container').find('.invalid-feedback').show();
            isValid = false;
        }

        // === Nếu hợp lệ ===
        if (isValid) {
            const alertHtml = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Đăng nhập thành công!</strong> Chào mừng bạn quay lại Tu Tiên Book.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            $('#loginForm').prepend(alertHtml);

            // Reset form
            setTimeout(() => {
                $('#loginForm')[0].reset();
                $('#togglePassword').find('i').removeClass('bi-eye-slash').addClass('bi-eye');
            }, 1000);

            // Tự động chuyển hướng về trang chủ
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2500);
        }
    });

    // === 3️⃣ Xử lý lỗi real-time ===
    $('.form-control').on('input', function() {
        if ($(this).hasClass('is-invalid')) {
            $(this).removeClass('is-invalid');
            $(this).next('.invalid-feedback').hide();
        }
    });

    // === 4️⃣ Nút đăng nhập MXH ===
    $('.facebook-btn').click(function(e) {
        e.preventDefault();
        alert('Tính năng đăng nhập bằng Facebook đang được phát triển.');
    });

    $('.google-btn').click(function(e) {
        e.preventDefault();
        alert('Tính năng đăng nhập bằng Google đang được phát triển.');
    });

    // === 5️⃣ Hiệu ứng hover mắt ===
    $('#togglePassword').hover(
        function() {
            $(this).css({
                'background-color': '#e9f7eb',
                'border-color': '#2f7b1f'
            });
        },
        function() {
            if (!$(this).hasClass('active')) {
                $(this).css({
                    'background-color': 'white',
                    'border-color': '#ced4da'
                });
            }
        }
    );
});


