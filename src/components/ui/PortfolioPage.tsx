import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { openCVForPrint } from './CVPage';

type Section = 'about' | 'skills' | 'projects' | 'education' | 'contact';

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: 'about',     label: 'Giới thiệu',  icon: '👤' },
  { id: 'skills',    label: 'Kỹ năng',     icon: '⚡' },
  { id: 'projects',  label: 'Dự án',       icon: '🚀' },
  { id: 'education', label: 'Học vấn',     icon: '🎓' },
  { id: 'contact',   label: 'Liên hệ',     icon: '📬' },
];

const SKILLS = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'axios', 'zustand', 'tanstack query', 'zod', 'SWR', 'Tailwind CSS'],
  Backend:  ['Spring Boot', 'Node.js', 'Java', 'RESTful API', 'GraphQL'],
  Database: ['MySQL', 'Prisma', 'Redis'],
  DevOps:   ['Chưa có'],
};

interface ProjectItem {
  name: string;
  desc: string;
  tech: string[];
  color: string;
  github?: string;
  live?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    name: 'WMS Pro & Warehouse Management',
    desc: 'Hệ thống quản lý kho hàng chuyên nghiệp (Warehouse Management System), hỗ trợ theo dõi hàng tồn kho, xuất nhập kho và báo cáo doanh thu.',
    tech: ['Spring Boot', 'React', 'Java', 'MySQL', 'Prisma'],
    color: '#66BB6A',
    github: 'https://github.com/Huynhngocti/Warehouse_Management',
  },
  {
    name: '3D Portfolio Universe',
    desc: 'Trang portfolio cá nhân 3D tương tác sinh động với background tinh tú, mô hình lập trình viên 3D và các hiệu ứng chuyển động mượt mà.',
    tech: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    color: '#4FC3F7',
    github: 'https://github.com/DoraHuy/porfolio',
  },
  {
    name: 'Gov Volunteer Hub',
    desc: 'Cổng thông tin kết nối và quản lý các hoạt động tình nguyện, hỗ trợ đăng ký và theo dõi chiến dịch tình nguyện.',
    tech: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'TypeScript'],
    color: '#AB47BC',
    github: 'https://github.com/anhdev99/gov-volunteer-hub',
  },
  {
    name: 'Graduation Invitation Web',
    desc: 'Ứng dụng thiệp mời tốt nghiệp trực tuyến với giao diện thiết kế tinh tế và hiệu ứng lật mở thiệp độc đáo.',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    color: '#FFD54F',
    github: 'https://github.com/DoraHuy/ThiepMoiTotNghiep',
  },
  {
    name: 'RabbitMQ Integration Test',
    desc: 'Dự án demo tích hợp RabbitMQ để truyền tải thông điệp bất đồng bộ giữa các service, tối ưu hiệu năng xử lý tác vụ nền.',
    tech: ['Spring Boot', 'Java', 'RabbitMQ'],
    color: '#FFA726',
    github: 'https://github.com/dh1506/TestRabbitMQ',
  },
  {
    name: 'Todo List Application',
    desc: 'Ứng dụng quản lý công việc hàng ngày với giao diện tối giản, trực quan, hỗ trợ kéo thả và nhắc nhở nhiệm vụ.',
    tech: ['React', 'Next.js', 'MySQL', 'Prisma', 'Tailwind CSS'],
    color: '#EC407A',
    github: 'https://github.com/DoraHuy/TodoList',
  }
];

function AboutSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="about-header">
        {/* Avatar */}
        <div style={{
          width: 160, height: 160, borderRadius: '50%', flexShrink: 0,
          background: 'url(/avatar.jpg) center/cover',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 40px rgba(79, 195, 247, 0.4)',
          border: '3px solid rgba(79, 195, 247, 0.5)'
        }}>
        </div>
        {/* Info */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0, background: 'linear-gradient(90deg, #4FC3F7, #AB47BC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Hồ Ngọc Huy
          </h1>
          <p style={{ color: '#FFD54F', fontSize: 16, margin: '8px 0', letterSpacing: 2, textTransform: 'uppercase' }}>
            Full-Stack Developer
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '16px 0', fontSize: 15 }}>
            Lập trình viên với niềm đam mê xây dựng những ứng dụng web hiện đại, hiệu năng cao và trải nghiệm người dùng tuyệt vời. Chuyên sâu về React, NextJS ở Frontend và Spring Boot, NodeJS ở Backend.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['📍 Bình Định, Việt Nam', '💼 1 năm kinh nghiệm', '🎓 Đại học Duy Tân'].map((t, i) => (
              <span key={i} style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 13, color: 'rgba(255,255,255,0.8)',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)'
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats">
        {[
          { label: 'Dự án hoàn thành', value: '7+', color: '#4FC3F7' },
          { label: 'Năm kinh nghiệm', value: '1',  color: '#66BB6A' },
          { label: 'Công nghệ sử dụng', value: '12+', color: '#AB47BC' },
          { label: 'Github commits', value: '200+', color: '#FFD54F' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: 20, borderRadius: 16, textAlign: 'center',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: '#4FC3F7', marginTop: 0 }}>Kỹ năng & Công nghệ</h2>
      <div className="skills-grid">
        {Object.entries(SKILLS).map(([cat, items], ci) => {
          const colors = ['#4FC3F7', '#66BB6A', '#AB47BC', '#FFA726'];
          const c = colors[ci % colors.length];
          return (
            <div key={cat} style={{
              padding: 24, borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${c}33`,
            }}>
              <h3 style={{ color: c, margin: '0 0 16px', fontSize: 16, letterSpacing: 1, textTransform: 'uppercase' }}>
                {cat}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {items.map((skill) => (
                  <span key={skill} style={{
                    padding: '5px 12px', borderRadius: 20, fontSize: 13, fontWeight: 500,
                    background: `${c}18`, color: c, border: `1px solid ${c}40`,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Level bars */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 20 }}>Mức độ thành thạo</h3>
        {[
          { name: 'React / Next.js', level: 70, color: '#4FC3F7' },
          { name: 'TypeScript',      level: 70, color: '#AB47BC' },
          { name: 'Spring Boot / Java', level: 50, color: '#66BB6A' },
          { name: 'NodeJS',          level: 50, color: '#FFA726' },
          { name: 'Database (MySQL/Prisma/Redis)', level: 60, color: '#FFD54F' },
        ].map((item) => (
          <div key={item.name} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{item.name}</span>
              <span style={{ color: item.color, fontSize: 13, fontWeight: 700 }}>{item.level}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.level}%` }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                style={{ height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${item.color}88, ${item.color})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FFD54F', marginTop: 0 }}>Dự án nổi bật</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {PROJECTS.map((proj, i) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            style={{
              padding: 28, borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${proj.color}33`,
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: proj.color, borderRadius: '4px 0 0 4px' }} />
            <h3 style={{ color: proj.color, margin: '0 0 10px', fontSize: 20 }}>{proj.name}</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: '0 0 16px', fontSize: 14 }}>{proj.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {proj.tech.map((t) => (
                <span key={t} style={{
                  padding: '4px 10px', borderRadius: 12, fontSize: 12,
                  background: `${proj.color}18`, color: proj.color,
                  border: `1px solid ${proj.color}40`
                }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button
                onClick={() => proj.github && window.open(proj.github, '_blank')}
                style={{
                  padding: '8px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                  background: proj.color, color: '#000', border: 'none', fontWeight: 700
                }}
              >
                🔗 GitHub
              </button>
              {proj.live && (
                <button
                  onClick={() => window.open(proj.live, '_blank')}
                  style={{
                    padding: '8px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                    background: 'transparent', color: proj.color,
                    border: `1px solid ${proj.color}60`
                  }}
                >
                  🌐 Live Demo
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function EducationSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: '#AB47BC', marginTop: 0 }}>Học vấn & Chứng chỉ</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {[
          {
            title: 'Đại học Duy Tân',
            sub: 'Chuyên ngành Công nghệ thông tin',
            time: '2021 – 2025',
            icon: '🎓',
            color: '#FFD54F',
            detail: 'Khoa Công nghệ thông tin | Đào tạo Kỹ sư/Cử nhân CNTT',
          },
        ].map((edu, i) => (
          <motion.div
            key={edu.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            style={{
              display: 'flex', gap: 20, padding: 24, borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${edu.color}33`,
            }}
          >
            <div style={{
              width: 50, height: 50, borderRadius: 12, flexShrink: 0,
              background: `${edu.color}20`, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 24, border: `1px solid ${edu.color}40`
            }}>{edu.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <h3 style={{ color: edu.color, margin: 0, fontSize: 16 }}>{edu.title}</h3>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{edu.time}</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.65)', margin: '4px 0', fontSize: 14 }}>{edu.sub}</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', margin: 0, fontSize: 13 }}>{edu.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ContactSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: '#66BB6A', marginTop: 0 }}>Liên hệ</h2>
      <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 32 }}>
        Tôi luôn sẵn sàng hợp tác cho các dự án thú vị. Hãy kết nối với tôi qua các kênh bên dưới!
      </p>
      <div className="contact-grid">
        {[
          { label: 'Email', value: 'huyn70972@gmail.com', icon: '✉️', color: '#4FC3F7', href: 'mailto:huyn70972@gmail.com' },
          { label: 'GitHub', value: 'github.com/DoraHuy', icon: '🐙', color: '#E2E2E2', href: 'https://github.com/DoraHuy' },
          { label: 'Địa chỉ', value: 'Bình Định, Việt Nam', icon: '📍', color: '#FFA726', href: '#' },
          { label: 'Điện thoại', value: '0329307492', icon: '📱', color: '#66BB6A', href: 'tel:0329307492' },
        ].map((c) => (
          <a key={c.label} href={c.href} style={{ textDecoration: 'none' }} target={c.href !== '#' ? '_blank' : undefined} rel="noreferrer">
            <div style={{
              padding: 20, borderRadius: 16, cursor: 'pointer',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${c.color}33`,
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: c.color, fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{c.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>{c.value}</div>
            </div>
          </a>
        ))}
      </div>

      <div style={{
        marginTop: 40, padding: 28, borderRadius: 16, textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(79,195,247,0.08), rgba(171,71,188,0.08))',
        border: '1px solid rgba(79,195,247,0.2)'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, margin: '0 0 20px' }}>
          📄 Tải xuống CV của tôi để xem thông tin đầy đủ
        </p>
        <button
          onClick={openCVForPrint}
          style={{
            padding: '12px 32px', borderRadius: 10, fontSize: 15, cursor: 'pointer',
            background: 'linear-gradient(135deg, #FFD54F, #FFA726)', color: '#000',
            border: 'none', fontWeight: 800, letterSpacing: 1
          }}
        >
          📄 Xem & Tải CV PDF
        </button>
      </div>
    </motion.div>
  );
}

export function PortfolioPage() {
  const appState = useStore((s) => s.appState);
  const setAppState = useStore((s) => s.setAppState);
  const [activeSection, setActiveSection] = useState<Section>('about');

  const renderSection = () => {
    switch (activeSection) {
      case 'about':     return <AboutSection />;
      case 'skills':    return <SkillsSection />;
      case 'projects':  return <ProjectsSection />;
      case 'education': return <EducationSection />;
      case 'contact':   return <ContactSection />;
    }
  };

  return (
    <AnimatePresence>
      {appState === 'PORTFOLIO' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute', top: 0, left: 0,
            zIndex: 20, overflow: 'hidden',
            background: 'rgba(8, 8, 18, 0.92)',
            backdropFilter: 'blur(20px)',
          }}
          className="portfolio-container"
        >
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="portfolio-sidebar"
          >
            {/* Logo */}
            <div style={{ padding: '8px 12px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 800, background: 'linear-gradient(90deg, #4FC3F7, #AB47BC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', whiteSpace: 'nowrap' }}>
                &lt;Portfolio /&gt;
              </div>
            </div>

            <div className="portfolio-nav">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', borderRadius: 10, border: 'none',
                      cursor: 'pointer', textAlign: 'left', width: '100%',
                      background: isActive ? 'rgba(79,195,247,0.15)' : 'transparent',
                      color: isActive ? '#4FC3F7' : 'rgba(255,255,255,0.55)',
                      fontWeight: isActive ? 700 : 400,
                      fontSize: 14, transition: 'all 0.2s',
                      borderLeft: isActive ? '3px solid #4FC3F7' : '3px solid transparent',
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Back button */}
            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              <button
                onClick={() => setAppState('IDLE')}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent', color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
                  justifyContent: 'center', whiteSpace: 'nowrap'
                }}
              >
                ← Quay lại 3D Scene
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="portfolio-main">
            {/* Top bar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 40, gap: 12 }}>
              <button
                onClick={openCVForPrint}
                style={{
                  padding: '10px 22px', borderRadius: 8, fontSize: 14, fontWeight: 700,
                  background: '#FFD54F', color: '#000', border: 'none', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}
              >
                📄 Download CV
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeSection}>
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
