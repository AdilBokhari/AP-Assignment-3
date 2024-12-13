import { useRouter } from 'next/router';
import { useContext } from 'react';
import styles from '@/styles/layout.module.css';
import { AuthContext } from '@/pages/store/auth-context';

export default function RootLayout({ children }) {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.h1}>Book Store</h1>
        <nav className={styles.nav}>
          <button onClick={() => router.push('/')} className={styles.button}>
            Home
          </button>
          <button onClick={() => router.push('/genres')} className={styles.button}>
            Genres
          </button>
          <button onClick={() => router.push('/authors')} className={styles.button}>
            Authors
          </button>
          <button onClick={() => router.push('/books')} className={styles.button}>
            All Books
          </button>
          <button onClick={() => router.push('/info')} className={styles.button}>
            Info
          </button>
          {isAuthenticated ? (
            <button
              onClick={() => {
                authContext.logout();
                router.push('/login');
              }}
              className={styles.button}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className={styles.button}
            >
              Login
            </button>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
