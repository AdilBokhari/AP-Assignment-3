import { useRouter } from 'next/router';
import Layout from '@/app/layoutPages';
import styles from '@/styles/container.module.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/pages/store/auth-context';

export default function AuthorDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (id) {
      const fetchAuthorDetails = async () => {
        try {
          const response = await fetch(`/api/authors/${id}`);
          const data = await response.json();
          if (data.author) {
            setAuthor(data.author);
          } else {
            console.error("Author not found");
          }
        } catch (error) {
          console.error("Error fetching author details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAuthorDetails();
    }
  }, [id, isAuthenticated, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!author) {
    return <p>Author not found</p>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{author.name}</h1>
        <p style={{ fontSize: '1.6rem', lineHeight: '1.5' }}>{author.biography}</p>
      </div>
    </Layout>
  );
}
