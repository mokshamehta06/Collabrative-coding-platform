import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Terminal, Plus, LogIn, LogOut, Code2, Users, Copy, Check,
  Sparkles, ArrowRight, Hash, Clock, Braces
} from 'lucide-react';
import toast from 'react-hot-toast';
import ParticleBackground from '../components/ParticleBackground';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function generateRoomId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
    if (i === 3) id += '-';
  }
  return id;
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleCreateRoom = () => {
    const newId = generateRoomId();
    setRoomId(newId);
    setShowCreateModal(true);
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    toast.success('Room ID copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnterRoom = (id) => {
    if (!id) {
      toast.error('Please enter a room ID');
      return;
    }
    navigate(`/editor?room=${id}&username=${user?.name || 'Anonymous'}`);
  };

  const stats = [
    { icon: <Code2 size={20} />, label: 'Languages', value: '30+', gradient: 'linear-gradient(135deg, #6366F1, #818CF8)' },
    { icon: <Users size={20} />, label: 'Active Users', value: '∞', gradient: 'linear-gradient(135deg, #06B6D4, #22D3EE)' },
    { icon: <Clock size={20} />, label: 'Uptime', value: '99.9%', gradient: 'linear-gradient(135deg, #22C55E, #4ADE80)' },
  ];

  const recentSessions = [
    { id: 'abcd-1234', lang: 'JavaScript', time: '2 hours ago', users: 3 },
    { id: 'efgh-5678', lang: 'Python', time: '5 hours ago', users: 2 },
    { id: 'ijkl-9012', lang: 'TypeScript', time: 'Yesterday', users: 4 },
  ];

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-primary)' }}>
      <ParticleBackground />
      <div className="noise-overlay" />

      {/* Ambient orbs */}
      <motion.div
        className="orb orb-indigo"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ width: 500, height: 500, top: '-15%', right: '-10%' }}
      />
      <motion.div
        className="orb orb-cyan"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ width: 400, height: 400, bottom: '5%', left: '-5%' }}
      />

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '14px 32px',
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
            width: 34,
            height: 34,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Terminal size={18} color="white" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 700 }}>
            Code<span className="text-gradient">Collab</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* User avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-full)',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 600,
            }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>
              {user?.name || 'User'}
            </span>
          </div>

          <button onClick={handleLogout} className="btn-ghost" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#EF4444',
          }}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '48px 24px 80px',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div variants={stagger} initial="hidden" animate="visible">
          {/* Welcome */}
          <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 48 }}>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 8,
            }}>
              Welcome back, <span className="text-gradient">{user?.name || 'Developer'}</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
              Create or join a room to start coding with your team.
            </p>
          </motion.div>

          {/* ── Action Cards ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
            marginBottom: 48,
          }}>
            {/* Create Room */}
            <motion.div
              variants={fadeUp}
              custom={1}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={handleCreateRoom}
              className="glass-card"
              style={{
                padding: 32,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s, background 0.3s',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'var(--gradient-primary)',
              }} />
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-md)',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <Plus size={24} color="white" />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Create a Room</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                Generate a unique room ID and invite your collaborators to join.
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--text-accent)',
                fontSize: 14,
                fontWeight: 500,
              }}>
                Create now <ArrowRight size={14} />
              </div>
            </motion.div>

            {/* Join Room */}
            <motion.div
              variants={fadeUp}
              custom={2}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setShowJoinModal(true)}
              className="glass-card"
              style={{
                padding: 32,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s, background 0.3s',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
              }} />
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <LogIn size={24} color="white" />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Join a Room</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                Enter a room ID shared by your teammate and start collaborating.
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: '#22D3EE',
                fontSize: 14,
                fontWeight: 500,
              }}>
                Join now <ArrowRight size={14} />
              </div>
            </motion.div>
          </div>

          {/* ── Stats ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 48,
          }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                custom={3 + i}
                className="glass-card"
                style={{
                  padding: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  background: s.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0,
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Recent Sessions ── */}
          <motion.div variants={fadeUp} custom={6}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <Clock size={20} style={{ color: 'var(--text-accent)' }} />
              Recent Sessions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recentSessions.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  onClick={() => handleEnterRoom(s.id)}
                  className="glass-card"
                  style={{
                    padding: '16px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s, background 0.3s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--gradient-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-indigo)',
                    }}>
                      <Hash size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14, fontFamily: 'var(--font-mono)' }}>{s.id}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{s.lang}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-tertiary)' }}>
                      <Users size={14} /> {s.users}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{s.time}</span>
                    <ArrowRight size={14} style={{ color: 'var(--text-tertiary)' }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── CREATE ROOM MODAL ── */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card"
              style={{
                padding: 36,
                maxWidth: 460,
                width: '100%',
                background: 'var(--bg-secondary)',
              }}
            >
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-md)',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}>
                <Sparkles size={24} color="white" />
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Room Created!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                Share this room ID with your collaborators.
              </p>

              {/* Room ID display */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-accent)',
                background: 'rgba(99, 102, 241, 0.06)',
                marginBottom: 28,
              }}>
                <Hash size={16} style={{ color: 'var(--accent-indigo)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, flex: 1, letterSpacing: '0.05em' }}>
                  {roomId}
                </span>
                <button
                  onClick={handleCopyRoomId}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copied ? '#22C55E' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: 4,
                    display: 'flex',
                    transition: 'color 0.2s',
                  }}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleEnterRoom(roomId)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  Enter Room <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── JOIN ROOM MODAL ── */}
      <AnimatePresence>
        {showJoinModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowJoinModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card"
              style={{
                padding: 36,
                maxWidth: 460,
                width: '100%',
                background: 'var(--bg-secondary)',
              }}
            >
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}>
                <LogIn size={24} color="white" />
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Join a Room</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                Enter the room ID shared by your teammate.
              </p>

              <div style={{ position: 'relative', marginBottom: 28 }}>
                <Hash size={16} style={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-tertiary)',
                  pointerEvents: 'none',
                }} />
                <input
                  type="text"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  placeholder="e.g. abcd-1234"
                  className="glass-input"
                  style={{ paddingLeft: 44, fontFamily: 'var(--font-mono)' }}
                  onKeyDown={(e) => e.key === 'Enter' && handleEnterRoom(joinRoomId)}
                />
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '12px' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleEnterRoom(joinRoomId)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  Join Room <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
