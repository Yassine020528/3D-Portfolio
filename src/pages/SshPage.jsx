import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SystemButton from '../components/shared/SystemButton';
import SystemScreen from '../components/shared/SystemScreen';
import { playClickSound } from '../lib/sound';

const SSH_COMMAND = 'ssh ssh.yassineabassi.com';

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export default function SshPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const copyResetTimeout = useRef(null);

  useEffect(() => () => {
    window.clearTimeout(copyResetTimeout.current);
  }, []);

  const handleCopy = async () => {
    playClickSound();

    try {
      await copyText(SSH_COMMAND);
      setCopied(true);
      window.clearTimeout(copyResetTimeout.current);
      copyResetTimeout.current = window.setTimeout(() => {
        setCopied(false);
      }, 5000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <SystemScreen showStatus>
      <p className="system-screen__eyebrow">This site is a terminal interface. Connect via SSH to explore.</p>
      <p className="ssh-page__instruction">
        Copy this command on your machine&apos;s terminal:
      </p>

      <div className="ssh-page__command" aria-label={SSH_COMMAND}>
        <span>$</span>
        <code>{SSH_COMMAND}</code>
      </div>

      <div className="system-screen__actions">
        <SystemButton onClick={handleCopy}>
          {copied ? '[ COPIED ]' : '[ COPY COMMAND ]'}
        </SystemButton>
        <SystemButton
          onClick={() => {
            playClickSound();
            navigate('/');
          }}
        >
          [ HOME ]
        </SystemButton>
      </div>
    </SystemScreen>
  );
}
