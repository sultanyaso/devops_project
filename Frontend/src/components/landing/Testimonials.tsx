import React from "react";

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
  {
    name: "David Kim",
    role: "Data Scientist at Amazon",
    quote:
      "CareerLaunch is a must-have for anyone serious about their career. The AI-driven insights are unmatched.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Samantha Lee",
    role: "UX Designer at Apple",
    quote:
      "I've always struggled with networking, but CareerLaunch made it easy. The personalized suggestions are spot-on.",
    image:
      "https://images.unsplash.com/photo-1637766652059-af65a50715eb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Alex Johnson",
    role: "Software Engineer at Microsoft",
    quote:
      "The analytics dashboard is a game-changer. I can finally track my progress and make data-driven decisions.",
    image:
      "https://images.unsplash.com/photo-1729075510531-bed3ee89bc6c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Testimonials() {
  return (
    <div className="bg-black py-24" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">What our users say</h2>
          <p className="mt-4 text-lg text-gray-400">
            Join thousands of professionals who've transformed their careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-medium text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
