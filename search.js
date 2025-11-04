
async function search(event) {
    event.preventDefault();

    const searchInput = document.querySelector('input[type="search"]');
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        alert("Vui lòng nhập tên sách để tìm kiếm.");
        return false;
    }

    const mainContent = document.querySelector('main');
    if (!mainContent) return false;

    const currentPage = window.location.pathname.split('/').pop();
    const isRootLevelPage = ['index.html', 'kesach.html', ''].includes(currentPage);

    const imagePrefix = isRootLevelPage ? '' : '../';
    const jsonPath = isRootLevelPage ? 'books.json' : '../books.json';

    // Xóa nội dung cũ
    mainContent.innerHTML = '';

    // Tạo container
    const container = document.createElement('div');
    container.className = 'container mt-4';

    const heading = document.createElement('h2');
    heading.className = 'mb-4';

    try {
        // Đọc dữ liệu từ books.json
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Không tải được books.json');

        const data = await response.json();
        const allBooks = Object.values(data.books).flat();

        const results = allBooks.filter(book =>
            book.name.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            heading.innerHTML = `Kết quả tìm kiếm cho: <span class="text-success">"${query}"</span>`;

            const resultsList = document.createElement('div');
            resultsList.className = 'list-group';

            results.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.className = 'list-group-item d-flex align-items-start p-3 shadow-sm mb-3';

                // Ảnh sách
                const bookImage = document.createElement('img');
                bookImage.src = imagePrefix + book.image;
                bookImage.alt = book.name;
                bookImage.style.width = '90px';
                bookImage.style.height = '130px';
                bookImage.style.objectFit = 'cover';
                bookImage.style.borderRadius = '6px';
                bookImage.className = 'mr-3 flex-shrink-0';

                // Thông tin sách
                const bookInfo = document.createElement('div');
                bookInfo.className = 'd-flex flex-column';

                const bookName = document.createElement('h5');
                bookName.textContent = book.name;
                bookName.className = 'mb-1 font-weight-bold';

                const bookAuthor = document.createElement('p');
                bookAuthor.innerHTML = `<small class="text-muted">Tác giả: ${book.author}</small>`;
                bookAuthor.className = 'mb-1';

                const bookPrice = document.createElement('p');
                bookPrice.textContent = book.price;
                bookPrice.className = 'text-danger font-weight-bold mb-0';

                bookInfo.appendChild(bookName);
                bookInfo.appendChild(bookAuthor);
                bookInfo.appendChild(bookPrice);

                bookItem.appendChild(bookImage);
                bookItem.appendChild(bookInfo);
                resultsList.appendChild(bookItem);
            });

            container.appendChild(heading);
            container.appendChild(resultsList);

        } else {
            heading.textContent = `Không tìm thấy kết quả nào phù hợp với từ khóa "${query}"`;
            container.appendChild(heading);
        }

    } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
        container.innerHTML = `
            <div class="text-center text-danger">
                <h3>Lỗi!</h3>
                <p>Không thể tải dữ liệu. Vui lòng kiểm tra <code>books.json</code>.</p>
            </div>
        `;
    }

    mainContent.appendChild(container);
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const hasSearchInput = form.querySelector('input[type="search"]');
        if (hasSearchInput) {
            form.onsubmit = search;
        }
    });

    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === 'search') {
            btn.onclick = (e) => {
                e.preventDefault();
                search(e);
                return false;
            };
        }
    });
});



