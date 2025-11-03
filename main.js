function populateTopSellers(books) {
  const container = document.querySelector("#bookCarousel .carousel-inner");
  if (!container) {
    console.error("Không tìm thấy container cho Top Sellers carousel.");
    return;
  }
  const perSlide = 8;
  const totalSlides = Math.ceil(books.length / perSlide);
  for (let i = 0; i < totalSlides; i++) {
    const booksInSlide = books.slice(i * perSlide, (i + 1) * perSlide);
    const row1 = booksInSlide.slice(0, 4);
    const row2 = booksInSlide.slice(4, 8);

    const createRow = (row) => `
      <div class="row">
        ${row
          .map(
            (book) => `
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="card text-dark card shadow">
              <div class="card-body text-center">
                <img src="${book.image}" class="img-fluid w-100" alt="${book.name}">
                <p class="text-truncate w-100"><b>${book.name}</b></p>
                <p style="color: red;">${book.price}</p>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    const slideHTML = `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        ${createRow(row1)}
        ${row2.length ? createRow(row2) : ""}
      </div>
    `;
    container.insertAdjacentHTML("beforeend", slideHTML);
  }
}


function populateRecommendedBooks(books) {
  const container = document.querySelector("#carouselExampleControlsNew .carousel-inner");
  if (!container) {
    console.error("Không tìm thấy container cho carousel Sách đề cử.");
    return;
  }

  const shuffledBooks = [...books];
  for (let i = shuffledBooks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
  }

  const perSlide = 6;
  const totalSlides = Math.ceil(shuffledBooks.length / perSlide);

  for (let i = 0; i < totalSlides; i++) {
    const booksInSlide = shuffledBooks.slice(i * perSlide, (i + 1) * perSlide);
    const slideHTML = `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="row px-3">
          ${booksInSlide
            .map(
              (book) => `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
              <div class="card text-dark card shadow" style="border-radius: 0.6rem; overflow: hidden;">
                <div class="card-body text-center p-1">
                  <img src="${book.image}" class="img-fluid mb-2" style="border-radius: 0.4rem; width: 95%;" alt="${book.name}">
                  <p class="text-truncate mb-1" style="font-size: 0.9rem;"><b>${book.name}</b></p>
                  <p class="mb-0" style="font-size: 0.85rem; color: red;">${book.price}</p>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", slideHTML);
  }
}


function populateNewBooks(books) {
  const container = document.querySelector("#carouselExampleControls .carousel-inner");
  if (!container) {
    console.error("Không tìm thấy container cho carousel Sách mới.");
    return;
  }

  const perSlide = 6;
  const totalSlides = Math.ceil(books.length / perSlide);

  for (let i = 0; i < totalSlides; i++) {
    const booksInSlide = books.slice(i * perSlide, (i + 1) * perSlide);
    const slideHTML = `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="row px-3">
          ${booksInSlide
            .map(
              (book) => `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
              <div class="card text-dark card shadow" style="border-radius: 0.6rem; overflow: hidden;">
                <div class="card-body text-center p-1">
                  <img src="${book.image}" class="img-fluid mb-2" style="border-radius: 0.4rem; width: 95%;" alt="${book.name}">
                  <p class="text-truncate mb-1" style="font-size: 0.9rem;"><b>${book.name}</b></p>
                  <p class="mb-0" style="font-size: 0.85rem; color: red;">${book.price}</p>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", slideHTML);
  }
}

function populateAuthorsCarousel(books) {
  const container = document.querySelector("#carouselAuthors .carousel-inner");
  if (!container) {
    console.error("Không tìm thấy container cho Authors carousel.");
    return;
  }

  const perSlide = 6;
  const authors = {};

  books.forEach((book) => {
    if (book.author && !authors[book.author]) {
      authors[book.author] = book.link_image_author;
    }
  });

  const uniqueAuthors = Object.keys(authors).map((authorName) => ({
    author: authorName,
    link_image_author: authors[authorName],
  }));

  const totalSlides = Math.ceil(uniqueAuthors.length / perSlide);

  for (let i = 0; i < totalSlides; i++) {
    const authorsInSlide = uniqueAuthors.slice(i * perSlide, (i + 1) * perSlide);
    const slideHTML = `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="row px-3 justify-content-center">
          ${authorsInSlide
            .map(
              (author) => `
            <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
              <div class="card bg-dark text-white border-secondary shadow-sm" style="border-radius: 0.6rem; overflow: hidden;">
                <div class="card-body text-center p-1">
                  <img src="${author.link_image_author || "path/to/default-author-image.png"}"
                       class="img-fluid mb-2 rounded-circle"
                       style="width: 100px; height: 100px; object-fit: cover; margin-top: 30px;"
                       alt="${author.author}"
                       onerror="this.onerror=null; this.src='path/to/default-author-image.png';">
                  <p class="text-truncate mb-4 mt-3" style="font-size: 0.9rem;">${author.author}</p>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", slideHTML);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("books.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const allBooks = Object.values(data.books).flat();

      populateTopSellers(allBooks);
      populateRecommendedBooks(allBooks); 
      populateNewBooks(allBooks);        
      populateAuthorsCarousel(allBooks);  
    })
    .catch((err) => console.error("⚠️ Lỗi khi đọc và xử lý file JSON:", err));
});



document.addEventListener("DOMContentLoaded", async () => {
  const top10Container = document.querySelector("#top10-books");
  if (!top10Container) return;

  try {
    const response = await fetch("books.json");
    if (!response.ok) throw new Error("Không thể tải file books.json");

    const data = await response.json();
    const top10 = data.top10;
    if (!Array.isArray(top10)) throw new Error("Cấu trúc top10 không hợp lệ.");

    // Hàm rút gọn chuỗi
    const shorten = (text, limit = 40) =>
      text.length > limit ? text.slice(0, limit - 3) + "..." : text;

    const html = `
      <div class="d-flex flex-column gap-1">
        ${top10
          .map(
            (book, index) => `
          <div class="d-flex align-items-center mb-2 p-1 bg-light rounded shadow-sm" style="min-height:55px;">
            <img src="${book.image}" alt="${book.name}" 
                 class="mr-4"
                 style="width:40px;height:55px;object-fit:cover;border-radius:4px;">

            <div style="flex:1; line-height:1.2; max-width:200px;">
              <p class="mb-1 fw-bold text-dark small font-weight-bold" title="${book.name}">
                ${index + 1}. ${shorten(book.name, 40)}
              </p>
              <p class="mb-0 text-danger fw-semibold" style="font-size:0.85rem;">
                ${book.price}
              </p>
            </div>

            <img src="${book.link_image_author}" alt="Ảnh tác giả"
                 title="${book.author}"
                 style="width:30px;height:30px;border-radius:50%;object-fit:cover;margin-left:6px;">
          </div>
        `
          )
          .join("")}
      </div>
    `;

    top10Container.innerHTML = html;
  } catch (err) {
    console.error(err);
    top10Container.innerHTML =
      "<p class='text-danger'>❌ Không thể tải danh sách Top 10.</p>";
  }
});
