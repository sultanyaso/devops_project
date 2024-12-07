import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
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

          {/* Social Proof Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Trusted by professionals from
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                  alt="IBM"
                  className="h-8 opacity-50 hover:opacity-75 transition-opacity"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
                  alt="Microsoft"
                  className="h-8 opacity-50 hover:opacity-75 transition-opacity"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                  alt="Google"
                  className="h-8 opacity-50 hover:opacity-75 transition-opacity"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
                  alt="Meta"
                  className="h-8 opacity-50 hover:opacity-75 transition-opacity"
                />
              </div>
            </div>
          </div>

          <Features />

          {/* Testimonials Section */}
          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                  What our users say
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Join thousands of professionals who've transformed their
                  careers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600">{testimonial.quote}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
