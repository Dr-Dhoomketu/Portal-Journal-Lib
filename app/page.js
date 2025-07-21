'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Play, Filter, Star, Clock, User, Menu, X, Volume2, Maximize, Sparkles, Award, TrendingUp, Bell, ChevronRight, GraduationCap, Microscope, Code, Palette, ChevronDown, Settings, LogOut, Home, Eye, Heart, Bookmark, Calendar, BarChart3, Globe, Edit3, Copy, Check, RefreshCw, Plus, ArrowRight, Timer, Cpu, Database, Smartphone, Cloud, Shield, Brain, Monitor, Server, DollarSign, Users, Target, Briefcase, PieChart, Activity, UserCheck, Pill, Stethoscope, Download, Share, MessageCircle, ThumbsUp, Zap, BookmarkPlus, ExternalLink, Info } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const BookStashHomepage = () => {
  // All state variables
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [isNewUser, setIsNewUser] = useState(true);
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [newsExpanded, setNewsExpanded] = useState(false);
  const [likedBooks, setLikedBooks] = useState(new Set());
  const [savedBooks, setSavedBooks] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isReading, setIsReading] = useState(false);
  
  // Search functionality state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  
  // NextAuth session hook and router
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Refs
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // Enhanced subject lists by category
  const subjectsByCategory = {
    technical: [
      'Computer Science', 'Software Engineering', 'Data Science', 'Artificial Intelligence',
      'Machine Learning', 'Web Development', 'Mobile Development', 'DevOps',
      'Cybersecurity', 'Cloud Computing', 'Database Management', 'UI/UX Design',
      'Game Development', 'Blockchain', 'IoT', 'Robotics', 'Python Programming',
      'JavaScript', 'React', 'Node.js', 'Angular', 'Vue.js', 'Docker', 'Kubernetes'
    ],
    'non-technical': [
      'Business Management', 'Marketing', 'Finance', 'Economics', 'Human Resources',
      'Psychology', 'Sociology', 'Philosophy', 'History', 'Literature',
      'Communications', 'Project Management', 'Leadership', 'Entrepreneurship',
      'Public Speaking', 'Creative Writing', 'Sales', 'Customer Service', 'Operations'
    ],
    medical: [
      'General Medicine', 'Surgery', 'Pediatrics', 'Cardiology', 'Neurology',
      'Psychiatry', 'Dermatology', 'Orthopedics', 'Radiology', 'Pathology',
      'Pharmacology', 'Anatomy', 'Physiology', 'Microbiology', 'Biochemistry',
      'Public Health', 'Nursing', 'Dentistry', 'Emergency Medicine', 'Anesthesiology'
    ],
    'arts-humanities': [
      'Fine Arts', 'Music', 'Theater', 'Film Studies', 'Art History',
      'Cultural Studies', 'Anthropology', 'Archaeology', 'Languages',
      'Translation Studies', 'Creative Arts', 'Photography', 'Design',
      'Architecture', 'Fashion Design', 'Journalism', 'Creative Writing'
    ]
  };

  // Mock news data
  const newsData = [
    {
      id: 1,
      title: "Revolutionary AI Course: 'Deep Learning with PyTorch' - Now Available",
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
    }
  ];

  // User dashboard data
  const userData = {
    booksRead: 34,
    videosWatched: 89,
    coursesCompleted: 12,
    hoursLearned: 156.5,
    achievements: 8,
    streak: 15,
    savedBooks: 127,
    interests: ['AI/ML', 'Web Development', 'Data Science', 'Python'],
    level: 'Advanced Learner',
    rankPosition: 342
  };

  // Enhanced Featured videos data
  const featuredVideos = [
    {
      id: 1,
      title: "Machine Learning Fundamentals: From Theory to Practice",
      author: "Dr. Sarah Johnson",
      duration: "45 min",
      views: "125K",
      category: "AI/ML",
      level: "Beginner",
      rating: 4.8,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
      description: "Learn the fundamentals of machine learning with practical examples"
    },
    {
      id: 2,
      title: "React Development Masterclass: Building Modern Applications",
      author: "John Smith",
      duration: "60 min",
      views: "89K",
      category: "Web Dev",
      level: "Intermediate",
      rating: 4.9,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
      description: "Master React development with hooks, context, and best practices"
    },
    {
      id: 3,
      title: "Database Design Patterns: Scalable Architecture",
      author: "Prof. Mike Chen",
      duration: "38 min",
      views: "67K",
      category: "Backend",
      level: "Advanced",
      rating: 4.7,
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=225&fit=crop",
      description: "Learn advanced database design patterns and optimization"
    }
  ];

  // Enhanced Sample books data
  const sampleBooks = [
    {
      id: 1,
      title: "Machine Learning Fundamentals: Theory to Practice",
      author: "Dr. Sarah Johnson",
      publishingHouse: "Tech Publications",
      publishedDate: "2024",
      relevanceScore: 95,
      type: "book",
      size: "big",
      category: "Technical",
      subject: "AI/ML",
      coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=150&h=200&fit=crop",
      summary: "Essential ML algorithms and concepts with practical implementations",
      rating: 4.8,
      pages: 420,
      price: "$49.99",
      level: "Intermediate",
      language: "English"
    },
    {
      id: 2,
      title: "React Mastery: Modern Web Development",
      author: "John Smith",
      publishingHouse: "Developer Press",
      publishedDate: "2024",
      relevanceScore: 92,
      type: "book",
      size: "big",
      category: "Technical",
      subject: "Web Dev",
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&h=200&fit=crop",
      summary: "Complete React development guide with hooks and modern patterns",
      rating: 4.9,
      pages: 580,
      price: "$59.99",
      level: "Advanced",
      language: "English"
    },
    {
      id: 3,
      title: "Python Programming Excellence",
      author: "Emily Chen",
      publishingHouse: "Code Academy Press",
      publishedDate: "2024",
      relevanceScore: 89,
      type: "book",
      size: "medium",
      category: "Technical",
      subject: "Programming",
      coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=150&h=200&fit=crop",
      summary: "Advanced Python techniques for professional developers",
      rating: 4.7,
      pages: 380,
      price: "$39.99",
      level: "Intermediate",
      language: "English"
    }
  ];

  // Handle book like/unlike
  const toggleBookLike = (bookId) => {
    setLikedBooks(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(bookId)) {
        newLiked.delete(bookId);
      } else {
        newLiked.add(bookId);
      }
      return newLiked;
    });
  };

  // Handle book save/unsave
  const toggleBookSave = (bookId) => {
    setSavedBooks(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(bookId)) {
        newSaved.delete(bookId);
      } else {
        newSaved.add(bookId);
      }
      return newSaved;
    });
  };

  // Start reading session with timer
  const startReadingSession = (bookId) => {
    if (!session) {
      setTimeRemaining(60);
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setShowLoginPrompt(true);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    setIsReading(true);
  };

  // Enhanced Search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const searchTerm = searchQuery.toLowerCase();
      
      const filteredBooks = sampleBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.subject.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm) ||
        book.summary.toLowerCase().includes(searchTerm)
      );

      const filteredVideos = featuredVideos.filter(video => 
        video.title.toLowerCase().includes(searchTerm) ||
        video.author.toLowerCase().includes(searchTerm) ||
        video.category.toLowerCase().includes(searchTerm) ||
        video.description.toLowerCase().includes(searchTerm)
      );

      setSearchResults({
        books: filteredBooks,
        videos: filteredVideos,
        total: filteredBooks.length + filteredVideos.length,
        query: searchQuery
      });

    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // FIXED: Modal initialization to prevent blinking
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    
    if (hasInitialized) return;
    
    const hasVisited = localStorage.getItem('bookstash_visited');
    
    if (!hasVisited && !session) {
      setIsNewUser(true);
      setShowWelcomeNotification(true);
      
      const timer = setTimeout(() => {
        setShowWelcomeNotification(false);
        setShowInterestModal(true);
        setHasInitialized(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setIsNewUser(false);
      setHasInitialized(true);
    }
  }, [mounted, session, hasInitialized]);

  // Handle subject selection
  const handleSubjectToggle = (subject) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  // FIXED: Handle form submission without blinking
  const handleGetStarted = () => {
    if (isSubmitting) return;
    if (!selectedEducation || !selectedInterest || selectedSubjects.length === 0) return;
    
    setIsSubmitting(true);

    try {
      localStorage.setItem('bookstash_visited', 'true');
      localStorage.setItem('bookstash_preferences', JSON.stringify({
        education: selectedEducation,
        interest: selectedInterest,
        subjects: selectedSubjects,
        completedAt: new Date().toISOString()
      }));
      
      setShowInterestModal(false);
      setIsNewUser(false);
      
      const routeMap = {
        'technical': '/technical',
        'non-technical': '/non-technical',
        'medical': '/medical',
        'arts-humanities': '/non-technical'
      };
      
      const targetRoute = routeMap[selectedInterest] || '/';
      
      setTimeout(() => {
        router.push(targetRoute);
      }, 300);
      
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };

  // Enhanced 3D Carousel
  useEffect(() => {
    if (!mounted || !mountRef.current) return;

    const initThreeJS = async () => {
      try {
        const THREE = await import('three');
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / 400, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        });
        
        renderer.setSize(mountRef.current.clientWidth, 400);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);

        // Create 3D books
        const radius = 5;
        const segments = 8;
        const books = [];
        
        for (let i = 0; i < segments; i++) {
          const bookGroup = new THREE.Group();
          
          const coverGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.05);
          const coverMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff6b35,
            shininess: 100
          });
          const cover = new THREE.Mesh(coverGeometry, coverMaterial);
          bookGroup.add(cover);

          const angle = (i / segments) * Math.PI * 2;
          bookGroup.position.x = Math.cos(angle) * radius;
          bookGroup.position.z = Math.sin(angle) * radius;
          bookGroup.rotation.y = -angle + Math.PI / 2;
          
          scene.add(bookGroup);
          books.push({ group: bookGroup, angle });
        }

        camera.position.z = 12;
        camera.position.y = 3;

        let time = 0;
        const animate = () => {
          animationRef.current = requestAnimationFrame(animate);
          time += 0.01;
          
          books.forEach((bookObj, index) => {
            const book = bookObj.group;
            book.position.y = Math.sin(time * 1.5 + index * 0.8) * 0.5;
            const newAngle = bookObj.angle + time * 0.2;
            book.position.x = Math.cos(newAngle) * radius;
            book.position.z = Math.sin(newAngle) * radius;
            book.rotation.y = -newAngle + Math.PI / 2;
          });
          
          renderer.render(scene, camera);
        };
        animate();

      } catch (error) {
        console.error('Three.js error:', error);
      }
    };

    initThreeJS();
  }, [mounted]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Filter books
  const booksToShow = searchResults ? searchResults.books : sampleBooks;
  const videosToShow = searchResults ? searchResults.videos : featuredVideos;

  const filteredBooks = booksToShow.filter(book => {
    const typeMatch = selectedFilter === 'all' || book.type === selectedFilter;
    const sizeMatch = selectedSize === 'all' || book.size === selectedSize;
    return typeMatch && sizeMatch;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'relevance') return (b.relevanceScore || 0) - (a.relevanceScore || 0);
    if (sortBy === 'recent') return new Date(b.publishedDate) - new Date(a.publishedDate);
    if (sortBy === 'author') return a.author.localeCompare(b.author);
    return 0;
  });

  // Enhanced Book Card Component
  const BookCard = ({ book }) => (
    <div className="book-card group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          {book.type === 'video' || book.type === 'course' ? <Play className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
          <span>{book.type}</span>
        </div>
        
        {/* Relevance Score */}
        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          {book.relevanceScore || 90}%
        </div>
        
        {/* Level Badge */}
        {book.level && (
          <div className="absolute bottom-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {book.level}
          </div>
        )}
        
        {/* Price Tag */}
        {book.price && (
          <div className="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium">
            {book.price}
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm">by {book.author}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-orange-400 fill-current" />
            <span className="font-medium text-gray-700">{book.rating || 4.5}</span>
          </div>
          <span className="text-gray-500">
            {book.type === 'video' || book.type === 'course' ? book.duration : `${book.pages}p`}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {book.summary}
        </p>
        
        <div className="flex items-center gap-2 pt-3">
          <button 
            onClick={() => startReadingSession(book.id)}
            className="flex-1 modern-btn py-3 text-sm font-medium"
          >
            {book.type === 'video' || book.type === 'course' ? 'Watch Now' : 'Read Now'}
          </button>
          <button 
            onClick={() => toggleBookLike(book.id)}
            className={`p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors ${
              likedBooks.has(book.id) ? 'text-red-500 bg-red-50' : 'text-gray-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${likedBooks.has(book.id) ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={() => toggleBookSave(book.id)}
            className={`p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors ${
              savedBooks.has(book.id) ? 'text-blue-500 bg-blue-50' : 'text-gray-500'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${savedBooks.has(book.id) ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );

  // Video Section Component
  const VideoSection = () => (
    <div className="bg-white curved-section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-gradient">
            Live Learning Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of learners in interactive video sessions with expert instructors
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="video-frame relative">
              <video 
                ref={videoRef}
                key={activeVideoIndex}
                controls 
                autoPlay 
                muted
                className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-2xl"
                poster={videosToShow[activeVideoIndex]?.thumbnail}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-2">
                <div className="flex items-center gap-2 text-white text-sm">
                  <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span>{isPlaying ? 'LIVE' : 'PAUSED'}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 floating-card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {videosToShow[activeVideoIndex]?.title}
              </h3>
              <div className="flex items-center gap-6 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{videosToShow[activeVideoIndex]?.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{videosToShow[activeVideoIndex]?.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-orange-400 fill-current" />
                  <span>{videosToShow[activeVideoIndex]?.rating}</span>
                </div>
              </div>
              <p className="text-gray-700">{videosToShow[activeVideoIndex]?.description}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-gray-900">Trending Videos</h4>
            
            <div className="space-y-4">
              {videosToShow.map((video, index) => (
                <div 
                  key={video.id}
                  onClick={() => setActiveVideoIndex(index)}
                  className={`group cursor-pointer rounded-2xl transition-all duration-300 ${
                    index === activeVideoIndex 
                      ? 'modern-gradient text-white shadow-lg' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-20 h-14 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-sm mb-1">{video.title}</h5>
                      <p className="text-xs mb-2 opacity-80">{video.author}</p>
                      <div className="flex items-center gap-2 text-xs opacity-70">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Google Login Modal
  const GoogleLoginModal = () => (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${showGoogleLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="floating-card max-w-md w-full mx-4 p-8 animate-slide-up">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to BookStash</h2>
          <p className="text-gray-600 mb-8">Sign in to access personalized learning</p>
          
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <button
            onClick={() => setShowGoogleLogin(false)}
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 mt-4 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );

  // Reading Timer Modal
  const ReadingTimerModal = () => (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${showLoginPrompt ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="floating-card max-w-md w-full mx-4 p-8 animate-slide-up">
        <div className="text-center">
          <Timer className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Continue Reading</h2>
          <p className="text-gray-600 mb-8">Sign in to continue unlimited access</p>
          
          <button
            onClick={() => {
              signIn('google');
              setShowLoginPrompt(false);
            }}
            className="w-full modern-btn py-3 text-lg font-medium mb-4"
          >
            Sign In to Continue
          </button>
          
          <button
            onClick={() => setShowLoginPrompt(false)}
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // User Profile Component
  const UserProfile = () => (
    <div className="relative">
      <button 
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-colors"
      >
        <img 
          src={session?.user?.image || '/default-avatar.png'} 
          alt={session?.user?.name || 'User'}
          className="w-12 h-12 rounded-full border-2 border-orange-200"
        />
        <div className="hidden lg:block text-left">
          <div className="font-medium text-gray-900 text-sm">{session?.user?.name}</div>
          <div className="text-xs text-gray-500">{session?.user?.email}</div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {showUserMenu && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="font-medium text-gray-900">{session?.user?.name}</div>
            <div className="text-sm text-gray-500">{session?.user?.email}</div>
            <div className="text-xs text-orange-600 font-medium mt-1">{userData.level}</div>
          </div>
          
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-lg font-bold text-orange-600">{userData.booksRead}</div>
                <div className="text-xs text-gray-500">Books</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">{userData.hoursLearned}h</div>
                <div className="text-xs text-gray-500">Hours</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">{userData.achievements}</div>
                <div className="text-xs text-gray-500">Badges</div>
              </div>
            </div>
          </div>
          
          <div className="py-2">
            <button
              onClick={() => {
                router.push('/dashboard');
                setShowUserMenu(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <User className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => {
                router.push('/technical');
                setShowUserMenu(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <Code className="w-4 h-4" />
              Technical Hub
            </button>
            <button
              onClick={() => {
                router.push('/non-technical');
                setShowUserMenu(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <TrendingUp className="w-4 h-4" />
              Business Hub
            </button>
            <button
              onClick={() => {
                router.push('/medical');
                setShowUserMenu(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <Microscope className="w-4 h-4" />
              Medical Hub
            </button>
            <hr className="my-2 border-gray-100" />
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Interest Modal Component
  const InterestModal = () => (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${showInterestModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="floating-card max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BookStash! 🎓</h2>
            <p className="text-gray-600">Let's personalize your learning experience</p>
          </div>
          <button 
            onClick={() => setShowInterestModal(false)} 
            className="text-gray-500 hover:text-gray-700 transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-8">
          {/* Education Level */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              What's your current education level?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: 'high-school', label: 'High School', icon: '🎓' },
                { value: 'undergraduate', label: 'Undergraduate', icon: '📚' },
                { value: 'graduate', label: 'Graduate', icon: '🎯' },
                { value: 'postgraduate', label: 'Postgraduate', icon: '🔬' }
              ].map(level => (
                <button
                  key={level.value}
                  onClick={() => setSelectedEducation(level.value)}
                  className={`p-4 rounded-2xl border-2 transition-all text-center ${
                    selectedEducation === level.value
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{level.icon}</div>
                  <div className="font-medium">{level.label}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Interest Category */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              What's your primary area of interest?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'technical', label: 'Technical & Engineering', desc: 'Computer Science, Engineering, Technology' },
                { value: 'non-technical', label: 'Business & Management', desc: 'Business, Finance, Marketing, HR' },
                { value: 'medical', label: 'Medical & Healthcare', desc: 'Medicine, Nursing, Health Sciences' },
                { value: 'arts-humanities', label: 'Arts & Humanities', desc: 'Literature, Arts, History, Culture' }
              ].map(interest => (
                <button
                  key={interest.value}
                  onClick={() => {
                    setSelectedInterest(interest.value);
                    setSelectedSubjects([]);
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedInterest === interest.value
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <div className="font-semibold text-lg mb-2">{interest.label}</div>
                  <div className="text-sm text-gray-600">{interest.desc}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Subject Selection */}
          {selectedInterest && (
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Select your subjects:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                {subjectsByCategory[selectedInterest]?.map(subject => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                      selectedSubjects.includes(subject)
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <div className="pt-6 border-t">
            <button 
              onClick={handleGetStarted}
              disabled={!selectedEducation || !selectedInterest || selectedSubjects.length === 0 || isSubmitting}
              className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all ${
                selectedEducation && selectedInterest && selectedSubjects.length > 0 && !isSubmitting
                  ? 'modern-btn'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Setting up...' : 'Start My Learning Journey'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Welcome Notification Component
  const WelcomeNotification = () => (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-500 ${showWelcomeNotification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 p-6 max-w-sm">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-8 h-8 text-orange-500" />
          <div>
            <h3 className="font-bold text-gray-900">Welcome to BookStash!</h3>
            <p className="text-sm text-gray-600">Setting up your profile...</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div className="bg-orange-500 h-1 rounded-full animate-pulse" style={{width: '60%'}}></div>
        </div>
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading BookStash...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Notification */}
      <WelcomeNotification />

      {/* Navigation */}
      <nav className="glass-card border-b-0 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 modern-gradient rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">BookStash</h1>
                <p className="text-xs text-gray-500">Smart Learning Platform</p>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 mx-8">
              <a href="#" className="nav-link">Home</a>
              <a href="#" className="nav-link">Categories</a>
              <a href="#" className="nav-link">Live Videos</a>
              <a href="#" className="nav-link">My Library</a>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search books, videos, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-20 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-500"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    isSearching || !searchQuery.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg'
                  }`}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
              
              {searchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                  Found {searchResults.total} results
                  <button 
                    onClick={() => setSearchResults(null)}
                    className="float-right text-orange-600 hover:text-orange-700"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setNewsExpanded(!newsExpanded)}
                className="relative flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-2xl transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium">Updates</span>
              </button>
              
              <button 
                onClick={() => setShowInterestModal(true)}
                className="modern-btn flex items-center gap-2 text-sm px-5 py-2.5"
              >
                <GraduationCap className="w-4 h-4" />
                Customize
              </button>
              
              {status === 'loading' ? (
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              ) : session ? (
                <UserProfile />
              ) : (
                <button 
                  onClick={() => setShowGoogleLogin(true)}
                  className="modern-btn-outline flex items-center gap-2 text-sm px-5 py-2.5"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* News Section */}
        {newsExpanded && (
          <div className="border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Latest Updates</h3>
                <button onClick={() => setNewsExpanded(false)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-3">
                {newsData.map((news) => (
                  <div key={news.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <img src={news.image} alt={news.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{news.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{news.category}</span>
                        <span>•</span>
                        <span>{news.time}</span>
                        <span>•</span>
                        <span>{news.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="hero-gradient py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl font-bold leading-tight text-gray-900">
              Learn anything,
              <span className="block text-gradient">anytime, anywhere</span>
            </h1>
            <p className="text-xl text-gray-600">
              Access thousands of books and videos with AI-powered recommendations
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowInterestModal(true)}
                className="modern-btn text-lg px-8 py-4"
              >
                Start Learning Journey
              </button>
              <button className="modern-btn-outline text-lg px-8 py-4">
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div ref={mountRef} className="w-full max-w-2xl" />
          </div>
        </div>
      </div>

      {/* Video Section */}
      <VideoSection />

      {/* Modern Filters */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="glass-card p-8 rounded-3xl">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Filter className="w-6 h-6 text-orange-600" />
              <span className="text-lg font-semibold text-gray-900">Filters</span>
            </div>
            
            <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="modern-input">
              <option value="all">All Content</option>
              <option value="book">Books Only</option>
              <option value="course">Courses Only</option>
            </select>
            
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="modern-input">
              <option value="all">All Sizes</option>
              <option value="big">Comprehensive</option>
              <option value="medium">Medium</option>
            </select>
            
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="modern-input">
              <option value="relevance">By Relevance</option>
              <option value="recent">Most Recent</option>
              <option value="author">By Author</option>
            </select>
            
            <div className="ml-auto bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
              {sortedBooks.length} results
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {searchResults ? `Search Results for "${searchResults.query}"` : 'Curated Learning Resources'}
          </h2>
          <p className="text-xl text-gray-600">
            Discover books and courses tailored to your learning goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {sortedBooks.length === 0 && searchResults && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No content found matching your search.</p>
            <button 
              onClick={() => {
                setSearchResults(null);
                setSearchQuery('');
              }}
              className="mt-4 modern-btn"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <InterestModal />
      <GoogleLoginModal />
      <ReadingTimerModal />
    </div>
  );
};

export default BookStashHomepage;
