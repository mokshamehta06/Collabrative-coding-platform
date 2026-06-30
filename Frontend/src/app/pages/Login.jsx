import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Terminal, Eye, EyeOff, Code2, GitBranch, Braces } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import ParticleBackground from '../components/ParticleBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const floatingSnippets = [
  { text: 'const room = await createRoom()', top: '15%', left: '8%', delay: 0 },
  { text: 'socket.emit("join", roomId)', top: '35%', left: '5%', delay: 1.5 },
  { text: 'editor.onDidChangeContent(sync)', top: '55%', left: '10%', delay: 3 },
  { text: '// collaborating in real-time ✨', top: '75%', left: '6%', delay: 4.5 },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
      <ParticleBackground />

      {/* ── LEFT PANEL: Branding ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 48px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(6, 182, 212, 0.04))',
          borderRight: '1px solid var(--border-subtle)',
        }}
      >
        {/* Ambient orb */}
        <motion.div
          className="orb orb-indigo"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ width: 400, height: 400, top: '-20%', right: '-20%' }}
        />

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 60, textDecoration: 'none', color: 'inherit', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Terminal size={22} color="white" />
          </div>
          <span style={{ fontSize: 22, fontWeight: 700 }}>
            Code<span className="text-gradient">Collab</span>
          </span>
        </Link>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: 16,
            position: 'relative',
            zIndex: 1,
          }}
        >
          Welcome back,
          <br />
          <span className="text-gradient">Developer.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 380,
            marginBottom: 48,
            position: 'relative',
            zIndex: 1,
          }}
        >
          Sign in to your workspace and continue building amazing things with your team.
        </motion.p>

        {/* Floating code snippets */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {floatingSnippets.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--text-tertiary)',
                opacity: 0.4,
                whiteSpace: 'nowrap',
              }}
            >
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
              >
                {s.text}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Bottom feature badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: 16,
            position: 'relative',
            zIndex: 1,
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: <Code2 size={14} />, label: 'Monaco Editor' },
            { icon: <GitBranch size={14} />, label: 'Real-time Sync' },
            { icon: <Braces size={14} />, label: 'Multi-language' },
          ].map((b) => (
            <div key={b.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-glass)',
              fontSize: 12,
              color: 'var(--text-secondary)',
            }}>
              <span style={{ color: 'var(--accent-indigo)' }}>{b.icon}</span>
              {b.label}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── RIGHT PANEL: Login Form ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ width: '100%', maxWidth: 420 }}
        >
          <motion.h2 variants={fadeUp} custom={0} style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 8,
          }}>
            Sign In
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} style={{
            color: 'var(--text-secondary)',
            fontSize: 15,
            marginBottom: 36,
          }}>
            Enter your credentials to access your workspace
          </motion.p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <motion.div variants={fadeUp} custom={2} style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-tertiary)',
                  pointerEvents: 'none',
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="glass-input"
                  style={{ paddingLeft: 44 }}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp} custom={3} style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-tertiary)',
                  pointerEvents: 'none',
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="glass-input"
                  style={{ paddingLeft: 44, paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    cursor: 'pointer',
                    padding: 4,
                    display: 'flex',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={fadeUp}
              custom={4}
              type="submit"
              disabled={loading}
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 16,
                padding: '16px',
              }}
            >
              {loading ? (
                <div className="spinner" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div variants={fadeUp} custom={5} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            margin: '32px 0',
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            <span style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          </motion.div>

          {/* Register link */}
          <motion.p variants={fadeUp} custom={6} style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: 14,
          }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontWeight: 600 }}>
              Create one
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
