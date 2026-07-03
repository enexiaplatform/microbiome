/* ============================================
   MICROBIOME LIVING LAB — App Logic (Premium)
   ============================================ */

// --- STATE MANAGEMENT ---
const defaultOnboarding = [
  {
    day: 1,
    title: "Ngày 1: Định vị thương hiệu & Thiết lập cơ sở hạ tầng",
    desc: "Thiết lập tài khoản đối tác tiếp thị liên kết, cấu hình link cá nhân và nắm vững triết lý vi sinh.",
    steps: [
      { id: "d1_s1", title: "Đăng ký Shopee Affiliate", desc: "Tạo tài khoản đối tác tiếp thị liên kết để bắt đầu nhận link tracking.", done: false },
      { id: "d1_s2", title: "Cấu hình Website cá nhân", desc: "Kiểm tra mã nguồn trang web và cập nhật liên kết tiếp thị liên kết của riêng bạn.", done: false },
      { id: "d1_s3", title: "Nghiên cứu triết lý vi sinh", desc: "Đọc 3 bài viết giáo dục nền tảng trong Góc Kiến Thức để hiểu về biofilm và lợi khuẩn.", done: false }
    ]
  },
  {
    day: 2,
    title: "Ngày 2: Lựa chọn sản phẩm & Đánh giá hàng mẫu",
    desc: "Sử dụng mô hình tính điểm để chọn sản phẩm thử nghiệm đầu tiên và đặt hàng mẫu.",
    steps: [
      { id: "d2_s1", title: "Thực hành tính điểm sản phẩm", desc: "Dùng công cụ Scorer trong tab 'Mô hình tính điểm' để đánh giá ít nhất 3 sản phẩm.", done: false },
      { id: "d2_s2", title: "Đặt mua sản phẩm mẫu", desc: "Đặt mua 1-2 sản phẩm ưu tiên cao (ví dụ: Cạo lưỡi inox, men vi sinh nha khoa) để quay video.", done: false },
      { id: "d2_s3", title: "Tạo liên kết Affiliate cá nhân", desc: "Thay thế link mặc định bằng link cá nhân của bạn trong bảng cấu hình.", done: false }
    ]
  },
  {
    day: 3,
    title: "Ngày 3: Soạn kịch bản nội dung thử nghiệm",
    desc: "Viết kịch bản video ngắn tập trung vào nỗi đau và vạch trần lầm tưởng.",
    steps: [
      { id: "d3_s1", title: "Viết kịch bản Đánh trúng nỗi đau", desc: "Soạn kịch bản giải quyết nỗi đau thực tế của khách hàng (ví dụ: tự ti vì hơi thở có mùi).", done: false },
      { id: "d3_s2", title: "Viết kịch bản Vạch trần lầm tưởng", desc: "Soạn kịch bản lật tẩy lầm tưởng (ví dụ: dùng nước súc miệng diệt khuẩn mạnh làm hôi miệng hơn).", done: false },
      { id: "d3_s3", title: "Chuẩn bị 5 câu Hook 3s đầu", desc: "Chuẩn bị ít nhất 5 câu tiêu đề giật gân, mang tính hình ảnh để giữ chân người xem.", done: false }
    ]
  },
  {
    day: 4,
    title: "Ngày 4: Quay & Dựng video ngắn đầu tiên",
    desc: "Sản xuất video thực tế với hình ảnh trực quan cao để xây dựng lòng tin.",
    steps: [
      { id: "d4_s1", title: "Quay cận cảnh hình ảnh trực quan", desc: "Tập trung vào các cảnh quay cận cảnh vấn đề (lớp phủ trắng lưỡi) hoặc quá trình hút bụi nệm.", done: false },
      { id: "d4_s2", title: "Dựng video ngắn dưới 60s", desc: "Thêm phụ đề chữ lớn, nhạc nền sôi động và cắt nhịp nhanh dưới 60 giây.", done: false }
    ]
  },
  {
    day: 5,
    title: "Ngày 5: Đăng tải nội dung & Gắn link bio",
    desc: "Phân phối video của bạn trên các nền tảng và thúc đẩy chuyển đổi về website.",
    steps: [
      { id: "d5_s1", title: "Đăng tải vào khung giờ vàng", desc: "Đăng video lên TikTok/Reels vào các khung giờ: 11:30 - 13:00 hoặc 19:30 - 21:00.", done: false },
      { id: "d5_s2", title: "Gắn link website vào Bio", desc: "Đặt liên kết trang Microbiome Lab cá nhân vào phần mô tả kênh của bạn để điều hướng.", done: false },
      { id: "d5_s3", title: "Ghi nhật ký chiến dịch đầu tiên", desc: "Thêm một dòng ghi chép mới vào bảng Campaign Log trong tab 'Chỉ số & Chiến dịch'.", done: false }
    ]
  },
  {
    day: 6,
    title: "Ngày 6: Phân tích số liệu & Tối ưu chuyển đổi",
    desc: "Đo lường lượng xem, click để tối ưu hóa nội dung trong tương lai.",
    steps: [
      { id: "d6_s1", title: "Cập nhật số liệu thực tế", desc: "Cập nhật số liệu Views, Clicks, Đơn hàng sau 24-48h đăng video.", done: false },
      { id: "d6_s2", title: "Đo lường chỉ số CTR & CR", desc: "Xem lại tỷ lệ click link (CTR) trên dashboard. Mục tiêu CTR > 2% và CR > 3%.", done: false },
      { id: "d6_s3", title: "Thực hiện Báo cáo đánh giá tuần", desc: "Tạo báo cáo tự đánh giá và xuất báo cáo tuần ở tab tương ứng.", done: false }
    ]
  },
  {
    day: 7,
    title: "Ngày 7: Đóng gói giải pháp Combo & Nhân bản kênh",
    desc: "Tăng giá trị đơn hàng bằng combo và nhân bản kênh tiếp thị của bạn.",
    steps: [
      { id: "d7_s1", title: "Quảng bá combo giải pháp", desc: "Tạo nội dung giới thiệu trọn bộ giải pháp (ví dụ: Combo Hơi Thở Thơm Mát) để tăng doanh số.", done: false },
      { id: "d7_s2", title: "Nhân bản đa nền tảng", desc: "Đăng tải chéo video thành công lên Reels, YouTube Shorts và Instagram để phủ sóng tối đa.", done: false },
      { id: "d7_s3", title: "Xuất báo cáo phân tích CSV", desc: "Bấm nút 'Xuất dữ liệu CSV' từ Founder Hub để tải về và lưu trữ số liệu hiệu quả chiến dịch.", done: false }
    ]
  }
];

let appState = {
  theme: localStorage.getItem('theme') || 'light',
  activeDashTab: 'dash-kpis-tab',
  quiz: {
    currentQuestion: 0,
    answers: []
  },
  tracker: JSON.parse(localStorage.getItem('microbiome_tracker')) || [
    { date: '2026-06-01', platform: 'TikTok', title: 'Tại sao nước súc miệng làm hôi miệng nặng hơn?', hook: 'Đừng ngậm nước súc miệng nếu lưỡi vẫn còn bợn trắng...', category: 'oral', product: 'Viên Ngậm Lợi Khuẩn Nha Khoa K12/M18', views: 4500, likes: 380, saves: 140, comments: 55, clicks: 310, orders: 15, revenue: 1350000, lessonLearned: 'Góc bóc phốt lầm tưởng về nước súc miệng diệt khuẩn thu hút tranh luận cao, CTR đạt 6.9%.', nextAction: 'Lên kịch bản so sánh nước súc miệng cồn với men vi sinh nha khoa.' },
    { date: '2026-06-05', platform: 'Facebook Reels', title: 'Cảnh báo: Chiếc nệm nhìn sạch nhưng chứa hàng triệu ve bụi', hook: 'Hắt hơi liên tục mỗi sáng thức dậy? Thủ phạm đây...', category: 'home', product: 'Máy Hút Bụi Giường Nệm Diệt Khuẩn UV-C', views: 8200, likes: 640, saves: 280, comments: 90, clicks: 520, orders: 22, revenue: 4400000, lessonLearned: 'Cận cảnh đống bụi xơ trắng hút ra từ nệm có tính trực quan cực mạnh, tạo chuyển đổi cao.', nextAction: 'Sản xuất video hướng dẫn quy trình 3 bước làm sạch phòng ngủ dị ứng.' },
    { date: '2026-06-10', platform: 'TikTok', title: 'Test màng lọc HEPA sau 1 tháng sử dụng', hook: 'If you have a mini purifier, open it now...', category: 'air', product: 'Máy Lọc Không Khí HEPA Mini Phòng Ngủ', views: 2780, likes: 190, saves: 40, comments: 18, clicks: 120, orders: 4, revenue: 600000, lessonLearned: 'Hình ảnh màng lọc HEPA bám bụi đen có sức thuyết phục tốt nhưng tệp khách hàng hẹp hơn.', nextAction: 'Test góc tiếp thị: Giải pháp cho giấc ngủ không nghẹt mũi của trẻ sơ sinh.' }
  ],
  savedScores: JSON.parse(localStorage.getItem('microbiome_scores')) || [
    { name: 'Viên Ngậm Lợi Khuẩn Nha Khoa K12/M18', total: 32, decision: 'Sản phẩm trọng tâm', date: '2026-06-08' },
    { name: 'Dụng Cụ Cạo Lưỡi Thép Không Gỉ', total: 29, decision: 'Sản phẩm trọng tâm', date: '2026-06-09' }
  ],
  checklist: JSON.parse(localStorage.getItem('microbiome_checklist')) || [
    { text: 'Quay video ngắn TikTok: Cạo lớp bợn trắng trên lưỡi', status: 'pending' },
    { text: 'Chụp hình minh họa thực tế: Bụi trong nệm sau khi hút bằng máy hút UV-C', status: 'pending' },
    { text: 'Soạn kịch bản so sánh: Lợi khuẩn nha khoa vs. Nước súc miệng diệt khuẩn', status: 'done' },
    { text: 'Thêm link tiếp thị liên kết Shopee cho Bình rửa mũi', status: 'done' }
  ],
  customLinks: JSON.parse(localStorage.getItem('microbiome_custom_links')) || {},
  onboarding: JSON.parse(localStorage.getItem('microbiome_onboarding')) || defaultOnboarding
};

// Apply theme on load
document.documentElement.setAttribute('data-theme', appState.theme);

function toggleTheme() {
  appState.theme = appState.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', appState.theme);
  document.documentElement.setAttribute('data-theme', appState.theme);
  
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerText = appState.theme === 'light' ? '🌙' : '☀️';
  }
  showToast(`Đã chuyển sang chế độ ${appState.theme === 'light' ? 'sáng' : 'tối'}`, '🎨');
}

// --- TOAST NOTIFICATION SYSTEM ---
function showToast(message, icon = '🔔') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  
  // Trigger transition
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Auto remove toast after 3s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
      // Remove container if no toasts left
      if (container.childNodes.length === 0) {
        container.remove();
      }
    }, 300);
  }, 3000);
}

// --- STATIC DATA ---
const CATEGORIES = [
  { id: 'oral', name: 'Răng Miệng', icon: '🦷', iconClass: 'cat-card__icon--oral', desc: 'Tái thiết lập sự cân bằng vi sinh khoang miệng và tiêu diệt vi khuẩn gây mùi tại nguồn.' },
  { id: 'home', name: 'Nhà Cửa', icon: '🏠', iconClass: 'cat-card__icon--home', desc: 'Vệ sinh sinh học thông minh — bảo vệ lợi khuẩn trên bề mặt vải và giường nệm.' },
  { id: 'air', name: 'Không Khí', icon: '🌬️', iconClass: 'cat-card__icon--air', desc: 'Lọc sạch không khí hít thở, loại bỏ bụi siêu mịn và các tác nhân gây dị ứng.' },
  { id: 'gut', name: 'Đường Ruột', icon: '🧬', iconClass: 'cat-card__icon--gut', desc: 'Củng cố hệ sinh thái tiêu hóa từ bên trong, nâng cao 80% sức đề kháng cơ thể.' }
];

const PRODUCTS = [
  {
    id: 1, name: 'Viên Ngậm Lợi Khuẩn Nha Khoa K12/M18', category: 'oral',
    pain: 'Hơi thở có mùi dai dẳng dù đã đánh răng cạo lưỡi kỹ',
    normalFail: 'Nước súc miệng cồn cay nồng diệt sạch cả lợi khuẩn lẫn hại khuẩn, làm mất cân bằng vi sinh khiến hại khuẩn bùng phát mạnh hơn.',
    whyThisWorks: 'Bổ sung trực tiếp hàng tỷ lợi khuẩn Streptococcus salivarius K12/M18 bám vào niêm mạc để ức chế hại khuẩn tự nhiên.',
    priceRange: '350k - 900k VND',
    trustScore: 4.8,
    reviews: 142,
    link: 'https://shopee.vn/search?keyword=men+vi+sinh+nha+khoa+k12',
    image: 'images/oral_probiotics.png',
    featured: true,
    ingredients: 'Lợi khuẩn Streptococcus salivarius K12 & M18 (>2 tỷ CFU/liều)',
    scientificBacking: 'Chủng lợi khuẩn K12 và M18 đã được chứng minh lâm sàng qua hơn 30 nghiên cứu độc lập trên PubMed. Chúng bám dính mạnh mẽ vào niêm mạc khoang miệng, sản sinh Salivaricins A và B (bacteriocins) tiêu diệt chọn lọc vi khuẩn kỵ khí gây mùi lưu huỳnh, thiết lập hàng rào miễn dịch tai-mũi-họng.',
    studyRef: 'NCBI PubMed (PMID: 21644998) & Journal of Medical Microbiology',
    contentAngles: {
      problem: 'Đánh răng rất kỹ nhưng lưỡi vẫn bợn trắng, hơi thở có mùi chỉ sau 15 phút gây tự ti giao tiếp.',
      myth: 'Lạm dụng nước súc miệng diệt khuẩn mạnh làm khô miệng và mất cân bằng sinh học, tạo điều kiện cho hại khuẩn nhân bản tên lửa.',
      hook: 'Dừng ngay nước súc miệng diệt khuẩn nếu bạn không muốn hơi thở ngày càng tệ hơn...'
    }
  },
  {
    id: 2, name: 'Dụng Cụ Cạo Lưỡi Thép Không Gỉ', category: 'oral',
    pain: 'Lớp bợn trắng dày trên lưỡi gây hôi miệng',
    normalFail: 'Bàn chải thông thường chỉ chà xát bề mặt xốp của lưỡi và không thể loại bỏ màng biofilm cứng đầu bám sâu ở cuống lưỡi.',
    whyThisWorks: 'Inox y tế cong chuyên dụng gạt bỏ cơ học màng biofilm và các ổ hại khuẩn gây mùi mà không gây đau.',
    priceRange: '100k - 250k VND',
    trustScore: 4.9,
    reviews: 580,
    link: 'https://shopee.vn/search?keyword=cao+luoi+inox+304',
    image: 'images/tongue_scraper.png',
    featured: true,
    ingredients: 'Thép không gỉ 304 tiêu chuẩn y tế, bề mặt đánh bóng mịn',
    scientificBacking: 'Màng sinh học biofilm trên lưỡi là nơi trú ngụ của 90% vi khuẩn kỵ khí gây mùi. Nghiên cứu của Hiệp hội Nha khoa Hoa Kỳ (ADA) xác nhận cạo lưỡi cơ học hàng ngày giảm 75% hợp chất sulfur dễ bay hơi (VSC) gây mùi hơi thở, so với chỉ 45% nếu chỉ dùng bàn chải.',
    studyRef: 'Journal of Periodontology (Vol. 75, Issue 7)',
    contentAngles: {
      problem: 'Lưỡi phủ một lớp màng trắng vàng dày xốp, thở ra thấy mùi hôi dù không có răng sâu.',
      myth: 'Dùng bàn chải chà lưỡi chỉ làm loang lổ vi khuẩn bám sâu hơn vào gai lưỡi và kích thích nôn ọe.',
      hook: 'Nhìn lớp bợn trắng này đi — đây chính là lý do bạn vẫn hôi miệng dù đánh răng ngày chục lần...'
    }
  },
  {
    id: 3, name: 'Máy Tăm Nước Cầm Tay Chuyên Dụng', category: 'oral',
    pain: 'Thức ăn thừa giắt kẽ răng sâu gây mùi hôi khó chịu',
    normalFail: 'Dùng tăm tre làm rộng kẽ răng, chảy máu nướu răng, trong khi chỉ nha khoa khó làm sạch kẽ răng hàm sâu bên trong.',
    whyThisWorks: 'Tia nước áp lực cao phun sương bắn sạch mảng bám hữu cơ và làm sạch sâu dưới nướu nơi bàn chải chịu thua.',
    priceRange: '400k - 1.8M VND',
    trustScore: 4.7,
    reviews: 320,
    link: 'https://shopee.vn/search?keyword=may+tam+nuoc+cam+tay',
    image: 'images/water_flosser.png',
    ingredients: 'Động cơ xung động 1400-1800 lần/phút, bình nước 200ml',
    scientificBacking: 'Tia nước siêu mảnh 0.6mm loại bỏ tới 99.9% mảng bám sinh học ở các kẽ răng khít và túi nướu. Phương pháp này giảm viêm nướu và chảy máu chân răng tới 93% so với chỉ dùng chỉ nha khoa thông thường.',
    studyRef: 'The Journal of Clinical Dentistry (Vol. 24, No. 2)',
    contentAngles: {
      problem: 'Thịt và thức ăn giắt vào kẽ răng hàm gây đau nhức, phân hủy bốc mùi hôi sau vài tiếng.',
      myth: 'Dùng tăm tre chọc kẽ răng không chỉ tạo khe hở mất thẩm mỹ mà còn gây xước nướu, tạo ổ viêm nhiễm hôi họng.',
      hook: 'Thử soi kẽ răng sau khi ăn xong đi, bạn sẽ sốc vì lượng thức ăn thừa đang thối rữa ở đó...'
    }
  },
  {
    id: 4, name: 'Bộ Dụng Cụ Lấy Sỏi Amidan Có Đèn', category: 'oral',
    pain: 'Hơi thở hôi từ cuống họng, cảm giác nuốt vướng',
    normalFail: 'Lầm tưởng mùi hôi từ dạ dày nên uống thuốc trào ngược vô ích, trong khi tự dùng tăm bông chọc họng làm trầy xước amidan.',
    whyThisWorks: 'Thiết kế đèn LED siêu sáng và đầu silicon siêu mềm giúp định vị và gạt sỏi amidan chứa vi khuẩn ra ngoài an toàn.',
    priceRange: '100k - 350k VND',
    trustScore: 4.6,
    reviews: 98,
    link: 'https://shopee.vn/search?keyword=bo+lay+soi+amidan',
    image: 'images/tonsil_kit.png',
    ingredients: 'Thân nhựa ABS y tế tích hợp LED, đầu hút silicon siêu mềm',
    scientificBacking: 'Sỏi amidan (tonsilloliths) hình thành từ thức ăn thừa, vôi hóa và tế bào chết tích tụ trong hốc amidan. Chúng chứa nồng độ vi khuẩn kỵ khí đậm đặc gấp 10 lần mảng bám răng, liên tục giải phóng methyl mercaptan và hydrogen sulfide có mùi hôi như trứng thối.',
    studyRef: 'American Academy of Otolaryngology-Head and Neck Surgery',
    contentAngles: {
      problem: 'Cổ họng vướng víu khó chịu, thỉnh thoảng khạc ra hạt nhỏ màu vàng mùi thối tanh kinh khủng.',
      myth: 'Nghĩ hơi thở hôi là do dạ dày trào ngược và tốn tiền mua thuốc, thực chất chỉ do mấy hạt sỏi amidan nhỏ xíu này.',
      hook: 'Hãy soi đèn vào họng và tìm những đốm trắng vàng này, chúng là ổ mùi hôi họng của bạn đấy...'
    }
  },
  {
    id: 5, name: 'Kẹo Ngậm Xylitol Nha Khoa Tự Nhiên', category: 'oral',
    pain: 'Khô miệng, chua miệng và mùi cà phê sau khi ăn uống',
    normalFail: 'Nhai kẹo cao su chứa đường hóa học nuôi dưỡng axit hại men răng, làm hỏng men răng và hôi miệng nhanh hơn.',
    whyThisWorks: 'Đường gỗ Xylitol kích thích nước bọt kiềm tự nhiên, trung hòa axit và ngăn vi khuẩn bám dính men răng.',
    priceRange: '100k - 300k VND',
    trustScore: 4.7,
    reviews: 215,
    link: 'https://shopee.vn/search?keyword=keo+ngam+xylitol+nha+khoa',
    image: 'images/xylitol_candy.png',
    ingredients: 'Xylitol tự nhiên 100% chiết xuất từ gỗ bạch dương (Không đường sucrose)',
    scientificBacking: 'Vi khuẩn Streptococcus mutans không thể chuyển hóa Xylitol thành axit phá hủy răng. Sử dụng Xylitol thường xuyên làm giảm độ bám dính của mảng bám và giữ pH nước bọt hơi kiềm (>7.0), ngăn ngừa tình trạng khô miệng - môi trường lý tưởng của khuẩn hôi miệng.',
    studyRef: 'Journal of Dental Education & California Dental Association',
    contentAngles: {
      problem: 'Miệng chua lòm, đắng ngắt sau khi uống cà phê hoặc hút thuốc, tạo ra mùi hôi nồng khó chịu khi giao tiếp.',
      myth: 'Nhai kẹo gum ngọt chỉ lấp liếm mùi tạm thời, lượng đường thừa lại nuôi béo hại khuẩn gây hỏng men răng.',
      hook: 'Mẹo 10 giây đánh bay mùi cà phê và khô miệng bằng chiết xuất gỗ bạch dương cực kỳ tiện lợi...'
    }
  },
  {
    id: 6, name: 'Bình Rửa Mũi Xoang & Muối Sinh Lý Ấm', category: 'air',
    pain: 'Hắt hơi, nghẹt mũi dị ứng gây mất ngủ',
    normalFail: 'Lạm dụng thuốc xịt co mạch chứa corticoid làm khô teo niêm mạc mũi, gây nghiện thuốc và ngạt mũi dội ngược nghiêm trọng hơn.',
    whyThisWorks: 'Rửa trôi vật lý bụi mịn, phấn hoa và dịch nhầy tích tụ, phục hồi và bảo vệ hệ lông chuyển niêm mạc mũi.',
    priceRange: '100k - 250k VND',
    trustScore: 4.8,
    reviews: 310,
    link: 'https://shopee.vn/search?keyword=binh+rua+mui+xoang',
    image: 'images/nasal_rinse.png',
    ingredients: 'Bình nhựa PP y tế không chứa BPA, gói muối biển tinh khiết đệm pH',
    scientificBacking: 'Rửa mũi bằng nước muối đẳng trương làm sạch cơ học khoang mũi, loại bỏ các tác nhân dị ứng (PM2.5, phấn hoa, bào tử nấm) bám trên niêm mạc. Nó phục hồi hoạt động của lông chuyển, giảm viêm mũi dị ứng tự nhiên mà không cần dùng thuốc.',
    studyRef: 'Cochrane Systematic Review & European Position Paper on Rhinosinusitis',
    contentAngles: {
      problem: 'Liên tục hắt hơi, ngạt một bên mũi nghẹt thở về đêm khiến bạn trằn trọc mất ngủ mệt mỏi.',
      myth: 'Lạm dụng thuốc xịt co mạch hóa học làm hỏng niêm mạc mũi vĩnh viễn và tạo phản ứng phụ ngạt nặng hơn.',
      hook: 'Cách rửa trôi hàng triệu hạt bụi bẩn bám sâu trong xoang mũi trước khi đi ngủ...'
    }
  },
  {
    id: 7, name: 'Máy Lọc Không Khí HEPA Mini Phòng Ngủ', category: 'air',
    pain: 'Dị ứng bụi mịn và phấn hoa trong phòng kín',
    normalFail: 'Đốt nến thơm hoặc xịt nước hoa phòng chỉ che đậy mùi chứ không hề lọc bỏ các hạt bụi mịn PM2.5 gây hại trong không khí.',
    whyThisWorks: 'Màng lọc True HEPA thu giữ 99.97% bụi siêu mịn, bào tử nấm mốc và tác nhân dị ứng đường hô hấp.',
    priceRange: '700k - 2M VND',
    trustScore: 4.7,
    reviews: 180,
    link: 'https://shopee.vn/search?keyword=may+loc+khong+khi+hepa+mini',
    image: 'images/hepa_purifier.png',
    ingredients: 'Màng lọc True HEPA H13, cảm biến bụi hồng ngoại',
    scientificBacking: 'Màng lọc True HEPA H13 có khả năng giữ lại 99.97% các hạt bụi lơ lửng nhỏ tới 0.3 micromet, bao gồm bụi mịn PM2.5, bào tử nấm mốc, phấn hoa và mạt nhà - các tác nhân chính gây kích ứng hô hấp ban đêm.',
    studyRef: 'U.S. Environmental Protection Agency (EPA) Air Quality Guidelines',
    contentAngles: {
      problem: 'Con trẻ ngạt mũi, ho khan khụt khịt suốt đêm khi ngủ trong phòng điều hòa đóng kín cửa.',
      myth: 'Nến thơm và nước xịt phòng chỉ tạo cảm giác sạch giả tạo, thực chất làm tăng nồng độ chất hữu cơ bay hơi VOCs có hại cho phổi.',
      hook: 'Phòng ngủ đóng kín cửa của bạn trông có vẻ sạch, nhưng thực chất chứa lượng bụi mịn gấp 5 lần ngoài đường...'
    }
  },
  {
    id: 8, name: 'Chai Xịt Vi Sinh Kháng Ve Bụi Giường Nệm', category: 'home',
    pain: 'Ngứa da, châm chích và dị ứng mẩn đỏ khi nằm giường',
    normalFail: 'Chỉ giặt ga giường thông thường không thể diệt được hàng triệu con ve bụi (mạt nhà) trốn sâu dưới lõi đệm và ruột gối.',
    whyThisWorks: 'Chứa các bào tử lợi khuẩn tự nhiên ăn sạch tế bào da chết (nguồn thức ăn của ve bụi), bỏ đói và ức chế vòng đời của chúng.',
    priceRange: '100k - 350k VND',
    trustScore: 4.8,
    reviews: 110,
    link: 'https://shopee.vn/search?keyword=xit+khang+ve+bui+vi+sinh',
    image: 'images/dust_mite_spray.png',
    ingredients: 'Bào tử lợi khuẩn Bacillus subtilis tự nhiên (>1 tỷ CFU/ml)',
    scientificBacking: 'Lợi khuẩn Bacillus subtilis nảy mầm trên bề mặt sợi vải, tiêu thụ tế bào da chết nhanh hơn mạt bụi giường nệm gấp hàng chục lần. Quần thể ve bụi (Dermatophagoides) bị cắt nguồn lương thực sẽ tự suy giảm 90% chỉ sau 2 tuần xịt định kỳ.',
    studyRef: 'Clinical & Experimental Allergy & Journal of Allergy and Clinical Immunology',
    contentAngles: {
      problem: 'Vừa nằm xuống giường là thấy ngứa ngáy châm chích ở lưng, ở cổ dù mới thay ga giường mới tinh.',
      myth: 'Phun hóa chất diệt côn trùng lên giường nệm cực kỳ độc hại cho da và đường hô hấp của trẻ nhỏ khi nằm trực tiếp.',
      hook: 'Hàng triệu sinh vật nhỏ bé này đang bò trên giường nệm ăn da chết của bạn mỗi tối...'
    }
  },
  {
    id: 9, name: 'Máy Hút Bụi Giường Nệm Diệt Khuẩn UV-C', category: 'home',
    pain: 'Bụi mịn và chất thải mạt nhà tích tụ sâu trong nệm',
    normalFail: 'Đập chăn nệm bằng tay làm bụi bay mù mịt trong phòng và hít trực tiếp vào phổi, trong khi máy hút bụi thường không có lực rung đánh bật bụi nệm.',
    whyThisWorks: 'Lực rung đập tần số cao đánh bật bụi mịn từ sâu bên trong lõi nệm kết hợp tia cực tím UV-C và lực hút lốc xoáy khóa chặt bụi.',
    priceRange: '600k - 2M VND',
    trustScore: 4.9,
    reviews: 640,
    link: 'https://shopee.vn/search?keyword=may+hut+bui+giuong+nem+uvc',
    image: 'images/mattress_vacuum.png',
    featured: true,
    ingredients: 'Đèn UV-C thạch anh 253.7nm, động cơ rung đập 10.000 lần/phút, lực hút 12.000 Pa',
    scientificBacking: 'Tia cực tím bước sóng 253.7nm phá hủy cấu trúc DNA của vi khuẩn và trứng mạt bụi nhà. Kết hợp lực rung đập tần số cao 10.000 lần/phút giải phóng các hạt bụi siêu mịn bám chặt trong sợi vải để màng lọc HEPA thu gom trọn vẹn.',
    studyRef: 'Journal of Occupational and Environmental Hygiene',
    contentAngles: {
      problem: 'Nệm nằm lâu năm tích tụ hàng cân bụi mịn và da chết hữu cơ tạo thành ổ dị ứng di động.',
      myth: 'Đem nệm ra ban công đập bụi chỉ làm bụi bay khắp nơi rồi bạn hít trọn vào phế quản.',
      hook: 'Bạn sẽ sốc khi thấy đống bụi xám mịn như bột này được hút ra từ chiếc giường nhìn sạch bóng của mình...'
    }
  },
  {
    id: 10, name: 'Chai Xịt Khử Mùi Sinh Học Enzyme Tự Nhiên', category: 'home',
    pain: 'Mùi thú cưng, mùi giày ẩm mốc ám ảnh phòng kín',
    normalFail: 'Xịt nước hoa phòng hương liệu hóa học chỉ che đậy khứu giác tạm thời, tạo ra hỗn hợp mùi hôi hắc nồng nặc và gây hại cho phổi.',
    whyThisWorks: 'Các enzyme hoạt tính phân hủy trực tiếp các liên kết hữu cơ của phân tử mùi (protein, chất béo) thành chất không mùi.',
    priceRange: '100k - 400k VND',
    trustScore: 4.7,
    reviews: 155,
    link: 'https://shopee.vn/search?keyword=xit+khu+mui+enzyme+sinh+hoc',
    image: 'images/enzyme_spray.png',
    ingredients: 'Enzyme Protease, Lipase, Amylase lên men tự nhiên',
    scientificBacking: 'Enzyme sinh học hoạt động như chất xúc tác tốc độ cao. Protease thủy phân liên kết peptid của phân tử mùi gốc protein từ chất thải động vật, trong khi Lipase phân hủy chất béo mồ hôi chân, giải quyết tận gốc nguồn phát mùi hôi mà không cần chất hóa học tẩy rửa mạnh.',
    studyRef: 'Enzyme and Microbial Technology Journal',
    contentAngles: {
      problem: 'Nuôi chó mèo trong phòng máy lạnh hoặc giày đi mưa về ám mùi hôi khai nồng nặc không cách nào khử sạch.',
      myth: 'Xịt nước thơm chỉ là lừa dối khứu giác, phân tử mùi hôi vẫn nguyên vẹn và tạo hỗn hợp khí độc hại hít vào phổi.',
      hook: 'Bí quyết khử mùi hôi thú cưng và giày ẩm mốc vĩnh viễn bằng công nghệ enzyme sinh học cực kỳ an toàn...'
    }
  },
  {
    id: 11, name: 'Men Vi Sinh Bào Tử Lợi Khuẩn Đường Ruột', category: 'gut',
    pain: 'Bụng dạ yếu, dễ đau bụng đi ngoài khi ăn đồ lạ',
    normalFail: 'Uống men vi sinh dạng bột thường bị axit dạ dày ăn mòn tiêu diệt đến 99% lợi khuẩn trước khi đến được ruột non.',
    whyThisWorks: 'Bào tử lợi khuẩn ở trạng thái ngủ đông có vỏ kén siêu bền vượt qua axit dạ dày an toàn 100% để nảy mầm ở ruột.',
    priceRange: '350k - 900k VND',
    trustScore: 4.8,
    reviews: 245,
    link: 'https://shopee.vn/search?keyword=men+vi+sinh+bao+tu+duong+ruot',
    image: 'images/gut_probiotics.png',
    ingredients: 'Bào tử Bacillus clausii và Bacillus subtilis (>3 tỷ CFU/ống)',
    scientificBacking: 'Bào tử Bacillus clausii chịu được nhiệt độ cao và sống sót an toàn qua môi trường axit cực mạnh pH 1.5 của dạ dày. Khi xuống ruột non, chúng nảy mầm, sản sinh enzyme tiêu hóa tự nhiên và kích thích tổng hợp kháng thể IgA giúp củng cố hệ miễn dịch.',
    studyRef: 'World Journal of Gastroenterology & Journal of Applied Microbiology',
    contentAngles: {
      problem: 'Cứ ăn hải sản, đồ lạnh hay uống sữa là bụng sôi ùng ục, chạy vội vào nhà vệ sinh cực kỳ phiền toái.',
      myth: 'Nghĩ men vi sinh nào cũng giống nhau, thực ra men bột thường bị axit dạ dày hủy diệt gần hết trước khi có tác dụng.',
      hook: 'Nếu bạn có một chiếc bụng dạ yếu ăn gì cũng đau, đây là giải pháp bảo vệ kén bào tử của y khoa...'
    }
  },
  {
    id: 12, name: 'Nước Uống Kombucha Hữu Cơ Lên Men Scoby', category: 'gut',
    pain: 'Thèm nước ngọt có ga nhưng sợ béo phì, tiểu đường',
    normalFail: 'Uống nước ngọt ăn kiêng 0 calo chứa chất tạo ngọt aspartame phá hủy hệ lợi khuẩn ruột, gây cảm giác thèm ngọt hơn.',
    whyThisWorks: 'Lên men trà Scoby tự nhiên tạo ga sủi bọt hữu cơ, bổ sung axit amin, vitamin nhóm B hỗ trợ gan thải độc.',
    priceRange: '100k - 300k VND',
    trustScore: 4.6,
    reviews: 189,
    link: 'https://shopee.vn/search?keyword=kombucha+huu+co',
    image: 'images/kombucha_organic.png',
    ingredients: 'Trà xanh hữu cơ lên men cùng con giống Scoby (đường mía hữu cơ đã phân hủy)',
    scientificBacking: 'Quá trình lên men cộng sinh giữa vi khuẩn và nấm men (Scoby) tạo ra lượng lớn axit gluconic và glucuronic. Các axit này tham gia trực tiếp vào cơ chế giải độc của gan, kết hợp với các gốc tự do polyphenol từ trà giúp tăng cường chống oxy hóa cơ thể.',
    studyRef: 'Journal of Food Science & Food Microbiology Journal',
    contentAngles: {
      problem: 'Ăn đồ nhiều dầu mỡ bị đầy bụng, khó tiêu và thèm nước ngọt có ga nhưng sợ béo phì và hại dạ dày.',
      myth: 'Nước ngọt ăn kiêng không calo vẫn chứa chất tạo ngọt nhân tạo (aspartame) tàn phá nghiêm trọng hệ vi sinh đường ruột.',
      hook: 'Đập tan cơn thèm nước ngọt có ga bằng một ly Kombucha bổ sung hàng tỷ lợi khuẩn tự nhiên giúp nhẹ bụng tức thì...'
    }
  }
];

const STARTER_KITS = [
  {
    id: 'breath',
    name: 'Combo Hơi Thở Thơm Mát',
    icon: '😮‍💨',
    iconClass: 'kit-card__icon--breath',
    desc: 'Giải quyết triệt để mùi hơi thở khó chịu từ lớp biofilm lưỡi cho đến các kẽ răng hàm sâu bên trong.',
    products: ['Dụng Cụ Cạo Lưỡi Thép Không Gỉ', 'Viên Ngậm Lợi Khuẩn Nha Khoa K12/M18', 'Máy Tăm Nước Cầm Tay Chuyên Dụng']
  },
  {
    id: 'allergy',
    name: 'Combo Phòng Ngủ Không Dị Ứng',
    icon: '🤧',
    iconClass: 'kit-card__icon--allergy',
    desc: 'Thiết lập không gian ngủ hoàn hảo nhờ việc lọc bụi mịn trôi nổi và hút sạch ve bụi ẩn sâu dưới đệm.',
    products: ['Máy Lọc Không Khí HEPA Mini Phòng Ngủ', 'Bình Rửa Mũi Xoang & Muối Sinh Lý Ấm', 'Máy Hút Bụi Giường Nệm Diệt Khuẩn UV-C']
  },
  {
    id: 'home',
    name: 'Combo Vệ Sinh Sinh Học Thông Minh',
    icon: '🏡',
    iconClass: 'kit-card__icon--home',
    desc: 'Vệ sinh nhà cửa thông minh không dùng hóa chất tẩy rửa độc hại, an toàn tuyệt đối cho trẻ nhỏ và pet.',
    products: ['Chai Xịt Khử Mùi Sinh Học Enzyme Tự Nhiên', 'Chai Xịt Vi Sinh Kháng Ve Bụi Giường Nệm', 'Máy Hút Bụi Giường Nệm Diệt Khuẩn UV-C']
  },
  {
    id: 'gut',
    name: 'Combo Tái Tạo Hệ Tiêu Hóa',
    icon: '🧬',
    iconClass: 'kit-card__icon--gut',
    desc: 'Chăm sóc và bổ sung vi khuẩn có lợi từ khoang miệng kéo dài xuống tận ruột non, củng cố hàng rào miễn dịch.',
    products: ['Men Vi Sinh Bào Tử Lợi Khuẩn Đường Ruột', 'Nước Uống Kombucha Hữu Cơ Lên Men Scoby', 'Viên Ngậm Lợi Khuẩn Nha Khoa K12/M18']
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "Vấn đề sức khỏe gia đình nào bạn muốn cải thiện nhất hiện tại?",
    options: [
      { text: "Mất tự tin giao tiếp do hơi thở có mùi và lưỡi bám bợn trắng", val: "oral" },
      { text: "Hắt hơi nghẹt mũi dị ứng thường xuyên mỗi khi thức dậy", val: "air" },
      { text: "Mùi thú cưng, mùi ẩm mốc ga giường gây ngứa ngáy châm chích", val: "home" },
      { text: "Hay bị đầy bụng, khó tiêu và đau bụng khi ăn đồ lạ", val: "gut" }
    ]
  },
  {
    question: "Mức ngân sách tối đa bạn sẵn sàng đầu tư là bao nhiêu?",
    options: [
      { text: "Tiết kiệm tối đa (Dưới 300k VND)", val: "low" },
      { text: "Hiệu quả & Cân bằng (Từ 300k - 800k VND)", val: "mid" },
      { text: "Giải pháp toàn diện lâu dài (Trên 800k VND)", val: "high" }
    ]
  },
  {
    question: "Bạn ưa chuộng phương thức tiếp cận nào hơn?",
    options: [
      { text: "Tác động cơ học vật lý (Cạo lưỡi, hút bụi nệm, rửa mũi)", val: "mechanical" },
      { text: "Cân bằng sinh học tự nhiên (Bổ sung men vi sinh, xịt enzyme)", val: "biological" },
      { text: "Kết hợp toàn diện cả hai phương pháp trên", val: "both" }
    ]
  }
];

const ARTICLES = {
  educational: [
    { id: 1, title: 'Lưỡi: "Mỏ Vàng" Của Vi Khuẩn Gây Hôi Miệng', excerpt: 'Đánh răng rất kỹ nhưng vẫn hôi miệng? 90% nguyên nhân bắt nguồn từ lớp màng sinh học biofilm màu trắng bám dày ở cuống lưỡi.', readTime: '4 phút', category: 'oral' },
    { id: 2, title: 'Hệ Sinh Thái Giường Nệm & Sức Khỏe Hô Hấp', excerpt: 'Mỗi đêm chúng ta thải ra hàng triệu tế bào da chết—biến giường ngủ thành bữa tiệc thịnh soạn cho loài ve bụi gây ngứa dị ứng.', readTime: '5 phút', category: 'home' },
    { id: 3, title: 'Hàng Rào Bảo Vệ Tự Nhiên Của Mũi Trước Bụi Mịn xoang', excerpt: 'Hiểu rõ cơ chế nhầy-lông chuyển của niêm mạc mũi và lý do rửa mũi sinh lý hiệu quả hơn các loại thuốc co mạch.', readTime: '4 phút', category: 'air' }
  ],
  myths: [
    { id: 4, title: 'Lầm Tưởng: Nước Súc Miệng Càng Mạnh Càng Thơm Miệng', excerpt: 'Cảm giác cay nồng của cồn tạo độ sạch giả tạo, thực tế nó đang "thiêu rụi" hoàn toàn hệ vi sinh vật có lợi trong miệng bạn.', readTime: '3 phút', category: 'oral' },
    { id: 5, title: 'Lầm Tưởng: Ga Giường Sạch Nghĩa Là Không Có Ve Bụi', excerpt: 'Giặt ga giường thường xuyên không thể chạm tới hàng triệu con mạt nhà trú ẩn sâu trong lõi bông nệm. Cách xử lý tận gốc.', readTime: '4 phút', category: 'home' },
    { id: 6, title: 'Lầm Tưởng: Hương Thơm Có Thể Tiêu Diệt Hoàn Toàn Mùi Hôi', excerpt: 'Nước hoa xịt phòng chỉ đánh lừa khứu giác bằng cách che phủ mùi. Tại sao enzyme sinh học mới là câu trả lời triệt để.', readTime: '3 phút', category: 'home' }
  ],
  guides: [
    { id: 7, title: 'Liệu Pháp Bù Đắp Lợi Khuẩn Khoang Miệng: K12 & M18', excerpt: 'Khi nào cần sử dụng men vi sinh nha khoa để tái cân bằng hệ sinh thái miệng và tiêu diệt hại khuẩn giải phóng lưu huỳnh.', readTime: '5 phút', category: 'oral' },
    { id: 8, title: 'Bí Mật Đằng Sau Hạt Sỏi Amidan Màu Vàng Siêu Thối', excerpt: 'Nhận biết các hạt trắng vướng víu trong cổ họng và quy trình gạt bỏ sỏi amidan bằng dụng cụ chuyên dụng an toàn.', readTime: '4 phút', category: 'oral' },
    { id: 9, title: '3 Bước Thiết Kế Phòng Ngủ Chống Dị Ứng Chuẩn Y Khoa', excerpt: 'Từ máy lọc khí HEPA mini đến xịt lợi khuẩn cắt nguồn da chết. Xây dựng môi trường ngủ trong lành cho trẻ em.', readTime: '6 phút', category: 'air' }
  ]
};

const ARTICLE_CONTENT = {
  1: `
    <h2>Màng sinh học biofilm trên lưỡi là gì?</h2>
    <p>Nếu bạn đứng trước gương, thè lưỡi ra và thấy một lớp phủ màu trắng hoặc vàng nhạt ở nửa sau của lưỡi, bạn đã tìm thấy "ổ chứa" vi khuẩn. Trong y khoa, lớp phủ này được gọi là màng sinh học (biofilm).</p>
    <p>Lớp màng này được dệt từ thức ăn thừa, tế bào lưỡi bong tróc và hàng triệu vi khuẩn kỵ khí. Những vi khuẩn này liên tục phân hủy các hợp chất hữu cơ và giải phóng các hợp chất sulfur dễ bay hơi (VSCs) có mùi hôi như trứng thối. Đây là nguyên nhân gốc rễ của hơn 90% trường hợp hôi miệng.</p>
    <blockquote>
      "Đánh răng chỉ làm sạch bề mặt cứng của răng. Nhưng lưỡi mới là chiếc thảm nhung xốp lưu giữ hầu hết vi khuẩn gây mùi trong khoang miệng."
    </blockquote>
    <h2>Tại sao bàn chải thông thường không thể làm sạch lưỡi?</h2>
    <p>Lông bàn chải được thiết kế để chà xát bề mặt cứng, phẳng của men răng. Khi dùng để chà lưỡi, chúng chỉ làm loang lổ màng bám vi khuẩn giữa các gai lưỡi xốp chứ không thể gạt bỏ được chúng. Đó là lý do bạn cần một dụng cụ cạo lưỡi inox chuyên dụng.</p>
    <p>Cạo lưỡi inox với thiết kế cong ôm sát bề mặt lưỡi sẽ gạt bỏ cơ học và kéo toàn bộ lớp màng biofilm bẩn ra ngoài chỉ sau 3-4 lần gạt nhẹ nhàng. Kết quả là hơi thở thơm mát tức thì.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg redirect-affiliate" data-product-id="2" data-product="Dụng Cụ Cạo Lưỡi Thép Không Gỉ" href="https://shopee.vn/search?keyword=cao+luoi+inox+304" target="_blank" rel="sponsored noopener">Tìm Dụng Cụ Cạo Lưỡi Inox Trên Shopee →</a>
    </div>
  `,
  2: `
    <h2>Điều gì đang ẩn trốn sâu trong nệm giường của bạn?</h2>
    <p>Chúng ta dành một phần ba cuộc đời trên giường ngủ. Mỗi đêm, cơ thể bong tróc khoảng 1.5 triệu tế bào da chết và tiết ra trung bình 200-300ml mồ hôi. Lớp da chết và độ ẩm này chìm sâu vào lõi đệm, biến chiếc giường thành thiên đường sinh sôi của ve bụi (mạt nhà) và nấm mốc.</p>
    <p>Ve bụi là sinh vật siêu nhỏ thuộc họ nhện, vô hình trước mắt thường. Bản thân ve bụi không cắn người, nhưng chất thải và xác của chúng là các tác nhân dị ứng cực mạnh gây kích ứng đường hô hấp và da.</p>
    <h2>Hệ quả của dị ứng phòng ngủ</h2>
    <p>Nếu bạn thường xuyên thức dậy với cảm giác ngứa mũi, hắt hơi liên tục, đỏ mắt hoặc nổi mẩn ngứa trên da, thủ phạm chính là phân mạt bụi tích tụ sâu dưới ga giường. Chỉ có máy hút bụi nệm UV-C với lực rung đập mạnh mới có thể giải phóng và hút sạch các hạt dị ứng siêu nhỏ này ra khỏi sợi vải.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg redirect-affiliate" data-product-id="9" data-product="Máy Hút Bụi Giường Nệm Diệt Khuẩn UV-C" href="https://shopee.vn/search?keyword=may+hut+bui+giuong+nem+uvc" target="_blank" rel="sponsored noopener">Xem Các Mẫu Máy Hút Bụi Nệm UV-C Phổ Biến →</a>
    </div>
  `,
  3: `
    <h2>Mũi của bạn lọc bụi như thế nào?</h2>
    <p>Khoang mũi không phải là một ống rỗng; đó là một hệ thống lọc tinh vi. Niêm mạc mũi luôn được bao phủ bởi một lớp nhầy mỏng và hàng triệu lông chuyển siêu nhỏ liên tục chuyển động để bẫy bụi bẩn, phấn hoa và vi khuẩn lơ lửng.</p>
    <p>Tuy nhiên, trong môi trường đô thị đầy bụi mịn PM2.5 và khí thải xe cộ, hệ thống lông chuyển này dễ dàng bị quá tải. Bụi bẩn tích tụ lâu ngày gây viêm mũi dị ứng, viêm xoang mãn tính và phá hủy hệ vi sinh đường hô hấp trên.</p>
    <h2>Lợi ích của việc rửa mũi bằng nước muối sinh lý ấm</h2>
    <p>Thay vì lạm dụng ngay thuốc kháng histamin hoặc thuốc xịt co mạch chứa steroid có hại, việc rửa sạch mũi cơ học bằng bình rửa mũi chuyên dụng giúp cuốn trôi các dị nguyên tích tụ, làm dịu niêm mạc xoang và phục hồi môi trường sinh học khỏe mạnh tự nhiên.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg redirect-affiliate" data-product-id="6" data-product="Bình Rửa Mũi Xoang & Muối Sinh Lý Ấm" href="https://shopee.vn/search?keyword=binh+rua+mui+xoang" target="_blank" rel="sponsored noopener">Tìm Bình Rửa Mũi Xoang Trên Shopee →</a>
    </div>
  `,
  4: `
    <h2>Nghịch lý của nước súc miệng diệt khuẩn mạnh</h2>
    <p>Khi hơi thở có mùi, thói quen phổ biến là súc miệng bằng các loại nước súc miệng diệt khuẩn mạnh chứa cồn. Đúng là nước súc miệng diệt khuẩn mạnh và tạo cảm giác mát lạnh tức thì. Nhưng đó lại là một sai lầm tai hại.</p>
    <p>Nước súc miệng diệt khuẩn mạnh hoạt động như một quả bom nguyên tử: tiêu diệt không chọn lọc cả lợi khuẩn lẫn hại khuẩn trong miệng. Khi hệ sinh thái bị phá hủy, vi khuẩn kỵ khí gây mùi sẽ nhân bản nhanh hơn lợi khuẩn gấp nhiều lần sau đó. Chúng nhanh chóng chiếm lĩnh khoang miệng, khiến hơi thở ngày càng nặng mùi hơn và buộc bạn phải phụ thuộc vào nước súc miệng.</p>
    <h2>Khô miệng làm tăng sinh vi khuẩn hại</h2>
    <p>Cồn trong nước súc miệng làm bay hơi nước bọt. Nước bọt là chất kháng khuẩn tự nhiên tốt nhất của cơ thể. Thiếu nước bọt, hại khuẩn càng có điều kiện hoành hành. Hãy chuyển sang cạo lưỡi cơ học và ngậm lợi khuẩn nha khoa để bảo vệ khoang miệng.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg redirect-affiliate" data-product-id="1" data-product="Viên Ngậm Lợi Khuẩn Nha Khoa K12/M18" href="https://shopee.vn/search?keyword=men+vi+sinh+nha+khoa+k12" target="_blank" rel="sponsored noopener">Xem Các Sản Phẩm Men Vi Sinh Nha Khoa →</a>
    </div>
  `,
  5: `
    <h2>Bẫy bụi ẩn sâu dưới lớp ga giường sạch sẽ</h2>
    <p>Nhiều người chăm chỉ giặt ga giường hàng tuần và tự tin rằng giường ngủ của mình hoàn toàn sạch sẽ. Thực tế, ga giường chỉ là một bộ lọc vải có nhiều lỗ xốp. Bụi mịn lơ lửng trong không khí và các tế bào da chết siêu nhỏ vẫn dễ dàng lọt qua các kẽ vải, chìm sâu vào lõi bông nệm dưới sức nén từ trọng lượng cơ thể bạn.</p>
    <p>Sau vài năm, lõi nệm trở thành một ổ chứa bụi mịn và mạt nhà khổng lồ mà chổi quét hay giặt bề mặt ga giường bên ngoài không bao giờ chạm tới được.</p>
    <blockquote>
      "Trọng lượng của một chiếc nệm có thể tăng gấp đôi sau 10 năm sử dụng chỉ do tích tụ tế bào da chết, ve bụi và chất thải của chúng!"
    </blockquote>
    <h2>Giải pháp đúng khoa học</h2>
    <p>Sử dụng máy hút bụi giường nệm có tích hợp đế rung đập tần số cao để đánh bật bụi mịn từ sâu trong sợi vải, kết hợp lực hút mạnh và màng lọc HEPA để giữ lại các hạt bụi siêu mịn nguy hiểm này.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg redirect-affiliate" data-product-id="9" data-product="Máy Hút Bụi Giường Nệm Diệt Khuẩn UV-C" href="https://shopee.vn/search?keyword=may+hut+bui+giuong+nem+uvc" target="_blank" rel="sponsored noopener">Xem Đề Xuất Máy Hút Bụi Nệm UV-C →</a>
    </div>
  `,
  6: `
    <h2>Mặt tối của chai xịt thơm phòng hóa học</h2>
    <p>Chai xịt hương chanh, quế hay xịt khử mùi giày thông thường hoạt động trên nguyên lý "che phủ mùi". Chúng khuếch tán các phân tử hương liệu mạnh để đánh lừa khứu giác của chúng ta tạm thời, ngăn ta cảm nhận được mùi hôi hữu cơ bên dưới.</p>
    <p>Khi các hạt hương thơm bay hơi hết, các phân tử gây mùi gốc amoniac hay sulfur vẫn nguyên vẹn ở đó, và mùi hôi lập tức quay lại. Chưa kể, hít nhiều hóa chất tạo mùi nhân tạo (phthalates) trong phòng kín gây hại cho niêm mạc phổi.</p>
    <h2>Khử mùi tận gốc bằng công nghệ enzyme sinh học</h2>
    <p>Khác với nước thơm hóa học, chai xịt enzyme sinh học chứa các enzyme hoạt tính (amylase, protease, lipase) cắt đứt trực tiếp các liên kết hữu cơ của phân tử mùi (phân hủy protein từ chất thải động vật, mồ hôi chân), biến đổi chúng vĩnh viễn thành các chất không mùi, lành tính.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg redirect-affiliate" data-product-id="10" data-product="Chai Xịt Khử Mùi Sinh Học Enzyme Tự Nhiên" href="https://shopee.vn/search?keyword=xit+khu+mui+enzyme+sinh+hoc" target="_blank" rel="sponsored noopener">Tìm Chai Xịt Enzyme Sinh Học Trên Shopee →</a>
    </div>
  `,
  7: `
    <h2>Tái thiết lập hệ vi sinh miệng bằng lợi khuẩn Streptococcus Salivarius K12</h2>
    <p>Nha khoa hiện đại đang chuyển dịch từ tư duy "diệt khuẩn vô trùng" sang "tái cân bằng sinh học". Khoang miệng khỏe mạnh là nơi sinh sống của hàng tỷ vi khuẩn, trong đó các lợi khuẩn đóng vai trò thiết yếu bảo vệ men răng và nướu.</p>
    <p>Nổi tiếng nhất trong các chủng lợi khuẩn nha khoa là <strong>Streptococcus salivarius K12</strong> (và M18). Chủng lợi khuẩn này được tìm thấy tự nhiên với mật độ cao ở những người có hơi thở rất thơm tho và hiếm khi bị sâu răng.</p>
    <h2>Cơ chế hoạt động của chủng K12</h2>
    <p>Khi bạn ngậm viên men vi sinh nha khoa sau khi vệ sinh răng miệng sạch sẽ, các lợi khuẩn K12 sẽ bám dính mạnh mẽ vào niêm mạc khoang miệng và gai lưỡi, cạnh tranh vị trí bám và thức ăn với hại khuẩn. Đồng thời, chúng tiết ra các peptide kháng khuẩn tự nhiên (bacteriocins) tiêu diệt chọn lọc các vi khuẩn gây mùi và gây sâu răng mà không gây tổn hại tế bào niêm mạc họng.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg redirect-affiliate" data-product-id="1" data-product="Viên Ngậm Lợi Khuẩn Nha Khoa K12/M18" href="https://shopee.vn/search?keyword=men+vi+sinh+nha+khoa+k12" target="_blank" rel="sponsored noopener">Mua Men Vi Sinh Nha Khoa K12 Trên Shopee →</a>
    </div>
  `,
  8: `
    <h2>Sỏi amidan là gì và tại sao chúng cực kỳ thối?</h2>
    <p>Amidan nằm ở hai bên thành họng, có bề mặt xù xì với nhiều hốc nhỏ gọi là hốc amidan. Khi chúng ta ăn uống, các mảnh vụn thức ăn nhỏ dễ bị lọt và mắc kẹt lại trong các hốc này.</p>
    <p>Theo thời gian, muối canxi lắng đọng kết hợp với vi khuẩn và tế bào chết tích tụ cứng lại thành các hạt nhỏ màu trắng hoặc vàng nhạt gọi là sỏi amidan (tonsilloliths). Sỏi amidan chứa lượng vi khuẩn kỵ khí cô đặc gấp 10 lần mảng bám răng, giải phóng khí methyl mercaptan có mùi tanh hôi kinh khủng khi bị bóp nát. Đây là lý do miệng bạn có mùi thối khó chịu dù răng không hề sâu.</p>
    <h2>Làm thế nào để lấy sỏi amidan an toàn?</h2>
    <p>Tuyệt đối không dùng ngón tay hoặc tăm bông chọc ngoáy sâu vào họng vì dễ làm rách niêm mạc và gây nhiễm trùng amidan. Bạn nên sử dụng bộ dụng cụ lấy sỏi chuyên dụng có đèn LED siêu sáng để soi rõ họng, dùng đầu hút Silicon mềm hoặc xi-lanh nước ấm để nhẹ nhàng gạt hoặc bơm nước đẩy sỏi ra ngoài.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg redirect-affiliate" data-product-id="4" data-product="Bộ Dụng Cụ Lấy Sỏi Amidan Có Đèn" href="https://shopee.vn/search?keyword=bo+lay+soi+amidan" target="_blank" rel="sponsored noopener">Xem Bộ Lấy Sỏi Amidan Có Đèn Trên Shopee →</a>
    </div>
  `,
  9: `
    <h2>Thiết kế phòng ngủ an toàn cho hệ hô hấp</h2>
    <p>Dị ứng đường hô hấp không chỉ gây khó chịu tức thời mà lâu dài còn dẫn tới viêm mũi phì đại hoặc hen suyễn mãn tính. Một phòng ngủ chuẩn y khoa cần loại bỏ hoàn toàn cả tác nhân dị ứng trôi nổi lẫn tích tụ.</p>
    <h2>Quy trình 3 bước chống dị ứng phòng ngủ hiệu quả</h2>
    <ol style="margin-left:20px; margin-bottom:20px; line-height:2;">
      <li><strong>Hút bụi sâu giường nệm hàng tuần:</strong> Dùng máy hút bụi nệm UV-C chuyên dụng để hút sạch ve bụi và phân mạt nhà trốn sâu dưới lõi bông.</li>
      <li><strong>Xịt lợi khuẩn kháng ve định kỳ:</strong> Xịt bào tử lợi khuẩn lên bề mặt vải ga gối để chúng tiêu thụ da chết hữu cơ, cắt đứt nguồn thức ăn của ve bụi.</li>
      <li><strong>Lọc khí liên tục:</strong> Đặt máy lọc không khí HEPA mini cạnh giường chạy chế độ ngủ 24/7 để giữ lại mọi bụi mịn PM2.5 và bào tử nấm mốc trôi nổi.</li>
    </ol>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg redirect-affiliate" data-product-id="7" data-product="Máy Lọc Không Khí HEPA Mini Phòng Ngủ" href="https://shopee.vn/search?keyword=may+loc+khong+khi+hepa+mini" target="_blank" rel="sponsored noopener">Xem Đề Xuất Máy Lọc Khí HEPA Mini →</a>
    </div>
  `
};
