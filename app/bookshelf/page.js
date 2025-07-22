'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, Play, Star, Clock, User, ArrowLeft, Filter, Search, 
  Grid, List, Heart, Bookmark, Eye, Calendar, TrendingUp, Award,
  Volume2, Maximize, Download, Share, MessageCircle, ThumbsUp,
  MoreVertical, Edit3, Trash2, Archive, Tag, SortAsc, SortDesc,
  ChevronDown, ChevronUp, Info, BarChart3, Target, Zap, Book,
  Video, Headphones, FileText, Image, Music, Film, Monitor,
  ArrowRight, Timer, Plus, RefreshCw, Bell, Home, Menu, X, ChevronRight
} from 'lucide-react';
import { useSession } from 'next-auth/react';

const ModernBookshelf = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [viewMode, setViewMode] = useState('shelf');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const animationRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Simulate loading - replace with actual data fetch
    const loadUserData = async () => {
      setIsLoading(true);
      // TODO: Replace with actual API calls
      // await fetchUserProgress();
      // await fetchSavedItems();
      setTimeout(() => setIsLoading(false), 1000); // Remove this line when connecting real API
    };
    
    loadUserData();
  }, []);

  // Navigation handlers
  const handleBackToHome = () => {
    router.push('/');
  };

  const handleBreadcrumbHome = () => {
    router.push('/');
  };

  // Database-ready data structure - TODO: Replace with API calls
  const [userProgress, setUserProgress] = useState({
    currentlyReading: {
      id: 1,
      title: "Machine Learning Fundamentals",
      author: "Dr. Sarah Johnson",
      progress: 68,
      lastRead: "2 hours ago",
      coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=150&h=200&fit=crop",
      type: "book",
      timeLeft: "2h 15m left"
    },
    lastWatched: {
      id: 2,
      title: "React Hooks Masterclass",
      author: "John Smith",
      progress: 45,
      lastWatched: "Yesterday",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&h=200&fit=crop",
      type: "video",
      duration: "1h 30m"
    },
    weeklyGoal: {
      target: 10,
      completed: 7,
      streak: 5
    },
    totalStats: {
      booksRead: 34,
      videosWatched: 89,
      hoursSpent: 156.5,
      achievements: 12
    }
  });

  // Database-ready saved items - TODO: Replace with API calls
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: "Machine Learning Fundamentals: Theory to Practice",
      author: "Dr. Sarah Johnson",
      type: "book",
      category: "Technical",
      subject: "AI/ML",
      coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=150&h=200&fit=crop",
      dateAdded: "2024-01-15",
      progress: 68,
      rating: 4.8,
      pages: 420,
      isCurrentlyReading: true,
      tags: ["Machine Learning", "Python", "Data Science"],
      notes: 3,
      bookmarks: 12,
      readTime: "6h 30m",
      userId: session?.user?.id || 'guest', // Ready for database
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: "React Development Masterclass",
      author: "John Smith",
      type: "video",
      category: "Technical",
      subject: "Web Development",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&h=200&fit=crop",
      dateAdded: "2024-01-14",
      progress: 45,
      rating: 4.9,
      duration: "1h 30m",
      views: "89K",
      tags: ["React", "JavaScript", "Frontend"],
      notes: 8,
      bookmarks: 5,
      userId: session?.user?.id || 'guest',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date()
    },
    {
      id: 3,
      title: "Python Programming Excellence",
      author: "Emily Chen",
      type: "book",
      category: "Technical",
      subject: "Programming",
      coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=150&h=200&fit=crop",
      dateAdded: "2024-01-13",
      progress: 100,
      rating: 4.7,
      pages: 380,
      tags: ["Python", "Programming", "Advanced"],
      notes: 15,
      bookmarks: 20,
      readTime: "8h 45m",
      userId: session?.user?.id || 'guest',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date()
    },
    {
      id: 4,
      title: "Database Design Patterns",
      author: "Prof. Mike Chen",
      type: "video",
      category: "Technical",
      subject: "Backend",
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=200&fit=crop",
      dateAdded: "2024-01-12",
      progress: 78,
      rating: 4.6,
      duration: "2h 15m",
      views: "67K",
      tags: ["Database", "SQL", "Architecture"],
      notes: 6,
      bookmarks: 9,
      userId: session?.user?.id || 'guest',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date()
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      author: "Sarah Wilson",
      type: "book",
      category: "Design",
      subject: "Design",
      coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=200&fit=crop",
      dateAdded: "2024-01-11",
      progress: 25,
      rating: 4.8,
      pages: 320,
      tags: ["UI/UX", "Design", "User Experience"],
      notes: 4,
      bookmarks: 7,
      readTime: "2h 10m",
      userId: session?.user?.id || 'guest',
      createdAt: new Date('2024-01-11'),
      updatedAt: new Date()
    },
    {
      id: 6,
      title: "Cloud Computing Essentials",
      author: "David Kumar",
      type: "video",
      category: "Technical",
      subject: "Cloud",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&h=200&fit=crop",
      dateAdded: "2024-01-10",
      progress: 90,
      rating: 4.5,
      duration: "3h 20m",
      views: "124K",
      tags: ["AWS", "Cloud", "DevOps"],
      notes: 12,
      bookmarks: 15,
      userId: session?.user?.id || 'guest',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date()
    }
  ]);

  // Database helper functions - TODO: Implement actual API calls
  const updateItemProgress = async (itemId, progress) => {
    // TODO: API call to update progress
    // await fetch('/api/bookshelf/progress', { method: 'PUT', body: { itemId, progress }});
    setSavedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, progress, updatedAt: new Date() }
          : item
      )
    );
  };

  const toggleItemBookmark = async (itemId) => {
    // TODO: API call to toggle bookmark
    // await fetch('/api/bookshelf/bookmark', { method: 'POST', body: { itemId }});
    console.log(`Bookmark toggled for item ${itemId}`);
  };

  const addItemToShelf = async (item) => {
    // TODO: API call to add item
    // await fetch('/api/bookshelf/items', { method: 'POST', body: item });
    const newItem = {
      ...item,
      id: Date.now(), // Replace with actual ID from database
      userId: session?.user?.id || 'guest',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setSavedItems(prev => [...prev, newItem]);
  };

  // Filter and sort items
  const filteredItems = savedItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case 'progress':
        return b.progress - a.progress;
      case 'rating':
        return b.rating - a.rating;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Progress Info Board Component
  const ProgressInfoBoard = () => (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-8 text-white relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-amber-600/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Your Learning Journey</h2>
              <p className="text-orange-100 text-lg">Keep up the amazing progress!</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-6 h-6" />
                <span className="text-xl font-semibold">{userProgress.totalStats.achievements} Achievements</span>
              </div>
              <div className="text-orange-200 text-lg">{userProgress.weeklyGoal.streak} day streak 🔥</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Currently Reading */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 border border-white/20">
              <div className="flex items-center gap-4">
                <img 
                  src={userProgress.currentlyReading.coverImage}
                  alt={userProgress.currentlyReading.title}
                  className="w-12 h-16 object-cover rounded-lg shadow-lg"
                />
                <div className="flex-1">
                  <div className="text-sm opacity-90 mb-1">Currently Reading</div>
                  <div className="font-semibold text-sm line-clamp-2">{userProgress.currentlyReading.title}</div>
                  <div className="text-xs opacity-80 mt-1">{userProgress.currentlyReading.progress}% complete</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-1000"
                      style={{ width: `${userProgress.currentlyReading.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Watched */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={userProgress.lastWatched.thumbnail}
                    alt={userProgress.lastWatched.title}
                    className="w-12 h-16 object-cover rounded-lg shadow-lg"
                  />
                  <Play className="absolute inset-0 m-auto w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm opacity-90 mb-1">Last Watched</div>
                  <div className="font-semibold text-sm line-clamp-2">{userProgress.lastWatched.title}</div>
                  <div className="text-xs opacity-80 mt-1">{userProgress.lastWatched.progress}% complete</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-1000"
                      style={{ width: `${userProgress.lastWatched.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 border border-white/20">
              <div className="text-center">
                <Target className="w-8 h-8 mx-auto mb-3" />
                <div className="text-sm opacity-90 mb-1">Weekly Goal</div>
                <div className="text-2xl font-bold">{userProgress.weeklyGoal.completed}/{userProgress.weeklyGoal.target}</div>
                <div className="text-xs opacity-80">Books & Videos</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-1000"
                    style={{ width: `${(userProgress.weeklyGoal.completed / userProgress.weeklyGoal.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Total Hours */}
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 border border-white/20">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <div className="text-sm opacity-90 mb-1">Total Hours</div>
                <div className="text-2xl font-bold">{userProgress.totalStats.hoursSpent}h</div>
                <div className="text-xs opacity-80">Learning Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Book Item Component for Shelf View
  const ShelfItem = ({ item, index }) => {
    const isBook = item.type === 'book';
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-110 hover:z-10`}
        style={{ 
          transform: `translateY(${Math.sin(index * 0.5) * 5}px) rotateZ(${(index % 2 === 0 ? 1 : -1) * 2}deg)`,
          animationDelay: `${index * 0.1}s`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Book/Video Cover */}
        <div className={`relative ${isBook ? 'w-20 h-32' : 'w-20 h-32'} overflow-hidden rounded-lg shadow-lg`}>
          <img 
            src={isBook ? item.coverImage : item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Progress Bar */}
          {item.progress > 0 && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
              <div 
                className="h-full bg-orange-500 transition-all duration-1000"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          )}
          
          {/* Type Icon */}
          <div className="absolute top-2 right-2 bg-black/60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isBook ? <BookOpen className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
          </div>
          
          {/* Reading Status */}
          {item.isCurrentlyReading && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
              Reading Now
            </div>
          )}
        </div>
        
        {/* Hover Details */}
        <div className="absolute bottom-full left-0 w-80 bg-white rounded-2xl shadow-2xl p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto z-20">
          <div className="flex items-start gap-4">
            <img 
              src={isBook ? item.coverImage : item.thumbnail}
              alt={item.title}
              className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{item.title}</h4>
              <p className="text-gray-600 text-xs mb-2">by {item.author}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-3 h-3 text-orange-400 fill-current" />
                <span className="text-xs font-medium">{item.rating}</span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-xs text-gray-600">{isBook ? `${item.pages}p` : item.duration}</span>
              </div>
              
              {item.progress > 0 && (
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{item.progress}% complete</span>
                    <span className="text-gray-500">{isBook ? item.readTime : item.duration}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-orange-500 rounded-full h-1.5 transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-1 flex-wrap">
                {item.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <button 
              onClick={() => updateItemProgress(item.id, Math.min(item.progress + 10, 100))}
              className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-xl text-xs font-medium hover:bg-orange-600 transition-colors"
            >
              {isBook ? 'Continue Reading' : 'Continue Watching'}
            </button>
            <button 
              onClick={() => toggleItemBookmark(item.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
              <Share className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Book Title on Spine */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xs font-medium transform -rotate-90 whitespace-nowrap">
            {item.title.slice(0, 20)}...
          </span>
        </div>
      </div>
    );
  };

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedItems.map((item, index) => (
        <div key={item.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
          <div className="relative overflow-hidden">
            <img 
              src={item.type === 'book' ? item.coverImage : item.thumbnail} 
              alt={item.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Type Badge */}
            <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              {item.type === 'video' ? <Play className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
              <span className="capitalize">{item.type}</span>
            </div>
            
            {/* Progress Badge */}
            {item.progress > 0 && (
              <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {item.progress}%
              </div>
            )}
            
            {/* Currently Reading Badge */}
            {item.isCurrentlyReading && (
              <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                Reading Now
              </div>
            )}
          </div>
          
          <div className="p-5 space-y-3">
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">by {item.author}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-orange-400 fill-current" />
                <span className="font-medium text-gray-700">{item.rating}</span>
              </div>
              <span className="text-gray-500">
                {item.type === 'video' ? item.duration : `${item.pages}p`}
              </span>
            </div>
            
            {/* Progress Bar */}
            {item.progress > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{item.progress}% complete</span>
                  <span>{item.type === 'book' ? item.readTime : item.duration}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 rounded-full h-2 transition-all duration-1000"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Tags */}
            <div className="flex items-center gap-1 flex-wrap">
              {item.tags.slice(0, 2).map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-2 pt-3">
              <button 
                onClick={() => updateItemProgress(item.id, Math.min(item.progress + 10, 100))}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-xl text-sm font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105"
              >
                {item.type === 'video' ? 'Continue Watching' : 'Continue Reading'}
              </button>
              <button 
                onClick={() => toggleItemBookmark(item.id)}
                className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-500"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-500">
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Shelf View Component
  const ShelfView = () => (
    <div className="space-y-12">
      {/* Bookshelf Shelves */}
      {[0, 1, 2].map(shelfIndex => (
        <div key={shelfIndex} className="relative">
          {/* Shelf */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg shadow-lg"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg"></div>
          
          {/* Books on shelf */}
          <div className="flex items-end justify-start gap-2 pb-4 px-4 min-h-[200px]">
            {sortedItems.slice(shelfIndex * 6, (shelfIndex + 1) * 6).map((item, index) => (
              <div key={item.id} className="book-spine-container">
                <ShelfItem item={item} index={shelfIndex * 6 + index} />
              </div>
            ))}
            
            {/* Empty slots */}
            {sortedItems.slice(shelfIndex * 6, (shelfIndex + 1) * 6).length < 6 && 
              Array.from({ length: 6 - sortedItems.slice(shelfIndex * 6, (shelfIndex + 1) * 6).length }).map((_, emptyIndex) => (
                <div key={`empty-${emptyIndex}`} className="w-20 h-32 bg-gradient-to-b from-orange-100 to-orange-200 rounded-lg border-2 border-dashed border-orange-300 flex items-center justify-center opacity-50 hover:opacity-80 transition-opacity cursor-pointer">
                  <Plus className="w-6 h-6 text-orange-400" />
                </div>
              ))
            }
          </div>
        </div>
      ))}
    </div>
  );

  // Stats Section
  const StatsSection = () => (
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Quick Stats</h3>
        <BarChart3 className="w-5 h-5 text-orange-500" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
          <div className="text-2xl font-bold text-orange-600 mb-1">{userProgress.totalStats.booksRead}</div>
          <div className="text-sm text-gray-600">Books Read</div>
        </div>
        <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
          <div className="text-2xl font-bold text-amber-600 mb-1">{userProgress.totalStats.videosWatched}</div>
          <div className="text-sm text-gray-600">Videos Watched</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
          <div className="text-2xl font-bold text-orange-600 mb-1">{userProgress.totalStats.hoursSpent}h</div>
          <div className="text-sm text-gray-600">Hours Spent</div>
        </div>
        <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
          <div className="text-2xl font-bold text-amber-600 mb-1">{userProgress.weeklyGoal.streak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
      </div>
    </div>
  );

  // Filters Component
  const FiltersComponent = () => (
    <div className={`bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100 transition-all duration-300 ${showFilters ? 'block' : 'hidden md:block'}`}>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-sm"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
          </select>
          
          {/* Sort By */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-sm"
          >
            <option value="recent">Recently Added</option>
            <option value="progress">Progress</option>
            <option value="rating">Rating</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Showing {sortedItems.length} of {savedItems.length} items</span>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-orange-600 font-medium">Loading your bookshelf...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      {/* Enhanced Navigation Header - Orange Theme */}
      <header className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 shadow-xl sticky top-0 z-40">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 via-amber-500/90 to-orange-600/90 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              
              {/* Left side - Logo and breadcrumbs */}
              <div className="flex items-center space-x-4">
                {/* Logo */}
                <div 
                  onClick={handleBreadcrumbHome}
                  className="cursor-pointer flex items-center space-x-3 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <span className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        B
                      </span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      BookStash
                    </span>
                    <div className="text-xs text-orange-100 font-medium">
                      My Library
                    </div>
                  </div>
                </div>

                {/* Breadcrumb Navigation */}
                <nav className="hidden md:flex items-center space-x-2 ml-6">
                  <button
                    onClick={handleBreadcrumbHome}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <Home className="w-4 h-4" />
                    <span className="text-sm font-medium">Home</span>
                  </button>
                  
                  <ChevronRight className="w-4 h-4 text-orange-200" />
                  
                  <span className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/20 text-white">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm font-medium">My Bookshelf</span>
                  </span>
                </nav>
              </div>

              {/* Right side - Search and actions */}
              <div className="flex items-center space-x-3">
                {/* Search - Desktop */}
                <div className="hidden md:flex relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search your library..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/60 backdrop-blur-sm text-sm w-64"
                  />
                </div>

                {/* Search icon for mobile */}
                <button className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
                  <Search className="w-5 h-5" />
                </button>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-white/20 rounded-xl p-1 border border-white/30">
                  <button 
                    onClick={() => setViewMode('shelf')}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'shelf' ? 'bg-white shadow-sm text-orange-600' : 'text-white/80 hover:text-white'}`}
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm text-orange-600' : 'text-white/80 hover:text-white'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>

                {/* Back button */}
                <button 
                  onClick={handleBackToHome}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/20"
                >
                  <ArrowLeft className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline text-white font-medium">Back</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/60 backdrop-blur-sm text-sm"
              />
            </div>
          </div>

          {/* Mobile breadcrumb */}
          <div className="md:hidden px-4 pb-4">
            <nav className="flex items-center space-x-2">
              <button
                onClick={handleBreadcrumbHome}
                className="flex items-center space-x-1 text-orange-100 hover:text-white text-sm"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3 h-3 text-orange-200" />
              <span className="text-white text-sm font-medium">My Bookshelf</span>
            </nav>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Info Board */}
        <ProgressInfoBoard />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Filters */}
        <FiltersComponent />
        
        {/* Content based on view mode */}
        <div className="min-h-screen">
          {viewMode === 'grid' ? <GridView /> : <ShelfView />}
          
          {/* Empty State */}
          {sortedItems.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-orange-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter settings</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .book-spine-container {
          transition: transform 0.3s ease;
        }
        
        .book-spine-container:hover {
          transform: translateY(-10px) scale(1.05);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ModernBookshelf;
