import Link from 'next/link';
import Layout from '@/app/layoutPages';
import styles from '@/styles/genres.module.css';
const fetchGenres = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/genres`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching genres:", error);
        return [];
    }
};
export async function getServerSideProps() {
    const genres = await fetchGenres();
    return {
        props: {
            genres,
        },
    };
}
export default function Genres({ genres }) {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Genres</h1>
                <ul>
                    {genres.map(g => (
                        <li key={g._id}>
                            <h3>{g.name}</h3>
                            <Link href={`/genres/${g.id}`}>
                                <button className={styles.button}>View Details</button>
                            </Link>
                            <br />
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}
