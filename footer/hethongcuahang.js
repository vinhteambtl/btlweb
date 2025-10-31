// Lấy tất cả các phần tử hiệu sách và khung bản đồ
const bookstores = document.querySelectorAll(".bookstore");
const mapFrame = document.getElementById("map");

// Khi người dùng bấm vào 1 hiệu sách
bookstores.forEach(store => {
  store.addEventListener("click", () => {
    // Xóa class active khỏi tất cả
    bookstores.forEach(s => s.classList.remove("active"));
    // Thêm class active vào địa điểm được chọn
    store.classList.add("active");

    // Lấy link bản đồ từ data-map và thay đổi trong iframe
    const mapLink = store.getAttribute("data-map");
    mapFrame.src = `${mapLink}&output=embed`;
  });
});
