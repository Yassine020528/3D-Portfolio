export default function SystemButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`system-button ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
