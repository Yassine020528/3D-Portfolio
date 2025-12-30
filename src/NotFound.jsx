import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState, useRef } from 'react';

export default function NotFound() {
    const playClickSound = () => {  
        const clickAudio = new Audio('/sounds/click.mp3');
        clickAudio.play().catch(err => console.error(err));
    };
    const navigate = useNavigate();
    function SpeakerIcon({ enabled }) {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white" />
            {enabled && <path d="M15.54 8.46L16.95 7.05C18.07 8.17 18.79 9.71 18.79 11.42C18.79 13.13 18.07 14.67 16.95 15.79L15.54 14.38C16.32 13.6 16.79 12.56 16.79 11.42C16.79 10.28 16.32 9.24 15.54 8.46Z" fill="white"/>}
            {!enabled && <path d="M21.59 7.59L19 10.17L16.41 7.59L15 9L17.59 11.58L15 14.17L16.41 15.59L19 13L21.59 15.59L23 14.17L20.41 11.58L23 9L21.59 7.59Z" fill="white"/>}
            </svg>
        );}
    function Overlay() {
      const [time, setTime] = useState(new Date().toLocaleTimeString());
      const [soundEnabled, setSoundEnabled] = useState(true);
      
      const audioCtxRef = useRef(null);
      const ambientSourceRef = useRef(null);
      const gainNodeRef = useRef(null);
      const filterNodeRef = useRef(null);
      const ambientBufferRef = useRef(null);
    
      const playAudio = () => {
        const ctx = audioCtxRef.current;
        if (!ctx || !ambientBufferRef.current) return;
        if (ctx.state === 'suspended') ctx.resume();
        if (ambientSourceRef.current) return;
    
        const source = ctx.createBufferSource();
        source.buffer = ambientBufferRef.current;
        source.loop = true;
        source.connect(filterNodeRef.current);
        filterNodeRef.current.connect(gainNodeRef.current);
        source.start(0);
        ambientSourceRef.current = source;
    
        gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainNodeRef.current.gain.setValueAtTime(0, ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2);
      };
    
      const stopAudio = () => {
        const ctx = audioCtxRef.current;
        if (!ctx || !ambientSourceRef.current) return;
        const fadeOutTime = 1;
        gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeOutTime);
        setTimeout(() => {
          if (ambientSourceRef.current) {
            ambientSourceRef.current.stop();
            ambientSourceRef.current.disconnect();
            ambientSourceRef.current = null;
          }
        }, fadeOutTime * 1000);
      };
    
      useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        gainNodeRef.current = audioCtxRef.current.createGain();
        filterNodeRef.current = audioCtxRef.current.createBiquadFilter();
        filterNodeRef.current.type = 'lowpass';
        filterNodeRef.current.frequency.value = 20000; 
        gainNodeRef.current.connect(audioCtxRef.current.destination);
        gainNodeRef.current.gain.value = 0;
    
        fetch('/sounds/hold-music.mp3')
          .then(r => r.arrayBuffer())
          .then(ab => audioCtxRef.current.decodeAudioData(ab))
          .then(buf => { 
            ambientBufferRef.current = buf;
            if (soundEnabled) playAudio();
          })
          .catch(e => console.error(e));
    
        return () => { 
          clearInterval(timer);
          if (audioCtxRef.current) audioCtxRef.current.close();
        };
      }, []);
     
      useEffect(() => { playAudio(); }); 
      useEffect(() => {
        if (!audioCtxRef.current || !filterNodeRef.current) return;
        const ctx = audioCtxRef.current;
        const filter = filterNodeRef.current;
        const now = ctx.currentTime;
        filter.frequency.cancelScheduledValues(now);
        filter.frequency.setValueAtTime(filter.frequency.value, now);
    
        if (!soundEnabled) {
          filter.frequency.exponentialRampToValueAtTime(1000, now + 1);
        } else {
          filter.frequency.exponentialRampToValueAtTime(20000, now + 1);
        }
      });
    
      const toggleSound = () => {
        playClickSound();
        if (!soundEnabled) { playAudio(); setSoundEnabled(true); } 
        else { stopAudio(); setSoundEnabled(false); }
      };
    
      const boxStyle = { backgroundColor: 'black', color: 'white', padding: '5px 10px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '16px', marginBottom: '10px', display: 'inline-block' };
      const containerStyle = { position: 'absolute', top: '40px', left: '40px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pointerEvents: 'none' };
      const rowStyle = { display: 'flex', gap: '10px', pointerEvents: 'auto' };
    
      return (
        <div style={containerStyle}>
          <div style={boxStyle}>Yassine Abassi</div>
          <div style={boxStyle}>Computer Engineering Student</div>
          <div style={rowStyle}>
            <div style={boxStyle}>{time}</div>
            <button onClick={toggleSound} style={{ ...boxStyle, border: 'none', cursor: 'pointer', minWidth: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SpeakerIcon enabled={soundEnabled} />
            </button>
          </div>
        </div>
      );
    }

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100, fontFamily: 'monospace' }}>
            <Overlay/>
            <h1 style={{ color: 'white', fontFamily: 'monospace', marginTop: '150px' }}>
            SYSTEM ERROR: PAGE_NOT_FOUND
            </h1>
            <button 
            onClick={() => { playClickSound(); navigate('/'); }}
            style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '10px 30px', fontFamily: 'monospace', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}
            onMouseEnter={(e) => (e.target.style.background = 'white') && (e.target.style.color = 'black')}
            onMouseLeave={(e) => (e.target.style.background = 'transparent') && (e.target.style.color = 'white')}
            >
            [ REBOOT TO HOME ]
            </button>
        </div>
    );
}