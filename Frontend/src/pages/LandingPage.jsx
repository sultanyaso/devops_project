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

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    quote:
      "CareerLaunch AI helped me optimize my LinkedIn presence and connect with the right people. Within months, I landed my dream job!",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Manager at Meta",
    quote:
      "The AI-powered content suggestions are incredible. My engagement rates have tripled since I started using CareerLaunch.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emily Watson",
    role: "Marketing Director at Netflix",
    quote:
      "The network analytics helped me identify key industry connections I was missing. Game-changing for career growth!",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
