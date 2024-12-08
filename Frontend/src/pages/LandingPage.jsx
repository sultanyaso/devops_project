import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";
import AuthModal from "../components/auth/AuthModal";
import { AuthProvider } from "../contexts/authContext";

export default function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authModalView, setAuthModalView] = React.useState("login");

  const handleGetStarted = () => {
    setAuthModalView("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <AuthProvider>
        <Navbar
          onAuthClick={() => {
            setAuthModalView("login");
            setIsAuthModalOpen(true);
          }}
        />
      </AuthProvider>

      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-indigo-100 rounded-full opacity-50 blur-3xl" />
          <div className="absolute top-20 -left-32 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl" />
        </div>

        <div className="relative pt-16">
          <Hero onGetStarted={handleGetStarted} />

          <Features />

          <Testimonials />
        </div>
      </div>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
      />
    </div>
  );
}
