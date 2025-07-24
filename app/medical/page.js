'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Stethoscope, Heart, Microscope, Brain, Pill, Activity, UserCheck, ShoppingCart } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '../../context/CartContext';

// Breadcrumbs component
function Breadcrumbs() {
  const pathname = usePathname() || '/';
  const pathParts = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-green-700 max-w-7xl mx-auto px-4">
      <ol className="flex flex-wrap gap-1">
        <li>
          <Link href="/" className="hover:underline text-green-900">Home</Link>
          <span className="mx-1 select-none">/</span>
        </li>
        {pathParts.map((part, idx) => {
          const isLast = idx === pathParts.length - 1;
          const text = part.charAt(0).toUpperCase() + part.slice(1);
          const href = '/' + pathParts.slice(0, idx + 1).join('/');

          return (
            <li key={href} aria-current={isLast ? 'page' : undefined}>
              {isLast ? (
                <span className="font-semibold text-green-900">{text}</span>
              ) : (
                <>
                  <Link href={href} className="hover:underline text-green-800">{text}</Link>
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

// Medical Icons as background ornaments
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

// Cart Button
const FloatingCartButton = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 z-50 hover:bg-green-700"
    >
      <ShoppingCart className="w-6 h-6" />
      <span className="font-semibold">{cartItems.length}</span>
    </Link>
  );
};

// Book Card for each book
const BookCard = ({ book }) => {
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.some(item => item.id === book.id);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-l-4 border-green-500 flex flex-col">
      {book.image ? (
        <img src={book.image} alt={book.title} className="w-full h-48 object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-48 bg-green-100 flex items-center justify-center text-green-400">
          No Image Available
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
        <p className="text-green-700 text-sm mb-3">by {book.author}</p>
        <p className="relative group text-gray-700 mb-4 flex-grow line-clamp-3 cursor-help" title={book.description}>
          {book.description}
          <span className="invisible absolute left-0 top-full mt-1 w-64 p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity z-50 whitespace-normal">
            {book.description}
          </span>
        </p>
        <div className="flex gap-2">
          <button
            disabled={inCart}
            onClick={() => addToCart(book)}
            className={`flex-1 py-3 rounded-xl font-semibold text-white transition ${
              inCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {inCart ? 'In Cart' : book.type === 'course' ? 'Start Course' : 'Add to Cart'}
          </button>
          <a
            href={book.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold hover:shadow-lg"
          >
            {book.type === 'course' ? 'Start Now' : 'Read Book'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default function MedicalPage() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', 'Cardiology', 'Neurology', 'Pathology', 'Pharmacy', 'Emergency', 'Patient Care'];

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch('/Data_base/Bio_books.json');
        if (!res.ok) throw new Error(`Failed to fetch books: ${res.status}`);

        const rawBooks = await res.json();

        const normalized = rawBooks.map(book => ({
          id: book.id || book.ID || Math.random().toString(36).substr(2, 9),
          title: book.Title || book.title || '',
          author: book.Authors || book.author || '',
          description: book.description || '',
          category: book.category || book.Categories || '',
          language: book.language || '',
          image: book.image || '',
          link: book.infoLink || book.link || '',
          publisher: book.publisher || '',
          publishingDate: book.publishedDate || '',
          pageCount: book.pageCount || 0,
          isbn: book.isbn_13 ? String(book.isbn_13) : (book.isbn || ''),
          type: book.type || 'book'
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
      (book.title && book.title.toLowerCase().includes(searchLower)) ||
      (book.author && book.author.toLowerCase().includes(searchLower)) ||
      (book.description && book.description.toLowerCase().includes(searchLower)) ||
      (book.category && book.category.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  const onCategoryClick = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 relative">
      <MedicalIcons />
      <Breadcrumbs />

      {/* Header */}
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-8">
            Advance{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
              Medical
            </span>{' '}
            Knowledge
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

      {/* Categories Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryClick(category)}
                className={`px-6 py-3 rounded-xl whitespace-nowrap font-medium transition-all ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-green-100 text-green-700 hover:bg-green-50'
                }`}
                aria-pressed={selectedCategory === category.toLowerCase()}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Medical Content</h2>
            <p className="text-xl text-gray-600">Quality resources for healthcare professionals</p>
          </div>

          {loading ? (
            <p className="text-center text-green-700">Loading content...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : filteredBooks.length === 0 ? (
            <p className="text-center text-gray-600">No content matches your filters.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map(book => (
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
