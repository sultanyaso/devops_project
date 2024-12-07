import React from "react";
import { Menu, X, Rocket, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/auth/authContext";

interface NavbarProps {
  onAuthClick: () => void;
}

export default function Navbar({ onAuthClick }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Rocket className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">LEAP</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#about">About</NavLink>
            {user ? (
              <button
                onClick={() => logout()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Log In
              </button>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#pricing">Pricing</MobileNavLink>
            <MobileNavLink href="#about">About</MobileNavLink>
            {user ? (
              <button
                onClick={() => logout()}
                className="w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Log In
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
  <a
    href={href}
    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
  >
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
    className="block px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
  >
    {children}
  </a>
);
