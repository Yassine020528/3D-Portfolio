import { useNavigate } from 'react-router-dom';

import SystemButton from '../components/shared/SystemButton';
import SystemScreen from '../components/shared/SystemScreen';
import { playClickSound } from '../lib/sound';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <SystemScreen showStatus>
      <h1 className="system-screen__title">SYSTEM ERROR: PAGE_NOT_FOUND</h1>
      <SystemButton
        onClick={() => {
          playClickSound();
          navigate('/');
        }}
      >
        [ REBOOT TO HOME ]
      </SystemButton>
    </SystemScreen>
  );
}
