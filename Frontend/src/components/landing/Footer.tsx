import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800" id="about">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#about" className="text-base text-gray-300 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#careers" className="text-base text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-base text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#blog" className="text-base text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#guides" className="text-base text-gray-300 hover:text-white transition-colors">
                  Guides
                </a>
              </li>
              <li>
                <a href="#help" className="text-base text-gray-300 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#privacy" className="text-base text-gray-300 hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-base text-gray-300 hover:text-white transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Admin</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/admin/login" className="inline-flex items-center text-base text-gray-300 hover:text-white transition-colors">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} CareerLaunch AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const Link = ({ children, ...props }) => (
  <a {...props} className="text-base text-gray-300 hover:text-white transition-colors">
    {children}
  </a>
);