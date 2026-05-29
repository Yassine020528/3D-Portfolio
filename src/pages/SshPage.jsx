import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SystemButton from '../components/shared/SystemButton';
import SystemScreen from '../components/shared/SystemScreen';
import { playClickSound } from '../lib/sound';

const SSH_COMMAND = 'ssh ssh.yassineabassi.com';
const SSH_RESTRICTED_NETWORK_COMMAND = 'ssh -p 443 ssh.yassineabassi.com';

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
  const [copiedCommand, setCopiedCommand] = useState(null);
  const copyResetTimeout = useRef(null);

  useEffect(() => () => {
    window.clearTimeout(copyResetTimeout.current);
  }, []);

  const handleCopy = async (command) => {
    playClickSound();

    try {
      await copyText(command);
      setCopiedCommand(command);
      window.clearTimeout(copyResetTimeout.current);
      copyResetTimeout.current = window.setTimeout(() => {
        setCopiedCommand(null);
      }, 5000);
    } catch {
      setCopiedCommand(null);
    }
  };

  return (
    <SystemScreen showStatus>
      <p className="system-screen__eyebrow">This site is a terminal interface. Connect via SSH to explore.</p>
      <p className="ssh-page__instruction">
        Copy this command on your machine&apos;s terminal:
      </p>

      <div className="ssh-page__command-row">
        <div className="ssh-page__command" aria-label={SSH_COMMAND}>
          <span>$</span>
          <code>{SSH_COMMAND}</code>
        </div>
        <SystemButton
          className="ssh-page__copy-button"
          aria-label="Copy standard SSH command"
          onClick={() => handleCopy(SSH_COMMAND)}
        >
          {copiedCommand === SSH_COMMAND ? '[ COPIED ]' : '[ COPY ]'}
        </SystemButton>
      </div>
      <p className="ssh-page__instruction ssh-page__instruction--alternate">
        If you&apos;re on a restricted network (café, school...):
      </p>
      <div className="ssh-page__command-row ssh-page__command-row--alternate">
        <div className="ssh-page__command" aria-label={SSH_RESTRICTED_NETWORK_COMMAND}>
          <span>$</span>
          <code>{SSH_RESTRICTED_NETWORK_COMMAND}</code>
        </div>
        <SystemButton
          className="ssh-page__copy-button"
          aria-label="Copy restricted network SSH command"
          onClick={() => handleCopy(SSH_RESTRICTED_NETWORK_COMMAND)}
        >
          {copiedCommand === SSH_RESTRICTED_NETWORK_COMMAND ? '[ COPIED ]' : '[ COPY ]'}
        </SystemButton>
      </div>
      <p className="system-screen__eyebrow ssh-page__fingerprint">When asked to add the key fingerprint, type <strong>yes</strong> and press <strong>enter ↵</strong>.</p>

      <div className="system-screen__actions">
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
