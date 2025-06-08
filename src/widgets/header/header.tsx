import { Logo } from "./components/logo";
import { Navigation } from "./components/navigation";
import { ModeToggle } from "../mode-toggle/mode-toggle";
import { UserSection } from "./components/user-section/user-section";

export const Header = () => (
  <header>
    <div className="container mx-auto py-4 px-4 xl:px-0 flex items-center justify-between">
      <Logo />
      <Navigation />
      <div className="flex items-center gap-4">
        <UserSection />
        <ModeToggle />
      </div>
    </div>
  </header>
);
