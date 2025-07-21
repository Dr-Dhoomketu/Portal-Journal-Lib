'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Book, Video, Star, Clock, Award, TrendingUp, User, Settings, LogOut, Home, Bell, Search, BookOpen, Eye, Heart, Bookmark, Calendar, BarChart3, Globe, Sparkles, Edit3, Copy, Check, RefreshCw, Plus, ArrowRight, X } from 'lucide-react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Dashboard states
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [userName, setUserName] = useState('');
  const [userKey, setUserKey] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [showKeyGeneration, setShowKeyGeneration] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  const [newsExpanded, setNewsExpanded] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // User data state
  const [userData, setUserData] = useState({
    booksRead: 24,
    videosWatched: 67,
    hoursLearned: 145.5,
    achievements: 12,
    streak: 15,
    savedBooks: 89,
    interests: ['AI/ML', 'Web Development', 'Data Science', 'Python'],
    readingGoal: 50,
    currentlyReading: 3,
    completedThisWeek: 5
  });

  // Animated avatars
  const avatars = [
    { id: 0, emoji: '🤖', name: 'Robot', color: 'from-blue-500 to-purple-600' },
    { id: 1, emoji: '👨‍💻', name: 'Developer', color: 'from-green-500 to-teal-600' },
    { id: 2, emoji: '🧠', name: 'Brain', color: 'from-pink-500 to-rose-600' },
    { id: 3, emoji: '🎓', name: 'Graduate', color: 'from-yellow-500 to-orange-600' },
    { id: 4, emoji: '📚', name: 'Scholar', color: 'from-indigo-500 to-blue-600' },
    { id: 5, emoji: '🚀', name: 'Rocket', color: 'from-purple-500 to-pink-600' },
    { id: 6, emoji: '🎯', name: 'Target', color: 'from-orange-500 to-red-600' },
    { id: 7, emoji: '💡', name: 'Idea', color: 'from-cyan-500 to-blue-600' }
  ];

  // Mock news data
  const newsData = [
    {
      id: 1,
      title: "New AI/ML Course: 'Deep Learning with PyTorch' Now Available",
      category: "AI/ML",
      type: "course",
      time: "2 hours ago",
      relevance: 95,
      author: "Dr. Sarah Chen",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=60&h=60&fit=crop"
    },
    {
      id: 2,
      title: "React 18 Complete Guide - Updated with Latest Features",
      category: "Web Development",
      type: "book",
      time: "4 hours ago",
      relevance: 88,
      author: "John Miller",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=60&h=60&fit=crop"
    },
    {
      id: 3,
      title: "Data Science Bootcamp: From Zero to Professional",
      category: "Data Science",
      type: "course",
      time: "6 hours ago",
      relevance: 92,
      author: "Prof. Maria Rodriguez",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=60&h=60&fit=crop"
    },
    {
      id: 4,
      title: "Python Advanced Techniques: Performance Optimization",
      category: "Python",
      type: "article",
      time: "8 hours ago",
      relevance: 85,
      author: "Alex Kim",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=60&h=60&fit=crop"
    },
    {
      id: 5,
      title: "Breaking: GPT-4 Integration in Educational Platforms",
      category: "General",
      type: "news",
      time: "12 hours ago",
      relevance: 78,
      author: "Tech News Daily",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=60&h=60&fit=crop"
    }
  ];

  // Generate unique alphanumeric key
  const generateUserKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Check username availability (mock function)
  const checkUsernameAvailability = async (username) => {
    if (username.length < 3) {
      setIsUsernameAvailable(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock availability check
    const unavailableNames = ['admin', 'user', 'test', 'bookstash', 'john', 'jane'];
    const isAvailable = !unavailableNames.includes(username.toLowerCase());
    setIsUsernameAvailable(isAvailable);
  };

  // Copy user key to clipboard
  const copyUserKey = () => {
    navigator.clipboard.writeText(userKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  // Handle profile setup completion
  const completeProfileSetup = () => {
    if (isUsernameAvailable && userName.length >= 3) {
      const newKey = generateUserKey();
      setUserKey(newKey);
      setShowKeyGeneration(true);
      
      // Save to localStorage (in real app, save to backend)
      localStorage.setItem('bookstash_profile', JSON.stringify({
        username: userName,
        userKey: newKey,
        avatar: selectedAvatar,
        setupComplete: true
      }));
      
      setTimeout(() => {
        setShowKeyGeneration(false);
        setProfileComplete(true);
        setShowProfileSetup(false);
      }, 3000);
    }
  };

  // Initialize profile setup
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
      return;
    }

    // Check if profile setup is complete
    const savedProfile = localStorage.getItem('bookstash_profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      if (profile.setupComplete) {
        setUserName(profile.username);
        setUserKey(profile.userKey);
        setSelectedAvatar(profile.avatar);
        setProfileComplete(true);
      } else {
        setShowProfileSetup(true);
      }
    } else {
      setShowProfileSetup(true);
    }
  }, [session, status, router]);

  // Check username availability on change
  useEffect(() => {
    if (userName.length > 0) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(userName);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setIsUsernameAvailable(null);
    }
  }, [userName]);

  // Reading progress data for chart
  const getReadingData = () => {
    const baseData = {
      week: [12, 19, 15, 22, 18, 25, 20],
      month: [45, 52, 48, 61, 55, 67, 58, 72, 65, 78, 71, 83, 76, 89, 82, 95, 88, 102, 95, 108, 101, 115, 108, 122, 115, 128, 121, 135, 128, 145],
      year: [234, 267, 298, 312, 345, 378, 398, 421, 445, 467, 489, 512]
    };
    return baseData[selectedTimeRange];
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading your dashboard...</h2>
          <p className="text-gray-600">Setting up your personalized learning experience</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Setup Modal */}
      {showProfileSetup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 animate-scale-up">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {session.user.name?.split(' ')[0]}!</h2>
              <p className="text-gray-600">Let's create your unique BookStash profile</p>
            </div>

            {/* Avatar Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Choose your avatar</label>
              <div className="grid grid-cols-4 gap-3">
                {avatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
                      selectedAvatar === avatar.id 
                        ? `bg-gradient-to-r ${avatar.color} scale-110 shadow-lg` 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {avatar.emoji}
                    {selectedAvatar === avatar.id && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Username Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Create your username</label>
              <div className="relative">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  placeholder="Enter unique username"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-orange-500 focus:outline-none transition-colors"
                  maxLength={20}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {userName.length > 0 && (
                    <div className="flex items-center">
                      {isUsernameAvailable === null ? (
                        <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
                      ) : isUsernameAvailable ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {isUsernameAvailable !== null && (
                <p className={`text-sm mt-2 ${isUsernameAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {isUsernameAvailable ? '✓ Username available!' : '✗ Username taken or invalid'}
                </p>
              )}
            </div>

            {/* Complete Button */}
            <button
              onClick={completeProfileSetup}
              disabled={!isUsernameAvailable || userName.length < 3}
              className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 ${
                isUsernameAvailable && userName.length >= 3
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Create My Profile
            </button>
          </div>
        </div>
      )}

      {/* Key Generation Modal */}
      {showKeyGeneration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center animate-scale-up">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Created!</h2>
            <p className="text-gray-600 mb-6">Your unique BookStash key has been generated</p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="text-3xl font-bold text-orange-600 mb-2 tracking-wider">{userKey}</div>
              <p className="text-sm text-gray-600">Save this key - you'll need it for account recovery</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={copyUserKey}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                {keyCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {keyCopied ? 'Copied!' : 'Copy Key'}
              </button>
              <button
                onClick={() => setShowKeyGeneration(false)}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      <div className="min-h-screen bg-gray-50">
        {/* Header with News */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  BookStash
                </h1>
              </div>
              
              {/* News Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setNewsExpanded(!newsExpanded)}
                  className="relative flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-2xl transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span className="text-sm font-medium">Latest Updates</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </button>
                
                <button 
                  onClick={() => router.push('/')}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm">Home</span>
                </button>
                
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-r ${avatars[selectedAvatar]?.color} animate-pulse`}>
                    {avatars[selectedAvatar]?.emoji}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">@{userName}</div>
                    <div className="text-xs text-gray-500">ID: {userKey}</div>
                  </div>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Expandable News Section */}
          {newsExpanded && (
            <div className="border-t border-gray-200 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">📰 Latest Updates</h3>
                  <button
                    onClick={() => setNewsExpanded(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {newsData.map((news) => (
                    <div key={news.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{news.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            userData.interests.includes(news.category) 
                              ? 'bg-orange-100 text-orange-600' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {news.category}
                          </span>
                          <span>•</span>
                          <span>{news.time}</span>
                          <span>•</span>
                          <span className="text-green-600">{news.relevance}% match</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl bg-gradient-to-r ${avatars[selectedAvatar]?.color} animate-bounce`}>
                {avatars[selectedAvatar]?.emoji}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome back, @{userName}! 👋
                </h2>
                <p className="text-gray-600">Continue your learning journey • Streak: {userData.streak} days 🔥</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Books Read</h3>
                  <p className="text-2xl font-bold text-blue-600">{userData.booksRead}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                📈 +{userData.completedThisWeek} this week
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Videos Watched</h3>
                  <p className="text-2xl font-bold text-green-600">{userData.videosWatched}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                🎯 Goal: 100 videos
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Hours Learned</h3>
                  <p className="text-2xl font-bold text-orange-600">{userData.hoursLearned}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                ⏰ +8.5 hours this week
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Achievements</h3>
                  <p className="text-2xl font-bold text-purple-600">{userData.achievements}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                🏆 Next: Speed Reader
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Reading Progress & Saved Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Reading Progress Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">📊 Reading Progress</h3>
                  <div className="flex gap-2">
                    {['week', 'month', 'year'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setSelectedTimeRange(range)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          selectedTimeRange === range 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {range.charAt(0).toUpperCase() + range.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Goal Progress</span>
                    <span className="text-sm font-semibold text-orange-600">
                      {userData.booksRead}/{userData.readingGoal} books
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-1000"
                      style={{width: `${(userData.booksRead / userData.readingGoal) * 100}%`}}
                    ></div>
                  </div>
                  
                  {/* Simple Progress Visualization */}
                  <div className="grid grid-cols-7 gap-2 mt-6">
                    {getReadingData().slice(-7).map((value, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="bg-gradient-to-t from-orange-500 to-orange-300 rounded-lg mx-auto animate-pulse"
                          style={{
                            height: `${Math.max(value / 3, 20)}px`,
                            width: '100%'
                          }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-1">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Saved Items */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">💾 Your Saved Items</h3>
                <div className="space-y-3">
                  {[
                    {
                      title: "Deep Learning Specialization",
                      type: "course",
                      progress: 75,
                      category: "AI/ML",
                      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=50&h=50&fit=crop"
                    },
                    {
                      title: "React Advanced Patterns",
                      type: "book",
                      progress: 45,
                      category: "Web Development",
                      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=50&h=50&fit=crop"
                    },
                    {
                      title: "Python Data Analysis",
                      type: "article",
                      progress: 100,
                      category: "Data Science",
                      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=50&h=50&fit=crop"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                          <span>•</span>
                          <span>{item.type}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="bg-orange-500 h-1 rounded-full transition-all duration-500"
                            style={{width: `${item.progress}%`}}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{item.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Interests & Quick Actions */}
            <div className="space-y-6">
              {/* User Interests */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 Your Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-medium animate-pulse"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <button className="w-full mt-4 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm text-gray-600">Add Interest</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
                    <Search className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-900">Browse Library</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
                    <Video className="w-5 h-5 text-green-600" />
                    <span className="text-gray-900">Live Sessions</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
                    <Bookmark className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-900">My Bookmarks</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors">
                    <Settings className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-900">Settings</span>
                  </button>
                </div>
              </div>

              {/* Learning Streak */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl animate-bounce">🔥</div>
                  <div>
                    <h3 className="text-xl font-bold">Learning Streak</h3>
                    <p className="text-3xl font-bold">{userData.streak} Days</p>
                  </div>
                </div>
                <p className="text-orange-100 text-sm">
                  Amazing! You're on fire! Keep the momentum going.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
