
import './Button.css';

export function Button({ children, onClick}) {
  return (
    <button type="button" onClick={onClick} className="button">
      {children}
    </button>
  );
}
