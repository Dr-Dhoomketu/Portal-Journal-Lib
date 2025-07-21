'use client';

import React, { useState } from 'react';
import { Search, Heart, Stethoscope, Microscope, Brain, Pill, Activity, UserCheck } from 'lucide-react';

const MedicalIcons = () => {
  const icons = [
    { icon: Heart, name: 'Cardiology', delay: 0 },
    { icon: Brain, name: 'Neurology', delay: 0.5 },
    { icon: Microscope, name: 'Pathology', delay: 1 },
    { icon: Pill, name: 'Pharmacy', delay: 1.5 },
    { icon: Activity, name: 'Emergency', delay: 2 },
    { icon: UserCheck, name: 'Patient Care', delay: 2.5 }
  ];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className="absolute animate-pulse text-green-500"
            style={{
              left: `${12 + index * 14}%`,
              top: `${20 + (index % 3) * 20}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: '3s'
            }}
          >
            <Icon className="w-8 h-8" />
          </div>
        );
      })}
    </div>
  );
};

export default function MedicalPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <MedicalIcons />
      
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-green-900">MedStash</h1>
                <p className="text-sm text-green-600">Medical Learning Hub</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search medical courses, anatomy books, clinical guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-green-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
              </div>
            </div>

            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-8">
            Advance <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">Medical</span> Knowledge
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Master medical sciences, clinical skills, and patient care from leading healthcare professionals.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all">
              Start Learning
            </button>
            <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-green-50 transition-all">
              Browse Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
