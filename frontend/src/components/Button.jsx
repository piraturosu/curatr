export function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition ${className}`}
    >
      {children}
    </button>
  );
}
