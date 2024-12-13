import { MongoClient } from "mongodb";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        try {
            const client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const existingUser = await db.collection("users").findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            await db.collection("users").insertOne({
                email: email,
                password: password,
            });
            await client.close();

            return res.status(200).json({ message: "User created successfully!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error creating user." });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
