import React from "react";
import { Menu, X, Rocket, ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/authContext";

interface NavbarProps {
  onAuthClick: () => void;
}

export default function Navbar({ onAuthClick }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="fixed w-full bg-black backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Rocket className="h-8 w-8 text-gray-100" />
            <span className="ml-2 text-xl font-bold text-gray-100">LEAP</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="#about">About</NavLink>
            {user ? (
              <button
                onClick={() => logout()}
                className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                Log In
              </button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/50 backdrop-blur-md">
            <MobileNavLink href="#">Home</MobileNavLink>
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
            <MobileNavLink href="#">Pricing</MobileNavLink>
            <MobileNavLink href="#about">About</MobileNavLink>
            {user ? (
              <button
                onClick={() => logout()}
                className="w-full text-left px-3 py-2 text-white hover:bg-white/10 transition-colors"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="w-full text-left px-3 py-2 text-white hover:bg-white/10 transition-colors"
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a href={href} className="text-white/80 hover:text-white transition-colors">
    {children}
  </a>
);

const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
  >
    {children}
  </a>
);
