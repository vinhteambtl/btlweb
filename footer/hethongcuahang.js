// =====================
//  HỆ THỐNG HIỆU SÁCH
// =====================

const allBranches = {
  hanoi: [
    { name: "Cửa hàng Đống Đa 1 (Trụ sở chính)", lat: 21.02818, lng: 105.80342, address: "Số 3, Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội" },
    { name: "Cửa hàng Đống Đa 2", lat: 21.01868, lng: 105.82418, address: "Skyline Building, 36 Hoàng Cầu, Chợ Dừa, Đống Đa, Hà Nội" },
    { name: "Cửa hàng Cầu Giấy 1", lat: 21.01716, lng: 105.79409, address: "Chung cư F5 Trung Kính, Yên Hoà, Cầu Giấy, Hà Nội" },
    { name: "Cửa hàng Cầu Giấy 2", lat: 21.0384, lng: 105.7813, address: "80 Xuân Thủy, Cầu Giấy, Hà Nội" },
    { name: "Cửa hàng Thanh Xuân", lat: 20.9945, lng: 105.8160, address: "12 Nguyễn Trãi, Thanh Xuân, Hà Nội" },
    { name: "Cửa hàng Ba Đình", lat: 21.0288, lng: 105.8261, address: "25 Kim Mã, Ba Đình, Hà Nội" },
    { name: "Cửa hàng Tây Hồ", lat: 21.0660, lng: 105.8103, address: "579b Lạc Long Quân, Tây Hồ, Hà Nội" },
    { name: "Cửa hàng Nam Từ Liêm", lat: 21.0300, lng: 105.7692, address: "Tòa nhà C'land, 81 Lê Đức Thọ, Nam Từ Liêm, Hà Nội" },
    { name: "Cửa hàng Hoàng Mai", lat: 20.9885, lng: 105.8414, address: "697 Giải Phóng, Giáp Bát, Hoàng Mai, Hà Nội" },
    { name: "Cửa hàng Hà Đông", lat: 20.9835, lng: 105.7914, address: "10 Trần Phú, Mộ Lao, Hà Đông, Hà Nội" }
  ],

  hcm: [
    { name: "Cửa hàng Quận 1", lat: 10.7769, lng: 106.7009, address: "45 Lê Lợi, Quận 1, TP.HCM" },
    { name: "Cửa hàng Quận 3", lat: 10.7848, lng: 106.6834, address: "123 Nguyễn Thông, Quận 3, TP.HCM" }
  ],

  haiphong: [
    { name: "Cửa hàng Hồng Bàng", lat: 20.8651, lng: 106.6834, address: "56 Điện Biên Phủ, Hồng Bàng, Hải Phòng" },
    { name: "Cửa hàng Lê Chân", lat: 20.8446, lng: 106.6865, address: "90 Trần Nguyên Hãn, Lê Chân, Hải Phòng" }
  ],

  danang: [
    { name: "Cửa hàng Hải Châu", lat: 16.0678, lng: 108.2208, address: "78 Bạch Đằng, Hải Châu, Đà Nẵng" },
    { name: "Cửa hàng Sơn Trà", lat: 16.0869, lng: 108.2361, address: "22 Võ Văn Kiệt, Sơn Trà, Đà Nẵng" }
  ]
};

let map;
let markers = [];

// ===== Khởi tạo bản đồ =====
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 21.0285, lng: 105.8542 },
    zoom: 12,
  });

  // Mặc định load Hà Nội
  loadCity("hanoi");

  // Khi người dùng đổi thành phố
  document.getElementById("city-select").addEventListener("change", (e) => {
    const city = e.target.value;
    loadCity(city);
  });
}

// ===== Hàm load chi nhánh theo thành phố =====
function loadCity(city) {
  // Xóa marker cũ
  markers.forEach(m => m.setMap(null));
  markers = [];

  const branches = allBranches[city];
  const storeList = document.querySelector(".store-scroll");
  storeList.innerHTML = ""; // Xóa danh sách cũ
  const bounds = new google.maps.LatLngBounds();

  // Thêm từng chi nhánh
  branches.forEach(branch => {
    // Hiển thị danh sách bên trái
    const div = document.createElement("div");
    div.className = "bookstore";
    div.innerHTML = `
      <h4>${branch.name}</h4>
      <p><i class="fa-solid fa-location-dot"></i> ${branch.address}</p>
    `;
    storeList.appendChild(div);

    // Marker
    const marker = new google.maps.Marker({
      position: { lat: branch.lat, lng: branch.lng },
      map,
      title: branch.name,
      animation: google.maps.Animation.DROP,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<b>${branch.name}</b><br>${branch.address}`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    // Sự kiện click địa điểm bên trái
    div.addEventListener("click", () => {
      map.panTo({ lat: branch.lat, lng: branch.lng });
      map.setZoom(15);

      markers.forEach(m => m.setAnimation(null));
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => marker.setAnimation(null), 1400);

      document.querySelectorAll(".bookstore").forEach(i => i.classList.remove("active"));
      div.classList.add("active");
    });

    markers.push(marker);
    bounds.extend(marker.getPosition());
  });

  // Zoom hiển thị toàn bộ chi nhánh
  map.fitBounds(bounds);
}
