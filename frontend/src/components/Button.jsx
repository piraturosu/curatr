export function Button({ children }) {
  return (
    <button className="px-4 py-2 rounded-lg font-semibold text-white bg-primary hover:bg-logo dark:bg-primary-dark dark:hover:bg-logo-dark transition">
      {children}
    </button>
  );
}
