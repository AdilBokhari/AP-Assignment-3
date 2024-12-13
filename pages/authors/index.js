import useSWR from 'swr';
import Layout from '@/app/layoutPages';
import styles from '@/styles/container.module.css';

export default function Authors() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR('/api/authors', fetcher);

  if (error) {
    return (
      <Layout>
        <p>Failed to Load</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Author List</h1>
        <br />
        <ul>
          {data.authors.map((author) => (
            <li key={author.id}>
              <h3>{author.name}</h3>
              <p>{author.biography}</p>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
