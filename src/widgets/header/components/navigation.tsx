import { Link } from "@tanstack/react-router";

export const Navigation = () => {
  
  return (
    <nav>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/words" search={{ q: "" }} className="[&.active]:font-bold">
          Words
        </Link>
        <Link to="/todos" className="[&.active]:font-bold">
          Todos
        </Link>
      </div>
    </nav>
  );
};
