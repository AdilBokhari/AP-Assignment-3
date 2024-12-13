import Link from "next/link";
import styles from '@/styles/booklist.module.css'

export default function BookList({ books }) {
  return (
    <ul>
      {
        books.map(book => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <Link href={`/books/${book.id}`}>
              <button className={styles.button}>View Details</button>
            </Link>
            <br />
          </li>
        ))
      }
    </ul>
  );
}
