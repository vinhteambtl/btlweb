// Password toggle functionality
$(document).ready(function() {
    // Password toggle
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
        
        // Focus lại input để người dùng tiếp tục nhập
        passwordInput.focus();
    });

    // Xử lý form ĐĂNG NHẬP
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        // Reset validation
        $('.form-control').removeClass('is-invalid');
        $('.invalid-feedback').hide();
        
        let isValid = true;
        
        // Validate email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#email').addClass('is-invalid').next('.invalid-feedback').show();
            isValid = false;
        }
        
        // Validate password
        const password = $('#password').val();
        if (password.length < 6) {
            $('#password').addClass('is-invalid');
            $('#password').closest('.password-container').find('.invalid-feedback').show();
            isValid = false;
        }
        
        // ✅ Nếu hợp lệ - ĐĂNG NHẬP THÀNH CÔNG
        if (isValid) {
            // Hiển thị thông báo thành công
            const alertHtml = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Đăng nhập thành công!</strong> Hệ thống sẽ chuyển bạn đến trang chủ trong giây lát...
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            $('#loginForm').prepend(alertHtml);
            
            // Sau 2 giây, tự động chuyển về trang chủ
            setTimeout(function() {
                window.location.href = "index.html";
            }, 2000);
        }
    });

    // Form validation cho ĐĂNG KÝ (nếu có form đăng ký trên trang này)
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        
        // Reset validation
        $('.form-control').removeClass('is-invalid');
        $('.invalid-feedback').hide();
        
        let isValid = true;
        
        // Validate last name
        const lastName = $('#lastName').val().trim();
        if (lastName === '') {
            $('#lastName').addClass('is-invalid').next('.invalid-feedback').show();
            isValid = false;
        }
        
        // Validate first name
        const firstName = $('#firstName').val().trim();
        if (firstName === '') {
            $('#firstName').addClass('is-invalid').next('.invalid-feedback').show();
            isValid = false;
        }
        
        // Validate phone
        const phone = $('#phone').val().trim();
        const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
            $('#phone').addClass('is-invalid').next('.invalid-feedback').show();
            isValid = false;
        }
        
        // Validate email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#email').addClass('is-invalid').next('.invalid-feedback').show();
            isValid = false;
        }
        
        // Validate password
        const password = $('#password').val();
        if (password.length < 6) {
            $('#password').addClass('is-invalid');
            $('#password').closest('.password-container').find('.invalid-feedback').show();
            isValid = false;
        }
        
        // ✅ Nếu hợp lệ
        if (isValid) {
            // Hiển thị thông báo thành công
            const alertHtml = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Đăng ký thành công!</strong> Tài khoản của bạn đã được tạo. 
                    Hệ thống sẽ chuyển bạn đến trang đăng nhập trong giây lát...
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            $('#registerForm').prepend(alertHtml);
            
            // Reset form sau 1 giây
            setTimeout(function() {
                $('#registerForm')[0].reset();
                $('#togglePassword').find('i').removeClass('bi-eye-slash').addClass('bi-eye');
            }, 1000);
            
            // Sau 3 giây, tự động chuyển sang trang đăng nhập
            setTimeout(function() {
                window.location.href = "../index.html";
            }, 3000);
        }
    });

    // Real-time validation
    $('.form-control').on('input', function() {
        if ($(this).hasClass('is-invalid')) {
            $(this).removeClass('is-invalid');
            $(this).next('.invalid-feedback').hide();
            $(this).closest('.password-container').find('.invalid-feedback').hide();
        }
    });

    // Social button handlers
    $('.facebook-btn').click(function(e) {
        e.preventDefault();
        alert('Tính năng đăng nhập bằng Facebook đang được phát triển');
    });

    $('.google-btn').click(function(e) {
        e.preventDefault();
        alert('Tính năng đăng nhập bằng Google đang được phát triển');
    });

    // Thêm hiệu ứng khi hover vào nút mắt
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



