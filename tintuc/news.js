// ======== DỮ LIỆU BÀI VIẾT (18 bài mẫu) ========
const newsData = [
  { title: "TOP 10 cửa hàng sách cũ tại Hà Nội", date: "12/08/2025", img: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/478859ORs/anh-mo-ta.png", link: "news/new1.html", desc: "Khám phá những cửa hàng sách cũ nổi tiếng ở Hà Nội." },
  { title: "TOP 7 cửa hàng sách cũ Đà Nẵng uy tín", date: "26/07/2025", img: "https://danangtop.com/wp-content/uploads/2021/11/top-7-nha-sach-da-nang-duoc-yeu-thich-nhat_6196d07d7ed41.jpeg", link: "news/new2.html", desc: "Những điểm mua sách cũ được giới mê sách yêu thích." },
  { title: "Tình trạng sách cũ trước năm 1945 hiện nay", date: "22/04/2025", img: "https://www.sachbaokhang.vn/uploads/files/2023/03/13/thumbs-367-282-6--1/mua-ban-sach-cu-truoc-nam-1945-thuc-hien-ra-sao-2.jpg", link: "news/new3.html", desc: "Gợi ý các tiệm mua bán sách cũ nổi tiếng nhất Hà Nội." },
  { title: "TOP 10 tiệm sách cũ giá rẻ ở TPHCM", date: "19/04/2025", img: "https://topdoanhnghiep.vn/wp-content/uploads/2023/12/Top-10-tiem-ban-sach-cu-tphcm-00.jpg", link: "news/new4.html", desc: "Địa điểm bán sách cũ chất lượng và giá hợp lý ở Sài Gòn." },
  { title: "Bây giờ ai còn đọc sách?", date: "20/03/2025", img: "https://cand.com.vn/Files/Image/honghai/2019/09/19/c6e7c185-dfc6-42df-a5b6-40249d310a3f.jpg", link: "news/new5.html", desc: "Trang trí và sắp xếp tủ sách hiện đại, thẩm mỹ." },
  { title: "Thanh lý sách cũ có phải là con đường kinh doanh an toàn?", date: "28/01/2025", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MdfRvyyObOh3jdLCyGbnSqe3WgYhBwIqqMPtpyjZMXUZ9n4WoYi0nf_0dBcIgxayevk&usqp=CAU", link: "news/new6.html", desc: "Cơ hội kiếm thêm thu nhập cho học sinh, sinh viên yêu sách." },
  { title: "Hội chợ sách cũ tại Hà Nội thu hút nhiều bạn trẻ trải nghiệm", date: "11/03/2025", img: "https://cand.com.vn/Files/Image/honghai/2020/07/10/eef8b710-02bf-467d-945e-b22777dc4654.jpg", link: "news/new7.html", desc: "Nơi giao lưu, mua bán sách cũ và hiếm." },
  { title: "6 cách bảo quản sách với thời gian", date: "15/02/2025", img: "https://lh5.googleusercontent.com/proxy/KsVEvldAU8YY0hdydvLaAc3ijPxFU5SBgDK3JohiyTY8PRyHzF96pqMKGsNbTJA8l1y3S6hObE3v84n_e6SOaokbBzVKr-mnlB_Rw1goE7reIFjjxa7eNdB0BE_5Yay67A8SPSSZqTcjxRgez0fG6sC6_CZm6DBFICRNjhFADeesO93h-_krl6NfTDJOXj9N4JKwrw", link: "news/new8.html", desc: "Mẹo giúp giữ gìn sách cũ như mới." },
  { title: "Gặp người sưu tầm 30.000 cuốn sách cũ và hành trình đem tri thức đến với giới trẻ Thủ đô", date: "01/08/2024", img: "https://danviet.ex-cdn.com/files/f1/296231569849192448/2022/6/10/a3-16548451263542076811728-1654845372690321403534.jpeg", link: "news/new9.html", desc: "Tại sao sách cổ lại có giá trị đến vậy?" },
  { title: "TOP 10 cuốn sách văn học Việt Nam cũ kinh điển nhất", date: "10/07/2024", img: "https://static.oreka.vn/wp-content/uploads/2024/12/31120332/van-hoc-hien-dai-Viet-Nam-696x456.jpg", link: "news/new10.html", desc: "Một góc nhỏ lưu giữ văn hóa đọc giữa lòng Sài Gòn." },
  { title: "Chúng ta nên mua sách mới hay cũ để sử dụng?", date: "15/06/2024", img: "https://www.sachbaokhang.vn/uploads/files/2023/06/07/chung-ta-nen-mua-sach-moi-hay-cu-de-su-dung-3-1686103256.jpg", link: "news/new11.html", desc: "Bí quyết chọn sách cũ mà vẫn còn mới và bền đẹp." },
];

// ======== HIỂN THỊ TIN TỨC NỔI BẬT (4 bài đầu) ========
const featuredContainer = document.getElementById("featured-news");
newsData.slice(0, 4).forEach(news => {
  featuredContainer.innerHTML += `
    <div class="featured-item" onclick="window.location.href='${news.link}'">
      <img src="${news.img}" alt="">
      <div>
        <h6>${news.title}</h6>
        <p class="text-muted" style="font-size:12px;">📅 ${news.date}</p>
      </div>
    </div>
  `;
});

// ======== PHÂN TRANG ========
const newsPerPage = 8;
let currentPage = 1;

function renderNews(page) {
  const newsContainer = document.getElementById("news-list");
  newsContainer.innerHTML = "";

  const start = (page - 1) * newsPerPage;
  const end = start + newsPerPage;
  const pageItems = newsData.slice(start, end);

  pageItems.forEach(news => {
    newsContainer.innerHTML += `
      <div class="news-item" onclick="window.location.href='${news.link}'">
        <img src="${news.img}" alt="">
        <div>
          <h5>${news.title}</h5>
          <div class="date">📅 ${news.date}</div>
          <p>${news.desc}</p>
        </div>
      </div>
    `;
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(newsData.length / newsPerPage);
  const paginationContainer = document.getElementById("pagination-container");

  // Nếu bài viết <= 8, không hiển thị phân trang
  if (totalPages <= 1) {
    paginationContainer.innerHTML = "";
    return;
  }

  let paginationHTML = `<ul class="pagination">`;

  // Nút Prev
  paginationHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">&lt;</a>
    </li>
  `;

  // Nút số trang
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>
    `;
  }

  // Nút Next
  paginationHTML += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">&gt;</a>
    </li>
  `;

  paginationHTML += `</ul>`;
  paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
  const totalPages = Math.ceil(newsData.length / newsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderNews(page);
}

// ======== KHỞI TẠO ========
renderNews(currentPage);
