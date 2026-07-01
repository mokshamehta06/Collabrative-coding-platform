import { useRef, useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import { MonacoBinding } from 'y-monaco';
import * as Y from 'yjs';
import { SocketIOProvider } from 'y-socket.io';
import {
  Terminal, ArrowLeft, Copy, Check, Hash, Users, ChevronDown,
  Code2, Circle
} from 'lucide-react';
import toast from 'react-hot-toast';

const languages = [
  { id: 'javascript', label: 'JavaScript', ext: 'js' },
  { id: 'typescript', label: 'TypeScript', ext: 'ts' },
  { id: 'python', label: 'Python', ext: 'py' },
  { id: 'java', label: 'Java', ext: 'java' },
  { id: 'cpp', label: 'C++', ext: 'cpp' },
  { id: 'c', label: 'C', ext: 'c' },
  { id: 'go', label: 'Go', ext: 'go' },
  { id: 'rust', label: 'Rust', ext: 'rs' },
  { id: 'html', label: 'HTML', ext: 'html' },
  { id: 'css', label: 'CSS', ext: 'css' },
  { id: 'json', label: 'JSON', ext: 'json' },
  { id: 'markdown', label: 'Markdown', ext: 'md' },
];

const userColors = [
  '#6366F1', '#06B6D4', '#22C55E', '#F59E0B', '#EC4899',
  '#A855F7', '#EF4444', '#14B8A6', '#F97316', '#8B5CF6',
];

export default function EditorPage() {
  const editorRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomId = searchParams.get('room') || 'default';
  const username = searchParams.get('username') || 'Anonymous';

  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [connected, setConnected] = useState(false);

  const ydoc = useMemo(() => new Y.Doc(), []);
  const yText = useMemo(() => ydoc.getText('monaco'), [ydoc]);

  const handleMount = (editor) => {
    editorRef.current = editor;
    new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
    );
  };

  useEffect(() => {
    const provider = new SocketIOProvider('/', roomId, ydoc, {
      autoConnect: true,
    });

    provider.on('sync', (synced) => {
      if (synced) setConnected(true);
    });

    provider.awareness.setLocalStateField('user', { username });

    const updateUsers = () => {
      const states = Array.from(provider.awareness.getStates().values());
      setUsers(
        states
          .filter((s) => s.user && s.user.username)
          .map((s) => s.user)
      );
    };

    updateUsers();
    provider.awareness.on('change', updateUsers);

    const handleBeforeUnload = () => {
      provider.awareness.setLocalStateField('user', null);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Mark as connected after a short delay if not already
    const timer = setTimeout(() => setConnected(true), 2000);

    return () => {
      clearTimeout(timer);
      provider.disconnect();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [roomId, username, ydoc]);

  const handleCopyRoom = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    toast.success('Room ID copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeave = () => {
    navigate('/dashboard');
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
      overflow: 'hidden',
    }}>
      {/* ── TOP BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: 'rgba(18, 18, 26, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
          zIndex: 50,
        }}
      >
        {/* Left section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={handleLeave} className="btn-ghost" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 13,
            padding: '6px 10px',
          }}>
            <ArrowLeft size={14} />
          </button>

          <div style={{
            width: 1,
            height: 20,
            background: 'var(--border-subtle)',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Terminal size={14} color="white" />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              Code<span className="text-gradient">Collab</span>
            </span>
          </div>

          <div style={{
            width: 1,
            height: 20,
            background: 'var(--border-subtle)',
          }} />

          {/* Room ID */}
          <button
            onClick={handleCopyRoom}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-glass)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s',
            }}
          >
            <Hash size={12} style={{ color: 'var(--accent-indigo)' }} />
            {roomId}
            {copied ? <Check size={12} style={{ color: '#22C55E' }} /> : <Copy size={12} />}
          </button>

          {/* Language selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-glass)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 12,
                transition: 'all 0.2s',
              }}
            >
              <Code2 size={12} />
              {languages.find((l) => l.id === language)?.label || 'JavaScript'}
              <ChevronDown size={12} />
            </button>

            <AnimatePresence>
              {showLangDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: 6,
                    width: 180,
                    maxHeight: 280,
                    overflowY: 'auto',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-elevated)',
                    zIndex: 100,
                    padding: 6,
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        setLanguage(lang.id);
                        setShowLangDropdown(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: 'none',
                        background: lang.id === language ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                        color: lang.id === language ? 'var(--text-accent)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: 13,
                        textAlign: 'left',
                        fontFamily: 'var(--font-sans)',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        if (lang.id !== language) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      }}
                      onMouseLeave={(e) => {
                        if (lang.id !== language) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <span style={{
                        fontSize: 10,
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.06)',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-tertiary)',
                      }}>
                        .{lang.ext}
                      </span>
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Connection status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            color: connected ? '#22C55E' : 'var(--text-tertiary)',
          }}>
            <div className={connected ? 'online-dot' : ''} style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: connected ? '#22C55E' : 'var(--text-tertiary)',
            }} />
            {connected ? 'Connected' : 'Connecting...'}
          </div>

          <div style={{
            width: 1,
            height: 20,
            background: 'var(--border-subtle)',
          }} />

          {/* Online users mini-avatars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Users size={14} style={{ color: 'var(--text-tertiary)', marginRight: 4 }} />
            {users.slice(0, 5).map((u, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                title={u.username}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: userColors[i % userColors.length],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'white',
                  border: '2px solid var(--bg-secondary)',
                  marginLeft: i > 0 ? -6 : 0,
                }}
              >
                {u.username?.[0]?.toUpperCase() || '?'}
              </motion.div>
            ))}
            {users.length > 5 && (
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 4 }}>
                +{users.length - 5}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── EDITOR AREA ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            width: 220,
            borderRight: '1px solid var(--border-subtle)',
            background: 'rgba(18, 18, 26, 0.6)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Users header */}
          <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Collaborators
            </span>
            <span style={{
              fontSize: 11,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--text-accent)',
              fontWeight: 600,
            }}>
              {users.length}
            </span>
          </div>

          {/* Users list */}
          <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
            <AnimatePresence>
              {users.map((u, i) => (
                <motion.div
                  key={u.username + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 4,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: userColors[i % userColors.length],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'white',
                    }}>
                      {u.username?.[0]?.toUpperCase() || '?'}
                    </div>
                    {/* Online indicator */}
                    <div style={{
                      position: 'absolute',
                      bottom: -1,
                      right: -1,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#22C55E',
                      border: '2px solid var(--bg-secondary)',
                    }} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: u.username === username ? 'var(--text-accent)' : 'var(--text-primary)',
                    }}>
                      {u.username}
                      {u.username === username && (
                        <span style={{ fontSize: 10, color: 'var(--text-tertiary)', marginLeft: 4 }}>(you)</span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Online</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Leave button at bottom */}
          <div style={{ padding: 12, borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={handleLeave}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                color: '#EF4444',
                borderColor: 'rgba(239, 68, 68, 0.2)',
              }}
            >
              <ArrowLeft size={14} />
              Leave Room
            </button>
          </div>
        </motion.aside>

        {/* Monaco Editor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ flex: 1 }}
        >
          <Editor
            height="100%"
            language={language}
            defaultValue="// Start coding collaboratively! 🚀"
            theme="vs-dark"
            onMount={handleMount}
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontLigatures: true,
              minimap: { enabled: true, scale: 1 },
              padding: { top: 16, bottom: 16 },
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              lineHeight: 1.6,
              renderWhitespace: 'boundary',
              bracketPairColorization: { enabled: true },
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
