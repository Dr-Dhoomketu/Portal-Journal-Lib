'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Play, Code, Database, Cpu, Smartphone, Cloud, Shield, Brain, Monitor, Server } from 'lucide-react';

// Floating Tech Icons
const TechIcons = () => {
  const icons = [
    { icon: Code, name: 'Programming', delay: 0 },
    { icon: Database, name: 'Database', delay: 0.5 },
    { icon: Cpu, name: 'Hardware', delay: 1 },
    { icon: Cloud, name: 'Cloud', delay: 1.5 },
    { icon: Shield, name: 'Security', delay: 2 },
    { icon: Brain, name: 'AI/ML', delay: 2.5 }
  ];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className="absolute animate-bounce text-blue-500"
            style={{
              left: `${15 + index * 15}%`,
              top: `${20 + (index % 2) * 30}%`,
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

export default function TechnicalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const technicalContent = [
    {
      id: 1,
      title: "Advanced React Development",
      author: "John Smith", 
      type: "course",
      category: "Frontend",
      level: "Advanced",
      duration: "8 hours",
      rating: 4.9,
      students: "15.2K",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      description: "Master advanced React patterns, hooks, and performance optimization"
    },
    {
      id: 2,
      title: "Machine Learning with Python",
      author: "Dr. Sarah Chen",
      type: "book", 
      category: "AI/ML",
      level: "Intermediate",
      pages: "450 pages",
      rating: 4.8,
      downloads: "8.7K",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
      description: "Complete guide to ML algorithms and practical implementation"
    }
  ];

  const categories = ['All', 'Frontend', 'Backend', 'AI/ML', 'Cloud', 'Mobile', 'Security'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <TechIcons />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-900">TechStash</h1>
                <p className="text-sm text-blue-600">Technical Learning Hub</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search programming courses, AI tutorials, tech books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-blue-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-8">
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">Technology</span> Skills
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Learn programming, AI, cloud computing, and cutting-edge technologies from industry experts.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl transition-all">
              Start Learning
            </button>
            <button className="border-2 border-blue-500 text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-50 transition-all">
              Browse Courses
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-xl whitespace-nowrap font-medium transition-all ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Technical Content</h2>
            <p className="text-xl text-gray-600">Hand-picked courses and resources for tech professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicalContent.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-l-4 border-blue-500">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">by {item.author}</p>
                  <p className="text-gray-700 mb-4">{item.description}</p>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    {item.type === 'course' ? 'Start Course' : 'Read Book'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
