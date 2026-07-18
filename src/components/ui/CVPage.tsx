// CVPage.tsx – renders a printable CV in a new window when called

export function openCVForPrint() {
  const cvHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CV – Hồ Ngọc Huy</title>
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
      background: url(/avatar.jpg) center/cover;
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
        <h1>Hồ Ngọc Huy</h1>
        <div class="title">Full-Stack Developer</div>
        <div class="contacts">
          <span class="contact-item">✉️ huyn70972@gmail.com</span>
          <span class="contact-item">📱 0329307492</span>
          <span class="contact-item">🐙 github.com/DoraHuy</span>
          <span class="contact-item">📍 Bình Định, Việt Nam</span>
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
            <div class="skill-bar-header"><span>React / Next.js</span><span>70%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:70%"></div></div>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-header"><span>TypeScript</span><span>70%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:70%"></div></div>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-header"><span>Spring Boot / Java</span><span>50%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:50%"></div></div>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-header"><span>NodeJS</span><span>50%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:50%"></div></div>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-header"><span>Database</span><span>60%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:60%"></div></div>
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
              <span class="chip">axios</span>
              <span class="chip">zustand</span>
              <span class="chip">tanstack query</span>
              <span class="chip">zod</span>
              <span class="chip">SWR</span>
              <span class="chip">Tailwind CSS</span>
            </div>
          </div>
          <div class="skill-group">
            <div class="skill-group-name">Backend</div>
            <div class="chips">
              <span class="chip green">Spring Boot</span>
              <span class="chip green">Node.js</span>
              <span class="chip green">Java</span>
              <span class="chip green">REST API</span>
              <span class="chip green">GraphQL</span>
            </div>
          </div>
          <div class="skill-group">
            <div class="skill-group-name">Database</div>
            <div class="chips">
              <span class="chip purple">MySQL</span>
              <span class="chip purple">Prisma</span>
              <span class="chip purple">Redis</span>
            </div>
          </div>
          <div class="skill-group">
            <div class="skill-group-name">DevOps</div>
            <div class="chips">
              <span class="chip orange">Chưa có</span>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="section">
          <div class="section-title">Học vấn</div>
          <div class="edu-item">
            <div class="edu-degree">🎓 Đại học Duy Tân</div>
            <div class="edu-school">Chuyên ngành Công nghệ thông tin</div>
            <div class="edu-year">2021 – 2025</div>
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
            Lập trình viên Full-Stack với 1 năm kinh nghiệm xây dựng ứng dụng web hiện đại, hiệu năng cao.
            Chuyên sâu về <strong>React / Next.js</strong> ở phía frontend và <strong>Spring Boot / Node.js</strong>
            ở phía backend. Đam mê thiết kế giao diện tối ưu và phát triển hệ thống ổn định, đáng tin cậy.
          </p>
        </div>

        <!-- Experience -->
        <div class="section">
          <div class="section-title">Kinh nghiệm làm việc</div>

          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">Full-Stack / Frontend Developer (Projects & Freelance)</div>
              <div class="exp-period">2023 – Nay</div>
            </div>
            <div class="exp-sub">Dự án cá nhân và Cộng tác phát triển</div>
            <ul class="exp-desc">
              <li>Phát triển các hệ thống Web Application sử dụng React, Next.js, TypeScript và Spring Boot.</li>
              <li>Xây dựng hệ thống Quản lý kho hàng chuyên nghiệp (Warehouse Management System) hỗ trợ quản lý hàng tồn, phân phối sản phẩm.</li>
              <li>Thiết kế giao diện người dùng tối ưu hóa UX/UI bằng Tailwind CSS, tích hợp quản lý trạng thái bằng Zustand, SWR và TanStack Query.</li>
              <li>Xây dựng API RESTful và tích hợp các công nghệ Queue như RabbitMQ, quản lý cơ sở dữ liệu MySQL thông qua Prisma ORM.</li>
            </ul>
          </div>
        </div>

        <!-- Projects -->
        <div class="section">
          <div class="section-title">Dự án nổi bật</div>

          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">📦 WMS Pro & Warehouse Management</div>
              <div class="exp-period">2023 – 2024</div>
            </div>
            <div class="exp-sub">Spring Boot · React · MySQL · Prisma · Java</div>
            <div class="exp-desc">
              Hệ thống quản lý kho hàng hỗ trợ theo dõi tồn kho, xuất nhập kho và báo cáo thống kê dữ liệu trực quan.
            </div>
          </div>

          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">🤝 Gov Volunteer Hub</div>
              <div class="exp-period">2023</div>
            </div>
            <div class="exp-sub">React · Next.js · Node.js · Tailwind CSS</div>
            <div class="exp-desc">
              Nền tảng kết nối các hoạt động tình nguyện, hỗ trợ quản lý chiến dịch và thành viên đăng ký tham gia.
            </div>
          </div>

          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">🌐 3D Portfolio Universe</div>
              <div class="exp-period">2024</div>
            </div>
            <div class="exp-sub">React · Three.js · TypeScript · Tailwind CSS · Vite</div>
            <div class="exp-desc">
              Trang portfolio 3D tương tác sinh động với background tinh tú, mô hình 3D lập trình viên và hiệu ứng chuyển động.
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
