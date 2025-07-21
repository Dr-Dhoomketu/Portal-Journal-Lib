'use client';

import React, { useState } from 'react';
import { Search, TrendingUp, DollarSign, Users, Target, Briefcase, Globe } from 'lucide-react';

const BusinessIcons = () => {
  const icons = [
    { icon: TrendingUp, name: 'Growth', delay: 0 },
    { icon: DollarSign, name: 'Finance', delay: 0.5 },
    { icon: Users, name: 'Team', delay: 1 },
    { icon: Target, name: 'Strategy', delay: 1.5 },
    { icon: Briefcase, name: 'Business', delay: 2 },
    { icon: Globe, name: 'Global', delay: 2.5 }
  ];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className="absolute animate-pulse text-gray-700"
            style={{
              left: `${10 + index * 15}%`,
              top: `${25 + (index % 2) * 20}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: '4s'
            }}
          >
            <Icon className="w-8 h-8" />
          </div>
        );
      })}
    </div>
  );
};

export default function NonTechnicalPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <BusinessIcons />
      
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-black rounded-2xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">BizStash</h1>
                <p className="text-sm text-gray-600">Business Learning Hub</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search business courses, finance books, marketing guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-500/20 focus:border-gray-600 transition-all"
                />
              </div>
            </div>

            <button className="bg-gradient-to-r from-gray-800 to-black text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-8">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black">Business</span> Empire
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Master business strategy, finance, marketing, and leadership from industry experts.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gradient-to-r from-gray-800 to-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all">
              Start Learning
            </button>
            <button className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-all">
              Explore Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
