import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import firebaseApp from "./FB_App";

// Work in progress
function Database() {
    const [data, setData] = useState([]);
  

    

    useEffect(() => {
        console.log(firebaseApp);
        // Initialize the Firebase database with the provided configuration
        const database = getDatabase(firebaseApp);

        // Reference to the specific collection in the database
        const collectionRef = ref(database, "testbooks");
console.log(collectionRef);
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

      const addBook = (newBook) => {
    const database = getDatabase(firebaseApp);
    const collectionRef = ref(database, "testbooks");

    // Speichert das neue Buch mit einer eindeutigen ID
    const newBookRef = push(collectionRef); // Erzeugt eine eindeutige ID
    set(newBookRef, newBook)
      .then(() => {
        console.log("Buch erfolgreich hinzugefügt!");
      })
      .catch((error) => {
        console.error("Fehler beim Hinzufügen des Buchs:", error);
      });
  };

  return { data, addBook }; // Gibt die Daten und die Funktion zurück
}
    

export default Database;