'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Target, Home, ChevronRight, Cpu, BookOpen, Microscope } from 'lucide-react';

const categories = [
  {
    id: 'technical',
    title: 'Technical - STEM',
    subtitle: 'Science, Technology, Engineering & Mathematics',
    icon: Cpu,
    color: 'from-orange-500 to-amber-400',
    bg: 'bg-orange-50',
    description:
      'Tackle software, data science, coding, and applied math with cutting-edge resources.',
    advantages: [
      'High-demand career skills',
      'Sharpen problem-solving',
      'Innovative project focus',
      'Future-proof learning'
    ],
    link: '/technical'
  },
  {
    id: 'general',
    title: 'Non-Tech - General',
    subtitle: 'Business, Arts & Humanities',
    icon: BookOpen,
    color: 'from-pink-500 to-fuchsia-400',
    bg: 'bg-pink-50',
    description:
      'Build leadership, creative, and communication skills through business, art, and humanities.',
    advantages: [
      'Boost creative thinking',
      'Better communication',
      'Leadership essentials',
      'Cultural know-how'
    ],
    link: '/non-technical'
  },
  {
    id: 'medical',
    title: 'Medical & Biology',
    subtitle: 'Healthcare & Life Sciences',
    icon: Microscope,
    color: 'from-emerald-500 to-green-400',
    bg: 'bg-green-50',
    description:
      'Dive into healthcare, research, and biology to improve lives and solve real medical challenges.',
    advantages: [
      'Impact real lives',
      'Stable career prospects',
      'Continuous learning',
      'Scientific excellence'
    ],
    link: '/medical'
  },
];

export default function CategoriesPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100/60 via-amber-50 to-amber-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-xl w-12 h-12 flex items-center justify-center shadow">
              <span className="text-2xl font-bold text-orange-600">B</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Categories</h1>
              <p className="text-white/80 text-xs font-medium">Choose your learning path</p>
            </div>
          </div>
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-1 px-2 py-1 rounded text-white/80 hover:text-white hover:bg-white/10"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">Home</span>
            </button>
            <ChevronRight className="w-4 h-4 text-white/50" />
            <span className="flex items-center px-2 py-1 rounded bg-white/20 text-white font-medium text-sm">
              <Target className="w-4 h-4" />
              Categories
            </span>
          </nav>
        </div>
      </header>

      {/* Main section */}
      <main className="max-w-6xl mx-auto px-4 pt-16 pb-24">
        <h2 className="text-4xl text-center font-bold text-orange-700 mb-12">
          Select Your Interest Area
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isHovered = hovered === cat.id;
            return (
              <div
                key={cat.id}
                className={`${cat.bg} rounded-3xl shadow-lg transition-transform duration-300 group relative hover:scale-105`}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="p-8 pb-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`bg-gradient-to-br ${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{cat.title}</h3>
                      <p className="text-xs text-gray-400">{cat.subtitle}</p>
                    </div>
                  </div>
                  <div className="relative min-h-[60px] mb-4"> {/* Responsive to hover card */}
                    <p className={`transition-opacity duration-300 text-gray-600 ${isHovered ? 'opacity-0 absolute pointer-events-none' : 'opacity-100'}`}>
                      {cat.description}
                    </p>
                    {/* Overlay on hover with fade, shows description and advantages */}
                    <div
                      className={`absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 ${
                        isHovered ? 'opacity-100 pointer-events-auto z-20' : 'opacity-0 pointer-events-none z-0'
                      }`}
                    >
                      <div>
                        <p className="text-gray-900 font-semibold mb-4">{cat.description}</p>
                        <ul className="list-disc ml-6 text-sm text-orange-800 mb-2 space-y-1">
                          {cat.advantages.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Button */}
                  <button
                    onClick={() => router.push(cat.link)}
                    className={`w-full py-3 mt-2 rounded-xl font-semibold bg-gradient-to-r ${cat.color} text-white transition hover:brightness-105 hover:scale-[1.03] shadow`}
                  >
                    Explore {cat.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
