import { useEffect, useState } from "react";
import firebaseApp from "../main";
import { getDatabase, ref, onValue } from "firebase/database";

// Work in progress
function Database() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Initialize the Firebase database with the provided configuration
        const database = getDatabase(firebaseApp);

        // Reference to the specific collection in the database
        const collectionRef = ref(database, "your_collection");

        // Function to fetch data from the database
        const fetchData = () => {
            // Listen for changes in the collection
            onValue(collectionRef, (snapshot) => {
                const dataItem = snapshot.val();

                // Check if dataItem exists
                if (dataItem) {
                    // Convert the object values into an array
                    const displayItem = Object.values(dataItem);
                    setData(displayItem);
                }
            });
        };

        // Fetch data when the component mounts
        fetchData();
    }, []);
}

export default Database;