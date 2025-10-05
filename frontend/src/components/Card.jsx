export function Card({ title, children }) {
  return (
    <div className="bg-secondary dark:bg-secondary-dark rounded-xl shadow-sm p-4 border border-border dark:border-border-dark hover:shadow-md transition">
      {children}
    </div>
  );
}
