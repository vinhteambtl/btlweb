// ==========================
// SEARCH.JS - dùng chung cho nhiều trang
// ==========================

// Hàm tìm kiếm (gọi khi form submit)
function search(event) {
  event.preventDefault();

  const input = document.querySelector('.form-inline input[type="search"]');
  if (!input) {
    console.error("Không tìm thấy ô tìm kiếm trong trang này.");
    return;
  }

  const query = input.value.trim().toLowerCase();
  if (!query) return;

  // Xác định đường dẫn đến file JSON (dùng ../ nếu đang trong thư mục con)
  let jsonPath = "books.json";
  if (!window.location.pathname.endsWith("index.html")) {
    jsonPath = "../books.json";
  }

  fetch(jsonPath)
    .then((res) => {
      if (!res.ok) throw new Error("Không thể tải file books.json");
      return res.json();
    })
    .then((data) => {
      const results = data.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );

      // Nếu đang ở index.html thì hiển thị trực tiếp
      const container = document.querySelector("#product-list");

      if (container) {
        if (results.length > 0) {
          container.innerHTML = results
            .map(
              (b) => `
              <div class="card m-2 p-2" style="width:180px;">
                <img src="${b.image}" class="card-img-top" alt="${b.title}">
                <div class="card-body">
                  <h6 class="card-title">${b.title}</h6>
                  <p class="card-text text-muted">${b.author}</p>
                </div>
              </div>
            `
            )
            .join("");
        } else {
          container.innerHTML = `<p class="text-center mt-4 text-muted">Không tìm thấy kết quả phù hợp cho "${query}".</p>`;
        }
      } else {
        // Nếu không có vùng hiển thị (ví dụ: trong gioithieu.html)
        if (results.length > 0) {
          alert(`Tìm thấy ${results.length} kết quả cho "${query}"`);
          // Chuyển sang index.html để hiển thị kết quả
          window.location.href = `../index.html?search=${encodeURIComponent(
            query
          )}`;
        } else {
          alert("Không tìm thấy kết quả phù hợp.");
        }
      }
    })
    .catch((err) => console.error("Lỗi khi tìm kiếm:", err));
}

// ==========================
// TỰ ĐỘNG HIỂN THỊ KẾT QUẢ KHI QUAY LẠI INDEX
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");
  if (searchQuery) {
    const input = document.querySelector('.form-inline input[type="search"]');
    if (input) {
      input.value = searchQuery;
      search(new Event("submit"));
    }
  }
});
