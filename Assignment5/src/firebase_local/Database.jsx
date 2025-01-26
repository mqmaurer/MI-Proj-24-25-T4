import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
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
                    // Füge die IDs (Schlüssel) als Teil jedes Buchobjekts hinzu
                    const displayItem = Object.keys(dataItem).map((key) => ({
                      id: key, // Firebase generierte ID
                      ...dataItem[key], // Die eigentlichen Buchdaten
                    }));
                    setData(displayItem);
                  } else {
                    setData([]); // Keine Daten vorhanden
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

  const deleteBook = (bookId) => {
    const database = getDatabase(firebaseApp);
    const bookRef = ref(database, `testbooks/${bookId}`); // Pfad zum spezifischen Buch
    remove(bookRef)
      .then(() => {
        console.log("Buch erfolgreich gelöscht!");
      })
      .catch((error) => {
        console.error("Fehler beim Löschen des Buchs:", error);
      });
  };

  return { data, addBook, deleteBook }; // Gibt die Daten und die Funktion zurück
}
    

export default Database;