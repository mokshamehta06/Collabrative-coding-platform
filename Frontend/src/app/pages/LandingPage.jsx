import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Users, Zap, Globe, ArrowRight, Terminal, Braces, GitBranch, Sparkles } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const features = [
  {
    icon: <Users size={24} />,
    title: 'Real-time Collaboration',
    desc: 'Code together with your team in real-time. See cursors, edits, and selections as they happen.',
    gradient: 'linear-gradient(135deg, #6366F1, #818CF8)',
  },
  {
    icon: <Code2 size={24} />,
    title: 'Monaco Editor',
    desc: 'Full-featured VS Code editor with syntax highlighting, IntelliSense, and multi-language support.',
    gradient: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
  },
  {
    icon: <Zap size={24} />,
    title: 'Instant Sync',
    desc: 'Powered by Yjs CRDT — conflict-free, zero-latency synchronization across all connected clients.',
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
  },
  {
    icon: <Globe size={24} />,
    title: 'Work From Anywhere',
    desc: 'Share a room link and start coding together. No downloads, no setup — just open and code.',
    gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
  },
];

const codeLines = [
  { indent: 0, content: [{ text: 'const', type: 'keyword' }, { text: ' server = ', type: '' }, { text: 'createServer', type: 'function' }, { text: '()', type: '' }] },
  { indent: 0, content: [{ text: 'const', type: 'keyword' }, { text: ' io = ', type: '' }, { text: 'new', type: 'keyword' }, { text: ' Server', type: 'function' }, { text: '(server)', type: '' }] },
  { indent: 0, content: [] },
  { indent: 0, content: [{ text: '// Real-time collaboration', type: 'comment' }] },
  { indent: 0, content: [{ text: 'io', type: '' }, { text: '.on', type: 'function' }, { text: '(', type: '' }, { text: '"connection"', type: 'string' }, { text: ', socket ', type: '' }, { text: '=>', type: 'operator' }, { text: ' {', type: '' }] },
  { indent: 1, content: [{ text: 'socket', type: '' }, { text: '.join', type: 'function' }, { text: '(', type: '' }, { text: '"room-1"', type: 'string' }, { text: ')', type: '' }] },
  { indent: 1, content: [{ text: 'console', type: '' }, { text: '.log', type: 'function' }, { text: '(', type: '' }, { text: '"User connected ✨"', type: 'string' }, { text: ')', type: '' }] },
  { indent: 0, content: [{ text: '})', type: '' }] },
];

export default function LandingPage() {
  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-primary)' }}>
      <ParticleBackground />
      <div className="noise-overlay" />

      {/* Ambient orbs */}
      <motion.div
        className="orb orb-indigo"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 500, height: 500, top: '-10%', right: '-10%' }}
      />
      <motion.div
        className="orb orb-cyan"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 400, height: 400, bottom: '10%', left: '-5%' }}
      />

      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '16px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Terminal size={20} color="white" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Code<span className="text-gradient">Collab</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" className="btn-ghost">Sign In</Link>
          <Link to="/register" className="btn-primary" style={{ padding: '10px 24px', fontSize: 14 }}>
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}>
        <motion.div variants={stagger} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-medium)',
            background: 'var(--bg-glass)',
            marginBottom: 32,
            fontSize: 14,
            color: 'var(--text-secondary)',
          }}>
            <Sparkles size={14} style={{ color: 'var(--accent-indigo)' }} />
            Now with real-time CRDT sync
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} custom={1} style={{
            fontSize: 'clamp(40px, 7vw, 76px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: 800,
            margin: '0 auto 24px',
          }}>
            Code Together,{' '}
            <span className="text-gradient">Build Faster</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeUp} custom={2} style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-secondary)',
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            A real-time collaborative code editor where teams write, debug, and
            ship code together — from anywhere in the world.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} custom={3} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 16, padding: '16px 36px' }}>
              Start Coding Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-secondary" style={{ fontSize: 16, padding: '16px 36px' }}>
              Sign In
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUp} custom={4} style={{
            display: 'flex',
            gap: 32,
            justifyContent: 'center',
            marginTop: 48,
            color: 'var(--text-tertiary)',
            fontSize: 13,
            flexWrap: 'wrap',
          }}>
            {['No credit card required', 'Free forever', 'Instant setup'].map((t) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#22C55E' }}>✓</span> {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Code Preview Window ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            marginTop: 80,
            width: '100%',
            maxWidth: 720,
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            background: 'rgba(18, 18, 26, 0.8)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(99, 102, 241, 0.08)',
          }}
        >
          {/* Window chrome */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '14px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(255, 255, 255, 0.02)',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
            <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              collaboration.js
            </span>
          </div>

          {/* Code */}
          <div className="code-decoration" style={{ padding: '20px 24px' }}>
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
                style={{ paddingLeft: line.indent * 24, minHeight: 22 }}
              >
                {line.content.map((seg, j) => (
                  <span key={j} className={seg.type}>{seg.text}</span>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{
        padding: '100px 24px 120px',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          style={{ maxWidth: 1100, margin: '0 auto' }}
        >
          <motion.div variants={fadeUp} custom={0} style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 16,
            }}>
              <Braces size={14} /> Features
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}>
              Everything You Need to{' '}
              <span className="text-gradient">Code Together</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
              Built for developers who believe the best code is written together.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
          }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i + 1}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass-card"
                style={{ padding: 32, cursor: 'default', transition: 'border-color 0.3s, background 0.3s' }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: f.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  color: 'white',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        padding: '100px 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 800,
            margin: '0 auto',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--gradient-primary)',
            padding: '64px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1), transparent 60%)',
          }} />
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 38px)',
            fontWeight: 700,
            marginBottom: 16,
            position: 'relative',
          }}>
            Ready to Code Together?
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 17,
            marginBottom: 32,
            position: 'relative',
          }}>
            Join developers who are already collaborating in real-time.
          </p>
          <Link
            to="/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'white',
              color: '#4F46E5',
              padding: '14px 32px',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              position: 'relative',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Get Started Free <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '40px 24px',
        textAlign: 'center',
        color: 'var(--text-tertiary)',
        fontSize: 13,
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Terminal size={14} color="white" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)' }}>CodeCollab</span>
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 20 }}>
          <Link to="/login" className="btn-ghost" style={{ padding: '4px 8px', fontSize: 13 }}>Sign In</Link>
          <Link to="/register" className="btn-ghost" style={{ padding: '4px 8px', fontSize: 13 }}>Sign Up</Link>
        </div>
        <p>© {new Date().getFullYear()} CodeCollab. Built for developers, by developers.</p>
      </footer>
    </div>
  );
}
