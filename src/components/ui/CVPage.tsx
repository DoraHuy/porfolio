// CVPage.tsx – renders a printable CV in a new window when called

export function openCVForPrint() {
  const cvHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CV – Nguyễn Văn A</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', 'Arial', sans-serif;
      background: #fff;
      color: #1a1a2e;
      font-size: 13px;
      line-height: 1.5;
    }
    .page {
      max-width: 820px;
      margin: 0 auto;
      padding: 40px 48px;
    }
    /* Header */
    .header {
      display: flex;
      align-items: flex-start;
      gap: 28px;
      padding-bottom: 28px;
      border-bottom: 3px solid #4FC3F7;
      margin-bottom: 28px;
    }
    .avatar {
      width: 90px; height: 90px;
      border-radius: 50%;
      background: url(/avatar.png) center/cover;
      display: flex; align-items: center; justify-content: center;
      font-size: 40px; flex-shrink: 0;
      border: 2px solid #4FC3F7;
    }
    .header-info h1 {
      font-size: 26px; font-weight: 800;
      color: #0d0d1a;
      letter-spacing: -0.5px;
    }
    .header-info .title {
      font-size: 14px; color: #4FC3F7;
      font-weight: 600; letter-spacing: 1px;
      text-transform: uppercase; margin-top: 4px;
    }
    .contacts {
      margin-top: 12px;
      display: flex; flex-wrap: wrap; gap: 12px;
    }
    .contact-item {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; color: #555;
    }
    /* Two-column layout */
    .body {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 32px;
    }
    /* Section */
    .section { margin-bottom: 24px; }
    .section-title {
      font-size: 11px; font-weight: 800;
      letter-spacing: 2px; text-transform: uppercase;
      color: #4FC3F7; border-bottom: 1px solid #e0e0e0;
      padding-bottom: 6px; margin-bottom: 12px;
    }
    /* Skill chips */
    .skill-group { margin-bottom: 14px; }
    .skill-group-name {
      font-size: 11px; font-weight: 700;
      color: #888; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 6px;
    }
    .chips { display: flex; flex-wrap: wrap; gap: 4px; }
    .chip {
      padding: 2px 8px; border-radius: 10px;
      font-size: 11px; font-weight: 500;
      background: #f0f8ff; color: #1565C0;
      border: 1px solid #4FC3F7;
    }
    .chip.green  { background:#f0fff4; color:#1b5e20; border-color:#66BB6A; }
    .chip.purple { background:#f9f0ff; color:#6a1b9a; border-color:#AB47BC; }
    .chip.orange { background:#fff8f0; color:#bf360c; border-color:#FFA726; }
    /* Experience / project */
    .exp-item { margin-bottom: 18px; }
    .exp-header {
      display: flex; justify-content: space-between;
      align-items: flex-start; margin-bottom: 3px;
    }
    .exp-title { font-size: 13px; font-weight: 700; color: #0d0d1a; }
    .exp-period { font-size: 11px; color: #aaa; white-space: nowrap; }
    .exp-sub { font-size: 12px; color: #555; margin-bottom: 4px; }
    .exp-desc { font-size: 12px; color: #333; }
    .exp-desc li { margin-bottom: 2px; margin-left: 14px; }
    /* Progress bars */
    .skill-bar { margin-bottom: 10px; }
    .skill-bar-header {
      display: flex; justify-content: space-between;
      font-size: 12px; margin-bottom: 3px;
      color: #333;
    }
    .bar-bg {
      height: 5px; background: #eee; border-radius: 3px;
    }
    .bar-fill {
      height: 100%; border-radius: 3px;
      background: linear-gradient(90deg, #4FC3F7, #AB47BC);
    }
    /* Education */
    .edu-item { margin-bottom: 14px; }
    .edu-degree { font-weight: 700; font-size: 13px; }
    .edu-school { color: #555; font-size: 12px; }
    .edu-year { color: #aaa; font-size: 11px; }
    /* Print button */
    .print-bar {
      position: fixed; top: 0; left: 0; right: 0;
      background: #0d0d1a; padding: 10px 40px;
      display: flex; gap: 12px; align-items: center;
      z-index: 999;
    }
    .print-bar span { color: rgba(255,255,255,0.7); font-size: 13px; }
    .btn-print {
      padding: 8px 24px; border-radius: 8px;
      background: #FFD54F; color: #000; border: none;
      font-size: 14px; font-weight: 800; cursor: pointer;
      letter-spacing: 0.5px;
    }
    .btn-close {
      padding: 8px 18px; border-radius: 8px;
      background: transparent; color: #fff;
      border: 1px solid rgba(255,255,255,0.3);
      font-size: 13px; cursor: pointer; margin-left: auto;
    }
    @media print {
      .print-bar { display: none; }
      body { margin: 0; }
      .page { padding: 24px 32px; }
    }
  </style>
</head>
<body>
  <!-- Print toolbar (hidden when printing) -->
  <div class="print-bar">
    <span>📄 Nhấn "In PDF" để lưu CV dưới dạng PDF</span>
    <button class="btn-print" onclick="window.print()">🖨️ In PDF</button>
    <button class="btn-close" onclick="window.close()">✕ Đóng</button>
  </div>

  <div style="height:50px"></div><!-- spacer for toolbar -->

  <div class="page">
    <!-- ─── Header ─── -->
    <div class="header">
      <div class="avatar"></div>
      <div class="header-info">
        <h1>Nguyễn Văn A</h1>
        <div class="title">Full-Stack Developer</div>
        <div class="contacts">
          <span class="contact-item">✉️ dev@email.com</span>
          <span class="contact-item">📱 +84 901 234 567</span>
          <span class="contact-item">🐙 github.com/username</span>
          <span class="contact-item">💼 linkedin.com/in/dev</span>
          <span class="contact-item">📍 Hà Nội, Việt Nam</span>
        </div>
      </div>
    </div>

    <!-- ─── Body (left + right columns) ─── -->
    <div class="body">

      <!-- ═══ LEFT COLUMN ═══ -->
      <div>
        <!-- Skills -->
        <div class="section">
          <div class="section-title">Kỹ năng</div>

          <div class="skill-bar">
            <div class="skill-bar-header"><span>React / Next.js</span><span>90%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:90%"></div></div>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-header"><span>TypeScript</span><span>85%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:85%"></div></div>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-header"><span>Spring Boot / Java</span><span>80%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:80%"></div></div>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-header"><span>Docker / DevOps</span><span>70%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:70%"></div></div>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-header"><span>Three.js / R3F</span><span>75%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:75%"></div></div>
          </div>
        </div>

        <!-- Tech stack -->
        <div class="section">
          <div class="section-title">Công nghệ</div>
          <div class="skill-group">
            <div class="skill-group-name">Frontend</div>
            <div class="chips">
              <span class="chip">React</span>
              <span class="chip">Next.js</span>
              <span class="chip">TypeScript</span>
              <span class="chip">Vite</span>
              <span class="chip">Three.js</span>
            </div>
          </div>
          <div class="skill-group">
            <div class="skill-group-name">Backend</div>
            <div class="chips">
              <span class="chip green">Spring Boot</span>
              <span class="chip green">Node.js</span>
              <span class="chip green">Java</span>
              <span class="chip green">REST API</span>
            </div>
          </div>
          <div class="skill-group">
            <div class="skill-group-name">Database</div>
            <div class="chips">
              <span class="chip purple">PostgreSQL</span>
              <span class="chip purple">Redis</span>
              <span class="chip purple">MongoDB</span>
            </div>
          </div>
          <div class="skill-group">
            <div class="skill-group-name">DevOps</div>
            <div class="chips">
              <span class="chip orange">Docker</span>
              <span class="chip orange">AWS</span>
              <span class="chip orange">GitHub CI/CD</span>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="section">
          <div class="section-title">Học vấn</div>
          <div class="edu-item">
            <div class="edu-degree">🎓 Cử nhân Kỹ thuật PM</div>
            <div class="edu-school">ĐH Công nghệ thông tin</div>
            <div class="edu-year">2019 – 2023 · GPA 3.6/4.0</div>
          </div>
          <div class="edu-item">
            <div class="edu-degree">☁️ AWS Solutions Architect</div>
            <div class="edu-school">Amazon Web Services</div>
            <div class="edu-year">2023 · Associate Level</div>
          </div>
          <div class="edu-item">
            <div class="edu-degree">🌿 Spring Professional</div>
            <div class="edu-school">VMware / Broadcom</div>
            <div class="edu-year">2022</div>
          </div>
        </div>

        <!-- Languages -->
        <div class="section">
          <div class="section-title">Ngôn ngữ</div>
          <div class="skill-bar">
            <div class="skill-bar-header"><span>Tiếng Việt</span><span>Native</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:100%"></div></div>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-header"><span>Tiếng Anh</span><span>B2</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:70%"></div></div>
          </div>
        </div>
      </div>

      <!-- ═══ RIGHT COLUMN ═══ -->
      <div>
        <!-- Summary -->
        <div class="section">
          <div class="section-title">Giới thiệu</div>
          <p style="font-size:12.5px;color:#333;line-height:1.7">
            Lập trình viên Full-Stack với 3+ năm kinh nghiệm xây dựng ứng dụng web hiện đại, hiệu năng cao.
            Chuyên sâu về <strong>React / Next.js</strong> ở phía frontend và <strong>Spring Boot / Node.js</strong>
            ở phía backend. Có kinh nghiệm triển khai hệ thống với Docker, CI/CD và AWS.
            Đam mê tạo ra trải nghiệm người dùng xuất sắc và kiến trúc hệ thống scalable.
          </p>
        </div>

        <!-- Experience -->
        <div class="section">
          <div class="section-title">Kinh nghiệm làm việc</div>

          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">Full-Stack Developer</div>
              <div class="exp-period">01/2023 – Nay</div>
            </div>
            <div class="exp-sub">Công ty TNHH ABC Technology · Hà Nội</div>
            <ul class="exp-desc">
              <li>Phát triển và duy trì hệ thống thương mại điện tử với 100k+ người dùng/tháng</li>
              <li>Xây dựng REST API với Spring Boot, tích hợp Redis cache giảm 60% latency</li>
              <li>Migrate hệ thống monolith sang microservices với Docker & Kubernetes</li>
              <li>Review code và mentor cho 3 junior developers</li>
            </ul>
          </div>

          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">Frontend Developer (Intern → Junior)</div>
              <div class="exp-period">06/2021 – 12/2022</div>
            </div>
            <div class="exp-sub">Startup XYZ · TP. Hồ Chí Minh</div>
            <ul class="exp-desc">
              <li>Xây dựng dashboard quản lý với React, TypeScript và Chart.js</li>
              <li>Tích hợp WebSocket cho tính năng real-time notification</li>
              <li>Cải thiện Core Web Vitals, tăng điểm Lighthouse từ 65 lên 95</li>
            </ul>
          </div>
        </div>

        <!-- Projects -->
        <div class="section">
          <div class="section-title">Dự án nổi bật</div>

          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">🌐 3D Portfolio Universe</div>
              <div class="exp-period">2024</div>
            </div>
            <div class="exp-sub">React · Three.js · TypeScript · GSAP · Vite</div>
            <div class="exp-desc">
              Trang portfolio 3D với nhân vật hacker ngồi gõ code, logo công nghệ bay xung quanh,
              hiệu ứng chuyển cảnh smooth bằng GSAP.
            </div>
          </div>

          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">🛒 Full-Stack E-Commerce Platform</div>
              <div class="exp-period">2023</div>
            </div>
            <div class="exp-sub">Spring Boot · React · PostgreSQL · Docker · Redis</div>
            <div class="exp-desc">
              Hệ thống TMĐT hoàn chỉnh với quản lý sản phẩm, giỏ hàng, thanh toán VNPay,
              admin dashboard và CI/CD pipeline tự động.
            </div>
          </div>

          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">💬 Real-time Chat Application</div>
              <div class="exp-period">2022</div>
            </div>
            <div class="exp-sub">Node.js · Socket.io · MongoDB · React · JWT</div>
            <div class="exp-desc">
              Ứng dụng chat thời gian thực hỗ trợ group chat, file sharing,
              emoji reactions và xác thực JWT.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(cvHTML);
    win.document.close();
  }
}
