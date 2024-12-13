import Layout from '@/app/layoutPages'
import styles from '@/styles/container.module.css';
export default function slug(props) {
    if (props.v === "faq") {
        return (
            <Layout>
                <div className={styles.container}>
                    <h1>Frequently Asked Questions</h1>
                    <h2>Is this app free?</h2>
                    <p>Yes</p>
                    <h2>Are the books licensed?</h2>
                    <p>No</p>
                </div>
            </Layout>
        )
    }
    else if (props.v === "support") {
        return (
            <Layout>
                <div className={styles.container}>
                    <h1>Support</h1>
                    <div >
                        <h2 style={{ display: "inline" }}>Email us at: &ensp;</h2>
                        <h3 style={{ display: "inline" }}>l215256@lhr.nu.edu.pk</h3></div>
                </div>
            </Layout>
        )
    }
}

export async function getServerSideProps(context) {
    const v = context.params.slug[0]
    if (v != "support" && v != "faq") {
        return {
            notFound: true
        }
    }
    return {
        props: {
            v: v
        }
    };
}