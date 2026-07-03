function getRoute() {
  return window.location.hash.slice(1) || '/';
}

function navigate(path) {
  window.location.hash = path;
}

function initRouter() {
  window.addEventListener('hashchange', render);
  render();
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger-btn');
  if (menu) menu.classList.remove('open');
  if (btn) btn.classList.remove('open');
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger-btn');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}

function updateActiveNav(route) {
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('data-route');
    link.classList.toggle('active', href === route || (route === '/' && href === '/'));
  });
}

// --- RENDER DISPATCHER ---
function render() {
  const route = getRoute();
  const app = document.getElementById('app');
  closeMobileMenu();
  updateActiveNav(route);
  window.scrollTo(0, 0);

  let html = '';
  if (route.startsWith('/article/')) {
    html = renderArticle(route.split('/')[2]);
  } else {
    switch (route) {
      case '/products': html = renderProductsPage(); break;
      case '/learn': html = renderLearnPage(); break;
      case '/dashboard': html = renderDashboardPage(); break;
      case '/disclosure': html = renderDisclosurePage(); break;
      case '/privacy': html = renderPrivacyPage(); break;
      default: html = renderLandingPage();
    }
  }

  app.innerHTML = html;
  
  // Page-specific initialization scripts
  initScrollReveal();
  attachAffiliateListeners();
  if (route === '/') initQuiz();
  if (route === '/products') initFilters();
  if (route === '/dashboard') initDashboard();
}
// --- AFFILIATE INTERACTION LISTENER ---
function attachAffiliateListeners() {
  const mergedLinks = Object.assign({}, window.CUSTOM_AFFILIATE_LINKS || {}, appState.customLinks || {});
  
  document.querySelectorAll('.redirect-affiliate, .card a[href*="shopee.vn"], .kit-card a[href*="shopee.vn"], .modal-footer a[href*="shopee.vn"]').forEach(link => {
    const pId = link.getAttribute('data-product-id');
    if (pId && mergedLinks[pId]) {
      link.href = mergedLinks[pId];
    } else {
      const productName = link.getAttribute('data-product') || link.closest('.card')?.querySelector('.t-h3')?.innerText || '';
      if (productName) {
        const prod = PRODUCTS.find(p => p.name.toLowerCase() === productName.toLowerCase());
        if (prod && mergedLinks[prod.id]) {
          link.href = mergedLinks[prod.id];
        }
      }
    }
    
    if (!link.dataset.listenerAttached) {
      link.dataset.listenerAttached = 'true';
      link.addEventListener('click', (e) => {
        const productName = link.getAttribute('data-product') || link.closest('.card')?.querySelector('.t-h3')?.innerText || 'sản phẩm';
        showToast(`Đang chuyển hướng đến cửa hàng tiếp thị liên kết cho ${productName}...`, '🛍️');
      });
    }
  });
}

const SCRIPT_TEMPLATES = {
  1: {
    name: 'Viên Ngậm Lợi Khuẩn Nha Khoa K12/M18',
    problem: {
      hook: 'Hơi thở có mùi dai dẳng dù đã đánh răng cạo lưỡi rất kỹ?',
      visual: 'Chỉ tay vào miệng với nét mặt tự ti khi đứng gần người khác, sau đó cầm hộp men vi sinh nha khoa lên.',
      vo: 'Rất nhiều bạn tâm sự đánh răng ngày 3 lần, dùng đủ tăm nước, nước súc miệng mà chỉ 15 phút sau là miệng lại hôi và chua. Lý do không phải do bạn vệ sinh kém, mà là do mất cân bằng vi sinh khoang miệng. Bạn đang dùng nước súc miệng diệt khuẩn mạnh diệt sạch cả lợi khuẩn, làm hại khuẩn kỵ khí sinh khí sulfur (mùi trứng thối) bùng phát mạnh mẽ hơn. Việc bổ sung trực tiếp lợi khuẩn K12/M18 dạng viên ngậm giúp cấy hàng tỷ vi khuẩn tốt bám vào niêm mạc miệng, tiêu diệt hại khuẩn tự nhiên và duy trì hơi thở thơm tho bền vững.',
      tips: 'Nên ngậm viên lợi khuẩn trực tiếp trước ống kính để minh họa sự tiện lợi. Nhấn mạnh cụm từ "cân bằng vi sinh" thay vì "diệt khuẩn vô trùng".'
    },
    myth: {
      hook: 'Sự thật: Nước súc miệng cồn cay nồng thực chất làm miệng bạn hôi hơn...',
      visual: 'Cầm chai nước súc miệng màu xanh súc sùng sục rồi nhăn mặt vì cay, sau đó lắc đầu và thay bằng hộp men vi sinh nha khoa.',
      vo: 'Chúng ta hay lầm tưởng nước súc miệng càng cay thì diệt khuẩn càng tốt, miệng càng thơm. Nhưng cồn trong nước súc miệng làm bay hơi nước bọt - vốn là chất diệt khuẩn tự nhiên tốt nhất của cơ thể. Khi hết cảm giác mát lạnh của cồn, hại khuẩn sẽ sinh sôi với tốc độ tên lửa vì không còn đối thủ cạnh tranh. Hãy dừng diệt khuẩn mù quáng. Bổ sung lợi khuẩn K12 và M18 là cách khoa học nhất để khoang miệng tự cân bằng sinh học và đẩy lùi mùi hôi họng.',
      tips: 'Tạo biểu cảm phóng đại khi súc miệng nước cay để kích thích người xem.'
    },
    science: {
      hook: 'Streptococcus salivarius K12 - Khắc tinh của vi khuẩn gây mùi hơi thở',
      visual: 'Hiển thị ảnh chụp nghiên cứu lâm sàng PubMed hoặc dùng hình vẽ vi khuẩn (hoặc mô hình), chỉ vào hộp viên ngậm chứa chủng K12.',
      vo: 'Streptococcus salivarius K12 là chủng lợi khuẩn khoang miệng đầu tiên được cấp bằng sáng chế trên thế giới. Nghiên cứu lâm sàng chứng minh chủng K12 tự sản sinh ra chất kháng khuẩn tự nhiên Salivaricin A và B, hoạt động như những chiến binh tiêu diệt chọn lọc hại khuẩn kỵ khí gây mùi và gây viêm amidan mà không phá hủy tế bào niêm mạc. Ngậm 1 viên mỗi tối sau khi vệ sinh răng miệng giúp bảo vệ hệ tai-mũi-họng vượt trội.',
      tips: 'Sử dụng tone giọng chuyên gia, thuyết phục, dẫn chứng nghiên cứu khoa học để tăng độ uy tín.'
    }
  },
  2: {
    name: 'Dụng Cụ Cạo Lưỡi Thép Không Gỉ',
    problem: {
      hook: 'Thè lưỡi ra trước gương và kiểm tra xem có lớp bợn trắng này không...',
      visual: 'Đứng trước gương thè lưỡi, dùng cây cạo lưỡi inox gạt nhẹ 2-3 đường để thấy lớp bợn trắng nhầy bám trên cây cạo lưỡi.',
      vo: 'If lưỡi bạn bị phủ một lớp màng trắng dày thì đó chính là biofilm - tổ ấm của 90% vi khuẩn gây hôi miệng kỵ khí. Đánh răng thông thường chỉ làm sạch bề mặt răng mà bỏ qua lưỡi. Dùng bàn chải chà lưỡi thì chỉ làm vi khuẩn loang ra chứ không gạt sạch được. Một cây cạo lưỡi inox y tế cong sát bề mặt sẽ gạt trọn vẹn lớp nhầy hôi rình này ra ngoài chỉ sau 3 giây. Hơi thở nhẹ nhõm lập tức!',
      tips: 'Hình ảnh cạo lưỡi lấy ra bợn trắng có tính trực quan và kích thích tò mò cực kỳ cao. Hãy quay thật cận cảnh và rõ nét.'
    },
    myth: {
      hook: 'Dùng bàn chải đánh răng chà lưỡi là sai lầm làm vi khuẩn bám sâu hơn...',
      visual: 'Dùng bàn chải chọc sâu vào họng chà lưỡi gây buồn nôn, sau đó giơ cây cạo lưỡi inox thay thế.',
      vo: 'Lông bàn chải rất mềm và nhọn, thiết kế để cọ sạch răng cứng. Khi dùng chà lên bề mặt lưỡi xốp như thảm nhung, nó sẽ đẩy cặn thức ăn và vi khuẩn lún sâu vào các kẽ gai lưỡi, đồng thời gây kích ứng buồn nôn. Cây cạo lưỡi inox bản rộng sẽ gạt phẳng, quét sạch màng biofilm mà không gây đau hay buồn nôn. Vừa vệ sinh vừa dùng được trọn đời không hỏng!',
      tips: 'Diễn tả chân thực động tác buồn nôn khi dùng bàn chải đánh răng chà lưỡi để người xem đồng cảm.'
    },
    science: {
      hook: 'Cơ chế loại bỏ màng sinh học biofilm vật lý trên gai lưỡi',
      visual: 'Sử dụng mô hình hoặc vẽ phác họa bề mặt gai lưỡi lồi lõm chứa thức ăn thừa, sau đó miêu tả hành động gạt cơ học.',
      vo: 'Khoa học chứng minh vi khuẩn kỵ khí sản sinh hợp chất sulfur dễ bay hơi (VSC) ẩn nấp dưới màng biofilm dày trên nhú lưỡi. Việc cạo lưỡi vật lý bằng thép y tế làm phá vỡ màng sinh học này, loại bỏ cơ học nguồn thức ăn hữu cơ và hại khuẩn, làm giảm tức thì 75% nồng độ VSC gây mùi hôi miệng so với chỉ 45% khi dùng bàn chải thông thường.',
      tips: 'Nhấn mạnh cụm từ viết tắt khoa học VSC (Volatile Sulfur Compounds) để tăng tính chuyên môn.'
    }
  },
  3: {
    name: 'Máy Tăm Nước Cầm Tay Chuyên Dụng',
    problem: {
      hook: 'Tăm tre đang tàn phá nướu răng của bạn và tạo ra ổ mùi hôi thối...',
      visual: 'Cầm tăm tre chọc răng gây chảy máu, nhăn mặt đau đớn, sau đó giơ máy tăm nước phun tia nước mạnh mẽ.',
      vo: 'Mỗi lần ăn xong dùng tăm tre chọc kẽ răng vừa làm rộng kẽ răng, vừa làm xước chảy máu nướu, tạo ổ viêm nhiễm hôi rình. Đánh răng chỉ sạch 60% bề mặt răng, 40% thức ăn thừa kẹt ở kẽ răng bàn chải không chạm tới được. Hãy nhìn tia nước áp lực cao từ máy tăm nước này: nó len lỏi vào từng kẽ răng, bắn bay mọi mảng bám, thịt thừa kẹt sâu trong tích tắc. Răng miệng nhẹ nhõm, không lo sâu răng viêm nướu!',
      tips: 'Quay cảnh tia nước xịt bay hạt vừng hoặc mảng bám giả trên một mô hình răng hoặc kẽ tay để chứng minh lực xịt.'
    },
    myth: {
      hook: 'Đừng nghĩ rằng tăm nước chỉ dành cho người niềng răng...',
      visual: 'Người bình thường (không niềng răng) hào hứng dùng máy tăm nước phun ra các cặn thức ăn thừa sau bữa ăn.',
      vo: 'Nhiều người nghĩ răng thường không niềng thì dùng bàn chải là đủ. Nhưng thực tế cấu trúc răng kẽ khít luôn giữ lại mảng bám thức ăn mà tăm tre hay bàn chải chịu thua. Khi dùng tăm nước lần đầu, bạn sẽ sốc vì những vụn thức ăn hôi thối bắn ra dù trước đó đã đánh răng rất kỹ. Răng thường dùng tăm nước giúp ngăn chặn 99% cao răng tích tụ và phòng hôi miệng cực tốt.',
      tips: 'Cận cảnh đĩa chứa cặn thức ăn bắn ra sau khi dùng tăm nước (visual chứng thực mạnh).'
    },
    science: {
      hook: 'Lực xung động của nước giúp phá hủy màng bám vi khuẩn kẽ răng',
      visual: 'Show biểu đồ lực xung động nước (1400 - 1800 lần đập/phút) tác động vào vi khuẩn kẽ răng.',
      vo: 'Các nghiên cứu nha khoa chỉ ra rằng chỉ có áp lực xung động nước dao động từ 1400 đến 1800 lần mỗi phút mới đủ sức phá vỡ liên kết của các màng bám vi khuẩn (plaque) kẽ răng mà không làm tổn thương nướu. Đây là giải pháp an toàn thay thế tăm tre bảo vệ men răng và nướu toàn diện.',
      tips: 'Nhấn mạnh thông số kỹ thuật của máy (tần số xung nước, áp lực nước).'
    }
  },
  4: {
    name: 'Bộ Dụng Cụ Lấy Sỏi Amidan Có Đèn',
    problem: {
      hook: 'Hơi thở tanh hôi kỳ lạ dù không sâu răng? Rất có thể bạn có sỏi amidan...',
      visual: 'Soi đèn vào cổ họng há miệng to, chỉ vào góc amidan có đốm trắng vàng, dùng dụng cụ gạt nhẹ ra một hạt sỏi nhỏ xíu màu vàng.',
      vo: 'Có bao giờ bạn nuốt vướng, thỉnh thoảng khạc ra hạt nhỏ màu vàng như hạt cơm, bóp ra thấy mùi thối kinh khủng? Đó chính là sỏi amidan! Thức ăn thừa lọt vào các hốc amidan kẹt lại, vi khuẩn phân hủy hóa cứng thành sỏi. Nhiều người dùng tăm bông chọc ngoáy làm rách amidan chảy máu cực kỳ nguy hiểm. Bộ dụng cụ chuyên dụng có đèn LED soi rõ, đầu silicon siêu mềm và kim bơm rửa nước muối sẽ giúp bạn gạt nhẹ nhàng hạt sỏi ra ngoài cực kỳ an toàn và êm ái.',
      tips: 'Cảnh khạc hoặc gạt sỏi amidan cực kỳ hút view vì kích thích tò mò và cảm giác thỏa mãn (satisfying). Hãy làm cẩn thận để tránh phản cảm.'
    },
    myth: {
      hook: 'Hôi miệng do dạ dày? 90% bạn bị đổ oan, thủ phạm nằm ngay cổ họng...',
      visual: 'Chỉ tay vào bụng lắc đầu, sau đó chỉ tay vào cổ họng gật đầu và giơ bộ dụng cụ lấy sỏi amidan.',
      vo: 'Khi bị hôi miệng kéo dài, người ta hay đổ cho đau dạ dày, hở van dạ dày. Thực tế dạ dày là đường một chiều chứa axit, van đóng kín nên hiếm khi bay mùi lên họng trừ khi trào ngược nặng. Thủ phạm thực sự là sỏi amidan ẩn náu trong các hốc họng của bạn. Chỉ cần dùng bộ dụng cụ đèn LED này gạt sạch sỏi và súc họng thường xuyên, hơi thở của bạn sẽ thơm tho trở lại ngay lập tức!',
      tips: 'Lập luận logic đánh đổ quan điểm cũ để người xem tin tưởng hành động.'
    },
    science: {
      hook: 'Tại sao hốc amidan lại là ổ chứa vi khuẩn kỵ khí tạo khí lưu huỳnh?',
      visual: 'Vẽ phác thảo giải phẫu amidan có cấu trúc hốc rãnh, mô tả thức ăn tích tụ và vi khuẩn phân hủy sinh khí gas.',
      vo: 'Amidan có cấu tạo sinh học gồm nhiều hốc sâu. Đây là môi trường kỵ khí hoàn hảo cho vi khuẩn Actinomyces và Fusobacterium phát triển. Chúng tiêu thụ thức ăn thừa, vôi hóa và giải phóng khí hydro sulfide có mùi đặc trưng như trứng thối. Việc vệ sinh cơ học bằng dụng cụ chuyên dụng là cách duy nhất loại bỏ tận gốc dị vật này.',
      tips: 'Sử dụng hình ảnh giải phẫu y khoa đơn giản để minh họa.'
    }
  },
  5: {
    name: 'Kẹo Ngậm Xylitol Nha Khoa Bảo Vệ Men Răng',
    problem: {
      hook: 'Thèm ăn vặt, thèm ngọt nhưng sợ sâu răng và chua miệng sau khi ăn?',
      visual: 'Đang làm việc thèm ngọt, định ăn kẹo thường thì nhìn răng sâu sợ hãi, sau đó mở hộp kẹo ngậm Xylitol ăn hào hứng.',
      vo: 'Sau khi ăn trưa hoặc uống cà phê, vi khuẩn trong miệng sẽ lên men đường tạo axit phá hủy men răng và gây mùi hôi chua cực khó chịu. Nếu không tiện đánh răng ngay lúc đó, hãy ngậm 2 viên kẹo Xylitol nha khoa. Vừa thỏa mãn cơn thèm ngọt, vừa kích thích tiết nước bọt trung hòa axit, lại tiêu diệt vi khuẩn gây sâu răng cực kỳ hiệu quả.',
      tips: 'Bối cảnh văn phòng năng động, tiện lợi bỏ túi mang đi.'
    },
    myth: {
      hook: 'Kẹo cao su thông thường có thực sự làm sạch răng hay đang phá hủy răng?',
      visual: 'Lắc đầu trước kẹo cao su chứa đường hóa học phổ biến, gật đầu lựa chọn kẹo ngậm Xylitol 100% tự nhiên.',
      vo: 'Nhiều người nghĩ nhai kẹo cao su có đường giúp thơm miệng sạch răng. Nhưng lượng đường trong đó lại là nguồn thức ăn nuôi vi khuẩn Streptococcus mutans sinh sôi tạo axit làm mòn men răng. Hãy chuyển sang kẹo ngậm chứa 100% đường gỗ Xylitol tự nhiên - chất mà vi khuẩn sâu răng ngậm vào nhưng không thể tiêu hóa được, khiến chúng bị bỏ đói và chết dần.',
      tips: 'Nhấn mạnh cơ chế "đánh lừa và bỏ đói vi khuẩn" của Xylitol.'
    },
    science: {
      hook: 'Cơ chế ức chế sâu răng sinh học của đường gỗ Xylitol',
      visual: 'Show hình minh họa cấu trúc phân tử Xylitol 5-carbon so với đường sucrose 6-carbon truyền thống.',
      vo: 'Vi khuẩn sâu răng chỉ lên men được đường 6-carbon. Xylitol có cấu trúc 5-carbon độc đáo khiến vi khuẩn không thể chuyển hóa tạo axit. Ngậm Xylitol đều đặn giúp giảm 80% mảng bám, thúc đẩy quá trình tái khoáng hóa men răng tự nhiên nhờ tăng tiết nước bọt giàu canxi.',
      tips: 'Tập trung giải thích sự khác biệt hóa học dễ hiểu cho người xem.'
    }
  },
  6: {
    name: 'Bình Rửa Mũi Xoang & Muối Sinh Lý',
    problem: {
      hook: 'Ngạt mũi dị ứng, chảy dịch mũi xuống họng làm hơi thở tanh hôi khó chịu?',
      visual: 'Dùng tay day mũi, sụt sịt khó thở mệt mỏi, sau đó cầm bình rửa mũi dốc nhẹ nước chảy từ mũi này sang mũi kia êm ái.',
      vo: 'Mùa bụi mịn dị ứng này, mũi bạn liên tục tiết dịch nhầy giữ bụi bặm tạo đờm ở cổ họng, vừa gây khó thở vừa gây mùi hơi thở tanh cực kỳ. Đừng lạm dụng thuốc xịt co mạch vì dùng lâu sẽ làm teo niêm mạc mũi. Hãy rửa mũi bằng muối sinh lý ấm bằng bình rửa chuyên dụng. Áp lực nước nhẹ nhàng làm sạch mọi bụi bẩn, phấn hoa tích tụ sâu trong xoang mũi, giúp thở thông thoáng ngay trực tiếp.',
      tips: 'Quay thực tế động tác rửa mũi không bị sặc (ngẩng đầu phù hợp, há miệng thở bằng miệng).'
    },
    myth: {
      hook: 'Rửa mũi bằng xilanh tự chế - coi chừng rách niêm mạc xoang mũi trẻ...',
      visual: 'Cầm xilanh sắc nhọn nguy hiểm lắc đầu, chuyển sang bình rửa mũi silicon đầu cong mềm mại an toàn.',
      vo: 'Nhiều mẹ vẫn dùng xilanh y tế đầu nhọn bơm mạnh nước muối vào mũi con. Lực bơm không kiểm soát dễ làm tổn thương tai giữa gây viêm tai giữa nguy hiểm, và đầu nhọn làm rách niêm mạc mũi nhạy cảm. Bình rửa mũi chuyên dụng có van điều hòa lực nước tự động chảy êm dịu, đầu silicon y tế bo tròn an toàn tuyệt đối giúp làm sạch xoang dịu nhẹ.',
      tips: 'Cảnh báo phụ huynh cảnh giác để thu hút lượt chia sẻ cao từ các mẹ bỉm sữa.'
    },
    science: {
      hook: 'Tác động của nước muối đẳng trương lên hệ lông chuyển niêm mạc mũi',
      visual: 'Hình vẽ kính hiển vi lông chuyển chuyển động nhịp nhàng đẩy chất nhầy ra ngoài xoang mũi.',
      vo: 'Nước muối sinh lý đẳng trương 0.9% có độ pH tương đương dịch cơ thể, làm lỏng dịch nhầy đặc quánh và phục hồi tần số đập của hệ lông chuyển niêm mạc mũi. Điều này giúp xoang mũi tự làm sạch bụi mịn PM2.5 tự nhiên hiệu quả gấp nhiều lần thuốc kháng sinh.',
      tips: 'Giải thích thuật ngữ "muối đẳng trương" và "hệ lông chuyển".'
    }
  },
  7: {
    name: 'Máy Lọc Không Khí HEPA Mini Phòng Ngủ',
    problem: {
      hook: 'Thức dậy ngột ngạt nghẹt mũi, hắt hơi liên tục mỗi sáng?',
      visual: 'Thức dậy uể oải, hắt hơi liên tục, chỉ tay vào không khí đầy bụi lơ lửng dưới ánh nắng chiếu qua cửa sổ, bật máy lọc không khí HEPA mini.',
      vo: 'Bạn nghĩ đóng cửa kính phòng ngủ là sạch bụi? Thực chất bụi mịn PM2.5, mạt bụi nhà lơ lửng bám đầy chăn ga gối nệm liên tục bay vào phổi khi bạn nằm ngủ. Đây là nguyên nhân gây nghẹt mũi hắt hơi mỗi sáng. Một chiếc máy lọc HEPA mini để ngay đầu giường hoạt động êm ái sẽ hút sạch 99.9% hạt bụi mịn, phấn hoa, giúp bạn có giấc ngủ sâu thông thoáng, thức dậy sảng khoái.',
      tips: 'Quay cận cảnh luồng khói bụi bị hút thẳng vào máy lọc không khí hoặc màng lọc bám bụi đen sau 1 tháng sử dụng.'
    },
    myth: {
      hook: 'Máy lọc không khí to đùng đặt ở phòng khách không bảo vệ được giấc ngủ của bạn...',
      visual: 'Chỉ tay vào máy lọc to phòng khách xa xôi, sau đó ôm máy lọc mini đặt ngay cạnh tủ đầu giường ngủ.',
      vo: 'Nhiều nhà mua máy lọc không khí công suất lớn đặt ở phòng khách và nghĩ cả nhà sạch. Nhưng khi ngủ, cửa phòng đóng kín, máy lọc phòng khách không thể xử lý bụi mịn phát sinh từ chăn nệm đầu giường bạn. Bạn cần một chiếc máy lọc mini chuyên dụng đặt sát vùng thở đầu giường ngủ để bảo vệ lá phổi suốt 8 tiếng ban đêm.',
      tips: 'Giải thích nguyên lý "vùng thở đầu giường" để tạo nhu cầu mua máy phụ trợ.'
    },
    science: {
      hook: 'Màng lọc True HEPA H13 giữ hạt bụi mịn PM0.3 như thế nào?',
      visual: 'Sơ đồ phóng to các sợi màng lọc HEPA giữ lại bụi mịn qua cơ chế chặn, va chạm và khuếch tán.',
      vo: 'Màng lọc HEPA tiêu chuẩn H13 được dệt từ các sợi thủy tinh siêu mảnh xếp ngẫu nhiên. Nó có thể giữ lại các hạt dị nguyên nhỏ đến 0.3 micromet (nhỏ hơn cả bụi PM2.5) với hiệu suất 99.97%. Đảm bảo không khí đi vào phổi hoàn toàn sạch khuẩn, sạch bụi.',
      tips: 'Giải thích thông số "HEPA H13" để chứng minh chất lượng lọc.'
    }
  },
  8: {
    name: 'Chai Xịt Vi Sinh Kháng Ve Bụi Giường Nệm',
    problem: {
      hook: 'Ngứa ngáy châm chích khắp người khi nằm trên giường nệm dù mới giặt ga?',
      visual: 'Nằm trên giường gãi tay gãi lưng khó chịu, cầm chai xịt vi sinh phun đều lên bề mặt gối và nệm.',
      vo: 'Mỗi tối nằm giường thấy ngứa ngáy châm chích như có con gì bò trên da? Đó chính là hàng triệu con ve bụi đang ăn tế bào da chết rụng ra từ người bạn. Giặt ga giường không ăn thua vì chúng trốn sâu dưới lõi nệm. Xịt hóa chất diệt ve thì độc hại cho da khi nằm lên. Giải pháp sinh học là xịt bào tử lợi khuẩn Bacillus này. Lợi khuẩn nảy mầm ăn sạch da chết hữu cơ, cắt đứt nguồn sống duy nhất của ve bụi, giúp giường nệm sạch sẽ, hết ngứa ngáy tự nhiên!',
      tips: 'Quay động tác xịt sương nhẹ nhàng lên nệm. Nhấn mạnh từ "kháng ve sinh học" an toàn cho trẻ nhỏ.'
    },
    myth: {
      hook: 'Sai lầm tai hại: Xịt cồn diệt ve bụi nệm chỉ làm chúng sinh sôi nhanh hơn...',
      visual: 'Cầm chai cồn 90 độ xịt lên nệm lắc đầu, giơ chai xịt lợi khuẩn vi sinh gật đầu đồng ý.',
      vo: 'Nhiều người lấy cồn hoặc nước tẩy xịt lên giường nệm mong diệt mạt ve bụi. Cồn bay hơi nhanh làm khô nệm tạm thời nhưng chất thải ve bụi vẫn còn đó và tạo độ ẩm ẩm mốc sâu bên trong khi gặp mồ hôi cơ thể, nuôi dưỡng trứng ve bụi nở nhanh hơn. Hãy dùng lợi khuẩn ăn da chết để giải quyết triệt để chuỗi thức ăn của ve bụi một cách thông minh lành tính.',
      tips: 'Gây tò mò với tuyên bố cồn làm ve bụi đẻ nhiều hơn.'
    },
    science: {
      hook: 'Cơ chế cạnh tranh nguồn thức ăn sinh học đối kháng ve bụi',
      visual: 'Vẽ phác thảo hoạt động đối kháng: lợi khuẩn Bacillus ăn da chết hữu cơ, chặn đường hấp thụ của ve bụi mạt nệm.',
      vo: 'Bào tử lợi khuẩn chủng Bacillus subtilis sinh trưởng cực mạnh trên sợi vải hữu cơ. Chúng tiết enzyme tiêu hóa lớp biểu bì da người rụng trên nệm nhanh hơn ve bụi gấp hàng chục lần. Bị bỏ đói cơ học, quần thể ve bụi nhà (Dermatophagoides) tự suy giảm 90% chỉ sau 2 tuần phun xịt định kỳ.',
      tips: 'Giải thích cơ chế tự nhiên bền vững không dùng hóa chất độc hại.'
    }
  },
  9: {
    name: 'Máy Hút Bụi Giường Nệm Diệt Khuẩn UV-C',
    problem: {
      hook: 'Xem chiếc máy này hút ra đống gì từ chiếc giường nhìn tưởng cực sạch của bạn...',
      visual: 'Đưa máy hút bụi nệm chạy vài đường trên chiếc nệm trắng tinh, sau đó mở khay chứa bụi ra thấy một cục bụi xơ trắng xóa dơ bẩn.',
      vo: 'Đây là chiếc giường mình mới thay ga hôm qua, nhìn rất sạch đúng không? Bây giờ mình sẽ dùng máy hút nệm UV này hút thử xem nhé. Lực rung đập liên tục của máy sẽ đánh bật toàn bộ bụi mịn ẩn sâu trong bông nệm ra ngoài. Nhìn xem này! Đống bụi xám xịt mịn như bột này chứa hàng triệu tế bào da chết, sợi bông và phân ve bụi - nguyên nhân gây ho khan, viêm mũi dị ứng của cả nhà đó. Hút nệm ngay hôm nay đi nhé!',
      tips: 'Cận cảnh tháo hộp bụi bẩn thỉu xám xịt chính là phân đoạn đắt giá nhất giúp chuyển đổi mua hàng cao nhất. Quay cận cảnh hộp bụi dưới ánh sáng rõ nét.'
    },
    myth: {
      hook: 'Phơi nắng đập nệm dọn bụi - Bạn đang tự đầu độc phổi của mình đấy!',
      visual: 'Vác nệm ra ban công dùng cây đập bụi bay mù mịt rồi ho sặc sụa, sau đó chuyển sang dùng máy hút bụi nệm UV tại giường.',
      vo: 'Nhiều người vẫn giữ thói quen vác chăn nệm ra sân dùng gậy đập bụi cho sạch. Hành động đập này làm các hạt bụi mịn, phấn hoa bay tán loạn vào không khí tạo thành đám mây bụi độc hại bao quanh bạn để bạn hít trực tiếp vào phế quản. Dùng máy hút nệm có màng lọc HEPA khóa chặt bụi bẩn tại chỗ mới là cách vệ sinh hiện đại bảo vệ sức khỏe phổi.',
      tips: 'Diễn cảnh ho sặc sụa chân thực khi đập bụi để tạo độ tương phản.'
    },
    science: {
      hook: 'Tại sao tia UV-C 253.7nm lại diệt được mầm bệnh nệm giường?',
      visual: 'Sơ đồ tia cực tím UV-C tác động vào nhân tế bào vi khuẩn phá hủy cấu trúc xoắn DNA kép.',
      vo: 'Tia UV-C bước sóng 253.7 nanomet phát ra năng lượng cao xuyên qua vách tế bào vi sinh vật, phá vỡ cấu trúc DNA/RNA khiến chúng mất khả năng nhân đôi và chết lập tức. Kết hợp lực đập rung 10.000 lần/phút giải phóng các hạt bụi siêu bám dính để lực hút lốc xoáy thu gom hoàn toàn.',
      tips: 'Làm nổi bật thông số "UV-C diệt khuẩn đạt chứng nhận y tế".'
    }
  },
  10: {
    name: 'Chai Xịt Khử Mùi Sinh Học Enzyme',
    problem: {
      hook: 'Mùi nước tiểu chó mèo, mùi giày ẩm mốc ám ảnh phòng kín của bạn?',
      visual: 'Bước vào phòng nhăn mặt bịt mũi vì mùi hôi thú cưng, sau đó cầm chai xịt vi sinh enzyme phun lên vết bẩn ẩm mốc.',
      vo: 'Nuôi thú cưng trong phòng kín hoặc giày thể thao đi mưa về cực kỳ ám mùi hôi ammoniac tanh nồng khó chịu. Lau nước lau sàn thông thường chỉ che phủ mùi tạm thời. Xịt nước hoa thì tạo thành hỗn hợp mùi hắc và hôi nồng nặc hơn. Chai xịt khử mùi sinh học chứa các enzyme tự nhiên này sẽ bẻ gãy phân tử mùi hôi hữu cơ ngay lập tức, chuyển hóa thành nước và CO2 không mùi. An toàn cho cả thú cưng và em bé!',
      tips: 'Quay cảnh xịt trực tiếp vào ổ nằm của chó mèo hoặc bên trong chiếc giày ẩm mốc.'
    },
    myth: {
      hook: 'Xịt nước hoa phòng để khử mùi hôi: Sai lầm tai hại rước hóa chất vào phổi...',
      visual: 'Xịt nước hoa xịt phòng liên tục rồi ho khan, lắc đầu chê bai hóa chất độc hại, chuyển sang xịt khử mùi enzyme sinh học từ dứa.',
      vo: 'Nhiều người nghĩ phòng hôi thì cứ xịt nước hoa cho thơm. Thực chất hương liệu hóa học chỉ đánh lừa khứu giác tạm thời, không tiêu diệt được phân tử mùi hữu cơ đang phân hủy. Hít phải các chất hóa học tạo hương nhân tạo (phthalates) trong không gian kín rất hại cho phổi của trẻ nhỏ. Hãy dùng enzyme sinh học phân hủy trực tiếp phân tử mùi gốc protein, khử mùi tự nhiên hoàn toàn lành tính.',
      tips: 'Tạo tình huống so sánh giữa hương liệu hóa học nhân tạo với enzyme tự nhiên.'
    },
    science: {
      hook: 'Cơ chế xúc tác thủy phân protein mùi hôi của enzyme hoạt tính',
      visual: 'Vẽ hoạt động xúc tác khóa-chìa: enzyme gắn vào phân tử mùi protein, cắt đứt phân tử thành axit amin nhỏ không mùi.',
      vo: 'Enzyme sinh học hoạt động như chất xúc tác sinh học tốc độ cao. Enzyme Protease thủy phân liên kết peptid của phân tử mùi gốc protein từ chất thải động vật, trong khi Lipase phân hủy chất béo mồ hôi chân, giải quyết tận gốc nguồn phát mùi hôi mà không cần chất hóa học tẩy rửa mạnh.',
      tips: 'Đưa ra luận điểm khoa học thuyết phục về tác dụng xúc tác của enzyme.'
    }
  },
  11: {
    name: 'Men Vi Sinh Bào Tử Lợi Khuẩn Đường Ruột',
    problem: {
      hook: 'Bụng dạ yếu, ăn đồ lạ hải sản là đau bụng đi ngoài ngay lập tức?',
      visual: 'Ăn đồ ăn cay nóng hoặc hải sản xong ôm bụng đau đớn tìm nhà vệ sinh, sau đó uống một ống bào tử lợi khuẩn dạng lỏng.',
      vo: 'Có những người bụng dạ cực yếu, ăn uống đồ lạ, hải sản hay uống sữa là bụng sôi lên, chướng bụng đầy hơi cực kỳ khó chịu. Đó là dấu hiệu của loạn khuẩn đường ruột do lạm dụng kháng sinh hoặc ăn thực phẩm bẩn. Bổ sung bào tử lợi khuẩn Bacillus clausii giúp cấy trực tiếp vi khuẩn tốt vào ruột. Lớp vỏ bào tử bền vững giúp lợi khuẩn vượt qua axit dạ dày để nảy mầm bảo vệ đường tiêu hóa, chấm dứt tình trạng đi ngoài phân lỏng.',
      tips: 'Quay cảnh bẻ ống men vi sinh uống trực tiếp cực kỳ dễ dàng, nhanh chóng.'
    },
    myth: {
      hook: 'Tại sao uống men vi sinh dạng bột thông thường mãi bụng vẫn yếu?',
      visual: 'Đổ gói men bột thường lắc đầu, cầm ống men vi sinh dạng nước chứa bào tử lợi khuẩn gật đầu hài lòng.',
      vo: 'Men vi sinh dạng bột thông thường chứa các lợi khuẩn ở trạng thái hoạt động thường bị tiêu diệt đến 99% bởi axit dịch vị dạ dày có tính ăn mòn cao trước khi chạm đến ruột non. Bào tử lợi khuẩn (spore probiotics) ngủ đông có lớp vỏ keratin siêu bền giúp bảo vệ lợi khuẩn vượt qua axit dạ dày an toàn 100%. Nhờ đó đạt hiệu quả phục hồi đường ruột nhanh gấp nhiều lần.',
      tips: 'Nhấn mạnh sự khác biệt vật lý giữa "bào tử bảo vệ" và "lợi khuẩn thường".'
    },
    science: {
      hook: 'Độ bền sinh học của bào tử Bacillus clausii trước axit dạ dày pH 1.5',
      visual: 'Vẽ phác thảo lớp vỏ nhiều lớp bảo vệ bào tử vượt qua bể axit dạ dày rồi nảy mầm sinh sôi ở ruột non.',
      vo: 'Bào tử lợi khuẩn Bacillus clausii được chứng minh có khả năng chịu nhiệt tới 80 độ C và sống sót hoàn toàn trong môi trường axit mạnh pH 1.5 của dạ dày. Khi xuống ruột non, gặp điều kiện thuận lợi, chúng nảy mầm thành dạng hoạt động, sản sinh enzyme tiêu hóa và kích thích cơ thể sản sinh kháng thể IgA tự nhiên.',
      tips: 'Sử dụng các thông số khoa học uy tín (nhiệt độ chịu đựng, pH axit).'
    }
  },
  12: {
    name: 'Nước Lên Men Kombucha Hữu Cơ Vi Sinh',
    problem: {
      hook: 'Nghiện nước ngọt có ga nhưng sợ tăng cân, béo phì và tiểu đường?',
      visual: 'Cầm lon nước ngọt có ga định uống rồi thở dài nhìn cân nặng tăng, sau đó rót ly nước Kombucha lên men mát lạnh sủi bọt gas tự nhiên.',
      vo: 'Thời tiết nắng nóng ai cũng thèm một ly nước ngọt mát lạnh đầy ga sảng khoái. Nhưng uống nhiều nước ngọt chứa đầy đường hóa học gây béo phì, hỏng men răng và tàn phá hệ vi sinh đường ruột. Hãy thay thế bằng Kombucha lên men tự nhiên từ trà xanh hữu cơ. Vị chua ngọt thanh mát, ga sủi nhẹ tự nhiên từ quá trình lên men Scoby giúp giải khát tức thì, bổ sung axit amin, vitamin nhóm B hỗ trợ tiêu hóa thức ăn cực nhẹ bụng!',
      tips: 'Rót Kombucha ra ly thủy tinh cho thêm đá và lát chanh, quay tiếng ga sủi bọt xèo xèo hấp dẫn.'
    },
    myth: {
      hook: 'Sự thật về các loại nước ngọt không đường gắn mác ăn kiêng...',
      visual: 'Chỉ vào lon nước ngọt ăn kiêng (0 calo) lắc đầu cảnh báo, rót Kombucha organic gật đầu giới thiệu.',
      vo: 'Nhiều người nghĩ uống nước ngọt không đường ăn kiêng thì an toàn. Nhưng chất tạo ngọt nhân tạo trong đó (như aspartame) được chứng minh tàn phá nghiêm trọng hệ lợi khuẩn đường ruột, làm thay đổi quá trình chuyển hóa đường của cơ thể khiến bạn nhanh đói và thèm ngọt hơn. Kombucha lên men tự nhiên chứa đường mía hữu cơ đã được Scoby tiêu thụ gần hết trong quá trình lên men, tạo ga hữu cơ an toàn cho sức khỏe.',
      tips: 'Giải thích tác hại âm thầm của chất tạo ngọt nhân tạo để hướng người tiêu dùng đến đồ uống vi sinh tự nhiên.'
    },
    science: {
      hook: 'Quá trình cộng sinh Scoby tạo ra các axit hữu cơ có lợi cho gan',
      visual: 'Hình ảnh Scoby (Symbiotic Culture of Bacteria and Yeast) và sơ đồ lên men tạo axit gluconic và axetic.',
      vo: 'Kombucha lên men từ trà Scoby tạo ra hàm lượng cao axit gluconic và glucuronic. Hai chất này đóng vai trò quan trọng trong cơ chế thải độc của gan, liên kết trực tiếp với độc tố để đào thải ra ngoài cơ thể. Đồng thời, hàm lượng polyphenol dồi dào chống lại các gốc tự do gây hại.',
      tips: 'Giải thích thuật ngữ Scoby viết tắt của hệ cộng sinh vi khuẩn và nấm men.'
    }
  }
};

// --- LANDING PAGE RENDERING ---
function renderLandingPage() {
  return `
    <div class="page" id="page-landing">
      ${renderHeroSection()}
      ${renderQuizSection()}
      ${renderProblemSection()}
      ${renderCategoriesSection()}
      ${renderFeaturedSection()}
      ${renderCTABannerSection()}
    </div>
  `;
}

function renderHeroSection() {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero__badge"><span class="hero__badge-dot"></span> Microbiome Living Lab</div>
        <h1 class="t-hero hero__title">Nhà bạn không sạch.<br>Nó đang mất cân bằng vi sinh.</h1>
        <p class="hero__sub">Chúng ta lau chùi, sát trùng bừa bãi nhưng dị ứng vẫn tái phát, hôi miệng vẫn quay lại. Bí quyết không nằm ở việc tiêu diệt bừa bãi vi khuẩn, mà nằm ở sự cân bằng hệ sinh thái.</p>
        <div class="flex-center gap-12" style="flex-wrap: wrap;">
          <a class="btn btn--primary btn--lg" onclick="navigate('/products')">Tìm Kiếm Giải Pháp</a>
          <a class="btn btn--outline btn--lg" href="#quiz-anchor">Làm Trắc Nghiệm Vi Sinh</a>
        </div>
      </div>
    </section>
  `;
}

function renderQuizSection() {
  return `
    <section class="section quiz-section" id="quiz-anchor">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-header__eyebrow">Trắc nghiệm nhanh</span>
          <h2 class="t-h1">Tìm giải pháp vi sinh cho bạn</h2>
          <p class="section-header__desc t-body">Trả lời 3 câu hỏi trắc nghiệm nhanh để hệ thống gợi ý dòng sản phẩm vi sinh hoặc combo phù hợp nhất với vấn đề của bạn.</p>
        </div>
        
        <div class="quiz-card" id="quiz-box">
          <!-- Quiz steps injected dynamically by initQuiz() -->
        </div>
      </div>
    </section>
  `;
}

function renderProblemSection() {
  const blocks = [
    {
      icon: '🤧', title: 'Hắt Hơi & Dị Ứng Xoang',
      pain: 'Hắt hơi liên tục, nghẹt mũi dai dẳng, ngủ không sâu giấc',
      solution: 'Dọn dẹp hóa chất diệt sạch vi sinh có lợi, tạo điều kiện cho ve bụi bùng phát. Sử dụng giải pháp cân bằng không khí hô hấp để chấm dứt vòng lặp.'
    },
    {
      icon: '😮', title: 'Hôi Miệng & Nha Khoa',
      pain: 'Mùi hơi thở khó chịu quay lại chỉ vài phút sau khi súc miệng',
      solution: 'Nước súc miệng chứa cồn diệt bừa bãi khuẩn có lợi, kích hoạt vi khuẩn hôi miệng sinh trưởng nhanh hơn. Bổ sung lợi khuẩn nha khoa giúp ổn định lại pH.'
    },
    {
      icon: '🏠', title: 'Dọn Dẹp Vô Trùng Sai Cách',
      pain: 'Sát khuẩn mọi ngóc ngách nhưng người thân vẫn dễ ốm vặt',
      solution: 'Thuốc tẩy tạo bề mặt trống rỗng, vô hại khuẩn dễ phát triển nhanh nhất. Thay thế bằng xịt lau vi sinh giúp bảo phủ bề mặt bằng vi khuẩn có ích.'
    }
  ];
  return `
    <section class="section problem reveal">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-header__eyebrow">Nỗi đau thường gặp</span>
          <h2 class="t-h1">Chúng ta đang sống trong hệ sinh thái vi sinh vật</h2>
        </div>
        <div class="problem__grid mt-32">
          ${blocks.map(b => `
            <div class="problem__block" onclick="navigate('/products')">
              <div class="problem__block-header">
                <div class="problem__icon">${b.icon}</div>
                <h3 class="t-h3">${b.title}</h3>
              </div>
              <div class="problem__block-pain">${b.pain}</div>
              <div class="problem__block-solution">${b.solution}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderCategoriesSection() {
  return `
    <section class="section reveal">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-header__eyebrow">Danh mục giải pháp</span>
          <h2 class="t-h1">4 Trụ cột bảo vệ hệ vi sinh gia đình</h2>
        </div>
        <div class="grid grid-4 mt-20">
          ${CATEGORIES.map(c => `
            <div class="cat-card" onclick="navigate('/products')">
              <div class="cat-card__icon ${c.iconClass}">${c.icon}</div>
              <h3 class="t-h3">${c.name}</h3>
              <p class="t-small" style="margin-top:8px;">${c.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderFeaturedSection() {
  const featured = PRODUCTS.filter(p => p.featured);
  return `
    <section class="section reveal" style="background:var(--surface); border-top:1px solid var(--border); border-bottom:1px solid var(--border);">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-header__eyebrow">Khuyên dùng</span>
          <h2 class="t-h1">Sản phẩm nổi bật tuần này</h2>
          <p class="section-header__desc t-body">Được chọn lọc kỹ lưỡng dựa trên uy tín khoa học và tiềm năng cải thiện rõ rệt nỗi đau của người dùng.</p>
        </div>
        <div class="grid grid-3 mt-20">
          ${featured.map(p => renderProductCard(p)).join('')}
        </div>
        <div class="text-center mt-32">
          <a class="btn btn--outline" onclick="navigate('/products')">Xem Tất Cả Sản Phẩm →</a>
        </div>
      </div>
    </section>
  `;
}

function renderCTABannerSection() {
  return `
    <section class="section reveal">
      <div class="container">
        <div class="cta-banner">
          <h2 class="t-h1">Tìm hiểu kiến thức trước khi mua</h2>
          <p>Xem góc bài viết chia sẻ sâu về cơ chế khoa học, các bài viết vạch trần lầm tưởng dọn dẹp vô trùng để đầu tư ngân sách đúng đắn nhất.</p>
          <a class="btn" onclick="navigate('/learn')">Ghé Thăm Góc Kiến Thức →</a>
        </div>
      </div>
    </section>
  `;
}

// --- PRODUCT CARD (conversion-focused) ---
function renderProductCard(p) {
  const cat = CATEGORIES.find(c => c.id === p.category);
  const starsStr = '★'.repeat(Math.floor(p.trustScore)) + (p.trustScore % 1 >= 0.5 ? '½' : '');
  const imgHtml = p.image 
    ? `<img src="${p.image}" alt="${p.name}">` 
    : (cat ? cat.icon : '📦');
  
  return `
    <div class="card" onclick="showProductModal(${p.id})" style="cursor:pointer;" data-product-id="${p.id}">
      <div class="card__img">${imgHtml}</div>
      <div class="card__body">
        <span class="badge badge--${p.category}">${cat ? cat.name : p.category}</span>
        <h3 class="t-h3" style="margin-top:6px;">${p.name}</h3>
        
        <div class="card__pain">Nỗi đau: ${p.pain}</div>
        <div class="card__fix">❌ Cách thường hỏng: ${p.normalFail}</div>
        <div class="card__science">🧬 Cơ chế vi sinh: ${p.whyThisWorks}</div>
        
        <div class="card__price-range">
          <span>${p.priceRange}</span>
          <div class="card__trust-score">
            <span class="card__stars">${starsStr}</span>
            <span>(${p.reviews})</span>
          </div>
        </div>
        
        <a class="btn btn--primary btn--full mt-12 redirect-affiliate" data-product-id="${p.id}" data-product="${p.name}" href="${p.link || '#'}" target="_blank" rel="sponsored noopener" onclick="event.stopPropagation();">Kiểm Tra Giá Trên Shopee →</a>
      </div>
    </div>
  `;
}

// --- PRODUCTS PAGE ---
function renderProductsPage() {
  const cats = ['Tất cả', ...CATEGORIES.map(c => c.name)];
  return `
    <div class="page" id="page-products">
      ${renderStarterKitsSection()}
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-header__eyebrow">Tất cả sản phẩm</span>
            <h2 class="t-h1">Danh Sách Đề Xuất Vi Sinh</h2>
            <p class="section-header__desc t-body">Tất cả sản phẩm đều được kiểm định nguồn gốc y khoa, khoa học vi sinh sinh học, liên kết thẳng tới Shopee VN uy tín.</p>
          </div>
          
          <div class="search-bar-container">
            <div class="search-input-wrapper">
              <span class="search-icon">🔍</span>
              <input type="text" id="product-search-input" class="search-input" placeholder="Tìm theo tên sản phẩm, nỗi đau, hoạt chất hoặc từ khóa..." oninput="handleProductSearch()">
            </div>
          </div>

          <div class="filters" id="product-filters">
            ${cats.map((c, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${c === 'Tất cả' ? 'all' : c.toLowerCase()}">${c}</button>`).join('')}
          </div>
          <div class="grid grid-3" id="product-grid">
            ${PRODUCTS.map(p => `
              <div class="product-item" data-category="${p.category}">${renderProductCard(p)}</div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderStarterKitsSection() {
  return `
    <section class="section" style="background:var(--surface); border-bottom:1px solid var(--border);">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-header__eyebrow">Trải nghiệm combo</span>
          <h2 class="t-h1">Bộ sản phẩm khuyên dùng phối hợp</h2>
          <p class="section-header__desc t-body">Kết hợp các sản phẩm cơ học và sinh học bổ sung cho nhau để đem lại hiệu suất cải thiện cao nhất.</p>
        </div>
        <div class="grid grid-4 mt-20">
          ${STARTER_KITS.map(kit => `
            <div class="kit-card">
              <div class="kit-card__icon ${kit.iconClass}">${kit.icon}</div>
              <h3 class="kit-card__title" style="font-size: 1.1rem; margin-top: 8px;">${kit.name}</h3>
              <p class="kit-card__desc" style="font-size: 0.82rem; min-height: 54px;">${kit.desc}</p>
              <div class="kit-product-list mt-12 mb-16">
                ${kit.products.map(pName => {
                  const matchedProd = PRODUCTS.find(p => p.name === pName);
                  const prodId = matchedProd ? matchedProd.id : null;
                  return `
                    <div class="kit-product-item" ${prodId ? `onclick="showProductModal(${prodId})"` : ''}>
                      <span style="font-size:0.8rem; font-weight:500;">${pName}</span>
                      <span style="color:var(--primary); font-size:0.75rem;">🔍 Xem</span>
                    </div>
                  `;
                }).join('')}
              </div>
              <a class="btn btn--primary btn--full redirect-affiliate" data-product-id="kit_${kit.id}" data-product="${kit.name}" href="https://shopee.vn" target="_blank">Mua Combo Shopee →</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function handleProductSearch() {
  const query = document.getElementById('product-search-input')?.value.toLowerCase().trim() || '';
  const activeBtn = document.querySelector('#product-filters .filter-btn.active');
  let filter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
  
  const items = document.querySelectorAll('.product-item');
  items.forEach(item => {
    const pName = item.querySelector('.t-h3').textContent.toLowerCase();
    const product = PRODUCTS.find(p => p.name.toLowerCase() === pName);
    if (!product) return;
    
    let mappedFilter = filter;
    if (filter === 'không khí') mappedFilter = 'air';
    if (filter === 'nhà cửa') mappedFilter = 'home';
    if (filter === 'răng miệng') mappedFilter = 'oral';
    if (filter === 'đường ruột') mappedFilter = 'gut';
    
    const matchesCategory = mappedFilter === 'all' || product.category === mappedFilter;
    
    const searchFields = [
      product.name,
      product.pain,
      product.normalFail,
      product.whyThisWorks,
      product.ingredients || '',
      product.scientificBacking || ''
    ].map(f => f.toLowerCase());
    
    const matchesSearch = query === '' || searchFields.some(f => f.includes(query));
    
    if (matchesCategory && matchesSearch) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

function initFilters() {
  const btns = document.querySelectorAll('#product-filters .filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      handleProductSearch();
    });
  });
}

// --- PRODUCT DETAILS MODAL ---
function renderScriptDetails(productId, type) {
  const scriptTemplate = SCRIPT_TEMPLATES[productId];
  if (!scriptTemplate) return '';
  const item = scriptTemplate[type];
  if (!item) return '';

  return `
    <div class="script-step mt-4">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
        <strong style="color:var(--primary); font-size:0.82rem;">🪝 Hook 3 giây đầu:</strong>
        <button class="btn btn--ghost" style="padding:2px 8px; font-size:0.7rem; height:auto; min-height:unset;" onclick="copyScriptPart(${productId}, '${type}', 'hook')">📋 Copy</button>
      </div>
      <p style="background:var(--surface); border:1px solid var(--border); padding:8px 12px; border-radius:6px; font-style:italic; font-weight:500; color:var(--text-primary); margin-bottom:12px; font-size:0.8rem;">"${item.hook}"</p>
    </div>
    <div class="script-step mt-12">
      <strong style="color:var(--text-primary); font-size:0.82rem;">📹 Hình ảnh minh họa (Visual Storyboard):</strong>
      <p style="color:var(--text-secondary); margin-top:4px; line-height:1.4; font-size:0.8rem;">${item.visual}</p>
    </div>
    <div class="script-step mt-12">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
        <strong style="color:var(--primary); font-size:0.82rem;">🎙️ Lời thoại (Voiceover):</strong>
        <button class="btn btn--ghost" style="padding:2px 8px; font-size:0.7rem; height:auto; min-height:unset;" onclick="copyScriptPart(${productId}, '${type}', 'vo')">📋 Copy</button>
      </div>
      <p style="background:var(--surface); border:1px solid var(--border); padding:10px 14px; border-radius:6px; color:var(--text-primary); line-height:1.5; margin-bottom:12px; font-size:0.8rem; white-space:pre-line;">${item.vo}</p>
    </div>
    <div class="script-step mt-12" style="background:var(--primary-light); padding:10px; border-radius:6px; border:1px dashed var(--primary);">
      <strong style="color:var(--primary-dark); font-size:0.78rem;">💡 Mẹo quay dựng:</strong>
      <p style="color:var(--text-secondary); font-size:0.75rem; margin-top:2px; line-height:1.4;">${item.tips}</p>
    </div>
  `;
}

window.switchScriptTab = function(event, productId, type) {
  const container = document.getElementById(`script-container-${productId}`);
  if (container) {
    container.innerHTML = renderScriptDetails(productId, type);
  }
  
  // Update active sub-tab styling
  const tabContainer = event.currentTarget.parentElement;
  const tabs = tabContainer.querySelectorAll('.script-sub-tab');
  tabs.forEach(t => t.classList.remove('active'));
  event.currentTarget.classList.add('active');
};

window.copyToClipboard = function(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg || 'Đã sao chép vào bộ nhớ tạm!', '📋');
  }).catch(err => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || 'Đã sao chép vào bộ nhớ tạm!', '📋');
    } catch (e) {
      showToast('Không thể tự động sao chép, vui lòng sao chép thủ công.', '⚠️');
    }
    document.body.removeChild(textArea);
  });
};

window.copyScriptPart = function(productId, type, field) {
  const template = SCRIPT_TEMPLATES[productId];
  if (!template || !template[type] || !template[type][field]) return;
  const text = template[type][field];
  const label = field === 'hook' ? 'Hook' : 'Lời thoại';
  copyToClipboard(text, `Đã sao chép ${label}!`);
};

window.showProductModal = function(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;
  
  let overlay = document.querySelector('.modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }
  
  const cat = CATEGORIES.find(c => c.id === p.category);
  const scriptTemplate = SCRIPT_TEMPLATES[p.id];
  let scriptHTML = '';
  if (scriptTemplate) {
    scriptHTML = `
      <div class="modal-section mt-16" style="border-top:1px dashed var(--border); padding-top:16px;">
        <div class="modal-sub-title">🎬 Kịch bản video ngắn ăn khách (Short Script):</div>
        <div style="display:flex; gap:6px; margin-top:8px; margin-bottom:12px; overflow-x:auto; padding-bottom:4px;">
          <button class="btn btn--outline btn--small script-sub-tab active" style="font-size:0.72rem; padding: 4px 10px; min-height: unset; height: auto;" onclick="switchScriptTab(event, ${p.id}, 'problem')">Problem-based</button>
          <button class="btn btn--outline btn--small script-sub-tab" style="font-size:0.72rem; padding: 4px 10px; min-height: unset; height: auto;" onclick="switchScriptTab(event, ${p.id}, 'myth')">Myth-busting</button>
          <button class="btn btn--outline btn--small script-sub-tab" style="font-size:0.72rem; padding: 4px 10px; min-height: unset; height: auto;" onclick="switchScriptTab(event, ${p.id}, 'science')">Science-backed</button>
        </div>
        
        <div id="script-container-${p.id}" style="background:var(--surface-dark, #f8fafc); border:1px solid var(--border); border-radius:var(--radius); padding:14px; font-size:0.8rem;">
          ${renderScriptDetails(p.id, 'problem')}
        </div>
      </div>
    `;
  }
  
  overlay.innerHTML = `
    <div class="modal-card">
      <button class="modal-close" onclick="closeProductModal()">&times;</button>
      
      <div class="modal-header">
        <span class="badge badge--${p.category}">${cat ? cat.name : p.category}</span>
        <h3 class="t-h2 mt-8">${p.name}</h3>
        <div class="modal-price mt-4">Tầm giá: <strong>${p.priceRange}</strong></div>
      </div>
      
      <div class="modal-tabs">
        <button class="modal-tab active" onclick="switchModalTab(event, 'modal-overview-tab')">Tổng quan</button>
        <button class="modal-tab" onclick="switchModalTab(event, 'modal-science-tab')">Cơ chế khoa học</button>
        <button class="modal-tab" onclick="switchModalTab(event, 'modal-creator-tab')">Góc Content Creator</button>
      </div>
      
      <div class="modal-tab-content" id="modal-overview-tab">
        ${p.image ? `<div style="width:100%; height:180px; border-radius:var(--radius); overflow:hidden; margin-bottom:16px; border:1px solid var(--border);"><img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;"></div>` : ''}
        <div class="modal-section">
          <div class="modal-sub-title">❌ Vấn đề & Cách thường thất bại:</div>
          <p class="modal-text" style="color: var(--danger); font-weight: 500;">${p.normalFail}</p>
        </div>
        <div class="modal-section mt-16">
          <div class="modal-sub-title">🧬 Giải pháp vi sinh hoạt động ra sao:</div>
          <p class="modal-text">${p.whyThisWorks}</p>
        </div>
        <div class="modal-meta-grid" style="margin-top:20px;">
          <div class="modal-meta-item">
            <span class="modal-meta-label">Điểm tin cậy</span>
            <span class="modal-meta-val">⭐ ${p.trustScore} / 5 (${p.reviews} đánh giá)</span>
          </div>
          <div class="modal-meta-item">
            <span class="modal-meta-label">Thành phần chính</span>
            <span class="modal-meta-val">${p.ingredients || 'Thành phần sinh học an toàn'}</span>
          </div>
        </div>
      </div>
      
      <div class="modal-tab-content" id="modal-science-tab" style="display:none;">
        <div class="modal-section">
          <div class="modal-sub-title">🔬 Cơ sở y khoa & Bằng chứng lâm sàng:</div>
          <p class="modal-text" style="line-height: 1.6;">${p.scientificBacking || 'Được chứng minh giúp cải thiện và cân bằng hệ vi sinh cơ thể một cách tự nhiên.'}</p>
        </div>
        ${p.studyRef ? `
          <div class="modal-section mt-16" style="background:var(--primary-light); padding:12px; border-radius:6px; border:1px solid var(--border);">
            <div class="modal-sub-title" style="font-size:0.75rem; color:var(--primary); text-transform:uppercase; margin-bottom:4px;">Nghiên cứu lâm sàng tham chiếu:</div>
            <p class="modal-text" style="font-family: monospace; font-size:0.82rem; color:var(--text-secondary); font-weight:600;">🔗 ${p.studyRef}</p>
          </div>
        ` : ''}
      </div>
      
      <div class="modal-tab-content" id="modal-creator-tab" style="display:none;">
        <div class="modal-section">
          <div class="modal-sub-title" style="margin-bottom:12px;">📢 Ý tưởng Angle Content (Làm video ngắn):</div>
          
          <div class="content-angle-box">
            <strong>Góc 1: Khởi động nỗi đau (Problem-based)</strong>
            <p>"${p.contentAngles?.problem || 'Mô tả nỗi đau thực tế của khách hàng...'}"</p>
          </div>
          
          <div class="content-angle-box">
            <strong>Góc 2: Phá vỡ định kiến (Myth-busting)</strong>
            <p>"${p.contentAngles?.myth || 'Giải thích lầm tưởng tai hại khách hàng hay làm mỗi ngày...'}"</p>
          </div>
          
          <div class="content-angle-box">
            <strong>Góc 3: Hook giữ chân 3s đầu (TikTok Hook)</strong>
            <p style="font-weight:600;">"${p.contentAngles?.hook || 'Câu hook kích thích tò mò...'}"</p>
          </div>
        </div>
        
        ${scriptHTML}
      </div>
      
      <div class="modal-footer">
        <a class="btn btn--primary btn--full redirect-affiliate" data-product-id="${p.id}" data-product="${p.name}" href="${p.link}" target="_blank" rel="sponsored noopener">Kiểm Tra Giá Trên Shopee →</a>
      </div>
    </div>
  `;
  
  overlay.classList.add('open');
  attachAffiliateListeners();
  
  // Close modal when clicking outside the card
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeProductModal();
    }
  });
};

window.closeProductModal = function() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) overlay.classList.remove('open');
};

window.switchModalTab = function(event, tabId) {
  // Hide all tab content
  const contents = document.querySelectorAll('.modal-tab-content');
  contents.forEach(c => c.style.display = 'none');
  
  // Show target tab content
  document.getElementById(tabId).style.display = 'block';
  
  // Remove active class from all tabs
  const tabs = document.querySelectorAll('.modal-tab');
  tabs.forEach(t => t.classList.remove('active'));
  
  // Add active class to clicked tab
  event.currentTarget.classList.add('active');
};


// --- INTERACTIVE QUIZ LOGIC ---
function initQuiz() {
  appState.quiz.currentQuestion = 0;
  appState.quiz.answers = [];
  renderQuizStep();
}

function renderQuizStep() {
  const quizBox = document.getElementById('quiz-box');
  if (!quizBox) return;

  const currentIdx = appState.quiz.currentQuestion;
  
  if (currentIdx < QUIZ_QUESTIONS.length) {
    const progressPercent = Math.round((currentIdx / QUIZ_QUESTIONS.length) * 100);
    const q = QUIZ_QUESTIONS[currentIdx];
    
    quizBox.innerHTML = `
      <div class="quiz-progress">
        <div class="quiz-progress-bar" style="width: ${progressPercent}%"></div>
      </div>
      <div class="quiz-question">
        <span class="t-label">Câu hỏi ${currentIdx + 1}/${QUIZ_QUESTIONS.length}</span>
        <h3 class="t-h2 mt-12">${q.question}</h3>
      </div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" onclick="handleQuizAnswer('${opt.val}')">
            <span class="quiz-option-index" style="width: 24px; height:24px; border-radius: 50%; background:var(--primary-light); color:var(--primary); display:flex; align-items:center; justify-content:center; font-weight:700;">${String.fromCharCode(65 + i)}</span>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
    `;
  } else {
    quizBox.innerHTML = calculateQuizResult();
    attachAffiliateListeners();
  }
}

window.handleQuizAnswer = function(value) {
  appState.quiz.answers.push(value);
  appState.quiz.currentQuestion++;
  renderQuizStep();
  showToast('Đang xử lý câu trả lời...', '🔬');
};

function calculateQuizResult() {
  const [issue, budget, method] = appState.quiz.answers;
  
  let recommendedCombo = null;
  let recommendedProduct = null;
  
  if (issue === 'oral') {
    recommendedCombo = STARTER_KITS.find(k => k.id === 'breath');
    if (budget === 'low') {
      recommendedProduct = PRODUCTS.find(p => p.id === 2);
    } else if (method === 'biological') {
      recommendedProduct = PRODUCTS.find(p => p.id === 1);
    } else {
      recommendedProduct = PRODUCTS.find(p => p.id === 3);
    }
  } else if (issue === 'air') {
    recommendedCombo = STARTER_KITS.find(k => k.id === 'allergy');
    if (budget === 'low') {
      recommendedProduct = PRODUCTS.find(p => p.id === 6);
    } else if (method === 'mechanical') {
      recommendedProduct = PRODUCTS.find(p => p.id === 9);
    } else {
      recommendedProduct = PRODUCTS.find(p => p.id === 7);
    }
  } else if (issue === 'gut') {
    recommendedCombo = STARTER_KITS.find(k => k.id === 'gut');
    if (budget === 'low') {
      recommendedProduct = PRODUCTS.find(p => p.id === 12);
    } else {
      recommendedProduct = PRODUCTS.find(p => p.id === 11);
    }
  } else { // home
    recommendedCombo = STARTER_KITS.find(k => k.id === 'home');
    if (budget === 'low') {
      recommendedProduct = PRODUCTS.find(p => p.id === 8);
    } else if (method === 'biological') {
      recommendedProduct = PRODUCTS.find(p => p.id === 10);
    } else {
      recommendedProduct = PRODUCTS.find(p => p.id === 9);
    }
  }
  
  setTimeout(() => showToast('Chẩn đoán thành công! Gợi ý tối ưu sẵn sàng.', '🎉'), 100);

  return `
    <div class="quiz-progress">
      <div class="quiz-progress-bar" style="width: 100%"></div>
    </div>
    <div class="quiz-result-header">🎉 Kết quả chẩn đoán vi sinh hoàn tất!</div>
    <p class="t-body mb-24">Dựa vào khảo sát, bạn nên ưu tiên giải pháp sau để xử lý nhanh nhất vấn đề:</p>
    
    <div class="scorer-container text-left" style="text-align: left; display:grid; grid-template-columns: 1fr; gap: 20px;">
      <div class="card" style="padding: 24px;">
        <span class="badge badge--gut mb-12">Sản phẩm đề xuất hàng đầu</span>
        <h4 class="t-h3" onclick="showProductModal(${recommendedProduct.id})" style="cursor:pointer; text-decoration:underline; text-underline-offset:4px;">${recommendedProduct.name}</h4>
        <div class="card__pain mt-16"><strong>Nỗi đau:</strong> ${recommendedProduct.pain}</div>
        <div class="card__fix mt-8"><strong>Cơ chế vi sinh:</strong> ${recommendedProduct.whyThisWorks}</div>
        <a class="btn btn--primary btn--full mt-20 redirect-affiliate" data-product-id="${recommendedProduct.id}" data-product="${recommendedProduct.name}" href="${recommendedProduct.link}" target="_blank">Xem Sản Phẩm Shopee (${recommendedProduct.priceRange}) →</a>
      </div>
      
      <div class="card" style="padding: 24px; background:var(--primary-light); border-color: var(--primary);">
        <span class="badge badge--air mb-12">Giải pháp trọn bộ tối ưu</span>
        <h4 class="t-h3" style="color: var(--primary-dark); font-size:1.2rem;">${recommendedCombo.name}</h4>
        <p class="t-small mt-8" style="color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">${recommendedCombo.desc}</p>
        <div class="kit-product-list">
          ${recommendedCombo.products.map(pName => {
            const matchedProd = PRODUCTS.find(p => p.name === pName);
            const prodId = matchedProd ? matchedProd.id : null;
            return `
              <div class="kit-product-item" ${prodId ? `onclick="showProductModal(${prodId})"` : ''} style="background:var(--surface);">
                <span style="font-size:0.85rem; font-weight:500;">${pName}</span>
                <span style="color:var(--primary); font-size:0.75rem;">🔍 Xem chi tiết</span>
              </div>
            `;
          }).join('')}
        </div>
        <a class="btn btn--outline btn--full mt-20 redirect-affiliate" data-product-id="kit_${recommendedCombo.id}" data-product="${recommendedCombo.name}" href="https://shopee.vn" target="_blank">Mua Trọn Bộ Combo Shopee →</a>
      </div>
    </div>
    
    <button class="btn btn--ghost mt-24" onclick="initQuiz()">Thực hiện lại trắc nghiệm ↺</button>
  `;
}

// --- CONTENT HUB ---
function renderLearnPage() {
  return `
    <div class="page" id="page-learn">
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-header__eyebrow">Góc kiến thức vi sinh</span>
            <h1 class="t-h1">Kiến Thức Khoa Học Cho Gia Đình</h1>
            <p class="section-header__desc t-body">Cập nhật các bài phân tích sâu y khoa về hệ vi sinh vật gia đình, vạch trần lầm tưởng sạch vô trùng để xây dựng lối sống lành mạnh.</p>
          </div>

          <div class="mt-32 reveal">
            <h2 class="t-h2 mb-12">📚 Bài viết phân tích (Educational)</h2>
            <div class="grid grid-3">
              ${ARTICLES.educational.map(a => renderArticleCard(a)).join('')}
            </div>
          </div>

          <div class="mt-32 reveal">
            <h2 class="t-h2 mb-12">💡 Vạch trần lầm tưởng (Myth Busters)</h2>
            <div class="grid grid-3">
              ${ARTICLES.myths.map(a => renderArticleCard(a)).join('')}
            </div>
          </div>

          <div class="mt-32 reveal">
            <h2 class="t-h2 mb-12">🗺️ Hướng dẫn sản phẩm (Product Guides)</h2>
            <div class="grid grid-3">
              ${ARTICLES.guides.map(a => renderArticleCard(a)).join('')}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderArticleCard(a) {
  const cat = CATEGORIES.find(c => c.id === a.category);
  const badgeClass = cat ? `badge--${cat.id}` : 'badge--learn';
  const badgeName = cat ? cat.name : 'Kiến thức';
  return `
    <div class="card article-card" onclick="navigate('/article/${a.id}')" style="cursor:pointer;">
      <div class="card__body">
        <span class="badge ${badgeClass}">${badgeName}</span>
        <h3 class="t-h3" style="margin-top:10px;">${a.title}</h3>
        <p class="t-body" style="color:var(--text-secondary); margin-top:6px;">${a.excerpt}</p>
        <div class="article-card__meta" style="margin-top:12px; font-size:0.85rem; color:var(--text-muted);">
          <span>📖 ${a.readTime} đọc</span>
        </div>
      </div>
    </div>
  `;
}

// --- DASHBOARD HELPERS ---
window.switchDashTab = function(event, tabId) {
  let actualTabId = tabId;
  let element = null;
  if (typeof event === 'string') {
    actualTabId = event;
    element = document.querySelector(`.dash-tab[onclick*="${actualTabId}"]`);
  } else {
    element = event ? event.currentTarget : null;
  }

  appState.activeDashTab = actualTabId;
  const contents = document.querySelectorAll('.dash-tab-content');
  contents.forEach(c => c.classList.remove('active'));
  
  const target = document.getElementById(actualTabId);
  if (target) target.classList.add('active');
  
  const tabs = document.querySelectorAll('.dash-tab');
  tabs.forEach(t => t.classList.remove('active'));
  
  if (element) {
    element.classList.add('active');
  } else {
    const tabEl = document.querySelector(`.dash-tab[onclick*="${actualTabId}"]`);
    if (tabEl) tabEl.classList.add('active');
  }
  
  if (actualTabId === 'dash-kpis-tab') {
    setTimeout(() => {
      document.querySelectorAll('.bar-chart__fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
    }, 50);
  } else if (actualTabId === 'dash-review-tab') {
    updateWeeklyPreviewText();
  } else if (actualTabId === 'dash-creator-tab') {
    setTimeout(() => {
      onScriptProductOrAngleChange();
    }, 50);
  }
};

window.switchDashTabAndCloseModal = function(tabId) {
  closeProductModal();
  switchDashTab(tabId);
};

window.navigateAndCloseModal = function(route) {
  closeProductModal();
  navigate(route);
};

window.showProductModalAndCloseOnboard = function(productId, tabName) {
  closeProductModal();
  setTimeout(() => {
    showProductModal(productId);
    if (tabName) {
      setTimeout(() => {
        const tabBtn = document.querySelector(`.modal-tab[onclick*="${tabName}"]`);
        if (tabBtn) tabBtn.click();
      }, 50);
    }
  }, 100);
};

window.switchDashTabAndSetScript = function(productId, angle) {
  closeProductModal();
  switchDashTab('dash-creator-tab');
  setTimeout(() => {
    const prodSelect = document.getElementById('script-select-product');
    const angleSelect = document.getElementById('script-select-angle');
    if (prodSelect) {
      prodSelect.value = productId;
    }
    if (angleSelect) {
      angleSelect.value = angle;
    }
    onScriptProductOrAngleChange();
  }, 100);
};

window.copyMyWebsiteURL = function() {
  const url = window.location.origin + window.location.pathname;
  navigator.clipboard.writeText(url).then(() => {
    showToast('Đã sao chép liên kết Website của bạn!', '📋');
  }).catch(err => {
    console.error(err);
    showToast('Không thể tự sao chép link.', '⚠️');
  });
};

window.switchDashTabAndOpenForm = function() {
  closeProductModal();
  switchDashTab('dash-kpis-tab');
  setTimeout(() => {
    const form = document.getElementById('add-video-form');
    if (form) {
      form.style.display = 'block';
      form.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
};

window.toggleOnboardingStepFromModal = function(dayIdx, stepIdx) {
  toggleOnboardingStep(dayIdx, stepIdx);
  showOnboardingGuide(dayIdx, stepIdx);
};

window.showOnboardingGuide = function(dayIdx, stepIdx) {
  const day = appState.onboarding[dayIdx];
  const step = day.steps[stepIdx];
  if (!step) return;

  let overlay = document.querySelector('.modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }

  let guideContent = '';
  let actionsHTML = '';

  switch (step.id) {
    case 'd1_s1':
      guideContent = `
        <p class="modal-text">Shopee Affiliate Program là nguồn thu nhập chính của hệ thống. Bạn cần tạo một tài khoản đối tác để nhận được mã Affiliate ID duy nhất của mình.</p>
        <div class="modal-text font-accent mt-12" style="background: rgba(58, 125, 92, 0.08); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: var(--radius-sm);">
          <strong>💡 Lời khuyên:</strong> Khi đăng ký, hãy sử dụng thông tin trùng khớp với tài khoản ngân hàng nhận tiền hoa hồng của bạn.
        </div>
        <p class="modal-text mt-12">Sau khi đăng ký thành công, hãy lấy Link Shop hoặc link sản phẩm bất kỳ, dán qua công cụ chuyển link Shopee để nhận link tracking (thường có dạng <code>https://shope.ee/...</code>).</p>
      `;
      actionsHTML = `
        <a href="https://affiliate.shopee.vn" target="_blank" rel="noopener" class="btn btn--primary btn--small" style="color:white; text-decoration:none;">🌐 Mở Shopee Affiliate <span style="font-size:0.75rem;">↗</span></a>
      `;
      break;

    case 'd1_s2':
      guideContent = `
        <p class="modal-text">Bạn cần đảm bảo trang web này được cấu hình đúng với thông tin của bạn. Khi khách hàng bấm vào các nút "Mua ngay", hệ thống sẽ chuyển hướng qua các link tiếp thị liên kết cá nhân mà bạn thiết lập.</p>
        <div class="modal-text font-accent mt-12" style="background: rgba(58, 125, 92, 0.08); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: var(--radius-sm);">
          <strong>🛠️ Cách thiết lập:</strong> Sang tab <strong>"Cấu hình Link"</strong>, dán các link Shopee cá nhân của bạn vào đó và nhấn <strong>Lưu Cấu Hình</strong>. Hệ thống sẽ tự động cập nhật link trên toàn trang web tức thì!
        </div>
        <p class="modal-text mt-12">Bạn cũng có thể tải về file <code>config.js</code> để ghi đè vào source code nếu muốn phân phối website vĩnh viễn.</p>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndCloseModal('dash-links-tab')">🔗 Đi tới Cấu hình Link</button>
      `;
      break;

    case 'd1_s3':
      guideContent = `
        <p class="modal-text">Một Founder hay Creator giỏi là người hiểu rõ khoa học đằng sau sản phẩm. Triết lý của chúng ta là <strong>"Sạch không có nghĩa là vô trùng"</strong>. Hãy đọc 3 bài viết nền tảng tại Góc Kiến Thức để có cơ sở viết kịch bản:</p>
        <ul style="margin-top: 12px; margin-left: 20px; list-style-type: disc; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
          <li><strong>Mảng bám lưỡi (Biofilm):</strong> Lưỡi là ổ chứa vi khuẩn kị khí giải phóng khí lưu huỳnh gây hôi miệng.</li>
          <li><strong>Giường nệm và ve bụi:</strong> Da chết và độ ẩm là môi trường hoàn hảo cho ve bụi, tác nhân chính gây dị ứng.</li>
          <li><strong>Mũi & Bụi mịn:</strong> Hàng rào nhầy lông chuyển khoang mũi là khiên chắn tự nhiên. Rửa mũi đúng cách phục hồi hàng rào này.</li>
        </ul>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="navigateAndCloseModal('/learn')">📚 Vào Góc Kiến Thức</button>
      `;
      break;

    case 'd2_s1':
      guideContent = `
        <p class="modal-text">Chúng ta không bán hàng theo cảm tính hoặc chọn bừa bãi. Tất cả sản phẩm được lọc qua <strong>Mô hình tính điểm vi sinh (Product Scoring Model)</strong>.</p>
        <div class="modal-text font-accent mt-12" style="background: rgba(217, 79, 79, 0.08); border-left: 3px solid var(--danger); padding: 10px 14px; border-radius: var(--radius-sm); color: var(--danger);">
          <strong>⚠️ Quy tắc cốt lõi:</strong> Tránh quảng cáo sản phẩm có điểm khoa học yếu kể cả khi hoa hồng cực cao, để giữ gìn uy tín lâu dài cho kênh của bạn.
        </div>
        <p class="modal-text mt-12">Hãy thử nhập thông tin và kéo các thanh trượt đánh giá một sản phẩm bạn dự kiến làm nội dung trong tab <strong>"Mô hình tính điểm"</strong>.</p>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndCloseModal('dash-scorer-tab')">🧬 Mở Scorer Simulator</button>
      `;
      break;

    case 'd2_s2':
      guideContent = `
        <p class="modal-text">Khán giả mua hàng vì sự chân thật. Bạn cần có sản phẩm mẫu trên tay để quay phim, chụp ảnh và cảm nhận thực tế.</p>
        <p class="modal-text mt-12"><strong>Đề xuất mua cho tuần đầu tiên:</strong></p>
        <ul style="margin-top: 8px; margin-left: 20px; list-style-type: decimal; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
          <li><strong>Combo răng miệng (~400k):</strong> 1 Cạo lưỡi inox + 1 Hộp men vi sinh nha khoa K12/M18.</li>
          <li><strong>Bộ vệ sinh nệm giường (~600k):</strong> 1 Máy hút bụi giường nệm UV-C cầm tay.</li>
        </ul>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="navigateAndCloseModal('/products')">🛍️ Xem danh sách sản phẩm</button>
      `;
      break;

    case 'd2_s3':
      guideContent = `
        <p class="modal-text">Sau khi mua hàng và có tài khoản Shopee Affiliate, hãy tạo các link tracking cá nhân của bạn cho các sản phẩm trong danh mục.</p>
        <p class="modal-text mt-12"><strong>Cách lấy link tracking:</strong></p>
        <ol style="margin-top: 8px; margin-left: 20px; list-style-type: decimal; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
          <li>Tìm sản phẩm chính hãng trên Shopee.</li>
          <li>Copy link sản phẩm đó dán vào trang quản trị Shopee Affiliate để đổi thành link tracking dạng shortlink.</li>
          <li>Dán link đó vào tab <strong>"Cấu hình Link"</strong> trên Founder Hub này.</li>
        </ol>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndCloseModal('dash-links-tab')">🔗 Cấu hình Link ngay</button>
      `;
      break;

    case 'd3_s1':
      guideContent = `
        <p class="modal-text">Kịch bản Problem-based nhắm thẳng vào một nỗi đau thường nhật của khách hàng mà họ đang bế tắc.</p>
        <div class="modal-text font-accent mt-12" style="background: rgba(58, 125, 92, 0.08); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: var(--radius-sm);">
          <strong>📝 Ví dụ cấu trúc kịch bản Cạo lưỡi:</strong><br>
          <em>[Hook 3s]:</em> Đừng đứng gần nói chuyện với người khác nếu chưa làm sạch phần này...<br>
          <em>[Nỗi đau]:</em> Sáng nào cũng đánh răng kỹ, súc miệng mà lưỡi vẫn bợn trắng, nói chuyện tí là tự ti.<br>
          <em>[Giải pháp vật lý]:</em> Dùng cạo lưỡi Inox cạo từ trong ra, bay sạch màng bám vi khuẩn gây mùi lưu huỳnh.
        </div>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndSetScript(2, 'problem')">🎬 Mở Kịch Bản Cạo Lưỡi</button>
      `;
      break;

    case 'd3_s2':
      guideContent = `
        <p class="modal-text">Kịch bản vạch trần lầm tưởng (Myth-busting) gây tranh cãi tốt và kích thích tương tác cao.</p>
        <div class="modal-text font-accent mt-12" style="background: rgba(58, 125, 92, 0.08); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: var(--radius-sm);">
          <strong>📝 Ví dụ cấu trúc K12 Men vi sinh nha khoa:</strong><br>
          <em>[Hook 3s]:</em> Nước súc miệng cồn diệt khuẩn thực ra làm miệng bạn hôi hơn!<br>
          <em>[Lầm tưởng]:</em> Nghĩ rằng diệt sạch 99.9% vi khuẩn là tốt. Thực tế cồn làm khô miệng, giết cả lợi khuẩn, hại khuẩn lưu huỳnh bùng phát mạnh hơn.<br>
          <em>[Giải pháp sinh học]:</em> Ngậm men lợi khuẩn nha khoa K12 để bổ sung vi khuẩn tốt tái thiết lập cân bằng.
        </div>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndSetScript(1, 'myth')">🎬 Mở Kịch Bản Men Vi Sinh</button>
      `;
      break;

    case 'd3_s3':
      guideContent = `
        <p class="modal-text">Trong video ngắn, 3 giây đầu tiên quyết định 80% thành bại. Hãy chuẩn bị ít nhất 5 câu hook giật gân, khơi gợi tò mò mạnh.</p>
        <p class="modal-text mt-12"><strong>Mẫu Hook gợi ý:</strong></p>
        <ul style="margin-top: 8px; margin-left: 20px; list-style-type: disc; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
          <li>"Dừng súc miệng nếu bạn không muốn ổ vi khuẩn hôi miệng bùng phát!"</li>
          <li>"Cảnh báo: Chiếc nệm nhìn rất sạch nhưng thực ra chứa hàng triệu sinh vật này..."</li>
          <li>"Nếu sáng ngủ dậy bạn hay hắt hơi nghẹt mũi, hãy lột gối ra xem..."</li>
          <li>"Tại sao tăm tre là thủ phạm thầm lặng gây hôi miệng?"</li>
        </ul>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="navigateAndCloseModal('/products')">🛍️ Xem mẹo Creator</button>
      `;
      break;

    case 'd4_s1':
      guideContent = `
        <p class="modal-text"><strong>Quy tắc quay phim:</strong> Cực kỳ trực quan! Khán giả muốn thấy sự thay đổi. Tránh dùng ảnh mạng, hãy tự quay bằng camera điện thoại của bạn.</p>
        <div class="modal-text font-accent mt-12" style="background: rgba(58, 125, 92, 0.08); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: var(--radius-sm);">
          <strong>📸 Góc quay đề xuất:</strong><br>
          - Quay cận cảnh (Macro) cạo lưỡi kéo ra lớp bợn trắng đục thực tế.<br>
          - Quay cảnh nệm phẳng sạch, sau đó hút bụi nệm và mở màng lọc HEPA đầy bụi mịn xám xịt.<br>
          - Quay cảnh tăm nước bắn bay vụn thức ăn giữa các kẽ răng giả hoặc mô hình.
        </div>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndSetScript(9, 'science')">🎬 Mở Kịch Bản Máy Hút Nệm</button>
      `;
      break;

    case 'd4_s2':
      guideContent = `
        <p class="modal-text"><strong>Quy tắc dựng phim (Video Editing Rules):</strong></p>
        <ul style="margin-top: 8px; margin-left: 20px; list-style-type: disc; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
          <li><strong>Thời lượng:</strong> 35 - 55 giây (Vừa đủ giữ retention rate cao).</li>
          <li><strong>Nhịp cắt nhanh:</strong> Cắt bỏ toàn bộ hơi thừa, từ "ờ", "à". Mỗi cảnh không quá 3 giây.</li>
          <li><strong>Phụ đề (Captions):</strong> Chèn phụ đề tự động chữ lớn, căn giữa màn hình để người xem tắt tiếng vẫn hiểu được.</li>
          <li><strong>Nhạc nền:</strong> Chọn nhạc trending tiết tấu vui tươi hoặc hồi hộp nhẹ, âm lượng nhạc nền dưới 15% để không đè giọng nói.</li>
        </ul>
      `;
      actionsHTML = `
        <button class="btn btn--outline btn--small" onclick="closeProductModal()">Đóng</button>
      `;
      break;

    case 'd5_s1':
      guideContent = `
        <p class="modal-text">Đăng video vào khung giờ vàng khi lượng người online nhiều nhất để thuật toán phân phối dễ tiếp cận lượng xem lớn hơn:</p>
        <ul style="margin-top: 8px; margin-left: 20px; list-style-type: disc; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
          <li><strong>Khung trưa:</strong> 11:30 - 13:00 (Mọi người rảnh tay lướt điện thoại nghỉ trưa).</li>
          <li><strong>Khung tối:</strong> 19:30 - 21:00 (Giờ thư giãn chính trong ngày).</li>
        </ul>
        <p class="modal-text mt-12">Sử dụng hashtag liên quan để thuật toán định vị đúng tệp khách hàng: <code>#microbiome #suckhoegiadinh #menvisinh #songkhoe #caoluoi</code></p>
      `;
      actionsHTML = `
        <a href="https://tiktok.com" target="_blank" rel="noopener" class="btn btn--primary btn--small" style="color:white; text-decoration:none;">🌐 Mở TikTok</a>
      `;
      break;

    case 'd5_s2':
      guideContent = `
        <p class="modal-text">Mạng xã hội (TikTok, Instagram) không cho phép gắn link bán hàng trực tiếp trên video nếu chưa đủ follow. Bạn cần gắn link website <strong>Microbiome Living Lab</strong> cá nhân vào phần mô tả kênh (Bio).</p>
        <div class="modal-text font-accent mt-12" style="background: rgba(58, 125, 92, 0.08); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: var(--radius-sm);">
          <strong>💡 Lời kêu gọi hành động (CTA):</strong> Cuối video, luôn nói: <em>"Lên link bio đầu kênh mình làm trắc nghiệm chẩn đoán vi sinh miễn phí và xem cơ chế y khoa nhé!"</em>.
        </div>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="copyMyWebsiteURL()">📋 Sao chép Link Website cá nhân</button>
      `;
      break;

    case 'd5_s3':
      guideContent = `
        <p class="modal-text">Việc ghi chép cẩn thận nhật ký bài đăng giúp bạn nhận biết góc tiếp cận nào hiệu quả để nhân bản.</p>
        <p class="modal-text mt-12">Hãy sang tab <strong>"Chỉ số & Chiến dịch"</strong>, nhấn nút <strong>"Đăng video mới ➕"</strong> và điền các thông tin ban đầu: Ngày đăng, Nền tảng, Tiêu đề, Hook, Sản phẩm.</p>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndOpenForm()">📊 Mở tab KPIs & Thêm video</button>
      `;
      break;

    case 'd6_s1':
      guideContent = `
        <p class="modal-text">Sau 24h - 48h đăng video, hãy cập nhật số liệu thực tế (Views, Clicks, Đơn hàng, Doanh thu) vào bảng nhật ký chiến dịch để phục vụ việc đo lường hiệu quả.</p>
        <p class="modal-text mt-12">Bấm vào nút hình bút chì ✏️ trên mỗi hàng của bảng <strong>Campaign Log</strong> hoặc bấm <strong>"Đăng video mới ➕"</strong> để cập nhật số liệu.</p>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndCloseModal('dash-kpis-tab')">📊 Xem bảng KPIs</button>
      `;
      break;

    case 'd6_s2':
      guideContent = `
        <p class="modal-text">Xem lại các chỉ số hiệu suất tự động trên trang Dashboard của bạn để đánh giá chất lượng nội dung.</p>
        <div class="modal-text font-accent mt-12" style="background: rgba(58, 125, 92, 0.08); border-left: 3px solid var(--primary); padding: 10px 14px; border-radius: var(--radius-sm);">
          <strong>🎯 Chỉ số mục tiêu (Benchmarks):</strong><br>
          - <strong>CTR (Tỷ lệ click link bio) &ge; 2%:</strong> Nếu dưới 2%, kịch bản của bạn chưa kích thích đủ sự tò mò của người xem hoặc nút kêu gọi hành động chưa rõ.<br>
          - <strong>CR (Tỷ lệ mua hàng trên click) &ge; 3%:</strong> Nếu dưới 3%, bài viết trên blog hoặc độ tin cậy của link sản phẩm Shopee của bạn chưa thuyết phục.
        </div>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndCloseModal('dash-kpis-tab')">📊 Phân tích Chỉ số</button>
      `;
      break;

    case 'd6_s3':
      guideContent = `
        <p class="modal-text">Lập báo cáo đánh giá tuần (Weekly Review) giúp bạn nhìn nhận khách quan sự phát triển của kênh.</p>
        <p class="modal-text mt-12">Sử dụng công cụ tạo báo cáo tuần tự động ở tab <strong>"Báo cáo tuần"</strong>. Bạn chỉ cần nhập cảm nhận định tính, hệ thống sẽ tự động tổng hợp số liệu từ bảng nhật ký chiến dịch thành một văn bản Markdown hoàn hảo.</p>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndCloseModal('dash-review-tab')">📝 Tạo Báo Cáo Tuần</button>
      `;
      break;

    case 'd7_s1':
      guideContent = `
        <p class="modal-text">Thay vì quảng cáo 1 sản phẩm lẻ, hãy quảng bá trọn bộ giải pháp. Điều này giúp nâng cao đáng kể doanh thu trên mỗi đơn hàng.</p>
        <p class="modal-text mt-12"><strong>Ví dụ Combo "Hơi Thở Thơm Mát":</strong> Hướng dẫn người xem cạo lưỡi cơ học để phá vỡ lớp biofilm chứa khuẩn mùi hôi, sau đó ngậm lợi khuẩn nha khoa K12 để bù đắp lợi khuẩn chiếm chỗ trống sinh học, không cho vi khuẩn hôi miệng quay lại.</p>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="navigateAndCloseModal('/products')">🛍️ Xem danh mục Combo</button>
      `;
      break;

    case 'd7_s2':
      guideContent = `
        <p class="modal-text">Một nội dung chất lượng xứng đáng được lan tỏa rộng rãi. Hãy đăng tải cùng một video ngắn đó lên các nền tảng khác:</p>
        <ul style="margin-top: 8px; margin-left: 20px; list-style-type: disc; line-height: 1.6; font-size: 0.9rem; color: var(--text-secondary);">
          <li><strong>Facebook Reels:</strong> Tệp khách hàng lớn tuổi hơn, có tiền hơn (phù hợp máy hút nệm, bình rửa mũi).</li>
          <li><strong>YouTube Shorts:</strong> Thuật toán đề xuất mạnh, dễ cắn view bền vững.</li>
          <li><strong>Instagram Reels:</strong> Tệp khách hàng trẻ, quan tâm phong cách sống.</li>
        </ul>
      `;
      actionsHTML = `
        <button class="btn btn--outline btn--small" onclick="closeProductModal()">Đóng</button>
      `;
      break;

    case 'd7_s3':
      guideContent = `
        <p class="modal-text">Lưu trữ dữ liệu cá nhân là cực kỳ quan trọng để bạn tự xây dựng kho lưu trữ analytics chiến dịch của riêng mình lâu dài.</p>
        <p class="modal-text mt-12">Nhấn nút <strong>"Xuất dữ liệu CSV 💾"</strong> trên bảng KPIs của Founder Hub này để lưu file excel về máy tính của bạn.</p>
      `;
      actionsHTML = `
        <button class="btn btn--primary btn--small" style="color:white;" onclick="switchDashTabAndCloseModal('dash-kpis-tab')">📊 Tới tab KPIs để xuất CSV</button>
      `;
      break;

    default:
      guideContent = `<p class="modal-text">${step.desc}</p>`;
      actionsHTML = ``;
      break;
  }

  overlay.className = 'modal-overlay open';
  overlay.innerHTML = `
    <div class="modal-card" style="max-width:550px; background: var(--surface);">
      <button class="modal-close" onclick="closeProductModal()">&times;</button>
      <div class="modal-header" style="border-bottom:1px solid var(--border-light); padding:20px 24px;">
        <span class="badge badge--learn" style="font-size:0.75rem;">Ngày ${day.day} • Nhiệm vụ ${stepIdx + 1}</span>
        <h3 class="t-h2 mt-8" style="font-size:1.25rem; font-weight:700;">${step.title}</h3>
      </div>
      <div class="modal-tab-content" style="padding:24px; max-height: 380px; overflow-y: auto;">
        ${guideContent}
      </div>
      <div class="modal-footer" style="padding:16px 24px; border-top:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center; gap:8px; background:var(--bg);">
        <button class="btn btn--outline btn--small" style="padding: 6px 12px; font-size: 0.8rem; min-height: unset; height: auto; border-radius: 6px; border-color: var(--border); color: var(--text-secondary);" onclick="toggleOnboardingStepFromModal(${dayIdx}, ${stepIdx})">
          ${step.done ? '✕ Đánh dấu chưa xong' : '✓ Đánh dấu xong'}
        </button>
        <div style="display:flex; gap:8px;">
          ${actionsHTML}
          <button class="btn btn--ghost btn--small" style="padding: 6px 12px; font-size: 0.8rem; min-height: unset; height: auto;" onclick="closeProductModal()">Đóng</button>
        </div>
      </div>
    </div>
  `;
};

window.toggleOnboardingStep = function(dayIdx, stepIdx) {
  const step = appState.onboarding[dayIdx].steps[stepIdx];
  step.done = !step.done;
  localStorage.setItem('microbiome_onboarding', JSON.stringify(appState.onboarding));
  
  showToast(step.done ? `Đã hoàn thành bước: ${step.title}` : `Đã hủy hoàn thành bước: ${step.title}`, step.done ? '✅' : '🔄');
  
  updateOnboardingProgress();
  renderOnboardingTabOnly();
};

function updateOnboardingProgress() {
  let totalSteps = 0;
  let completedSteps = 0;
  
  appState.onboarding.forEach(day => {
    day.steps.forEach(step => {
      totalSteps++;
      if (step.done) completedSteps++;
    });
  });
  
  const pct = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0;
  
  const bar = document.getElementById('onboard-progress-bar');
  const txt = document.getElementById('onboard-progress-text');
  
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.innerText = `Hoàn thành ${completedSteps}/${totalSteps} nhiệm vụ (${pct}%)`;
  
  appState.onboarding.forEach((day, dIdx) => {
    const dayEl = document.getElementById(`roadmap-day-${dIdx}`);
    const isDayCompleted = day.steps.every(s => s.done);
    if (dayEl) {
      dayEl.classList.toggle('completed', isDayCompleted);
    }
  });
}

function renderOnboardingTab() {
  let totalSteps = 0;
  let completedSteps = 0;
  
  appState.onboarding.forEach(day => {
    day.steps.forEach(step => {
      totalSteps++;
      if (step.done) completedSteps++;
    });
  });
  
  const pct = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return `
    <div class="onboard-header" style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:24px; margin-bottom:24px;">
      <h3 class="t-h2">🗺️ Lộ trình 7 Ngày Onboard Nhà Sáng Lập</h3>
      <p class="t-body mt-4" style="color:var(--text-secondary);">Hướng dẫn từng bước giúp bạn nắm vững mô hình kinh doanh tiếp thị vi sinh gia đình từ con số 0.</p>
      
      <div style="margin-top:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span class="t-small" style="font-weight:600;" id="onboard-progress-text">Hoàn thành ${completedSteps}/${totalSteps} nhiệm vụ (${pct}%)</span>
        </div>
        <div style="height:12px; background:var(--border-light); border-radius:6px; overflow:hidden;">
          <div id="onboard-progress-bar" style="height:100%; width:${pct}%; background:linear-gradient(90deg, var(--primary), var(--accent)); transition: width var(--transition);"></div>
        </div>
      </div>
    </div>

    <div class="roadmap-timeline">
      ${appState.onboarding.map((day, dIdx) => {
        const isDayCompleted = day.steps.every(s => s.done);
        return `
          <div class="roadmap-day${isDayCompleted ? ' completed' : ''}" id="roadmap-day-${dIdx}">
            <div class="roadmap-day-dot">${day.day}</div>
            <div class="roadmap-day-card">
              <div class="roadmap-day-header">
                <h4 class="roadmap-day-title">${day.title}</h4>
                <span class="badge ${isDayCompleted ? 'badge--gut' : 'badge--air'}">${isDayCompleted ? 'Hoàn thành' : 'Đang thực hiện'}</span>
              </div>
              <p class="t-small" style="color:var(--text-secondary);">${day.desc}</p>
              
              <div class="roadmap-steps-list">
                ${day.steps.map((step, sIdx) => {
                  return `
                    <div class="roadmap-step-item" onclick="toggleOnboardingStep(${dIdx}, ${sIdx})">
                      <div class="roadmap-step-checkbox${step.done ? ' checked' : ''}" id="chk-${dIdx}-${sIdx}">
                        ${step.done ? '✓' : ''}
                      </div>
                      <div class="roadmap-step-content">
                        <div class="roadmap-step-title" style="${step.done ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${step.title}</div>
                        <div class="roadmap-step-desc">${step.desc}</div>
                        <div style="margin-top: 8px;">
                          <button class="btn btn--outline btn--small" style="padding: 2px 8px; font-size: 0.72rem; min-height: unset; height: auto; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; background: var(--surface);" onclick="event.stopPropagation(); showOnboardingGuide(${dIdx}, ${sIdx});">
                            📋 Hướng dẫn & Hành động
                          </button>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

window.renderOnboardingTabOnly = function() {
  const container = document.getElementById('dash-onboard-tab');
  if (container) {
    container.innerHTML = renderOnboardingTab();
  }
};

// --- FOUNDER DASHBOARD RENDERING & LOGIC ---
function renderDashboardPage() {
  const totalViews = appState.tracker.reduce((acc, row) => acc + Number(row.views || 0), 0);
  const totalClicks = appState.tracker.reduce((acc, row) => acc + Number(row.clicks || 0), 0);
  const totalOrders = appState.tracker.reduce((acc, row) => acc + Number(row.orders || 0), 0);
  const totalRevenue = appState.tracker.reduce((acc, row) => acc + Number(row.revenue || 0), 0);

  const catViews = { oral: 0, home: 0, air: 0, gut: 0 };
  appState.tracker.forEach(row => {
    if (catViews[row.category] !== undefined) {
      catViews[row.category] += Number(row.views || 0);
    }
  });
  
  const sumViews = Object.values(catViews).reduce((a, b) => a + b, 0) || 1;
  const performance = [
    { label: 'Răng miệng (Oral)', value: Math.round((catViews.oral / sumViews) * 100), key: 'oral' },
    { label: 'Nhà cửa (Home)', value: Math.round((catViews.home / sumViews) * 100), key: 'home' },
    { label: 'Không khí (Air)', value: Math.round((catViews.air / sumViews) * 100), key: 'air' },
    { label: 'Đường ruột (Gut)', value: Math.round((catViews.gut / sumViews) * 100), key: 'gut' }
  ];

  let bestCatKey = 'oral';
  let maxViews = -1;
  Object.keys(catViews).forEach(key => {
    if (catViews[key] > maxViews) {
      maxViews = catViews[key];
      bestCatKey = key;
    }
  });
  const bestCategoryObj = CATEGORIES.find(c => c.id === bestCatKey) || CATEGORIES[0];

  const activeTab = appState.activeDashTab || 'dash-kpis-tab';

  return `
    <div class="page" id="page-dashboard">
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-header__eyebrow">Quản trị nội bộ</span>
            <h1 class="t-h1">Founder Hub & KPIs</h1>
            <p class="section-header__desc t-body">Theo dõi hiệu suất tiếp thị liên kết, giả lập mô hình tính điểm sản phẩm, và cập nhật nhật ký chiến dịch nội dung thực tế của bạn.</p>
          </div>

          <div class="dash-tabs">
            <button class="dash-tab ${activeTab === 'dash-kpis-tab' ? 'active' : ''}" onclick="switchDashTab(event, 'dash-kpis-tab')">📊 Chỉ số & Chiến dịch</button>
            <button class="dash-tab ${activeTab === 'dash-onboard-tab' ? 'active' : ''}" onclick="switchDashTab(event, 'dash-onboard-tab')">🗺️ Lộ trình 7 ngày Onboard</button>
            <button class="dash-tab ${activeTab === 'dash-scorer-tab' ? 'active' : ''}" onclick="switchDashTab(event, 'dash-scorer-tab')">🧬 Mô hình tính điểm</button>
            <button class="dash-tab ${activeTab === 'dash-creator-tab' ? 'active' : ''}" onclick="switchDashTab(event, 'dash-creator-tab')">🎬 Kịch bản Video</button>
            <button class="dash-tab ${activeTab === 'dash-links-tab' ? 'active' : ''}" onclick="switchDashTab(event, 'dash-links-tab')">🔗 Cấu hình Link</button>
            <button class="dash-tab ${activeTab === 'dash-review-tab' ? 'active' : ''}" onclick="switchDashTab(event, 'dash-review-tab')">📝 Báo cáo tuần</button>
            <button class="dash-tab ${activeTab === 'dash-science-tab' ? 'active' : ''}" onclick="switchDashTab(event, 'dash-science-tab')">🔬 Tra cứu khoa học</button>
          </div>

          <!-- TAB 1: KPI & CAMPAIGNS -->
          <div class="dash-tab-content ${activeTab === 'dash-kpis-tab' ? 'active' : ''}" id="dash-kpis-tab">
            <div class="stat-grid reveal">
              <div class="stat-card">
                <div class="stat-card__value">${totalViews.toLocaleString()}</div>
                <div class="stat-card__label">Tổng lượt xem</div>
              </div>
              <div class="stat-card">
                <div class="stat-card__value">${totalClicks.toLocaleString()}</div>
                <div class="stat-card__label">Tổng lượt nhấn (Clicks)</div>
              </div>
              <div class="stat-card">
                <div class="stat-card__value">${totalOrders.toLocaleString()}</div>
                <div class="stat-card__label">Đơn hàng thành công</div>
              </div>
              <div class="stat-card">
                <div class="stat-card__value">${totalRevenue.toLocaleString()}đ</div>
                <div class="stat-card__label">Doanh thu tạm tính</div>
              </div>
            </div>

            <div class="grid grid-2 reveal mt-32" style="gap:24px;">
              <div class="card" style="padding:24px;">
                <h3 class="t-h2 mb-12">Phân bổ lượt xem theo danh mục</h3>
                <div class="bar-chart" id="bar-chart">
                  ${performance.map(p => `
                    <div class="bar-chart__row">
                      <span class="bar-chart__label">${p.label}</span>
                      <div class="bar-chart__track">
                        <div class="bar-chart__fill" data-width="${p.value}" style="width:0%">${p.value}%</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="card" style="padding:24px; display:flex; flex-direction:column; justify-content:space-between;">
                <h3 class="t-h2 mb-12">📈 Xu hướng Lượt xem (Video Views Trend)</h3>
                <div style="flex-grow:1; display:flex; align-items:center; justify-content:center; min-height:120px;">
                  ${generateTrendChartSVG()}
                </div>
              </div>
            </div>

            <div class="grid grid-2 reveal mt-32" style="gap:24px;">
              <div class="card" style="padding:24px; display:flex; flex-direction:column; justify-content:center;">
                <h3 class="t-h2 mb-12">🏆 Danh mục thịnh hành nhất</h3>
                <div style="display:flex; align-items:center; gap:16px;">
                  <div class="cat-card__icon cat-card__icon--${bestCategoryObj.id}" style="width:64px; height:64px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:2rem;">
                    ${bestCategoryObj.icon}
                  </div>
                  <div>
                    <div class="t-h3">${bestCategoryObj.name}</div>
                    <div class="t-body mt-4" style="color:var(--text-secondary); line-height: 1.4;">Đang thu hút được nhiều lượt quan tâm nhất trên hệ thống mạng xã hội của bạn.</div>
                  </div>
                </div>
              </div>

              ${generateAIInsightsCardHTML(totalViews, totalClicks, totalOrders)}
            </div>

            <div class="card reveal mt-32" style="padding:24px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
                <div>
                  <h3 class="t-h2">Nhật ký chiến dịch nội dung & Clicks</h3>
                  <p class="t-body mt-4" style="color:var(--text-secondary);">Nhập thông số video/bài đăng để đo lường CTR, CR, và xuất báo cáo CSV gửi Founder.</p>
                </div>
                <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
                  <button class="btn btn--outline btn--sm" onclick="toggleAddForm()">Đăng video mới ➕</button>
                  <button class="btn btn--outline btn--sm" onclick="document.getElementById('csv-import-file').click()">Nhập CSV 📂</button>
                  <button class="btn btn--primary btn--sm" onclick="exportTrackerToCSV()">Xuất CSV 💾</button>
                  <button class="btn btn--ghost btn--sm" style="color:var(--danger);" onclick="resetTrackerData()">Reset 🔄</button>
                  <input type="file" id="csv-import-file" accept=".csv" style="display:none;" onchange="handleCSVImport(event)">
                </div>
              </div>

              <div id="add-video-form" style="display:none; background:var(--background); border:1px solid var(--border); border-radius:var(--radius-sm); padding:20px; margin-bottom:20px;" class="reveal">
                <h4 class="t-h3 mb-12">Thêm bài đăng / Video mới</h4>
                <div class="grid grid-3" style="gap:12px;">
                  <div class="flex-col">
                    <label class="t-small mb-4">Ngày đăng</label>
                    <input type="date" id="form-date" value="2026-06-13" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                  <div class="flex-col">
                    <label class="t-small mb-4">Nền tảng</label>
                    <select id="form-platform" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                      <option value="TikTok">TikTok</option>
                      <option value="Facebook Reels">Facebook Reels</option>
                      <option value="YouTube Shorts">YouTube Shorts</option>
                      <option value="Instagram">Instagram</option>
                    </select>
                  </div>
                  <div class="flex-col">
                    <label class="t-small mb-4">Danh mục tiếp thị</label>
                    <select id="form-category" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                      <option value="oral">Răng miệng (Oral)</option>
                      <option value="home">Nhà cửa (Home)</option>
                      <option value="air">Không khí (Air)</option>
                      <option value="gut">Đường ruột (Gut)</option>
                    </select>
                  </div>
                </div>
                <div class="grid grid-3 mt-12" style="gap:12px;">
                  <div class="flex-col">
                    <label class="t-small mb-4">Tiêu đề bài đăng</label>
                    <input type="text" id="form-title" placeholder="VD: Sỏi amidan bốc mùi tanh..." style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                  <div class="flex-col">
                    <label class="t-small mb-4">Câu mở đầu (Hook)</label>
                    <input type="text" id="form-hook" placeholder="VD: 3 giây kiểm tra họng có sỏi..." style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                  <div class="flex-col">
                    <label class="t-small mb-4">Sản phẩm gắn link</label>
                    <input type="text" id="form-product" placeholder="VD: Dụng cụ lấy sỏi" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                </div>
                
                <div class="grid grid-4 mt-12" style="gap:12px;">
                  <div class="flex-col">
                    <label class="t-small mb-4">Lượt xem (Views)</label>
                    <input type="number" id="form-views" value="0" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                  <div class="flex-col">
                    <label class="t-small mb-4">Lượt thích (Likes)</label>
                    <input type="number" id="form-likes" value="0" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                  <div class="flex-col">
                    <label class="t-small mb-4">Lượt lưu (Saves)</label>
                    <input type="number" id="form-saves" value="0" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                  <div class="flex-col">
                    <label class="t-small mb-4">Bình luận (Comments)</label>
                    <input type="number" id="form-comments" value="0" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                </div>
                
                <div class="grid grid-3 mt-12" style="gap:12px;">
                  <div class="flex-col">
                    <label class="t-small mb-4">Lượt nhấn link (Clicks)</label>
                    <input type="number" id="form-clicks" value="0" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                  <div class="flex-col">
                    <label class="t-small mb-4">Đơn hàng (Orders)</label>
                    <input type="number" id="form-orders" value="0" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                  <div class="flex-col">
                    <label class="t-small mb-4">Hoa hồng nhận được (VND)</label>
                    <input type="number" id="form-revenue" value="0" style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                </div>

                <div class="grid grid-2 mt-12" style="gap:12px;">
                  <div class="flex-col">
                    <label class="t-small mb-4">Bài học kinh nghiệm (Lesson learned)</label>
                    <input type="text" id="form-lesson" placeholder="VD: Hook so sánh mang lại CTR cao hơn..." style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                  <div class="flex-col">
                    <label class="t-small mb-4">Hành động tiếp theo (Next action)</label>
                    <input type="text" id="form-action" placeholder="VD: Triển khai thêm 2 video cùng concept..." style="padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--surface); color:var(--text);">
                  </div>
                </div>

                <div class="mt-20 flex-center gap-12" style="justify-content: flex-start;">
                  <button class="btn btn--primary" onclick="submitNewVideo()">Lưu bài đăng</button>
                  <button class="btn btn--outline" onclick="toggleAddForm()">Hủy bỏ</button>
                </div>
              </div>

              <div class="table-container">
                <table class="dash-table">
                  <thead>
                    <tr>
                      <th>Ngày đăng</th>
                      <th>Nền tảng</th>
                      <th>Tiêu đề & Hook</th>
                      <th>Sản phẩm</th>
                      <th>Hiệu suất xem</th>
                      <th>Tương tác</th>
                      <th>Clicks / Đơn</th>
                      <th>CTR / CR</th>
                      <th>Doanh thu</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                     ${appState.tracker.map((row, idx) => {
                      const ctr = row.views ? ((row.clicks / row.views) * 100).toFixed(1) : '0.0';
                      const cr = row.clicks ? ((row.orders / row.clicks) * 100).toFixed(1) : '0.0';
                      const platformClass = row.platform === 'TikTok' ? 'tiktok' : row.platform === 'Facebook Reels' ? 'facebook' : row.platform === 'YouTube Shorts' ? 'youtube' : row.platform === 'Instagram' ? 'instagram' : 'learn';
                      return `
                        <tr>
                          <td>${row.date}</td>
                          <td><span class="badge badge--${platformClass}">${row.platform}</span></td>
                          <td>
                            <strong>${row.title}</strong>
                            <div class="t-small" style="color:var(--text-muted)">Hook: "${row.hook}"</div>
                            ${row.lessonLearned ? `<div class="t-small mt-4" style="color:var(--primary); font-style:italic; line-height:1.3;">💡 <strong>Bài học:</strong> ${row.lessonLearned}</div>` : ''}
                            ${row.nextAction ? `<div class="t-small mt-2" style="color:var(--accent); font-weight:500; line-height:1.3;">➔ <strong>Hành động:</strong> ${row.nextAction}</div>` : ''}
                          </td>
                          <td>${row.product}</td>
                          <td><strong>${Number(row.views).toLocaleString()}</strong> view</td>
                          <td>
                            <div class="t-small" style="white-space: nowrap;">❤️ ${Number(row.likes || 0).toLocaleString()}</div>
                            <div class="t-small" style="white-space: nowrap;">💾 ${Number(row.saves || 0).toLocaleString()}</div>
                            <div class="t-small" style="white-space: nowrap;">💬 ${Number(row.comments || 0).toLocaleString()}</div>
                          </td>
                          <td>
                            <div>🖱️ <strong>${Number(row.clicks).toLocaleString()}</strong> click</div>
                            <div>📦 <strong>${row.orders}</strong> đơn</div>
                          </td>
                          <td>
                            <div class="t-small">CTR: <strong>${ctr}%</strong></div>
                            <div class="t-small">CR: <strong>${cr}%</strong></div>
                          </td>
                          <td style="font-weight:600; color:var(--primary)">${Number(row.revenue).toLocaleString()}đ</td>
                          <td><button class="btn btn--ghost" style="padding:4px 8px; font-size:0.8rem; color:red;" onclick="deleteVideoLog(${idx})">Xóa</button></td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="card reveal mt-32" style="padding:24px;">
              <h3 class="t-h2">Nhiệm vụ & Kế hoạch thử nghiệm tiếp thị</h3>
              <p class="t-body mt-4" style="color:var(--text-secondary);">Thêm các ý tưởng thử nghiệm video ngắn hoặc bài đăng mới dựa trên dữ liệu hiệu quả chiến dịch.</p>
              
              <div style="margin-top:20px; display:flex; gap:8px;">
                <input type="text" id="new-todo-text" placeholder="VD: Thử nghiệm hook: Tại sao nệm nhà bạn lại hôi..." style="padding:10px; border-radius:6px; border:1px solid var(--border); background:var(--background); color:var(--text); flex-grow:1; font-weight:600;">
                <button class="btn btn--primary" onclick="addNewTodo()">Thêm việc cần làm</button>
              </div>

              <div class="checklist mt-24">
                ${appState.checklist.map((item, idx) => `
                  <div class="checklist__item" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding:10px 0;">
                    <div style="display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="toggleTodoStatus(${idx})">
                      <span class="checklist__dot checklist__dot--${item.status}"></span>
                      <span style="${item.status === 'done' ? 'text-decoration:line-through; color:var(--text-muted);' : 'font-weight:500;'}">${item.text}</span>
                    </div>
                    <button class="btn btn--ghost" style="padding:4px 8px; font-size:0.8rem; color:red;" onclick="deleteTodo(${idx})">Xóa</button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- TAB 2: ROADMAP -->
          <div class="dash-tab-content ${activeTab === 'dash-onboard-tab' ? 'active' : ''}" id="dash-onboard-tab">
            ${renderOnboardingTab()}
          </div>

          <!-- TAB 3: PRODUCT SCORER -->
          <div class="dash-tab-content ${activeTab === 'dash-scorer-tab' ? 'active' : ''}" id="dash-scorer-tab">
            <div class="card reveal" style="padding:24px;">
              <h3 class="t-h2">Mô hình tính điểm lựa chọn sản phẩm vi sinh</h3>
              <p class="t-body mt-4" style="color:var(--text-secondary); max-width:800px;">Tính điểm sản phẩm mới theo các tiêu chí chuẩn hóa của <code>product_scoring_model.md</code> để ra quyết định phân phối affiliate.</p>
              
              <div class="scorer-container mt-24">
                <div class="scorer-inputs">
                  <div class="scorer-group">
                    <label>1. Mức độ nghiêm trọng của nỗi đau (Pain intensity) <span id="score-lbl-1">3</span>/5</label>
                    <input type="range" min="1" max="5" value="3" id="score-val-1" oninput="updateScorer()">
                  </div>
                  <div class="scorer-group">
                    <label>2. Tiềm năng nội dung & Trực quan (Content potential) <span id="score-lbl-2">3</span>/5</label>
                    <input type="range" min="1" max="5" value="3" id="score-val-2" oninput="updateScorer()">
                  </div>
                  <div class="scorer-group">
                    <label>3. Uy tín khoa học & Y khoa (Scientific credibility) <span id="score-lbl-3">3</span>/5</label>
                    <input type="range" min="1" max="5" value="3" id="score-val-3" oninput="updateScorer()">
                  </div>
                  <div class="scorer-group">
                    <label>4. Sẵn có trên sàn Shopee (Marketplace availability) <span id="score-lbl-4">3</span>/5</label>
                    <input type="range" min="1" max="5" value="3" id="score-val-4" oninput="updateScorer()">
                  </div>
                  <div class="scorer-group">
                    <label>5. Tiềm năng hoa hồng (Commission potential) <span id="score-lbl-5">3</span>/5</label>
                    <input type="range" min="1" max="5" value="3" id="score-val-5" oninput="updateScorer()">
                  </div>
                  <div class="scorer-group">
                    <label>6. Tính độc đáo & Khác biệt (Differentiation) <span id="score-lbl-6">3</span>/5</label>
                    <input type="range" min="1" max="5" value="3" id="score-val-6" oninput="updateScorer()">
                  </div>
                  <div class="scorer-group">
                    <label>7. Khả năng mua lại (Repeat purchase potential) <span id="score-lbl-7">3</span>/5</label>
                    <input type="range" min="1" max="5" value="3" id="score-val-7" oninput="updateScorer()">
                  </div>
                </div>

                <div class="scorer-result-box">
                  <div class="t-small" style="text-transform: uppercase; letter-spacing: 0.05em; color:var(--text-muted)">Tổng điểm tính toán</div>
                  <div class="scorer-result-score" id="total-score">21</div>
                  <div class="scorer-result-verdict badge" id="verdict-badge" style="display:inline-block; font-size:1rem; padding:8px 16px; border-radius:20px;">Đang tính toán</div>
                  <p class="t-small mt-12" id="verdict-desc" style="color:var(--text-secondary); line-height: 1.5;"></p>
                  <div id="scorer-warning"></div>
                  
                  <div style="margin-top:20px; border-top:1px solid var(--border); padding-top:16px;">
                    <input type="text" id="scorer-product-name" placeholder="Tên sản phẩm muốn chấm..." style="padding:10px; border-radius:6px; border:1px solid var(--border); background:var(--background); color:var(--text); width:100%; margin-bottom:10px; font-weight:600;">
                    <button class="btn btn--primary btn--full" onclick="saveProductScore()">Lưu điểm vào lịch sử</button>
                  </div>
                </div>
              </div>

              <div class="mt-32">
                <h4 class="t-h3 mb-12">Lịch sử đánh giá sản phẩm</h4>
                <div class="table-container">
                  <table class="dash-table">
                    <thead>
                      <tr>
                        <th>Ngày đánh giá</th>
                        <th>Tên sản phẩm</th>
                        <th>Tổng điểm</th>
                        <th>Kết luận</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody id="saved-scores-tbody">
                      ${appState.savedScores.map((s, idx) => `
                        <tr>
                          <td>${s.date}</td>
                          <td style="font-weight:600;">${s.name}</td>
                          <td><strong>${s.total} / 35</strong></td>
                          <td><span class="badge ${s.total >= 29 ? 'badge--gut' : s.total >= 22 ? 'badge--air' : s.total >= 15 ? 'badge--oral' : 'badge--home'}" style="font-size:0.8rem;">${s.decision}</span></td>
                          <td><button class="btn btn--ghost" style="padding:4px 8px; font-size:0.8rem; color:red;" onclick="deleteSavedScore(${idx})">Xóa</button></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 4: LINK CONFIGURATION -->
          <div class="dash-tab-content ${activeTab === 'dash-links-tab' ? 'active' : ''}" id="dash-links-tab">
            <div class="card reveal" style="padding:24px;">
              <h3 class="t-h2 mb-12">🔗 Cấu hình liên kết tiếp thị của riêng bạn</h3>
              <p class="t-body" style="color:var(--text-secondary); margin-bottom:24px;">
                Nhập link tiếp thị liên kết (Shopee, iHerb, v.v.) của bạn cho từng sản phẩm. Hệ thống sẽ lưu trạng thái cục bộ trên trình duyệt này và tự động gắn link của bạn vào tất cả các nút mua hàng trên website.
              </p>
              
              <div style="display:flex; gap:12px; margin-bottom:24px; flex-wrap:wrap;">
                <button class="btn btn--primary" onclick="saveCustomLinks()">Lưu Cấu Hình 💾</button>
                <button class="btn btn--outline" onclick="downloadConfigJS()">Tải File config.js 📥</button>
              </div>

              <div class="table-wrapper">
                <table class="dash-table">
                  <thead>
                    <tr>
                      <th style="width: 50px;">ID</th>
                      <th>Sản phẩm</th>
                      <th>Danh mục</th>
                      <th>Link tiếp thị của bạn (Shopee / iHerb / v.v.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${PRODUCTS.map(p => {
                      const mergedLinks = Object.assign({}, window.CUSTOM_AFFILIATE_LINKS || {}, appState.customLinks || {});
                      const currentLink = mergedLinks[p.id] || '';
                      const cat = CATEGORIES.find(c => c.id === p.category);
                      const catName = cat ? cat.name : p.category;
                      return `
                        <tr>
                          <td><strong>#${p.id}</strong></td>
                          <td>
                            <div style="font-weight:600; color:var(--text);">${p.name}</div>
                            <div class="t-small" style="color:var(--text-muted);">${p.priceRange}</div>
                          </td>
                          <td><span class="badge badge--${p.category}">${catName}</span></td>
                          <td>
                            <input type="text" id="custom-link-input-${p.id}" class="form-input" style="width:100%;" value="${currentLink}" placeholder="Nhập link shopee.vn/... của bạn">
                          </td>
                        </tr>
                      `;
                    }).join('')}
                    <!-- Dòng tiêu đề cho Combo -->
                    <tr style="background: var(--border-light);">
                      <td colspan="4" style="font-weight: 700; color: var(--primary); padding: 12px 16px;">
                        🔗 Cấu hình Link cho Combo Sản phẩm (Starter Kits)
                      </td>
                    </tr>
                    ${STARTER_KITS.map(k => {
                      const mergedLinks = Object.assign({}, window.CUSTOM_AFFILIATE_LINKS || {}, appState.customLinks || {});
                      const currentLink = mergedLinks[`kit_${k.id}`] || '';
                      return `
                        <tr>
                          <td><strong>Combo</strong></td>
                          <td>
                            <div style="font-weight:600; color:var(--text);">${k.icon} ${k.name}</div>
                            <div class="t-small" style="color:var(--text-muted);">${k.desc}</div>
                          </td>
                          <td><span class="badge badge--learn" style="background:var(--accent-light); color:var(--accent);">Combo</span></td>
                          <td>
                            <input type="text" id="custom-link-input-kit_${k.id}" class="form-input" style="width:100%;" value="${currentLink}" placeholder="Nhập link shopee.vn/... của combo này">
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- TAB 5: WEEKLY REVIEW GENERATOR -->
          <div class="dash-tab-content ${activeTab === 'dash-review-tab' ? 'active' : ''}" id="dash-review-tab">
            <div class="card reveal" style="padding:24px;">
              <h3 class="t-h2 mb-12">📝 Tạo Báo Cáo Đánh Giá Tuần (Weekly Review)</h3>
              <p class="t-body" style="color:var(--text-secondary); margin-bottom:24px;">
                Tự động tổng hợp số liệu từ các chiến dịch nội dung đã đăng và định dạng báo cáo theo mẫu chuẩn Markdown để sao chép hoặc tải về gửi cho người hướng dẫn.
              </p>

              <div class="grid grid-2" style="gap:24px; align-items: start;">
                <!-- Form điền thông tin định tính -->
                <div class="card" style="padding:20px; background:var(--bg); border:1px solid var(--border);">
                  <h4 class="t-h3 mb-12" style="border-bottom:1px solid var(--border); padding-bottom:8px;">1. Bổ sung thông tin định tính</h4>
                  
                  <div class="form-group mb-12">
                    <label for="report-week-of">Tuần bắt đầu từ ngày</label>
                    <input type="date" id="report-week-of" class="form-input" value="${new Date().toISOString().split('T')[0]}">
                  </div>
                  
                  <div class="form-group mb-12">
                    <label for="report-angle-why">Tại sao góc tiếp cận tốt nhất lại hiệu quả?</label>
                    <textarea id="report-angle-why" class="form-input" style="height:80px; font-family:inherit; resize:vertical;">Đánh trực diện vào nỗi đau khách hàng gặp phải (biofilm, hơi thở mùi) và đưa ra giải pháp vật lý/vi sinh có cơ sở khoa học rõ ràng kèm demo thực tế.</textarea>
                  </div>

                  <div class="form-group mb-12">
                    <label for="report-worst-topic">Góc tiếp cận / Chủ đề kém nhất</label>
                    <input type="text" id="report-worst-topic" class="form-input" value="Các video thuần lý thuyết, không có demo trực quan">
                  </div>

                  <div class="form-group mb-12">
                    <label for="report-worst-topic-reason">Lý do kém hiệu quả</label>
                    <input type="text" id="report-worst-topic-reason" class="form-input" value="Người xem lướt qua nhanh, thiếu tính tương tác thị giác.">
                  </div>

                  <div class="form-group mb-12">
                    <label for="report-worst-topic-decision">Quyết định đối với góc kém</label>
                    <select id="report-worst-topic-decision" class="form-select">
                      <option value="Dừng hẳn (Stop)">Dừng hẳn (Stop)</option>
                      <option value="Viết lại kịch bản (Rewrite)" selected>Viết lại kịch bản (Rewrite)</option>
                      <option value="Thử nghiệm thêm (Retest)">Thử nghiệm thêm (Retest)</option>
                    </select>
                  </div>

                  <div class="form-group mb-12">
                    <label for="report-rec-test">Thử nghiệm đề xuất tuần tới</label>
                    <input type="text" id="report-rec-test" class="form-input" value="Test góc quay cận cảnh sử dụng tăm nước xịt bay mảng bám giả">
                  </div>

                  <div class="form-group mb-12">
                    <label for="report-rec-test-prod">Sản phẩm thử nghiệm</label>
                    <input type="text" id="report-rec-test-prod" class="form-input" value="Máy tăm nước cầm tay">
                  </div>

                  <div class="form-group mb-12">
                    <label for="report-rec-test-angle">Góc nội dung thử nghiệm</label>
                    <input type="text" id="report-rec-test-angle" class="form-input" value="Thách thức làm sạch kẽ răng sau 3 giây">
                  </div>

                  <div class="form-group mb-12">
                    <label for="report-rec-test-metric">Chỉ số thành công kỳ vọng</label>
                    <input type="text" id="report-rec-test-metric" class="form-input" value="Tỷ lệ click-through rate (CTR) > 3%">
                  </div>

                  <div class="form-group mb-12">
                    <label for="report-decision-promote">Sản phẩm cần đẩy mạnh tiếp theo</label>
                    <input type="text" id="report-decision-promote" class="form-input" value="Men vi sinh nha khoa K12/M18, Cạo lưỡi inox">
                  </div>

                  <div class="form-group mb-12">
                    <label for="report-decision-pause">Sản phẩm tạm hoãn quảng cáo</label>
                    <input type="text" id="report-decision-pause" class="form-input" value="Không có (hoặc Máy lọc không khí HEPA do giá trị cao cần đầu tư nội dung)">
                  </div>

                  <div class="form-group mb-12">
                    <label for="report-focus-goal">Mục tiêu chính tuần tới</label>
                    <input type="text" id="report-focus-goal" class="form-input" value="Đạt mốc 15,000 lượt xem tổng hợp và 10 đơn hàng đầu tiên.">
                  </div>

                  <div class="form-group mb-4">
                    <label>Top 3 hành động trọng tâm</label>
                    <input type="text" id="report-focus-action-1" class="form-input mb-4" value="Sản xuất 3 video ngắn chất lượng cao về men vi sinh nha khoa.">
                    <input type="text" id="report-focus-action-2" class="form-input mb-4" value="Đăng tải bài viết phân tích biofilm trên group Facebook Microbiome.">
                    <input type="text" id="report-focus-action-3" class="form-input" value="Tối ưu mô tả và hashtag chuẩn SEO Microbiome Living Lab.">
                  </div>

                  <button class="btn btn--primary btn--full mt-12" onclick="updateWeeklyPreviewText()">🔄 Cập nhật Bản xem trước</button>
                </div>

                <!-- Preview báo cáo Markdown -->
                <div class="card" style="padding:20px; display:flex; flex-direction:column; gap:16px;">
                  <h4 class="t-h3" style="border-bottom:1px solid var(--border); padding-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                    <span>📄 Bản xem trước báo cáo (.md)</span>
                    <span class="badge badge--learn">Markdown</span>
                  </h4>
                  
                  <textarea id="report-preview-text" class="csv-textarea" style="height: 480px; font-family:monospace; font-size:0.85rem; line-height:1.5; color:var(--text);" readonly></textarea>
                  
                  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
                    <button class="btn btn--primary" onclick="copyReportMarkdown()">Sao chép 📋</button>
                    <button class="btn btn--outline" onclick="downloadReportMD()">Tải file .md 📥</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 6: SCIENCE LOOKUP -->
          <div class="dash-tab-content ${activeTab === 'dash-science-tab' ? 'active' : ''}" id="dash-science-tab">
            <div class="card reveal" style="padding:24px;">
              <h3 class="t-h2 mb-12">🔬 Tra Cứu Thư Viện Khoa Học Vi Sinh</h3>
              <p class="t-body" style="color:var(--text-secondary); margin-bottom:20px;">
                Tìm kiếm tài liệu, nghiên cứu lâm sàng từ thư viện y khoa Europe PMC để trích dẫn vào kịch bản video. Việc trích dẫn khoa học chính xác giúp tăng 10x tỷ lệ chuyển đổi!
              </p>
              
              <div style="display:flex; gap:12px; margin-bottom:24px;">
                <input type="text" id="science-search-query" class="form-input" style="flex-grow:1; font-weight:600;" placeholder="Nhập từ khóa (VD: Streptococcus salivarius, Lactobacillus reuteri bad breath, dust mites allergy...)" onkeydown="if(event.key === 'Enter') searchScientificPapers()">
                <button class="btn btn--primary" onclick="searchScientificPapers()">Tìm kiếm 🔍</button>
              </div>

              <div style="margin-bottom:24px; display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
                <span class="t-small" style="font-weight:600; color:var(--text-secondary);">Từ khóa gợi ý:</span>
                <button class="btn btn--outline btn--sm" style="min-height:unset; height:32px; padding:0 12px; font-size:0.8rem;" onclick="document.getElementById('science-search-query').value='Streptococcus salivarius bad breath'; searchScientificPapers();">Viên ngậm K12</button>
                <button class="btn btn--outline btn--sm" style="min-height:unset; height:32px; padding:0 12px; font-size:0.8rem;" onclick="document.getElementById('science-search-query').value='Bacillus subtilis gut microbiome'; searchScientificPapers();">Bào tử lợi khuẩn</button>
                <button class="btn btn--outline btn--sm" style="min-height:unset; height:32px; padding:0 12px; font-size:0.8rem;" onclick="document.getElementById('science-search-query').value='dust mites allergy bedding'; searchScientificPapers();">Dị ứng ve bụi</button>
                <button class="btn btn--outline btn--sm" style="min-height:unset; height:32px; padding:0 12px; font-size:0.8rem;" onclick="document.getElementById('science-search-query').value='HEPA filter allergen removal'; searchScientificPapers();">Màng lọc HEPA</button>
              </div>

              <div id="science-search-results" class="mt-20">
                <div class="text-center p-20" style="color:var(--text-muted); border:1px dashed var(--border); border-radius:var(--radius); background:var(--bg);">
                  💡 Nhập từ khóa tìm kiếm hoặc chọn từ khóa gợi ý phía trên để bắt đầu tra cứu y khoa.
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 7: VIDEO SCRIPT HUB -->
          <div class="dash-tab-content ${activeTab === 'dash-creator-tab' ? 'active' : ''}" id="dash-creator-tab">
            <div class="card reveal" style="padding:24px;">
              <h3 class="t-h2 mb-12">🎬 Trung Tâm Biên Tập Kịch Bản Video</h3>
              <p class="t-body" style="color:var(--text-secondary); margin-bottom:24px;">
                Chọn sản phẩm và khung kịch bản nội dung (Problem-based, Myth-busting, Science-backed) để tự động điền các góc tiếp cận thành công đã được tối ưu. Bạn có thể chỉnh sửa trực tiếp, đo độ dài nói và sao chép/tải về.
              </p>

              <div class="grid grid-2" style="gap:24px; align-items: start;">
                <!-- Cấu hình và chỉnh sửa kịch bản -->
                <div class="card" style="padding:20px; background:var(--bg); border:1px solid var(--border);">
                  <h4 class="t-h3 mb-16" style="border-bottom:1px solid var(--border); padding-bottom:8px;">1. Thiết lập kịch bản</h4>
                  
                  <div class="form-group mb-12">
                    <label for="script-select-product">Chọn sản phẩm mục tiêu</label>
                    <select id="script-select-product" class="form-select" onchange="onScriptProductOrAngleChange()">
                      ${PRODUCTS.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                    </select>
                  </div>

                  <div class="form-group mb-16">
                    <label for="script-select-angle">Chọn góc nội dung (Framework)</label>
                    <select id="script-select-angle" class="form-select" onchange="onScriptProductOrAngleChange()">
                      <option value="problem">Problem-based (Đánh trúng nỗi đau thực tế)</option>
                      <option value="myth">Myth-busting (Đập tan lầm tưởng / Clickbait)</option>
                      <option value="science">Science-backed (Giải thích khoa học / Chứng thực)</option>
                    </select>
                  </div>

                  <h4 class="t-h3 mb-12" style="border-top:1px dashed var(--border); padding-top:16px;">2. Nội dung biên tập</h4>

                  <div class="form-group mb-12">
                    <label for="script-edit-hook">Câu Hook 3 giây đầu (TikTok/Reels Hook)</label>
                    <input type="text" id="script-edit-hook" class="form-input" oninput="updateScriptPreviewAndStats()">
                  </div>

                  <div class="form-group mb-12">
                    <label for="script-edit-visual">Hình ảnh / Hành động gợi ý (Visual Cues)</label>
                    <textarea id="script-edit-visual" class="form-input" style="height:60px; font-family:inherit; resize:vertical;" oninput="updateScriptPreviewAndStats()"></textarea>
                  </div>

                  <div class="form-group mb-12">
                    <label for="script-edit-vo">Lời thoại (Voiceover - Đọc lớn)</label>
                    <textarea id="script-edit-vo" class="form-input" style="height:140px; font-family:inherit; resize:vertical;" oninput="updateScriptPreviewAndStats()"></textarea>
                  </div>

                  <div class="form-group mb-4">
                    <label for="script-edit-tips">Mẹo sáng tạo (Creative Tips)</label>
                    <input type="text" id="script-edit-tips" class="form-input" oninput="updateScriptPreviewAndStats()">
                  </div>
                </div>

                <!-- Preview kịch bản & stats -->
                <div class="card" style="padding:20px; display:flex; flex-direction:column; gap:16px;">
                  <h4 class="t-h3" style="border-bottom:1px solid var(--border); padding-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                    <span>📄 Kịch bản hoàn thiện</span>
                    <span class="badge badge--learn" id="script-badge-angle">Problem-based</span>
                  </h4>

                  <!-- Chỉ số đo lường kịch bản -->
                  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; background:var(--bg); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border);">
                    <div>
                      <span class="t-small" style="color:var(--text-secondary); display:block;">Độ dài text</span>
                      <strong id="script-stat-words" style="font-size:1.1rem; color:var(--primary);">0 từ</strong>
                    </div>
                    <div>
                      <span class="t-small" style="color:var(--text-secondary); display:block;">Thời lượng đọc ước tính</span>
                      <strong id="script-stat-time" style="font-size:1.1rem; color:var(--primary);">0 giây</strong>
                    </div>
                  </div>

                  <div id="script-time-warning" class="card__science" style="display:none; padding: 10px; background: rgba(231, 76, 60, 0.1); border-left: 4px solid var(--danger); border-radius: 4px; font-weight: 500; color: var(--danger); font-size: 0.82rem; margin-top:-4px;">
                    ⚠️ Kịch bản vượt quá 60 giây! Hãy rút ngắn để tối ưu tỷ lệ hoàn thành (Completion Rate) trên TikTok/Reels.
                  </div>

                  <textarea id="script-preview-text" class="csv-textarea" style="height: 340px; font-family:monospace; font-size:0.85rem; line-height:1.5; color:var(--text);" readonly></textarea>
                  
                  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
                    <button class="btn btn--primary" onclick="copyScriptText()">Sao chép 📋</button>
                    <button class="btn btn--outline" onclick="downloadScriptText()">Tải kịch bản .md 📥</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  `;
}

function initDashboard() {
  setTimeout(() => {
    document.querySelectorAll('.bar-chart__fill').forEach(bar => {
      bar.style.width = bar.getAttribute('data-width') + '%';
    });
  }, 150);
  updateScorer();
  updateOnboardingProgress();
  if (appState.activeDashTab === 'dash-review-tab') {
    updateWeeklyPreviewText();
  } else if (appState.activeDashTab === 'dash-creator-tab') {
    onScriptProductOrAngleChange();
  }
}

// --- FORM TOGGLING ---
window.toggleAddForm = function() {
  const form = document.getElementById('add-video-form');
  if (form) {
    const isHidden = form.style.display === 'none';
    form.style.display = isHidden ? 'block' : 'none';
  }
};

window.submitNewVideo = function() {
  const date = document.getElementById('form-date').value;
  const platform = document.getElementById('form-platform').value;
  const category = document.getElementById('form-category').value;
  const title = document.getElementById('form-title').value.trim();
  const hook = document.getElementById('form-hook').value.trim();
  const product = document.getElementById('form-product').value.trim();
  const views = Number(document.getElementById('form-views').value) || 0;
  const likes = Number(document.getElementById('form-likes').value) || 0;
  const saves = Number(document.getElementById('form-saves').value) || 0;
  const comments = Number(document.getElementById('form-comments').value) || 0;
  const clicks = Number(document.getElementById('form-clicks').value) || 0;
  const orders = Number(document.getElementById('form-orders').value) || 0;
  const revenue = Number(document.getElementById('form-revenue').value) || 0;
  const lessonLearned = document.getElementById('form-lesson').value.trim();
  const nextAction = document.getElementById('form-action').value.trim();

  if (!title || !product) {
    showToast('Vui lòng điền tiêu đề bài đăng và tên sản phẩm!', '⚠️');
    return;
  }

  const newLog = { 
    date, platform, title, hook, category, product, 
    views, likes, saves, comments, clicks, orders, revenue,
    lessonLearned, nextAction 
  };
  appState.tracker.push(newLog);
  localStorage.setItem('microbiome_tracker', JSON.stringify(appState.tracker));
  
  showToast('Đã lưu bài viết và cập nhật số liệu thành công!', '✅');
  render();
};

window.deleteVideoLog = function(idx) {
  if (confirm('Bạn có chắc chắn muốn xóa dòng nhật ký này không?')) {
    appState.tracker.splice(idx, 1);
    localStorage.setItem('microbiome_tracker', JSON.stringify(appState.tracker));
    showToast('Đã xóa dòng nhật ký nội dung.', '🗑️');
    render();
  }
};

// --- PRODUCT SCORER SIMULATOR LOGIC ---
window.updateScorer = function() {
  let total = 0;
  for (let i = 1; i <= 7; i++) {
    const val = Number(document.getElementById(`score-val-${i}`).value);
    const scoreLbl = document.getElementById(`score-lbl-${i}`);
    if (scoreLbl) scoreLbl.innerText = val;
    total += val;
  }
  
  const totalScoreEl = document.getElementById('total-score');
  const badgeEl = document.getElementById('verdict-badge');
  const descEl = document.getElementById('verdict-desc');
  const warningEl = document.getElementById('scorer-warning');
  
  if (!totalScoreEl || !badgeEl || !descEl) return;

  totalScoreEl.innerText = total;

  let verdict = '';
  let badgeClass = '';
  let description = '';

  // Classify score based exactly on product_scoring_model.md
  if (total >= 29) {
    verdict = 'Sản phẩm trọng tâm (Priority Product)';
    badgeClass = 'badge--gut';
    description = 'Sản phẩm xuất sắc kết hợp nỗi đau lớn, tiềm năng nội dung cao, và cơ sở khoa học vững chắc. Tập trung toàn lực sản xuất nội dung!';
  } else if (total >= 22) {
    verdict = 'Ứng viên tiềm năng (Good Validation Candidate)';
    badgeClass = 'badge--air';
    description = 'Sản phẩm có triển vọng tốt để thử nghiệm. Hãy lên kế hoạch kiểm chứng phản hồi từ thị trường bằng 1-2 nội dung mẫu.';
  } else if (total >= 15) {
    verdict = 'Thử nghiệm ưu tiên thấp (Low-Priority Test)';
    badgeClass = 'badge--oral';
    description = 'Mức độ ưu tiên thấp. Sản phẩm có thể có rào cản về hoa hồng, độ trực quan hoặc tệp khách hàng hẹp. Chỉ nên làm nếu có sẵn tài nguyên.';
  } else {
    verdict = 'Nên bỏ qua (Avoid for now)';
    badgeClass = 'badge--home';
    description = 'Điểm số quá thấp. Sản phẩm chưa phù hợp hoặc thiếu hiệu quả kinh tế ở thời điểm hiện tại. Không nên đầu tư thời gian xây dựng nội dung.';
  }

  badgeEl.className = `badge ${badgeClass}`;
  badgeEl.innerText = verdict;
  descEl.innerText = description;

  // Key criteria warning validation
  const painIntensity = Number(document.getElementById('score-val-1').value);
  const scientificCred = Number(document.getElementById('score-val-3').value);
  const marketplaceAvail = Number(document.getElementById('score-val-4').value);

  if (warningEl) {
    if (painIntensity < 4 || scientificCred < 3 || marketplaceAvail < 3) {
      warningEl.innerHTML = `
        <div style="margin-top: 16px; padding: 12px; background: rgba(217, 79, 79, 0.08); border-left: 4px solid var(--danger); border-radius: var(--radius-sm); font-size: 0.8rem; text-align: left; color: var(--danger); line-height: 1.45;">
          <strong>⚠️ Cảnh báo chuẩn hóa (Product Rule):</strong><br>
          Sản phẩm này chưa đạt tiêu chuẩn tối thiểu để ưu tiên validation:
          <ul style="margin-top: 4px; margin-left: 16px; list-style-type: disc;">
            ${painIntensity < 4 ? '<li>Nỗi đau khách hàng phải ≥ 4</li>' : ''}
            ${scientificCred < 3 ? '<li>Cơ sở khoa học phải ≥ 3</li>' : ''}
            ${marketplaceAvail < 3 ? '<li>Mức độ sẵn có phải ≥ 3</li>' : ''}
          </ul>
          <em>Theo triết lý, nếu sản phẩm có khoa học yếu nhưng hoa hồng cao, không nên ưu tiên nhằm duy trì tính chân thực dài hạn.</em>
        </div>
      `;
    } else {
      warningEl.innerHTML = '';
    }
  }
};

window.saveProductScore = function() {
  const nameEl = document.getElementById('scorer-product-name');
  if (!nameEl) return;
  const name = nameEl.value.trim();
  if (!name) {
    showToast('Vui lòng nhập tên sản phẩm trước khi lưu!', '⚠️');
    return;
  }

  let total = 0;
  for (let i = 1; i <= 7; i++) {
    total += Number(document.getElementById(`score-val-${i}`).value);
  }

  let decision = '';
  if (total >= 29) decision = 'Sản phẩm trọng tâm';
  else if (total >= 22) decision = 'Sản phẩm tiềm năng';
  else if (total >= 15) decision = 'Sản phẩm ưu tiên thấp';
  else decision = 'Nên bỏ qua';

  const today = new Date().toISOString().split('T')[0];
  const newScore = { name, total, decision, date: today };

  appState.savedScores.unshift(newScore);
  localStorage.setItem('microbiome_scores', JSON.stringify(appState.savedScores));
  
  showToast(`Đã lưu điểm số sản phẩm "${name}" thành công!`, '💾');
  nameEl.value = '';
  render();
};

window.deleteSavedScore = function(idx) {
  appState.savedScores.splice(idx, 1);
  localStorage.setItem('microbiome_scores', JSON.stringify(appState.savedScores));
  showToast('Đã xóa đánh giá sản phẩm khỏi lịch sử.', '🗑️');
  render();
};

// --- CHECKLIST / TODO LOGIC ---
window.addNewTodo = function() {
  const input = document.getElementById('new-todo-text');
  if (!input) return;
  const text = input.value.trim();
  if (!text) {
    showToast('Nội dung công việc không được để trống!', '⚠️');
    return;
  }

  appState.checklist.unshift({ text, status: 'pending' });
  localStorage.setItem('microbiome_checklist', JSON.stringify(appState.checklist));
  
  showToast('Đã bổ sung nhiệm vụ tiếp thị mới!', '📝');
  input.value = '';
  render();
};

window.toggleTodoStatus = function(idx) {
  const current = appState.checklist[idx].status;
  appState.checklist[idx].status = current === 'done' ? 'pending' : 'done';
  localStorage.setItem('microbiome_checklist', JSON.stringify(appState.checklist));
  
  showToast(appState.checklist[idx].status === 'done' ? 'Đã hoàn thành công việc!' : 'Đã chuyển việc về trạng thái chờ.', '🔄');
  render();
};

window.deleteTodo = function(idx) {
  appState.checklist.splice(idx, 1);
  localStorage.setItem('microbiome_checklist', JSON.stringify(appState.checklist));
  showToast('Đã xóa nhiệm vụ khỏi danh sách.', '🗑️');
  render();
};

// --- EXPORT TO CSV ---
window.exportTrackerToCSV = function() {
  const headers = ['Date', 'Platform', 'Content title', 'Hook', 'Category', 'Product promoted', 'Views', 'Likes', 'Saves', 'Comments', 'Clicks', 'Orders', 'Revenue', 'Lesson learned', 'Next action'];
  const rows = appState.tracker.map(r => [
    r.date,
    `"${r.platform.replace(/"/g, '""')}"`,
    `"${r.title.replace(/"/g, '""')}"`,
    `"${r.hook.replace(/"/g, '""')}"`,
    r.category,
    `"${r.product.replace(/"/g, '""')}"`,
    r.views || 0,
    r.likes || 0,
    r.saves || 0,
    r.comments || 0,
    r.clicks || 0,
    r.orders || 0,
    r.revenue || 0,
    `"${(r.lessonLearned || '').replace(/"/g, '""')}"`,
    `"${(r.nextAction || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'microbiome_content_analytics_2026.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Tải xuống báo cáo phân tích CSV thành công!', '💾');
};

// --- CSV PARSER & IMPORT LOGIC ---
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i+1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') {
        i++;
      }
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    lines.push(row);
  }
  return lines;
}

window.handleCSVImport = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const text = e.target.result;
      const rows = parseCSV(text);
      if (rows.length < 2) {
        showToast('File CSV không có dữ liệu!', '⚠️');
        return;
      }
      
      const headers = rows[0].map(h => h.trim().toLowerCase());
      const getIndex = (name) => headers.findIndex(h => h.includes(name.toLowerCase()));
      
      const idxDate = getIndex('date');
      const idxPlatform = getIndex('platform');
      const idxTitle = getIndex('title');
      const idxHook = getIndex('hook');
      const idxCategory = getIndex('category');
      const idxProduct = getIndex('product');
      const idxViews = getIndex('views');
      const idxLikes = getIndex('likes');
      const idxSaves = getIndex('saves');
      const idxComments = getIndex('comments');
      const idxClicks = getIndex('clicks');
      const idxOrders = getIndex('orders');
      const idxRevenue = getIndex('revenue');
      const idxLesson = getIndex('lesson');
      const idxAction = getIndex('action');
      
      if (idxDate === -1 || idxPlatform === -1 || idxTitle === -1) {
        showToast('Định dạng cột CSV không hợp lệ!', '⚠️');
        return;
      }
      
      const importedData = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length < 3 || !row[idxDate] || !row[idxTitle]) continue;
        
        importedData.push({
          date: row[idxDate]?.trim() || new Date().toISOString().split('T')[0],
          platform: row[idxPlatform]?.trim() || 'TikTok',
          title: row[idxTitle]?.trim() || '',
          hook: idxHook !== -1 ? row[idxHook]?.trim() || '' : '',
          category: idxCategory !== -1 ? row[idxCategory]?.trim().toLowerCase() || 'oral' : 'oral',
          product: idxProduct !== -1 ? row[idxProduct]?.trim() || '' : '',
          views: idxViews !== -1 ? Number(row[idxViews]) || 0 : 0,
          likes: idxLikes !== -1 ? Number(row[idxLikes]) || 0 : 0,
          saves: idxSaves !== -1 ? Number(row[idxSaves]) || 0 : 0,
          comments: idxComments !== -1 ? Number(row[idxComments]) || 0 : 0,
          clicks: idxClicks !== -1 ? Number(row[idxClicks]) || 0 : 0,
          orders: idxOrders !== -1 ? Number(row[idxOrders]) || 0 : 0,
          revenue: idxRevenue !== -1 ? Number(row[idxRevenue]) || 0 : 0,
          lessonLearned: idxLesson !== -1 ? row[idxLesson]?.trim() || '' : '',
          nextAction: idxAction !== -1 ? row[idxAction]?.trim() || '' : ''
        });
      }
      
      if (importedData.length === 0) {
        showToast('Không có dòng dữ liệu hợp lệ trong file!', '⚠️');
        return;
      }
      
      if (confirm(`Bạn có muốn thay thế dữ liệu hiện tại bằng ${importedData.length} dòng dữ liệu từ file CSV không?`)) {
        appState.tracker = importedData;
        localStorage.setItem('microbiome_tracker', JSON.stringify(appState.tracker));
        showToast(`Đã nhập thành công ${importedData.length} chiến dịch từ CSV!`, '✅');
        render();
      }
    } catch (err) {
      console.error(err);
      showToast('Lỗi khi đọc file CSV!', '⚠️');
    }
  };
  reader.readAsText(file);
};

window.resetTrackerData = function() {
  if (confirm('Bạn có chắc chắn muốn xóa toàn bộ dữ liệu nhật ký chiến dịch hiện tại và quay về dữ liệu mẫu ban đầu không?')) {
    localStorage.removeItem('microbiome_tracker');
    appState.tracker = [
      { date: '2026-06-01', platform: 'TikTok', title: 'Tại sao nước súc miệng làm hôi miệng nặng hơn?', hook: 'Đừng ngậm nước súc miệng nếu lưỡi vẫn còn bợn trắng...', category: 'oral', product: 'Viên Ngậm Lợi Khuẩn Nha Khoa K12/M18', views: 4500, likes: 380, saves: 140, comments: 55, clicks: 310, orders: 15, revenue: 1350000, lessonLearned: 'Góc bóc phốt lầm tưởng về nước súc miệng diệt khuẩn thu hút tranh luận cao, CTR đạt 6.9%.', nextAction: 'Lên kịch bản so sánh nước súc miệng cồn với men vi sinh nha khoa.' },
      { date: '2026-06-05', platform: 'Facebook Reels', title: 'Cảnh báo: Chiếc nệm nhìn sạch nhưng chứa hàng triệu ve bụi', hook: 'Hắt hơi liên tục mỗi sáng thức dậy? Thủ phạm đây...', category: 'home', product: 'Máy Hút Bụi Giường Nệm Diệt Khuẩn UV-C', views: 8200, likes: 640, saves: 280, comments: 90, clicks: 520, orders: 22, revenue: 4400000, lessonLearned: 'Cận cảnh đống bụi xơ trắng hút ra từ nệm có tính trực quan cực mạnh, tạo chuyển đổi cao.', nextAction: 'Sản xuất video hướng dẫn quy trình 3 bước làm sạch phòng ngủ dị ứng.' },
      { date: '2026-06-10', platform: 'TikTok', title: 'Test màng lọc HEPA sau 1 tháng sử dụng', hook: 'If you have a mini purifier, open it now...', category: 'air', product: 'Máy Lọc Không Khí HEPA Mini Phòng Ngủ', views: 2780, likes: 190, saves: 40, comments: 18, clicks: 120, orders: 4, revenue: 600000, lessonLearned: 'Hình ảnh màng lọc HEPA bám bụi đen có sức thuyết phục tốt nhưng tệp khách hàng hẹp hơn.', nextAction: 'Test góc tiếp thị: Giải pháp cho giấc ngủ không nghẹt mũi của trẻ sơ sinh.' }
    ];
    localStorage.setItem('microbiome_tracker', JSON.stringify(appState.tracker));
    showToast('Đã khôi phục dữ liệu mẫu ban đầu!', '🔄');
    render();
  }
};

// --- EUROPE PMC SCIENCE LOOKUP LOGIC ---
window.searchScientificPapers = function() {
  const queryInput = document.getElementById('science-search-query');
  const resultsContainer = document.getElementById('science-search-results');
  if (!queryInput || !resultsContainer) return;
  
  const query = queryInput.value.trim();
  if (!query) {
    showToast('Vui lòng nhập từ khóa tìm kiếm!', '⚠️');
    return;
  }
  
  resultsContainer.innerHTML = `
    <div style="text-align: center; padding: 40px 0;">
      <div class="spinner"></div>
      <p style="margin-top: 16px; color: var(--text-secondary); font-weight: 500;">Đang kết nối thư viện y khoa Europe PMC và tìm kiếm...</p>
    </div>
  `;
  
  const fullQuery = `${query} AND (microbiome OR probiotic OR bacterial OR allergy OR hygiene OR enzyme)`;
  const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(fullQuery)}&format=json&pageSize=8`;
  
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const results = data.resultList?.result || [];
      appState.scienceSearchResults = results;
      if (results.length === 0) {
        resultsContainer.innerHTML = `
          <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary); border: 1px dashed var(--border); border-radius: var(--radius); background: var(--bg);">
            📭 Không tìm thấy nghiên cứu y khoa nào phù hợp với từ khóa "${query}". Hãy thử dùng tiếng Anh học thuật (ví dụ: "Streptococcus salivarius", "Lactobacillus reuteri", "dust mites").
          </div>
        `;
        return;
      }
      
      let html = `<div class="grid grid-2" style="gap:16px;">`;
      results.forEach((r, index) => {
        const title = r.title || 'No Title';
        const authors = r.authorString || 'Unknown Authors';
        const journal = r.journalInfo?.journal?.title || r.journalTitle || 'Academic Journal';
        const year = r.pubYear || '';
        const pmid = r.pmid || '';
        const link = pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : `https://europepmc.org/article/MED/${r.id}`;
        
        let abstract = r.abstractText || '';
        if (abstract.length > 200) {
          abstract = abstract.slice(0, 200) + '...';
        }
        
        html += `
          <div class="card" style="padding:20px; display:flex; flex-direction:column; justify-content:space-between; gap:12px; background:var(--surface); border:1px solid var(--border);">
            <div>
              <div style="font-size:0.75rem; font-weight:600; color:var(--primary); text-transform:uppercase; letter-spacing:0.04em;">🔬 ${journal} (${year})</div>
              <h4 class="t-h3" style="font-size:0.95rem; margin-top:4px; line-height:1.4;"><a href="${link}" target="_blank" rel="noopener" style="color:var(--text); text-decoration:underline;">${title}</a></h4>
              <p class="t-small mt-8" style="color:var(--text-secondary); font-style:italic;">Tác giả: ${authors.length > 60 ? authors.slice(0, 60) + '...' : authors}</p>
              ${abstract ? `<p class="t-small mt-8" style="color:var(--text-muted); background:var(--bg); padding:8px; border-radius:4px; border-left:3px solid var(--accent);">${abstract}</p>` : ''}
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-light); padding-top:10px; margin-top:8px;">
              <span class="t-small" style="font-family:monospace; color:var(--text-muted);">PMID: ${pmid || r.id}</span>
              <div style="display:flex; gap:6px;">
                <button class="btn btn--outline btn--small" style="padding:4px 8px; font-size:0.75rem; min-height:unset; height:auto;" onclick="copyScienceCitation(${index})">Trích dẫn 📋</button>
                <a href="${link}" target="_blank" rel="noopener" class="btn btn--primary btn--small" style="padding:4px 8px; font-size:0.75rem; min-height:unset; height:auto; color:white;">Đọc bài →</a>
              </div>
            </div>
          </div>
        `;
      });
      html += `</div>`;
      resultsContainer.innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--danger); border: 1px dashed var(--border); border-radius: var(--radius); background: var(--surface);">
          ⚠️ Đã xảy ra lỗi khi kết nối với thư viện y khoa Europe PMC. Vui lòng kiểm tra lại kết nối internet.
        </div>
      `;
    });
};

window.copyScienceCitation = function(idx) {
  if (!appState.scienceSearchResults || !appState.scienceSearchResults[idx]) return;
  const r = appState.scienceSearchResults[idx];
  const title = r.title || 'No Title';
  const authors = r.authorString || 'Unknown Authors';
  const journal = r.journalInfo?.journal?.title || r.journalTitle || 'Academic Journal';
  const year = r.pubYear || '';
  const citation = `${authors}. (${year}). ${title}. ${journal}.`;
  copyToClipboard(citation, 'Đã sao chép trích dẫn y khoa!');
};

// --- CUSTOM AFFILIATE LINKS SETTINGS ---
window.saveCustomLinks = function() {
  const newLinks = {};
  PRODUCTS.forEach(p => {
    const input = document.getElementById(`custom-link-input-${p.id}`);
    if (input) {
      const val = input.value.trim();
      if (val) {
        newLinks[p.id] = val;
      }
    }
  });
  STARTER_KITS.forEach(k => {
    const input = document.getElementById(`custom-link-input-kit_${k.id}`);
    if (input) {
      const val = input.value.trim();
      if (val) {
        newLinks[`kit_${k.id}`] = val;
      }
    }
  });
  appState.customLinks = newLinks;
  localStorage.setItem('microbiome_custom_links', JSON.stringify(appState.customLinks));
  showToast('Đã lưu cấu hình link tiếp thị liên kết!', '💾');
  attachAffiliateListeners();
  render();
};

window.downloadConfigJS = function() {
  const links = appState.customLinks || {};
  let content = `/* =========================================================================
   Microbiome Living Lab — Affiliate Links Configuration
   Generated dynamically from Founder Hub
   ========================================================================= */

window.CUSTOM_AFFILIATE_LINKS = {
`;

  PRODUCTS.forEach(p => {
    const l = links[p.id] || p.link || '';
    content += `  // ${p.name} (${p.category})\n`;
    content += `  "${p.id}": "${l.replace(/"/g, '\\"')}",\n\n`;
  });

  STARTER_KITS.forEach(k => {
    const l = links[`kit_${k.id}`] || '';
    content += `  // Combo: ${k.name}\n`;
    content += `  "kit_${k.id}": "${l.replace(/"/g, '\\"')}",\n\n`;
  });

  content += `};
`;

  const blob = new Blob([content], { type: 'application/javascript;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'config.js');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Đã tải xuống file config.js thành công! Vui lòng copy đè vào thư mục site/ để sử dụng.', '📥');
};

// --- WEEKLY REVIEW GENERATOR ---
window.generateWeeklyReportMD = function() {
  const tracker = appState.tracker || [];
  const totalContent = tracker.length;
  const totalViews = tracker.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const totalClicks = tracker.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const totalOrders = tracker.reduce((acc, curr) => acc + (curr.orders || 0), 0);
  const totalRevenue = tracker.reduce((acc, curr) => acc + (curr.revenue || 0), 0);
  
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) + '%' : '0%';
  const cr = totalClicks > 0 ? ((totalOrders / totalClicks) * 100).toFixed(2) + '%' : '0%';
  const revPerPiece = totalContent > 0 ? (totalRevenue / totalContent).toFixed(0) : '0';

  const getCatName = (catId) => {
    const found = CATEGORIES.find(c => c.id === catId);
    return found ? found.name : catId;
  };

  // Group by category
  const categoryStats = {};
  tracker.forEach(t => {
    const cat = t.category || 'Chưa phân loại';
    if (!categoryStats[cat]) {
      categoryStats[cat] = { clicks: 0, orders: 0, revenue: 0 };
    }
    categoryStats[cat].clicks += (t.clicks || 0);
    categoryStats[cat].orders += (t.orders || 0);
    categoryStats[cat].revenue += (t.revenue || 0);
  });

  // Group by product
  const productStats = {};
  tracker.forEach(t => {
    const prod = t.product || 'Chưa rõ';
    const cat = t.category || 'Chưa phân loại';
    if (!productStats[prod]) {
      productStats[prod] = { category: cat, clicks: 0, orders: 0, revenue: 0 };
    }
    productStats[prod].clicks += (t.clicks || 0);
    productStats[prod].orders += (t.orders || 0);
    productStats[prod].revenue += (t.revenue || 0);
  });

  // Sort products by conversion rate/revenue
  const topProducts = Object.keys(productStats).map(name => {
    const stat = productStats[name];
    const crVal = stat.clicks > 0 ? ((stat.orders / stat.clicks) * 100).toFixed(1) + '%' : '0%';
    let decision = 'Giữ nguyên';
    if (stat.orders > 5) decision = 'Tăng ngân sách / Ưu tiên';
    else if (stat.clicks > 20 && stat.orders === 0) decision = 'Cần tối ưu landing/hook';
    return { name, ...stat, cr: crVal, decision };
  }).sort((a,b) => b.revenue - a.revenue).slice(0, 5);

  // Best content angle (based on CTR)
  let bestAngle = 'N/A';
  let bestAngleEvidence = 'N/A';
  let maxCtr = 0;
  tracker.forEach(t => {
    if (t.views > 100) {
      const thisCtr = t.clicks / t.views;
      if (thisCtr > maxCtr) {
        maxCtr = thisCtr;
        bestAngle = t.title + ` (Hook: ${t.hook || 'N/A'})`;
        bestAngleEvidence = `${t.views} views, ${t.clicks} clicks (${(thisCtr * 100).toFixed(1)}% CTR)`;
      }
    }
  });

  // Get values from form inputs
  const weekOf = document.getElementById('report-week-of')?.value || new Date().toISOString().split('T')[0];
  const angleWhy = document.getElementById('report-angle-why')?.value || 'Đánh trực diện vào nỗi đau khách hàng gặp phải (biofilm, hơi thở mùi) và đưa ra giải pháp vật lý/vi sinh có cơ sở khoa học rõ ràng kèm demo thực tế.';
  const worstTopic = document.getElementById('report-worst-topic')?.value || 'Các video thuần lý thuyết, không có demo trực quan';
  const worstTopicReason = document.getElementById('report-worst-topic-reason')?.value || 'Người xem lướt qua nhanh, thiếu tính tương tác thị giác.';
  const worstTopicDecision = document.getElementById('report-worst-topic-decision')?.value || 'Viết lại kịch bản (Rewrite)';
  const recTest = document.getElementById('report-rec-test')?.value || 'Test góc quay cận cảnh sử dụng tăm nước xịt bay mảng bám giả';
  const recTestProd = document.getElementById('report-rec-test-prod')?.value || 'Máy tăm nước cầm tay';
  const recTestAngle = document.getElementById('report-rec-test-angle')?.value || 'Thách thức làm sạch kẽ răng sau 3 giây';
  const recTestMetric = document.getElementById('report-rec-test-metric')?.value || 'Tỷ lệ click-through rate (CTR) > 3%';
  const decisionPromote = document.getElementById('report-decision-promote')?.value || 'Men vi sinh nha khoa K12/M18, Cạo lưỡi inox';
  const decisionPause = document.getElementById('report-decision-pause')?.value || 'Không có';
  const focusGoal = document.getElementById('report-focus-goal')?.value || 'Đạt mốc 15,000 lượt xem tổng hợp và 10 đơn hàng đầu tiên.';
  const focusAction1 = document.getElementById('report-focus-action-1')?.value || 'Sản xuất 3 video ngắn chất lượng cao về men vi sinh nha khoa.';
  const focusAction2 = document.getElementById('report-focus-action-2')?.value || 'Đăng tải bài viết phân tích biofilm trên group Facebook Microbiome.';
  const focusAction3 = document.getElementById('report-focus-action-3')?.value || 'Tối ưu mô tả và hashtag chuẩn SEO Microbiome Living Lab.';

  let md = `# Báo Cáo Đánh Giá Tuần (Weekly Review)

**Tuần ngày: ${weekOf}**

## 1. Chỉ số tổng quan (Weekly Snapshot)

| Chỉ số | Kết quả | Ghi chú |
|---|---:|---|
| Tổng số bài đăng / video đã xuất bản | ${totalContent} | |
| Tổng lượt xem (Views) | ${totalViews.toLocaleString()} | |
| Tổng lượt nhấn (Clicks) | ${totalClicks.toLocaleString()} | |
| Tổng đơn hàng (Orders) | ${totalOrders.toLocaleString()} | |
| Tổng doanh thu tạm tính | ${totalRevenue.toLocaleString()}đ | |
| Tỷ lệ nhấp (CTR) | ${ctr} | Clicks / Views |
| Tỷ lệ chuyển đổi (CR) | ${cr} | Orders / Clicks |
| Doanh thu trung bình trên mỗi bài viết | ${Number(revPerPiece).toLocaleString()}đ | Revenue / Content |

## 2. Góc tiếp cận nội dung hiệu quả nhất (Best Content Angle)

| Góc nội dung / Tiêu đề | Minh chứng (Evidence) | Lý do thành công |
|---|---|---|
| ${bestAngle} | ${bestAngleEvidence} | ${angleWhy} |

## 3. Phân tích theo danh mục sản phẩm (Best Product Category)

| Danh mục | Số lượt click | Đơn hàng | Doanh thu | Ghi chú |
|---|---:|---:|---:|---|
${Object.keys(categoryStats).map(cat => {
  const stat = categoryStats[cat];
  const catName = getCatName(cat);
  return `| ${catName} | ${stat.clicks} | ${stat.orders} | ${stat.revenue.toLocaleString()}đ | |`;
}).join('\n')}

## 4. Top các sản phẩm chuyển đổi tốt nhất (Top Converting Products)

| Sản phẩm | Danh mục | Số lượt click | Đơn hàng | Doanh thu | Tỷ lệ chuyển đổi (CR) | Quyết định |
|---|---|---:|---:|---:|---:|---|
${topProducts.map(p => {
  const catName = getCatName(p.category);
  return `| ${p.name} | ${catName} | ${p.clicks} | ${p.orders} | ${p.revenue.toLocaleString()}đ | ${p.cr} | ${p.decision} |`;
}).join('\n')}

## 5. Nội dung / Góc tiếp cận kém hiệu quả nhất (Worst Performing Topics)

| Chủ đề / Góc tiếp cận | Minh chứng | Lý do chính | Quyết định |
|---|---|---|---|
| ${worstTopic} | CTR thấp (<1%) hoặc tương tác kém | ${worstTopicReason} | ${worstTopicDecision} |

## 6. Đề xuất thử nghiệm tiếp theo (Recommended Next Tests)

| Thử nghiệm | Sản phẩm / Danh mục | Góc nội dung | Chỉ số thành công kỳ vọng | Người phụ trách | Hạn hoàn thành |
|---|---|---|---|---|---|
| ${recTest} | ${recTestProd} | ${recTestAngle} | ${recTestMetric} | Founder | 7 ngày tới |

## 7. Các quyết định chiến lược (Decisions)

- **Sản phẩm cần đẩy mạnh:** ${decisionPromote}
- **Sản phẩm cần tạm dừng/pause:** ${decisionPause}
- **Góc nội dung cần lặp lại (scale-up):** Trực quan hóa biofilm và gạt cơ học.
- **Góc nội dung cần dừng lại:** Nói suông lý thuyết hàn lâm.
- **Sản phẩm mới cần nghiên cứu thêm:** Bào tử lợi khuẩn xịt xoang, xịt chăn gối khử trùng sinh học.

## 8. Trọng tâm tuần tới (Next Week Focus)

**Mục tiêu chính:** ${focusGoal}

**Top 3 hành động cần làm:**
1. ${focusAction1}
2. ${focusAction2}
3. ${focusAction3}
`;

  return md;
};

window.updateWeeklyPreviewText = function() {
  const preview = document.getElementById('report-preview-text');
  if (preview) {
    preview.value = generateWeeklyReportMD();
  }
};

window.copyReportMarkdown = function() {
  const md = generateWeeklyReportMD();
  navigator.clipboard.writeText(md).then(() => {
    showToast('Đã sao chép báo cáo Markdown vào bộ nhớ tạm!', '📋');
  }).catch(err => {
    console.error('Lỗi khi sao chép: ', err);
    showToast('Không thể tự động sao chép. Vui lòng xem dưới text area.', '⚠️');
  });
};

window.downloadReportMD = function() {
  const md = generateWeeklyReportMD();
  const weekOf = document.getElementById('report-week-of')?.value || new Date().toISOString().split('T')[0];
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `weekly_review_${weekOf}.md`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Đã tải xuống file báo cáo weekly_review.md thành công!', '📥');
};

// --- ARTICLE PAGES & RETAIN DISCLOSURE ---
function renderArticle(id) {
  let title = 'Không tìm thấy bài viết';
  let content = '<p>Xin lỗi, bài viết này chưa được xuất bản hoặc không tồn tại.</p>';
  let articleObj = null;

  for (const group of Object.values(ARTICLES)) {
    const found = group.find(a => a.id == id);
    if (found) {
      articleObj = found;
      title = found.title;
      break;
    }
  }

  if (ARTICLE_CONTENT[id]) {
    content = ARTICLE_CONTENT[id];
  }

  return `
    <div class="page" id="page-article">
      <div class="container" style="max-width: 800px; padding-top: 40px; padding-bottom: 80px;">
        <button class="btn btn--ghost" style="margin-bottom: 20px; padding: 0;" onclick="navigate('/learn')">← Quay lại Góc Kiến thức</button>
        <div class="article-content" style="background:var(--surface); border-radius:var(--radius); padding:40px; border:1px solid var(--border);">
          <div class="card__science" style="margin-bottom: 24px; padding: 12px; background: rgba(211, 84, 0, 0.1); border-left: 4px solid #d35400; border-radius: 4px; font-weight: 500; color: #d35400; font-size: 0.9rem;">
            Tuyên bố: Bài viết này có chứa liên kết tiếp thị liên kết (Affiliate). Nếu bạn mua qua những liên kết này, chúng tôi có thể nhận được một khoản hoa hồng nhỏ mà bạn không phải trả thêm bất kỳ chi phí nào.
          </div>
          <h1 class="t-hero" style="margin-bottom: 16px;">${title}</h1>
          ${articleObj ? `<p class="t-body" style="color:var(--text-muted); margin-bottom:32px;">📖 ${articleObj.readTime} đọc</p>` : ''}
          <div class="article-body-content" style="line-height:1.8;">
            ${content}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDisclosurePage() {
  return `
    <div class="page" id="page-disclosure">
      <div class="container" style="max-width: 800px; padding-top: 60px; padding-bottom: 80px;">
        <h1 class="t-hero">Tuyên Bố Tiếp Thị Liên Kết</h1>
        <div class="article-content mt-32" style="background:var(--surface); border-radius:var(--radius); padding:40px; border:1px solid var(--border);">
          <p class="t-body"><strong>Cập nhật lần cuối: 2026</strong></p>
          <p class="t-body mt-12">Microbiome Living Lab tham gia chương trình tiếp thị liên kết của Shopee Việt Nam và các mạng lưới phân phối uy tín khác. Đây là những chương trình được thiết kế nhằm cung cấp phương thức giúp các trang web kiếm phí quảng cáo bằng cách quảng cáo và liên kết trực tiếp tới các sàn thương mại điện tử.</p>
          <p class="t-body mt-12">Khi bạn nhấp vào liên kết sản phẩm trên trang web này và tiến hành mua hàng thành công, chúng tôi sẽ nhận được một khoản hoa hồng tiếp thị liên kết nhỏ từ phía nhà cung cấp. Điều này giúp chúng tôi duy trì các hoạt động nghiên cứu khoa học vi sinh và vận hành website hoàn toàn miễn phí cho bạn.</p>
        </div>
      </div>
    </div>
  `;
}

function renderPrivacyPage() {
  return `
    <div class="page" id="page-privacy">
      <div class="container" style="max-width: 800px; padding-top: 60px; padding-bottom: 80px;">
        <h1 class="t-hero">Chính Sách Bảo Mật</h1>
        <div class="article-content mt-32" style="background:var(--surface); border-radius:var(--radius); padding:40px; border:1px solid var(--border);">
          <p class="t-body"><strong>Cập nhật lần cuối: 2026</strong></p>
          <p class="t-body mt-12">Tại Microbiome Living Lab, chúng tôi coi trọng quyền riêng tư của bạn. Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba. Trang web này sử dụng cookie theo dõi của bên thứ ba (như Google Analytics) để giúp chúng tôi hiểu rõ hơn về hành vi và nhu cầu của người dùng, từ đó nâng cao chất lượng nội dung. Bằng việc tiếp tục sử dụng trang web, bạn đồng ý với các chính sách phân tích bảo mật không xâm phạm này.</p>
        </div>
      </div>
    </div>
  `;
}

// --- SCROLL REVEAL EFFECT ---
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- SCROLL NAV SHADOW ---
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
});

// --- EXPOSE GLOBALS ---
window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleTheme = toggleTheme;

// --- INTERACTIVE VIDEO SCRIPT HUB FUNCTIONS ---
window.onScriptProductOrAngleChange = function() {
  const prodSelect = document.getElementById('script-select-product');
  const angleSelect = document.getElementById('script-select-angle');
  if (!prodSelect || !angleSelect) return;

  const productId = parseInt(prodSelect.value);
  const angle = angleSelect.value;

  const scriptTemplate = SCRIPT_TEMPLATES[productId];
  if (!scriptTemplate) return;

  const item = scriptTemplate[angle];
  if (!item) return;

  // Set values to inputs
  const hookInput = document.getElementById('script-edit-hook');
  const visualInput = document.getElementById('script-edit-visual');
  const voInput = document.getElementById('script-edit-vo');
  const tipsInput = document.getElementById('script-edit-tips');

  if (hookInput) hookInput.value = item.hook;
  if (visualInput) visualInput.value = item.visual;
  if (voInput) voInput.value = item.vo;
  if (tipsInput) tipsInput.value = item.tips;

  // Update badge
  const badgeAngle = document.getElementById('script-badge-angle');
  if (badgeAngle) {
    const angleText = angleSelect.options[angleSelect.selectedIndex].text.split(' ')[0];
    badgeAngle.innerText = angleText;
  }

  updateScriptPreviewAndStats();
};

window.updateScriptPreviewAndStats = function() {
  const prodSelect = document.getElementById('script-select-product');
  const angleSelect = document.getElementById('script-select-angle');
  if (!prodSelect || !angleSelect) return;

  const productId = parseInt(prodSelect.value);
  const angle = angleSelect.value;
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;

  const hook = document.getElementById('script-edit-hook')?.value || '';
  const visual = document.getElementById('script-edit-visual')?.value || '';
  const vo = document.getElementById('script-edit-vo')?.value || '';
  const tips = document.getElementById('script-edit-tips')?.value || '';

  // Words count
  const words = vo.trim().split(/\s+/).filter(w => w.length > 0).length;
  // Estimate speaking time in seconds (standard rate ~160 wpm, i.e., 2.7 words/sec)
  const speakingTime = Math.round(words / 2.7);

  const wordsStat = document.getElementById('script-stat-words');
  const timeStat = document.getElementById('script-stat-time');
  const warning = document.getElementById('script-time-warning');

  if (wordsStat) wordsStat.innerText = `${words} từ`;
  if (timeStat) timeStat.innerText = `${speakingTime} giây`;

  if (warning) {
    warning.style.display = speakingTime > 60 ? 'block' : 'none';
  }

  const angleName = angleSelect.options[angleSelect.selectedIndex].text;
  const md = `# Kịch Bản Video Ngắn: ${p.name}
**Góc tiếp cận:** ${angleName}
**Nền tảng tối ưu:** TikTok / Reels / Shorts

## 🪝 1. Câu Hook 3 giây đầu (Giữ chân người xem):
"${hook}"

## 📹 2. Hình ảnh minh họa (Visual Storyboard):
${visual}

## 🎙️ 3. Lời thoại (Voiceover):
${vo}

## 💡 4. Mẹo sáng tạo & Quay dựng:
* ${tips}
`;

  const preview = document.getElementById('script-preview-text');
  if (preview) preview.value = md;
};

window.copyScriptText = function() {
  const preview = document.getElementById('script-preview-text');
  if (!preview) return;
  
  navigator.clipboard.writeText(preview.value).then(() => {
    showToast('Đã sao chép kịch bản hoàn chỉnh vào bộ nhớ tạm!', '📋');
  }).catch(err => {
    console.error(err);
    showToast('Không thể sao chép tự động. Vui lòng copy thủ công.', '⚠️');
  });
};

window.downloadScriptText = function() {
  const preview = document.getElementById('script-preview-text');
  if (!preview) return;

  const prodSelect = document.getElementById('script-select-product');
  const angleSelect = document.getElementById('script-select-angle');
  if (!prodSelect || !angleSelect) return;

  const productId = parseInt(prodSelect.value);
  const angle = angleSelect.value;
  const p = PRODUCTS.find(prod => prod.id === productId);
  const filename = `kich_ban_${p ? p.id : productId}_${angle}.md`;

  const blob = new Blob([preview.value], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Đã tải kịch bản ${filename} thành công!`, '📥');
};

window.generateTrendChartSVG = function() {
  const data = appState.tracker || [];
  if (data.length < 2) {
    return `
      <div style="text-align:center; padding:20px; color:var(--text-muted); font-size:0.9rem; font-style:italic;">
        📊 Nhập ít nhất 2 bài đăng trong nhật ký để hiển thị biểu đồ xu hướng.
      </div>
    `;
  }
  
  const width = 500;
  const height = 120;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  const viewsList = data.map(d => Number(d.views || 0));
  const maxViews = Math.max(...viewsList, 100);
  
  const points = data.map((d, idx) => {
    const x = padding + (idx / (data.length - 1)) * chartWidth;
    const y = height - padding - (Number(d.views || 0) / maxViews) * chartHeight;
    return { x, y, val: d.views, title: d.title };
  });
  
  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const areaPoints = `${padding},${height - padding} ${polylinePoints} ${width - padding},${height - padding}`;
  
  let gridHtml = '';
  for (let i = 0; i <= 2; i++) {
    const yVal = height - padding - (i / 2) * chartHeight;
    const labelVal = Math.round((i / 2) * maxViews);
    gridHtml += `
      <line x1="${padding}" y1="${yVal}" x2="${width - padding}" y2="${yVal}" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3" opacity="0.3" />
      <text x="${padding - 5}" y="${yVal + 3}" fill="var(--text-muted)" font-size="8" text-anchor="end">${labelVal >= 1000 ? (labelVal / 1000).toFixed(1) + 'k' : labelVal}</text>
    `;
  }
  
  let nodesHtml = '';
  points.forEach((p, idx) => {
    nodesHtml += `
      <g class="chart-point-group">
        <circle cx="${p.x}" cy="${p.y}" r="3.5" fill="var(--primary)" stroke="var(--surface)" stroke-width="1.5" />
        <title>${p.title}: ${p.val.toLocaleString()} views</title>
      </g>
    `;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:100%; overflow:visible; display:block;">
      <defs>
        <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.15" />
          <stop offset="100%" stop-color="var(--primary)" stop-opacity="0.0" />
        </linearGradient>
        <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="var(--primary)" />
          <stop offset="100%" stop-color="var(--accent)" />
        </linearGradient>
      </defs>
      ${gridHtml}
      <polygon fill="url(#area-gradient)" points="${areaPoints}" />
      <polyline fill="none" stroke="url(#line-gradient)" stroke-width="2.5" points="${polylinePoints}" stroke-linecap="round" stroke-linejoin="round" />
      ${nodesHtml}
    </svg>
  `;
};

window.generateAIInsightsCardHTML = function(totalViews, totalClicks, totalOrders) {
  const avgCTR = totalViews > 0 ? (totalClicks / totalViews) : 0;
  const avgCR = totalClicks > 0 ? (totalOrders / totalClicks) : 0;
  
  let ctrVerdict = '';
  let crVerdict = '';
  let overallRecommendation = '';

  if (totalViews === 0) {
    return `
      <div class="card" style="padding:24px; background:var(--surface); border:1px solid var(--border); display:flex; flex-direction:column; justify-content:center;">
        <h3 class="t-h2 mb-12">🔬 Chẩn đoán sức khỏe Chiến dịch từ AI</h3>
        <p class="t-body" style="color:var(--text-secondary);">Chưa có dữ liệu chiến dịch để phân tích. Hãy ghi lại bài đăng đầu tiên trong nhật ký để AI bắt đầu đánh giá sức khỏe kênh của bạn.</p>
      </div>
    `;
  }

  if (avgCTR < 0.02) {
    ctrVerdict = `<span style="color:var(--danger); font-weight:700;">Dưới chuẩn (CTR ${(avgCTR * 100).toFixed(2)}% < 2%)</span>. Hook/Visual 3s đầu chưa đủ hấp dẫn. Khuyên đổi sang hook vạch trần lầm tưởng (Myth-busting) và quay cảnh trực quan.`;
  } else {
    ctrVerdict = `<span style="color:var(--primary); font-weight:700;">Tốt (CTR ${(avgCTR * 100).toFixed(2)}% ≥ 2%)</span>. Kịch bản thu hút click bio rất tốt!`;
  }

  if (totalClicks === 0) {
    crVerdict = 'Chưa có click để đo CR.';
  } else if (avgCR < 0.03) {
    crVerdict = `<span style="color:var(--danger); font-weight:700;">Dưới chuẩn (CR ${(avgCR * 100).toFixed(2)}% < 3%)</span>. Người xem click vào bio nhưng không mua. Khuyên kiểm tra lại link Shopee, bổ sung bài viết khoa học chứng minh uy tín.`;
  } else {
    crVerdict = `<span style="color:var(--primary); font-weight:700;">Tốt (CR ${(avgCR * 100).toFixed(2)}% ≥ 3%)</span>. Chuyển đổi đơn hàng rất hiệu quả!`;
  }

  if (avgCTR >= 0.02 && avgCR >= 0.03) {
    overallRecommendation = '🔥 <strong>Khuyên:</strong> Kênh của bạn hoạt động cực tốt! Tập trung nhân bản (Scale-up) thêm 2 video/ngày và áp dụng mô hình bán combo.';
  } else if (avgCTR < 0.02 && avgCR >= 0.03) {
    overallRecommendation = '🔥 <strong>Khuyên:</strong> Chuyển đổi mua hàng tốt nhưng click bio thấp. Cải tiến <strong>3s đầu tiên (Hook)</strong> và sử dụng hình ảnh cạo lưỡi/hút nệm cận cảnh.';
  } else if (avgCTR >= 0.02 && avgCR < 0.03) {
    overallRecommendation = '🔥 <strong>Khuyên:</strong> Click bio rất cao nhưng ít đơn hàng. Hãy tối ưu trang đích, bổ sung nghiên cứu PubMed và đảm bảo cấu hình đúng link Shopee.';
  } else {
    overallRecommendation = '🔥 <strong>Khuyên:</strong> Cả CTR và CR đều thấp. Đây là tuần đầu tiên, hãy kiên trì sửa kịch bản theo định dạng Myth-busting và quay sản phẩm thực tế.';
  }

  return `
    <div class="card" style="padding:24px; display:flex; flex-direction:column; justify-content:space-between; background: rgba(58, 125, 92, 0.04); border: 1px solid var(--primary-light);">
      <div>
        <h3 class="t-h2 mb-12" style="color:var(--primary);">🔬 Chẩn đoán sức khỏe Chiến dịch từ AI</h3>
        <div style="font-size:0.85rem; line-height:1.45; display:flex; flex-direction:column; gap:8px;">
          <div><strong>1. CTR Bio:</strong> ${ctrVerdict}</div>
          <div><strong>2. Tỷ lệ Đơn (CR):</strong> ${crVerdict}</div>
        </div>
      </div>
      <div style="margin-top:16px; padding:10px; background:var(--surface); border-left:3px solid var(--primary); border-radius:4px; font-size:0.8rem; line-height:1.4;">
        ${overallRecommendation}
      </div>
    </div>
  `;
};

// --- DOM READY INIT ---
document.addEventListener('DOMContentLoaded', () => {
  // Đồng bộ trạng thái icon theme khi tải trang
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerText = appState.theme === 'light' ? '🌙' : '☀️';
  }
  initRouter();
});
