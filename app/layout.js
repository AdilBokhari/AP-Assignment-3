"use client"
import { useRouter } from 'next/navigation';
import styles from '@/styles/layout.module.css'
export default function RootLayout({ children }) {
  const router=useRouter()
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <h1 className={styles.h1}>Book Store</h1>
          <nav className={styles.nav}>
          <button onClick={()=>router.push('/')} className={styles.button}><span>Home</span></button>
          <button onClick={()=>router.push('/genres')} className={styles.button}>Genres</button>
          <button onClick={()=>router.push('/authors')} className={styles.button}>Authors</button>
          <button onClick={()=>router.push('/books')} className={styles.button}>All Books</button>
          <button onClick={()=>router.push('/info')} className={styles.button}>Info</button>
          <button onClick={()=>router.push('/login')} className={styles.button}>Login</button>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}