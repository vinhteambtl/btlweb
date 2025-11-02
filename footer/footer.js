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
   🔹 PHẦN 2: XỬ LÝ TÌM KIẾM SÁCH
============================== */
document.addEventListener("DOMContentLoaded", () => {
  const searchForms = document.querySelectorAll('form[role="search"], .search-form');

  searchForms.forEach(form => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // 🔸 Ngăn reload

      const searchInput = form.querySelector('input[type="search"]');
      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        alert("Vui lòng nhập tên sách để tìm kiếm.");
        return;
      }

      const mainContent = document.querySelector("main");
      if (!mainContent) {
        console.error("Không tìm thấy phần <main> để hiển thị kết quả!");
        return;
      }

      try {
        // 🔸 Đường dẫn tương đối – chỉnh theo vị trí file JS
        const response = await fetch("../books.json");
        if (!response.ok) throw new Error("Không thể tải tệp books.json");

        const data = await response.json();
        const allBooks = Object.values(data.books).flat();

        const results = allBooks.filter(book =>
          book.name.toLowerCase().includes(query)
        );

        displaySearchResults(results, query, mainContent);
        searchInput.value = "";

      } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
        mainContent.innerHTML = `
          <div class="container mt-4">
            <h3 class="text-danger">Lỗi tải dữ liệu!</h3>
            <p>Không thể đọc tệp <b>books.json</b>. Vui lòng kiểm tra đường dẫn.</p>
          </div>`;
      }
    });
  });

  // === HÀM HIỂN THỊ KẾT QUẢ ===
  function displaySearchResults(books, query, mainContent) {
    mainContent.innerHTML = "";

    const container = document.createElement("div");
    container.className = "container py-5";

    const heading = document.createElement("h2");
    heading.className = "mb-4";
    heading.innerHTML = `Kết quả tìm kiếm cho: <span class="text-success">"${query}"</span>`;
    container.appendChild(heading);

    if (books.length > 0) {
      const resultsRow = document.createElement("div");
      resultsRow.className = "row g-4";

      books.forEach(book => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";

        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="../${book.image}" class="card-img-top" alt="${book.name}" style="height:300px; object-fit:cover;">
            <div class="card-body">
              <h5 class="card-title">${book.name}</h5>
              <p class="card-text"><small class="text-muted">Tác giả: ${book.author}</small></p>
              <p class="text-danger fw-bold">${book.price}</p>
            </div>
          </div>
        `;
        resultsRow.appendChild(col);
      });

      container.appendChild(resultsRow);
    } else {
      const noResult = document.createElement("p");
      noResult.className = "text-muted";
      noResult.innerHTML = `Không tìm thấy kết quả nào phù hợp với từ khóa <b>${query}</b>.`;
      container.appendChild(noResult);
    }

    mainContent.appendChild(container);
  }
});
