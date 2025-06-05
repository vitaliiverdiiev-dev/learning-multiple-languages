import { Logo } from "./components/logo";
import { Navigation } from "./components/navigation";
import { ModeToggle } from "../mode-toggle/mode-toggle";

export const Header = () => {
  return (
    <header>
      <div className="container mx-auto py-4 px-4 xl:px-0 flex items-center justify-between">
        <Logo />
        <Navigation />
        <ModeToggle />
      </div>
    </header>
  );
};
