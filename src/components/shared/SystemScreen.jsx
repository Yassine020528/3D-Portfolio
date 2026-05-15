import StatusOverlay from './StatusOverlay';

export default function SystemScreen({
  children,
  className = '',
  contentClassName = '',
  showStatus = false,
}) {
  return (
    <main className={`system-screen ${className}`.trim()}>
      {showStatus && <StatusOverlay visible />}
      <section className={`system-screen__content ${contentClassName}`.trim()}>
        {children}
      </section>
    </main>
  );
}
