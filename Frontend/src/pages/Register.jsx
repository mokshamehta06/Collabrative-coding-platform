import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Terminal, Eye, EyeOff, Shield, Zap, Users } from 'lucide-react';
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

const highlights = [
  { icon: <Shield size={20} />, title: 'Secure Rooms', desc: 'End-to-end encrypted collaboration sessions' },
  { icon: <Zap size={20} />, title: 'Zero Latency', desc: 'CRDT-powered sync with no conflicts' },
  { icon: <Users size={20} />, title: 'Team Ready', desc: 'Invite unlimited collaborators to any room' },
];

function PasswordStrength({ password }) {
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  const colors = ['', '#EF4444', '#F59E0B', '#3B82F6', '#22C55E', '#06B6D4'];

  if (!password) return null;

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.div
            key={n}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: n * 0.05 }}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: n <= strength ? colors[strength] : 'rgba(255,255,255,0.06)',
              transformOrigin: 'left',
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: 11, color: colors[strength], fontWeight: 500 }}>
        {labels[strength]}
      </span>
    </div>
  );
}

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        toast.success('Account created! Welcome aboard 🎉');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
      <ParticleBackground />

      {/* ── LEFT PANEL: Form ── */}
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
          {/* Logo */}
          <motion.div variants={fadeUp} custom={0}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 48, textDecoration: 'none', color: 'inherit' }}>
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
              <span style={{ fontSize: 20, fontWeight: 700 }}>
                Code<span className="text-gradient">Collab</span>
              </span>
            </Link>
          </motion.div>

          <motion.h2 variants={fadeUp} custom={1} style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 8,
          }}>
            Create Your Account
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} style={{
            color: 'var(--text-secondary)',
            fontSize: 15,
            marginBottom: 36,
          }}>
            Join the platform and start collaborating in seconds
          </motion.p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <motion.div variants={fadeUp} custom={3} style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-tertiary)',
                  pointerEvents: 'none',
                }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="glass-input"
                  style={{ paddingLeft: 44 }}
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp} custom={4} style={{ marginBottom: 20 }}>
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
            <motion.div variants={fadeUp} custom={5} style={{ marginBottom: 32 }}>
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
                  placeholder="Min. 6 characters"
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
              <PasswordStrength password={password} />
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={fadeUp}
              custom={6}
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
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div variants={fadeUp} custom={7} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            margin: '32px 0',
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            <span style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          </motion.div>

          {/* Login link */}
          <motion.p variants={fadeUp} custom={8} style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: 14,
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontWeight: 600 }}>
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL: Branding ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
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
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.04), rgba(99, 102, 241, 0.08))',
          borderLeft: '1px solid var(--border-subtle)',
        }}
      >
        {/* Ambient orb */}
        <motion.div
          className="orb orb-purple"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ width: 500, height: 500, bottom: '-20%', left: '-20%' }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontSize: 'clamp(26px, 3vw, 36px)',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: 16,
            position: 'relative',
            zIndex: 1,
          }}
        >
          Start your{' '}
          <span className="text-gradient">collaborative</span>
          <br />coding journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: 15,
            lineHeight: 1.6,
            maxWidth: 380,
            marginBottom: 48,
            position: 'relative',
            zIndex: 1,
          }}
        >
          Create an account and invite your team to code together in real-time.
        </motion.p>

        {/* Feature highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 1 }}>
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-glass)',
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--gradient-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-indigo)',
                flexShrink: 0,
              }}>
                {h.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{h.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{h.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
