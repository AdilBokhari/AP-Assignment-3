import { useEffect, useState, useContext } from "react";
import Layout from "@/app/layoutPages";
import styles from "@/styles/homepage.module.css";
import BookList from "@/components/booklist";
import { AuthContext } from '@/pages/store/auth-context';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/featuredBooks');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);
  console.log('User in HomePage:', user);
  return (
    <Layout>
      <div className={styles.container}>
        {isAuthenticated ? (
          <h1 className={styles.title}>Welcome, {user?.email}</h1>
        ) : (
          <h1 className={styles.title}>Featured Books</h1>
        )}
        <BookList books={books} />
      </div>
    </Layout>
  );
}
