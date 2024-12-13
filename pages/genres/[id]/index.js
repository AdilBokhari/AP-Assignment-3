import Layout from '@/app/layoutPages';
import BookList from '@/components/booklist';

export default function GenreID({ genre, books }) {
  return (
    <Layout>
      <div>
        <h1>{genre.name} Books</h1>
        <BookList books={books} />
      </div>
    </Layout>
  );
}
export async function getStaticPaths() {
  try {
    const res = await fetch(`http://localhost:3000/api/genres`);
    const data = await res.json();
    const paths = data.map(g => ({
      params: { id: g.id.toString() },
    }));
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}
export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/genre/${params.id}`);
  const data = await res.json();

  if (!data || !data.genre) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genre: data.genre,
      books: data.books,
    },
    revalidate: 30,
  };
}
