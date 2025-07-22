'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Search, Play, Star, Clock, User, Filter, Eye, Heart, Bookmark, ChevronLeft, ChevronRight, Volume2, Maximize2, ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LiveVideoPage = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const carouselRef = useRef(null);
  const videoRef = useRef(null);

  // Mock live video data for carousel
  const liveVideos = [
    {
      id: 1,
      title: "Advanced Machine Learning with Neural Networks",
      instructor: "Dr. Sarah Johnson",
      viewers: "2.4K",
      duration: "45:32",
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
      category: "AI/ML"
    },
    {
      id: 2,
      title: "React Native Mobile Development Masterclass",
      instructor: "John Miller",
      viewers: "1.8K",
      duration: "52:18",
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
      category: "Mobile Dev"
    },
    {
      id: 3,
      title: "Advanced Mathematics: Calculus and Beyond",
      instructor: "Prof. Emily Chen",
      viewers: "3.1K",
      duration: "38:45",
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=225&fit=crop",
      category: "Mathematics"
    },
    {
      id: 4,
      title: "Quantum Physics: Understanding the Universe",
      instructor: "Dr. Michael Brown",
      viewers: "1.5K",
      duration: "61:22",
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=225&fit=crop",
      category: "Physics"
    },
    {
      id: 5,
      title: "Organic Chemistry Lab Techniques",
      instructor: "Dr. Lisa Wang",
      viewers: "987",
      duration: "29:56",
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=225&fit=crop",
      category: "Chemistry"
    },
    {
      id: 6,
      title: "Full Stack Web Development Bootcamp",
      instructor: "Alex Rodriguez",
      viewers: "4.2K",
      duration: "75:13",
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      category: "Web Dev"
    }
  ];

  // Regular video content
  const regularVideos = [
    {
      id: 7,
      title: "Introduction to Data Science with Python",
      instructor: "Maria Garcia",
      views: "156K",
      duration: "42:18",
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=180&fit=crop",
      category: "Data Science",
      uploadedAgo: "2 days ago"
    },
    {
      id: 8,
      title: "Advanced JavaScript Concepts",
      instructor: "David Kim",
      views: "89K",
      duration: "35:45",
      rating: 4.9,
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=180&fit=crop",
      category: "JavaScript",
      uploadedAgo: "1 week ago"
    },
    {
      id: 9,
      title: "Biology: Cell Structure and Function",
      instructor: "Dr. Rachel Adams",
      views: "234K",
      duration: "28:32",
      rating: 4.7,
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=180&fit=crop",
      category: "Biology",
      uploadedAgo: "3 days ago"
    },
    {
      id: 10,
      title: "Digital Marketing Strategy 2024",
      instructor: "Tom Wilson",
      views: "67K",
      duration: "55:21",
      rating: 4.6,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=180&fit=crop",
      category: "Marketing",
      uploadedAgo: "5 days ago"
    }
  ];

  // Filter tags
  const filterTags = [
    "All", "AI/ML", "Web Dev", "Mobile Dev", "Data Science", "Mathematics", 
    "Physics", "Chemistry", "Biology", "JavaScript", "Python", "Marketing",
    "Design", "Business", "Finance", "Engineering"
  ];

  // Handle scroll effect for gradient
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize filtered videos
  useEffect(() => {
    setFilteredVideos(regularVideos);
  }, []);

  // Handle tag filtering
  const handleTagClick = (tag) => {
    let newTags;
    if (tag === "All") {
      newTags = [];
    } else {
      newTags = selectedTags.includes(tag) 
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag];
    }
    setSelectedTags(newTags);
    
    // Filter videos based on selected tags
    const filtered = newTags.length === 0 
      ? regularVideos
      : regularVideos.filter(video => 
          newTags.some(tag => video.category.toLowerCase().includes(tag.toLowerCase()))
        );
    setFilteredVideos(filtered);
  };

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredVideos(regularVideos);
      return;
    }
    
    const searchResults = regularVideos.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVideos(searchResults);
  };

  // Carousel navigation
  const nextSlide = () => {
    setActiveCarouselIndex((prev) => (prev + 1) % liveVideos.length);
  };

  const prevSlide = () => {
    setActiveCarouselIndex((prev) => (prev - 1 + liveVideos.length) % liveVideos.length);
  };

  // Calculate gradient intensity based on scroll
  const gradientIntensity = Math.min(scrollY / 500, 1);

  // Handle back to home
  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-orange-100 relative overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% ${50 + scrollY * 0.1}%, 
            rgba(255, 165, 0, ${0.3 + gradientIntensity * 0.4}) 0%, 
            rgba(255, 140, 0, ${0.2 + gradientIntensity * 0.3}) 25%, 
            rgba(255, 215, 0, ${0.1 + gradientIntensity * 0.2}) 50%, 
            transparent 75%)`
        }}
      />

     {/* Enhanced Header with Navigation */}
<header className="relative z-20 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 shadow-xl">
  {/* Orange gradient bar with glass effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 via-orange-400/90 to-amber-500/90 backdrop-blur-sm"></div>
  
  <div className="relative z-10">
    {/* Top navigation bar */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 md:h-20">
        
        {/* Left side - Logo and breadcrumbs */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div 
            onClick={handleBackToHome}
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
                Live Learning
              </div>
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <nav className="hidden md:flex items-center space-x-2 ml-6">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </button>
            
            <ChevronRight className="w-4 h-4 text-orange-200" />
            
            <span className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/20 text-white">
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium">Live Videos</span>
            </span>
          </nav>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center space-x-3">
          {/* Search icon for mobile */}
          <button className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
            <Search className="w-5 h-5" />
          </button>

          {/* Live indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-red-500/20 rounded-full border border-red-400/30">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-white">LIVE</span>
          </div>

          {/* Back button - mobile friendly */}
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

    {/* Mobile breadcrumb */}
    <div className="md:hidden px-4 pb-4">
      <nav className="flex items-center space-x-2">
        <button
          onClick={handleBackToHome}
          className="flex items-center space-x-1 text-orange-100 hover:text-white text-sm"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3 h-3 text-orange-200" />
        <span className="text-white text-sm font-medium">Live Videos</span>
      </nav>
    </div>
  </div>

  {/* Decorative bottom border */}
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
</header>


      {/* Page Title */}
      <div className="relative z-10 text-center py-12">
        <h1 className="text-6xl font-bold mb-4" style={{
          
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'opaque',
          filter: `drop-shadow(0 4px 8px rgba(255, 165, 0, ${0.3 + gradientIntensity * 0.5}))`
        }}>
          Live Learning Experience
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Join interactive live sessions with expert instructors from around the world
        </p>
      </div>

      {/* Cylindrical Video Carousel */}
      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            🔴 Currently Live
          </h2>
          
          <div className="relative" ref={carouselRef}>
            {/* Main carousel container */}
            <div className="perspective-1000 relative h-96">
              <div className="relative w-full h-full preserve-3d">
                {liveVideos.map((video, index) => {
                  const angle = ((index - activeCarouselIndex) * 60) * (Math.PI / 180);
                  const radius = 280;
                  const x = Math.sin(angle) * radius;
                  const z = Math.cos(angle) * radius;
                  const rotateY = -angle * (180 / Math.PI);
                  
                  return (
                    <div
                      key={video.id}
                      className="absolute top-1/2 left-1/2 w-80 h-48 cursor-pointer transition-all duration-700 ease-out"
                      style={{
                        transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`,
                        opacity: Math.abs(index - activeCarouselIndex) <= 2 ? 1 : 0.3,
                        zIndex: z > 0 ? 10 : 5
                      }}
                      onClick={() => setActiveCarouselIndex(index)}
                    >
                      <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-orange-300/50 transition-all duration-300">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Live indicator */}
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                          🔴 LIVE
                        </div>
                        
                        {/* Viewers count */}
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                          <Eye className="w-3 h-3 inline mr-1" />
                          {video.viewers}
                        </div>
                        
                        {/* Video info overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-white font-semibold text-sm line-clamp-2">{video.title}</h3>
                          <p className="text-white/80 text-xs mt-1">{video.instructor}</p>
                        </div>
                        
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                          <div className="bg-orange-500 rounded-full p-4 shadow-lg">
                            <Play className="w-8 h-8 text-white fill-current" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Carousel navigation */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-20"
            >
              <ChevronLeft className="w-6 h-6 text-orange-600" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-20"
            >
              <ChevronRight className="w-6 h-6 text-orange-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="relative z-10 py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for courses, topics, or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-lg border-2 border-orange-200 focus:border-orange-400 focus:outline-none text-lg"
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3 justify-center">
            {filterTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-lg ${
                  selectedTags.includes(tag) || (tag === "All" && selectedTags.length === 0)
                    ? 'bg-orange-500 text-white shadow-orange-300/50'
                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Regular Videos Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Recent Uploads
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map(video => (
              <div key={video.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Rating badge */}
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {video.rating}
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded-lg text-xs">
                    {video.duration}
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <div className="bg-orange-500 rounded-full p-3 shadow-lg">
                      <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{video.instructor}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views} views</span>
                    </div>
                    <span>{video.uploadedAgo}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button className="flex-1 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition-colors text-sm font-medium">
                      Watch Now
                    </button>
                    <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                      <Bookmark className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveVideoPage;
