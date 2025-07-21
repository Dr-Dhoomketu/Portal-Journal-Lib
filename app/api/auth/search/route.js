// app/api/search/route.js

import { NextResponse } from 'next/server'

// Dummy search data (replace with your own or connect to DB)
const booksData = [
  { id: 1, title: 'React Mastery', author: 'John Doe', type: 'book', pages: 200 },
  { id: 2, title: 'Machine Learning 101', author: 'Jane Smith', type: 'book' },
]

const videosData = [
  { id: 1, title: 'React Hooks Tutorial', author: 'Emily', type: 'video', duration: '12:34' },
  { id: 2, title: 'Data Science Basics', author: 'Mike Chen', type: 'video' },
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.toLowerCase().trim()

    if (!q || q.length === 0) {
      return NextResponse.json({ success: false, error: 'Empty query' }, { status: 400 })
    }

    const results = {
      books: booksData.filter(item =>
        item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q)
      ),
      videos: videosData.filter(item =>
        item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q)
      ),
    }

    return NextResponse.json({ success: true, data: results }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
