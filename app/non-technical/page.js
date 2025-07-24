'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Briefcase,
  Globe,
  Users,
  Target,
  DollarSign,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '../../context/CartContext';

function Breadcrumbs() {
  const pathname = usePathname() || '/';
  const pathParts = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-700 max-w-7xl mx-auto px-4">
      <ol className="flex flex-wrap gap-1">
        <li>
          <Link href="/" className="hover:underline text-gray-900">Home</Link>
          <span className="mx-1 select-none">/</span>
        </li>
        {pathParts.map((part, idx) => {
          const isLast = idx === pathParts.length - 1;
          const text = part.charAt(0).toUpperCase() + part.slice(1);
          const href = '/' + pathParts.slice(0, idx + 1).join('/');

          return (
            <li key={href} aria-current={isLast ? 'page' : undefined}>
              {isLast ? (
                <span className="font-semibold text-gray-900">{text}</span>
              ) : (
                <>
                  <Link href={href} className="hover:underline text-gray-800">{text}</Link>
                  <span className="mx-1 select-none">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const BusinessIcons = () => {
  const icons = [
    { icon: TrendingUp, name: 'Growth', delay: 0 },
    { icon: DollarSign, name: 'Finance', delay: 0.5 },
    { icon: Users, name: 'Team', delay: 1 },
    { icon: Target, name: 'Strategy', delay: 1.5 },
    { icon: Briefcase, name: 'Business', delay: 2 },
    { icon: Globe, name: 'Global', delay: 2.5 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ icon: Icon, name, delay }, index) => (
        <div
          key={name}
          className="absolute animate-pulse text-gray-700"
          style={{
            left: `${10 + index * 15}%`,
            top: `${25 + (index % 2) * 20}%`,
            animationDelay: `${delay}s`,
            animationDuration: '4s',
          }}
        >
          <Icon className="w-8 h-8" />
        </div>
      ))}
    </div>
  );
};

const BookCard = ({ book }) => {
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.some(item => item.id === book.id);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-l-4 border-gray-800 flex flex-col">
      {book.image ? (
        <img src={book.image} alt={book.title} className="w-full h-48 object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
        <p className="text-gray-700 mb-4 flex-grow line-clamp-3 cursor-help" title={book.description}>
          {book.description}
        </p>
        <div className="flex gap-2 mt-auto">
          <button
            disabled={inCart}
            onClick={() => addToCart(book)}
            className={`flex-1 py-3 rounded-xl font-semibold text-white transition ${
              inCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-black'
            }`}
          >
            {inCart ? 'In Cart' : book.type === 'course' ? 'Start Course' : 'Add to Cart'}
          </button>
          <a
            href={book.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-gray-800 text-white rounded-xl hover:bg-black font-semibold"
          >
            {book.type === 'course' ? 'Start Now' : 'Read Book'}
          </a>
        </div>
      </div>
    </div>
  );
};

const FloatingCartButton = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-6 right-6 z-50 bg-gray-900 rounded-full flex items-center gap-2 px-4 py-3 hover:bg-black shadow-lg text-white"
    >
      <ShoppingCart className="w-6 h-6" />
      <span>{cartItems.length}</span>
    </Link>
  );
};


export default function NonTechnicalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();
  const user = session?.user;

  const categories = ['All', 'Business', 'Finance', 'Marketing', 'Leadership', 'Economics'];

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch('/Data_base/General_books.json');
        if (!res.ok) throw new Error(`Failed to fetch books: ${res.status}`);
        const rawBooks = await res.json();
        const normalized = rawBooks.map(book => ({
          id: book.id || book.ID || Math.random().toString(36).substr(2, 9),
          title: book.Title || book.title || '',
          author: book.Authors || book.author || '',
          description: book.description || '',
          category: book.category || book.categories || '',
          language: book.language || '',
          image: book.image || '',
          link: book.infoLink || book.link || '',
          publisher: book.publisher || '',
          publishingDate: book.publishedDate || '',
          pageCount: book.pageCount || 0,
          isbn: book.isbn_13 ? String(book.isbn_13) : (book.isbn || ''),
          type: book.type || 'book',
        }));
        setBooks(normalized);
      } catch (err) {
        setError('Could not load books data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (book.category && book.category.toLowerCase() === selectedCategory.toLowerCase());
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      String(book.title || '').toLowerCase().includes(searchLower) ||
      String(book.author || '').toLowerCase().includes(searchLower) ||
      String(book.description || '').toLowerCase().includes(searchLower) ||
      String(book.category || '').toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  const onCategoryClick = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      <BusinessIcons />
      <Breadcrumbs />
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
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
          <div>
            {status === 'loading' && (
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
            )}
            {status === 'authenticated' && user && (
              <div title={user.name}>
                <img
                  src={user.image || '/default-profile.png'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  onClick={() => signOut()}
                  title="Click to sign out"
                />
              </div>
            )}
          </div>
        </div>
      </header>
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-8">
            Build Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black">
              Business
            </span>{' '}
            Empire
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
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryClick(category)}
                className={`px-6 py-3 rounded-xl whitespace-nowrap font-medium transition-all ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-gray-800 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-50'
                }`}
                aria-pressed={selectedCategory === category.toLowerCase()}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Business Content</h2>
            <p className="text-xl text-gray-600">
              Hand-picked courses and resources for business professionals
            </p>
          </div>
          {loading ? (
            <p className="text-center text-gray-700">Loading content...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : filteredBooks.length === 0 ? (
            <p className="text-center text-gray-600">No content matches your filters.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>
      <FloatingCartButton />
    </div>
  );
}
