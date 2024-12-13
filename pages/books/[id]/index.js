import { useRouter } from 'next/router';
import Layout from '@/app/layoutPages';
import styles from '@/styles/book.module.css';
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/pages/store/auth-context';

export default function BookID() {
  const router = useRouter();
  const { id } = router.query;
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (id) {
      const fetchBookDetails = async () => {
        try {
          const response = await fetch(`/api/books/${id}`);
          const data = await response.json();

          if (data.book) {
            setBookDetails(data);
          } else {
            console.error("Book not found");
          }
        } catch (error) {
          console.error("Error fetching book details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBookDetails();
    }
  }, [id, isAuthenticated, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!bookDetails) {
    return <p>Book not found</p>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>{bookDetails.book.title}</h1>
        <p className={styles.description}>{bookDetails.book.description}</p>
        <Link href={`/books/${bookDetails.book.id}/${bookDetails.author.id}`}>
          <p className={styles.authorLink}>{bookDetails.author.name}</p>
        </Link>
        <p className={styles.price}>Price: PKR {bookDetails.book.price}</p>
        <p className={styles.rating}>Rating: {bookDetails.book.rating}</p>
      </div>
    </Layout>
  );
}
