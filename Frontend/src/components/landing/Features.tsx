import React from 'react';
import { Bot, Rocket, Users, LineChart, Calendar, Shield } from 'lucide-react';

const features = [
  {
    name: 'AI Content Generation',
    description: 'Generate engaging LinkedIn posts, articles, and comments tailored to your industry and audience.',
    icon: Bot,
  },
  {
    name: 'Smart Networking',
    description: 'Get personalized connection suggestions and engagement opportunities to grow your network effectively.',
    icon: Users,
  },
  {
    name: 'Analytics Dashboard',
    description: 'Track your growth, engagement, and influence with comprehensive analytics and insights.',
    icon: LineChart,
  },
  {
    name: 'Content Calendar',
    description: 'Plan and schedule your content with AI-powered timing optimization for maximum impact.',
    icon: Calendar,
  },
  {
    name: 'Career Growth',
    description: 'Accelerate your professional development with personalized career path recommendations.',
    icon: Rocket,
  },
  {
    name: 'Privacy First',
    description: 'Your data is secure with enterprise-grade encryption and privacy controls.',
    icon: Shield,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-black" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Everything you need to succeed on LinkedIn
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Our AI-powered platform provides all the tools you need to build your personal brand and accelerate your career growth.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-white">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

