import Layout from '@/app/layoutPages';
import BookList from '@/components/booklist';
import { useState, useEffect } from 'react';
import styles from '@/styles/books.module.css';

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState('');
  const [searchBook, setSearchBook] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('/api/genres');
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  let displayBooks = books;
  if (genre) {
    displayBooks = books.filter(book => book.genreId === genre);
  }
  if (searchBook) {
    displayBooks = displayBooks.filter(book =>
      book.title.toLowerCase().includes(searchBook.toLowerCase())
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.heading}>All Books</h1>
        <label className={styles.label}>Choose Genre:</label>
        <select
          className={styles.select}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="" className={styles.genreOption}>All Books</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre.id} className={styles.genreOption}>
              {genre.name}
            </option>
          ))}
        </select>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by book title..."
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div className={styles.bookListContainer}>
            <BookList books={displayBooks} />
          </div>
        )}
      </div>
    </Layout>
  );
}
