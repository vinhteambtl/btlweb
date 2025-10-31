document.addEventListener("DOMContentLoaded", () => {
  // --- CÁC THÀNH PHẦN GIAO DIỆN ---
  const productListElement = document.getElementById('product-list');
  const searchInput = document.querySelector('.form-inline input[type="search"]');
  const searchButton = document.querySelector('.form-inline button[type="submit"]');
  const filterLists = document.querySelectorAll('.filter-list');
  const sortOptions = document.querySelectorAll('.sort-option');
  const sortDropdown = document.getElementById('sortDropdown');
  const paginationNav = document.getElementById('pagination-nav');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');

  // --- BIẾN TOÀN CỤC ---
  let allProducts = [];
  let currentFilters = {
    search: '',
    author: [],
    price: null,
    category: []
  };
  let currentSort = 'default';
  let currentPage = 1;
  const productsPerPage = 10;

  // --- TẢI DỮ LIỆU TỪ JSON ---
  fetch('books.json')
    .then(response => {
      if (!response.ok) throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
      return response.json();
    })
    .then(data => {
      Object.entries(data.books).forEach(([category, items]) => {
        items.forEach((book) => {
          allProducts.push({
            id: allProducts.length + 1,
            title: book.name,
            author: book.author,
            price: parseInt(book.price.replace(/[^\d]/g, '')) || 0,
            category: category,
            tags: book.genre ? book.genre.split(',').map(tag => tag.trim()) : [],
            image: (book.image && book.image.trim() !== '') ?
              (book.image.startsWith('http') ? book.image : `${book.image}`) :
              'https://via.placeholder.com/180x250?text=No+Image',
            link_image_author: book.link_image_author || 'https://via.placeholder.com/100?text=Author'
          });
        });
      });

      filterAndSortProducts();
      populateAuthorsCarousel(allProducts);
    })
    .catch(error => console.error('Lỗi khi tải dữ liệu sách:', error));

  // --- 1. HIỂN THỊ SẢN PHẨM ---
  function renderProducts(productsToDisplay) {
    productListElement.innerHTML = '';

    if (productsToDisplay.length === 0) {
      productListElement.innerHTML =
        '<div class="col-12 text-center p-5 text-muted">Không tìm thấy sản phẩm nào phù hợp.</div>';
      renderPagination(0);
      return;
    }

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = productsToDisplay.slice(startIndex, endIndex);

    paginatedProducts.forEach(product => {
      const productHTML = `
        <div class="col mb-4">
          <div class="card product-card h-100 border-0 shadow-sm">
            <img src="${product.image}" class="card-img-top product-image" alt="${product.title}" 
                 onerror="this.src='https://via.placeholder.com/180x250?text=No+Image';">
            <div class="card-body p-2 d-flex flex-column">
              <h6 class="card-title product-title flex-grow-1 mb-1" style="font-size: 0.9rem;">${product.title}</h6>
              <p class="card-text product-price font-weight-bold text-danger mb-2" style="font-size: 0.95rem;">
                ${product.price.toLocaleString('vi-VN')}đ
              </p>
              <button class="btn btn-sm btn-danger add-to-cart-btn mt-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L5.45 10.51a.5.5 0 0 0 .463.376h7.323a.5.5 0 0 0 .463-.376l2.122-7.851A.5.5 0 0 1 15.5 3H14V2.5a.5.5 0 0 0-1 0V3H4.85l-.57.855L3.628 8.5H12.385l.775-2.863a.5.5 0 0 1 .96.26l-1.07 3.96a1.5 1.5 0 0 1-1.42.983H5.485a1.5 1.5 0 0 1-1.42-.984L.5 1.76A.5.5 0 0 1 0 1.5zM12 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
      productListElement.insertAdjacentHTML('beforeend', productHTML);
    });

    renderPagination(productsToDisplay.length);
  }

  // --- 2. LỌC & SẮP XẾP (TRẢ VỀ KẾT QUẢ) ---
  function filterAndSortProducts() {
    if (allProducts.length === 0) {
      renderProducts([]); // render empty
      return [];
    }

    let filtered = allProducts.filter(product => {
      const searchLower = currentFilters.search.toLowerCase();
      const titleMatch = product.title.toLowerCase().includes(searchLower);
      const authorMatch = product.author.toLowerCase().includes(searchLower);
      const tagMatch = product.tags.some(tag => tag.toLowerCase().includes(searchLower));
      const matchesSearch = currentFilters.search === '' || titleMatch || authorMatch || tagMatch;

      const matchesAuthor = currentFilters.author.length === 0 || currentFilters.author.includes(product.author);
      const matchesCategory = currentFilters.category.length === 0 || currentFilters.category.includes(product.category);
      const matchesPrice = !currentFilters.price ||
        (product.price >= currentFilters.price.min && product.price <= currentFilters.price.max);

      return matchesSearch && matchesAuthor && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.title.localeCompare(b.title, 'vi');
        default: return a.id - b.id;
      }
    });

    // IMPORTANT: Không reset currentPage ở đây nữa.
    renderProducts(filtered);
    return filtered;
  }

  // --- 3. XÓA LỌC ---
  function clearAllFilters() {
    currentFilters = { search: '', author: [], price: null, category: [] };
    searchInput && (searchInput.value = '');
    document.querySelectorAll('.filter-list input[type="checkbox"], .filter-list input[type="radio"]').forEach(input => {
      input.checked = false;
    });
    currentSort = 'default';
    sortDropdown.textContent = 'Sắp xếp: Mặc định';

    // reset trang khi xóa lọc
    currentPage = 1;
    filterAndSortProducts();
  }

  // --- 4. TÌM KIẾM ---
  if (searchButton && searchInput) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      currentFilters.search = searchInput.value.trim();
      currentPage = 1; // reset trang khi tìm kiếm mới
      filterAndSortProducts();
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        currentFilters.search = searchInput.value.trim();
        currentPage = 1; // reset trang khi tìm kiếm mới
        filterAndSortProducts();
      }
    });
  }

  // --- 5. LỌC THEO CHECKBOX & RADIO ---
  filterLists.forEach(list => {
    list.addEventListener('change', (e) => {
      const input = e.target;
      if (!input.matches('input')) return;

      const filterType = input.getAttribute('data-filter');
      const filterValue = input.value;

      if (filterType === 'author' || filterType === 'category') {
        const arr = currentFilters[filterType];
        if (input.checked) {
          if (!arr.includes(filterValue)) arr.push(filterValue);
        } else {
          const index = arr.indexOf(filterValue);
          if (index > -1) arr.splice(index, 1);
        }
      } else if (filterType === 'price' && input.checked) {
        currentFilters.price = {
          min: parseInt(input.getAttribute('data-min')) || 0,
          max: parseInt(input.getAttribute('data-max')) || Infinity
        };
      }

      // reset trang khi thay đổi bộ lọc
      currentPage = 1;
      filterAndSortProducts();
    });
  });

  // --- 6. SẮP XẾP ---
  sortOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      currentSort = option.getAttribute('data-sort');
      sortDropdown.textContent = `Sắp xếp: ${option.textContent.trim()}`;
      // reset trang khi thay đổi sắp xếp
      currentPage = 1;
      filterAndSortProducts();
    });
  });

  // --- 7. XÓA LỌC ---
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearAllFilters);
  }

  // --- 8. PHÂN TRANG (TỐI ĐA 9 TRANG) ---
  function renderPagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    paginationNav.innerHTML = '';

    if (totalPages <= 1) return;

    const maxVisible = 9;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    let html = `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage - 1}">Trước</a>
      </li>
    `;

    for (let i = startPage; i <= endPage; i++) {
      html += `
        <li class="page-item ${i === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }

    html += `
      <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage + 1}">Sau</a>
      </li>
    `;

    paginationNav.innerHTML = html;

    // --- GẮN SỰ KIỆN CHO CÁC LINK PHÂN TRANG ---
    paginationNav.querySelectorAll('.page-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const newPage = parseInt(link.getAttribute('data-page'));
        const totalPagesLocal = totalPages; // captured
        if (isNaN(newPage)) return;
        if (newPage > 0 && newPage <= totalPagesLocal && newPage !== currentPage) {
          currentPage = newPage;
          // CHỈ gọi filterAndSortProducts vì nó sẽ renderProducts dựa trên currentPage hiện tại
          filterAndSortProducts();
        }
      });
    });
  }

  // --- 9. CAROUSEL TÁC GIẢ ---
  function populateAuthorsCarousel(books) {
    const container = document.querySelector("#carouselAuthors .carousel-inner");
    if (!container) return;

    const perSlide = 6;
    const authors = {};

    books.forEach(book => {
      if (book.author && !authors[book.author]) {
        authors[book.author] = book.link_image_author;
      }
    });

    const uniqueAuthors = Object.keys(authors).map(name => ({
      author: name,
      link_image_author: authors[name]
    }));

    const totalSlides = Math.ceil(uniqueAuthors.length / perSlide);

    container.innerHTML = ''; // Xóa cũ

    for (let i = 0; i < totalSlides; i++) {
      const start = i * perSlide;
      const end = start + perSlide;
      const slideAuthors = uniqueAuthors.slice(start, end);

      const slideHTML = `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
          <div class="row px-3 justify-content-center">
            ${slideAuthors.map(author => `
              <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3">
                <div class="card bg-dark text-white border-secondary shadow-sm" style="border-radius: 0.6rem; overflow: hidden;">
                  <div class="card-body text-center p-1">
                    <img src="${author.link_image_author}"
                         class="img-fluid mb-2 rounded-circle"
                         style="width: 80px; height: 80px; object-fit: cover; margin-top: 20px;"
                         alt="${author.author}"
                         onerror="this.src='https://via.placeholder.com/100?text=Author';">
                    <p class="text-truncate mb-3 mt-2" style="font-size: 0.85rem;">${author.author}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', slideHTML);
    }
  }
});
