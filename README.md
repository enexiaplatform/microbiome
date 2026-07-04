# Microbiome Living Lab — Affiliate App & Founder Hub

> **Hệ sinh thái tiếp thị liên kết (Affiliate Marketing) & Quản trị kinh doanh vi sinh gia đình**

Chào mừng bạn đến với **Microbiome Living Lab**! Đây là ứng dụng web tối ưu hóa chuyển đổi được xây dựng riêng cho Nhà sáng lập / Nhà sáng tạo nội dung trong lĩnh vực Vi sinh gia đình & Chăm sóc sức khỏe không gian sống. 

Ứng dụng kết hợp giữa **trang đích (Landing Page) trực quan cho khách hàng** và **bảng điều khiển quản trị (Founder Hub) cho bạn** để vận hành mô hình kinh doanh Tiếp thị liên kết bền vững trên các sàn TMĐT (Shopee, Lazada...) dựa trên nền tảng tri thức y khoa uy tín.

---

## 🦠 TRIẾT LÝ CỐT LÕI
**"Sạch không có nghĩa là vô trùng"**
Hầu hết các gia đình hiện tại đang lạm dụng hóa chất tẩy rửa mạnh, vô tình tiêu diệt lợi khuẩn tự nhiên và tạo điều kiện cho hại khuẩn, ve bụi (mạt nhà) bùng phát. Microbiome Living Lab định vị là một "phòng thí nghiệm sống" — cung cấp kiến thức khoa học và giải pháp sinh học giúp cải thiện sức khỏe răng miệng, hô hấp và không gian sống cho gia đình.

---

## 🚀 CẤU TRÚC HỆ THỐNG & TÍNH NĂNG CHÍNH

### 1. Client-facing (Giao diện khách hàng)
*   **Aesthetics Premium:** Thiết kế hiện đại, tinh tế, hỗ trợ giao diện Sáng/Tối (Light/Dark mode) và hiệu ứng cuộn mượt mà.
*   **Trắc nghiệm chẩn đoán (Diagnostic Quiz):** Hệ thống câu hỏi giúp khách hàng nhận biết vấn đề sức khỏe của mình (răng miệng, hô hấp, dị ứng nệm) và gợi ý combo giải pháp vi sinh phù hợp nhất.
*   **Danh sách sản phẩm chiến lược:** 12 sản phẩm được đánh giá cao, chia theo 4 trụ cột: Răng Miệng 🦷, Nhà Cửa 🏠, Không Khí 🌬️, Đường Ruột 🧬. Mỗi sản phẩm đều có phân tích cơ chế vi sinh học rõ ràng.
*   **Góc kiến thức (Knowledge Hub):** 9 bài viết giáo dục chuyên sâu về biofilm lưỡi, ve bụi nệm, cơ chế nhầy-lông mũi, và vạch trần lầm tưởng dọn dẹp vô trùng.

### 2. Founder Hub (Bảng quản trị cho Nhà sáng lập)
*   **Chỉ số & Chiến dịch (KPIs & Campaigns):** Theo dõi Tổng lượt xem, Clicks, Đơn hàng, Doanh thu và tỷ lệ chuyển đổi (CTR, CR). Tự động vẽ biểu đồ xu hướng bằng SVG. Hỗ trợ nhập/xuất dữ liệu nhật ký chiến dịch qua định dạng CSV.
*   **Lộ trình 7 ngày Onboarding:** Từng bước chỉ dẫn chi tiết (kèm popup hướng dẫn hành động cụ thể) để bạn bắt đầu kinh doanh từ số 0.
*   **Mô hình tính điểm (Product Scorer):** Giả lập chấm điểm các sản phẩm affiliate mới dựa trên 7 tiêu chí cốt lõi (Cường độ nỗi đau, Tiềm năng nội dung, Uy tín khoa học, Hoa hồng...).
*   **Trung tâm kịch bản video (Video Script Hub):** Tự động soạn thảo kịch bản video ngắn (TikTok/Reels) theo 3 khung sườn: Problem-based, Myth-busting, và Science-backed. Có công cụ đo thời lượng đọc ước tính để khống chế dưới 60s.
*   **Cấu hình Link:** Cập nhật liên kết Shopee cá nhân của bạn. Hệ thống sẽ đồng bộ hóa link tiếp thị liên kết trên toàn bộ các trang đích ngay lập tức.
*   **Báo cáo đánh giá tuần (Weekly Review):** Tự động tổng hợp số liệu chiến dịch thành báo cáo Markdown chuẩn mực để tải về lưu trữ hoặc gửi đối tác.
*   **Tra cứu khoa học (Science Lookup):** Tích hợp tìm kiếm trực tiếp tài liệu y khoa từ API của thư viện **Europe PMC**, giúp trích dẫn chứng cứ khoa học chính xác vào kịch bản để tăng 10x niềm tin khách hàng.

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN
```text
Microbiome/
├── site/                     # Mã nguồn ứng dụng web chạy ở client
│   ├── images/               # Thư viện hình ảnh sản phẩm 3D đã tối ưu hóa
│   ├── app.js                # Logic ứng dụng, định tuyến (router) và render động
│   ├── config.js             # Cấu hình link affiliate của bạn (có thể ghi đè)
│   ├── data.js               # Dữ liệu tĩnh sản phẩm, bài viết và state mặc định
│   ├── index.html            # Khung HTML5 chuẩn SEO
│   └── style.css             # Hệ thống CSS Token, responsive layout & animation
├── onboarding_manual.md      # Cẩm nang chi tiết lộ trình hành động 7 ngày
├── product_scoring_model.md  # Chi tiết tiêu chí và thang điểm đánh giá sản phẩm
├── sprint_day_3_7_product_tests.md # Kế hoạch triển khai chiến dịch mẫu từ ngày 3-7
├── weekly_review_template.md # Mẫu đánh giá hiệu quả chiến dịch hàng tuần
├── products.csv              # Danh sách sản phẩm mẫu và link tham khảo dạng bảng
├── content_tracker.csv       # Nhật ký chiến dịch mẫu dạng bảng
├── package.json              # Script khởi chạy và cấu hình Node.js
└── vercel.json               # Cấu hình deploy lên nền tảng đám mây Vercel
```

---

## 💻 HƯỚNG DẪN CHẠY DỰ ÁN TRÊN MÁY CỤC BỘ (LOCAL)

### Yêu cầu hệ thống:
*   Máy tính đã cài đặt **Node.js** (Khuyên dùng phiên bản 18+).

### Các bước thực hiện:
1.  Mở terminal hoặc PowerShell tại thư mục dự án `Microbiome`.
2.  Chạy lệnh cài đặt và khởi động máy chủ cục bộ:
    ```bash
    npm run dev
    ```
    *(Lệnh này sử dụng công cụ nhẹ `http-server` tự động chạy trên cổng `3000` và tự mở trình duyệt của bạn).*
3.  Truy cập ứng dụng tại địa chỉ: [http://127.0.0.1:3000](http://127.0.0.1:3000)

---

## 📅 TÓM TẮT LỘ TRÌNH 7 NGÀY ONBOARDING
*   **Ngày 1:** Đăng ký tài khoản Shopee Affiliate & Cấu hình các link cá nhân của bạn trong trang quản trị.
*   **Ngày 2:** Thực hành chấm điểm sản phẩm, đặt mua 1-2 hàng mẫu đầu tiên (ví dụ: cạo lưỡi inox, men vi sinh).
*   **Ngày 3:** Soạn kịch bản video đầu tiên dựa trên kịch bản gợi ý có sẵn trong Founder Hub.
*   **Ngày 4:** Quay và dựng video ngắn có tính trực quan cao (thời lượng lý tưởng 35s - 55s, có phụ đề lớn).
*   **Ngày 5:** Đăng video vào khung giờ vàng (11:30 - 13:00 hoặc 19:30 - 21:00), gắn link website này vào Bio kênh của bạn.
*   **Ngày 6:** Theo dõi số lượt xem, click và cập nhật số liệu vào bảng nhật ký để xem phân tích tự động.
*   **Ngày 7:** Quảng bá combo giải pháp kết hợp nhiều sản phẩm và xuất file báo cáo tổng hợp tuần.

Chúc bạn xây dựng được một kênh truyền thông vi sinh phát triển mạnh mẽ và sớm nhận được những đơn hàng tiếp thị liên kết đầu tiên! 🚀
