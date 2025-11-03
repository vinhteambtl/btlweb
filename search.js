// async function search() {
//     event.preventDefault();
//     // 1. Lấy nội dung người dùng nhập vào ô tìm kiếm
//     const searchInput = document.querySelector('input[type="search"]');
//     const query = searchInput.value.trim().toLowerCase();

//     // Nếu không nhập gì thì không làm gì cả
//     if (!query) {
//         alert("Vui lòng nhập tên sách để tìm kiếm.");
//         return false; // Ngăn chặn form gửi đi
//     }

//     const mainContent = document.querySelector('main');
    
//     try {
//         // 2. Tải dữ liệu từ tệp books.json
//         const response = await fetch('books.json');
//         if (!response.ok) {
//             throw new Error('Không thể tải tệp books.json');
//         }
//         const data = await response.json();

//         // 3. Gộp sách từ tất cả các thể loại vào một mảng duy nhất để dễ tìm kiếm
//         const allBooks = [
//             ...data.books["Giả tưởng & Khoa học Viễn tưởng"],
//             ...data.books["Trinh thám, Kinh dị & Giật gân"],
//             ...data.books["Công nghệ – Khoa học – Kỹ thuật"],
//             ...data.books["Sách Đại cương"],
//             ...data.books["Sách Thiếu nhi"],
//             ...data.books["Tôn giáo & Triết học"],
//             ...data.books["Lịch sử, Văn hóa & Tiểu sử"],
//             ...data.books["Văn học Hiện đại & Kinh điển"],
//             ...data.books["Văn học Lãng mạn"],
//             ...data.books["Kinh tế & Quản trị Kinh doanh"],
//             ...data.books["Sách Ngoại Ngữ"],
//             ...data.books["Sách Nấu Ăn & Phong Cách Sống"]
//         ];

//         // 4. Lọc ra những cuốn sách có tên chứa từ khóa tìm kiếm
//         const results = allBooks.filter(book => 
//             book.name.toLowerCase().includes(query)
//         );

//         // 5. Hiển thị kết quả tìm được ra màn hình
//         displaySearchResults(results, query);

//     } catch (error) {
//         console.error("Đã xảy ra lỗi:", error);
//         mainContent.innerHTML = `<div class="container mt-4"><h3 class="text-danger">Lỗi!</h3><p>Không thể tải dữ liệu sách. Vui lòng kiểm tra lại đường dẫn tệp và thử lại.</p></div>`;
//     }
//     return false;
// }


// function displaySearchResults(books, query) {
//     const mainContent = document.querySelector('main');
    
//     // Xóa hết nội dung hiện tại trong thẻ <main>
//     mainContent.innerHTML = '';

//     // Tạo một container mới để chứa kết quả
//     const container = document.createElement('div');
//     container.className = 'container mt-4';

//     const heading = document.createElement('h2');
//     heading.className = 'mb-4';

//     if (books.length > 0) {
//         // Nếu có kết quả, hiển thị tiêu đề và danh sách sách
//         heading.innerHTML = `Kết quả tìm kiếm cho: <span class="text-success">"${query}"</span>`;
        
//         const resultsList = document.createElement('div');
//         resultsList.className = 'list-group';

//         books.forEach(book => {
//             // Tạo HTML cho mỗi cuốn sách
//             const bookItem = document.createElement('div');
//             bookItem.className = 'list-group-item d-flex align-items-center mb-3 shadow-sm';
            
//             // Hình ảnh bìa sách
//             const bookImage = document.createElement('img');
//             bookImage.src = book.image;
//             bookImage.alt = book.name;
//             bookImage.style.width = '90px';
//             bookImage.style.height = '130px';
//             bookImage.style.objectFit = 'cover';
//             bookImage.className = 'mr-4';

//             // Thông tin sách (tên, tác giả, giá)
//             const bookInfo = document.createElement('div');
            
//             const bookName = document.createElement('h5');
//             bookName.textContent = book.name;
//             bookName.className = 'mb-1';

//             const bookAuthor = document.createElement('p');
//             bookAuthor.innerHTML = `<small class="text-muted">Tác giả: ${book.author}</small>`;
//             bookAuthor.className = 'mb-2';
            
//             const bookPrice = document.createElement('p');
//             bookPrice.textContent = book.price;
//             bookPrice.className = 'font-weight-bold text-danger mb-0';

//             bookInfo.appendChild(bookName);
//             bookInfo.appendChild(bookAuthor);
//             bookInfo.appendChild(bookPrice);

//             bookItem.appendChild(bookImage);
//             bookItem.appendChild(bookInfo);
//             resultsList.appendChild(bookItem);
//         });

//         container.appendChild(heading);
//         container.appendChild(resultsList);

//     } else {
//         // Nếu không có kết quả, hiển thị thông báo
//         heading.textContent = `Không tìm thấy kết quả nào phù hợp với từ khóa "${query}"`;
//         container.appendChild(heading);
//     }
    
//     mainContent.appendChild(container);

// }
// search.js - Hoạt động trên index.html và footer/Gioithieu.html
async function search(event) {
    event.preventDefault();

    const searchInput = document.querySelector('input[type="search"]');
    const query = searchInput.value.trim();
    if (!query) {
        alert("Vui lòng nhập từ khóa tìm kiếm.");
        return false;
    }

    // Tự động tìm vùng chứa phù hợp
    let resultsContainer = document.getElementById('search-results-container');

    // Nếu chưa có vùng chứa → tạo tạm thời
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.id = 'search-results-container';
        resultsContainer.className = 'container mt-5';

        // Xác định nơi chèn: sau header, trước nội dung chính
        const header = document.querySelector('header');
        const main = document.querySelector('main');
        if (main && header) {
            main.insertBefore(resultsContainer, main.firstChild);
        } else {
            document.body.appendChild(resultsContainer);
        }
    }

    // Hiển thị loading
    resultsContainer.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Đang tìm...</span>
            </div>
            <p class="mt-3">Đang tìm kiếm "${query}"...</p>
        </div>
    `;
    resultsContainer.style.display = 'block';

    try {
        // Tự động xác định đường dẫn books.json theo trang hiện tại
        const isInFooter = window.location.pathname.includes('/footer/');
        const jsonPath = isInFooter ? '../books.json' : 'books.json';

        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Không tải được dữ liệu sách');

        const data = await response.json();
        const allBooks = Object.values(data.books).flat();

        const results = allBooks.filter(book =>
            book.name.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );

        displaySearchResults(results, query, resultsContainer);

    } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
        resultsContainer.innerHTML = `
            <div class="text-center text-danger py-5">
                <h5>Không thể tải dữ liệu</h5>
                <p>Vui lòng kiểm tra kết nối hoặc thử lại sau.</p>
            </div>
        `;
    }

    return false;
}

// Hiển thị kết quả (giống nhau cho mọi trang)
function displaySearchResults(books, query, container) {
    container.innerHTML = '';

    if (books.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h4>Không tìm thấy sách nào cho "<span class="text-primary">${query}</span>"</h4>
                <p class="text-muted">Hãy thử từ khóa khác nhé!</p>
            </div>
        `;
        return;
    }

    const heading = document.createElement('h3');
    heading.className = 'mb-4 text-center';
    heading.innerHTML = `Tìm thấy <strong class="text-success">${books.length}</strong> kết quả cho: <span class="text-primary">"${query}"</span>`;

    const grid = document.createElement('div');
    grid.className = 'row g-4';

    books.forEach(book => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-3';

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0 hover-shadow">
                <img src="${book.image}" class="card-img-top" alt="${book.name}" 
                     style="height: 180px; object-fit: cover; border-bottom: 1px solid #eee;">
                <div class="card-body d-flex flex-column p-3">
                    <h6 class="card-title text-truncate mb-2" title="${book.name}">${book.name}</h6>
                    <p class="card-text text-muted small mb-1">Tác giả: ${book.author}</p>
                    <p class="card-text text-danger font-weight-bold mb-2">${book.price}</p>
                    <a href="#" class="btn btn-outline-primary btn-sm mt-auto">Xem chi tiết</a>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });

    container.appendChild(heading);
    container.appendChild(grid);

    // Thêm hiệu ứng nhẹ khi hover
    container.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.transition = 'all 0.2s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Tự động thêm CSS nếu chưa có
function injectSearchStyles() {
    if (document.getElementById('search-results-style')) return;

    const style = document.createElement('style');
    style.id = 'search-results-style';
    style.textContent = `
        #search-results-container .hover-shadow {
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        #search-results-container .hover-shadow:hover {
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            transform: translateY(-5px);
        }
        #search-results-container .card-img-top {
            transition: transform 0.3s ease;
        }
        #search-results-container .card:hover .card-img-top {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
}

// Chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    injectSearchStyles();

    // Gắn lại sự kiện nếu form bị reload (tránh lỗi double submit)
    const forms = document.querySelectorAll('form[onsubmit*="search"]');
    forms.forEach(form => {
        form.onsubmit = (e) => search(e);
    });

    // Gắn sự kiện cho nút Search (nếu có onclick)
    const searchBtns = document.querySelectorAll('button[type="submit"], .btn-outline-success');
    searchBtns.forEach(btn => {
        if (btn.textContent.includes('Search') || btn.onclick?.toString().includes('search')) {
            btn.onclick = (e) => {
                e.preventDefault();
                search(e);
                return false;
            };
        }
    });
});

