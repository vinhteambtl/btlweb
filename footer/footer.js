// === FOOTER & SEARCH COMBINED JS ===
document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     🔹 PHẦN 1: XỬ LÝ FORM EMAIL
  ============================== */
  const form = document.querySelector('.newsletter-controls');
  if (form) {
    const input = form.querySelector('input');
    const button = form.querySelector('button');
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
  }

  /* =============================
     🔹 PHẦN 2: THANH TÌM KIẾM SÁCH
  ============================== */
  const searchForm = document.querySelector('form[role="search"], .search-form');
  if (searchForm) {
    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const searchInput = searchForm.querySelector('input[type="search"]');
      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        alert("Vui lòng nhập tên sách để tìm kiếm.");
        return;
      }

      const mainContent = document.querySelector('main');

      try {
        const response = await fetch('../books.json');
        if (!response.ok) {
          throw new Error('Không thể tải tệp books.json');
        }
        const data = await response.json();
        const allBooks = Object.values(data.books).flat();
        const results = allBooks.filter(book =>
          book.name.toLowerCase().includes(query)
        );

        displaySearchResults(results, query, mainContent);

      } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
        mainContent.innerHTML = `
          <div class="container mt-4">
            <h3 class="text-danger">Lỗi!</h3>
            <p>Không thể tải dữ liệu sách. Vui lòng kiểm tra lại đường dẫn tệp và thử lại.</p>
          </div>`;
      }
    });
  }

  // === Hàm hiển thị kết quả tìm kiếm ===
  function displaySearchResults(books, query, mainContent) {
    mainContent.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'container mt-4';

    const heading = document.createElement('h2');
    heading.className = 'mb-4';

    if (books.length > 0) {
      heading.innerHTML = `Kết quả tìm kiếm cho: <span class="text-success">"${query}"</span>`;
      const resultsList = document.createElement('div');
      resultsList.className = 'list-group';

      books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'list-group-item d-flex align-items-center mb-3 shadow-sm';

        const bookImage = document.createElement('img');
        bookImage.src = `../${book.image}`;
        bookImage.alt = book.name;
        bookImage.style.width = '90px';
        bookImage.style.height = '130px';
        bookImage.style.objectFit = 'cover';
        bookImage.className = 'mr-4';

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
      heading.textContent = `Không tìm thấy kết quả nào phù hợp với từ khóa "${query}".`;
      container.appendChild(heading);
    }

    mainContent.appendChild(container);
  }

});
