import Layout from '@/app/layoutPages'
import Link from 'next/link'
import styles from '@/styles/container.module.css';
export default function info(){
    return(
        <Layout>
        <div className={styles.container}>
            <h1>This is a Book Store</h1>
            <br />
            <Link href={'/info/support'}><h3>Support</h3></Link>
            <Link href={'/info/faq'}><h3>Faqs</h3></Link>
        </div></Layout>
    )
}