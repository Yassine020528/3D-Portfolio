import { useProgress } from '@react-three/drei';

import { playClickSound } from '../../lib/sound';
import SystemButton from './SystemButton';
import SystemScreen from './SystemScreen';

export default function LoadingScreen({ onStarted }) {
  const { progress } = useProgress();

  return (
    <SystemScreen>
      <div className="loading-screen__status">
        {progress < 100 ? `LOADING ${Math.round(progress)}%` : 'SYSTEM READY'}
      </div>
      <div className="loading-screen__progress" aria-hidden="true">
        <div style={{ width: `${progress}%` }} />
      </div>
      {progress === 100 && (
        <SystemButton
          onClick={() => {
            playClickSound();
            onStarted();
          }}
        >
          [ ENTER ]
        </SystemButton>
      )}
    </SystemScreen>
  );
}
