search có nội dug như sau :"async function search() {
    event.preventDefault();
    // 1. Lấy nội dung người dùng nhập vào ô tìm kiếm
    const searchInput = document.querySelector('input[type="search"]');
    const query = searchInput.value.trim().toLowerCase();

    // Nếu không nhập gì thì không làm gì cả
    if (!query) {
        alert("Vui lòng nhập tên sách để tìm kiếm.");
        return false; // Ngăn chặn form gửi đi
    }

    const mainContent = document.querySelector('main');
    
    try {
        // 2. Tải dữ liệu từ tệp books.json
        const response = await fetch('books.json');
        if (!response.ok) {
            throw new Error('Không thể tải tệp books.json');
        }
        const data = await response.json();

        // 3. Gộp sách từ tất cả các thể loại vào một mảng duy nhất để dễ tìm kiếm
        const allBooks = [
            ...data.books["Giả tưởng & Khoa học Viễn tưởng"],
            ...data.books["Trinh thám, Kinh dị & Giật gân"],
            ...data.books["Công nghệ – Khoa học – Kỹ thuật"],
            ...data.books["Sách Đại cương"],
            ...data.books["Sách Thiếu nhi"],
            ...data.books["Tôn giáo & Triết học"],
            ...data.books["Lịch sử, Văn hóa & Tiểu sử"],
            ...data.books["Văn học Hiện đại & Kinh điển"],
            ...data.books["Văn học Lãng mạn"],
            ...data.books["Kinh tế & Quản trị Kinh doanh"],
            ...data.books["Sách Ngoại Ngữ"],
            ...data.books["Sách Nấu Ăn & Phong Cách Sống"]
        ];

        // 4. Lọc ra những cuốn sách có tên chứa từ khóa tìm kiếm
        const results = allBooks.filter(book => 
            book.name.toLowerCase().includes(query)
        );

        // 5. Hiển thị kết quả tìm được ra màn hình
        displaySearchResults(results, query);

    } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
        mainContent.innerHTML = `<div class="container mt-4"><h3 class="text-danger">Lỗi!</h3><p>Không thể tải dữ liệu sách. Vui lòng kiểm tra lại đường dẫn tệp và thử lại.</p></div>`;
    }
    return false;
}


function displaySearchResults(books, query) {
    const mainContent = document.querySelector('main');
    
    // Xóa hết nội dung hiện tại trong thẻ <main>
    mainContent.innerHTML = '';

    // Tạo một container mới để chứa kết quả
    const container = document.createElement('div');
    container.className = 'container mt-4';

    const heading = document.createElement('h2');
    heading.className = 'mb-4';

    if (books.length > 0) {
        // Nếu có kết quả, hiển thị tiêu đề và danh sách sách
        heading.innerHTML = `Kết quả tìm kiếm cho: <span class="text-success">"${query}"</span>`;
        
        const resultsList = document.createElement('div');
        resultsList.className = 'list-group';

        books.forEach(book => {
            // Tạo HTML cho mỗi cuốn sách
            const bookItem = document.createElement('div');
            bookItem.className = 'list-group-item d-flex align-items-center mb-3 shadow-sm';
            
            // Hình ảnh bìa sách
            const bookImage = document.createElement('img');
            bookImage.src = book.image;
            bookImage.alt = book.name;
            bookImage.style.width = '90px';
            bookImage.style.height = '130px';
            bookImage.style.objectFit = 'cover';
            bookImage.className = 'mr-4';

            // Thông tin sách (tên, tác giả, giá)
            const bookInfo = document.createElement('div');
            
            const bookName = document.createElement('h5');
            bookName.textContent = book.name;
            bookName.className = 'mb-1';

            const bookAuthor = document.createElement('p');
            bookAuthor.innerHTML = `<small class="text-muted">Tác giả: ${book.author}</small>`;
            bookAuthor.className = 'mb-2';
            
            const bookPrice = document.createElement('p');
            bookPrice.textContent = book.price;
            bookPrice.className = 'font-weight-bold text-danger mb-0';

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
        // Nếu không có kết quả, hiển thị thông báo
        heading.textContent = `Không tìm thấy kết quả nào phù hợp với từ khóa "${query}"`;
        container.appendChild(heading);
    }
    
    mainContent.appendChild(container);

} "
