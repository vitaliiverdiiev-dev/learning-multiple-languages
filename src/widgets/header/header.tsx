import { Link } from "@tanstack/react-router";
import { ModeToggle } from "../mode-toggle/mode-toggle";

export const Header = () => {
  return (
    <header>
      <div className="container mx-auto py-4 px-4 lg:px-0 flex items-center justify-between">
        <span className="text-2xl font-bold tracking-[-2px]">LML</span>

        <nav>
          <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{" "}
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
            <Link
              to="/words"
              search={{ q: "apple" }}
              className="[&.active]:font-bold"
            >
              Words
            </Link>
          </div>
        </nav>

        <ModeToggle />
      </div>
    </header>
  );
};
