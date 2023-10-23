import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"

export const useGetCompletedCollection = () => {
    const [countCompletedQuestions, setCountCompletedQuestions] = useState<number>(0)
    const [totalSeconds, setTotalSeconds] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const auth = getAuth();
            const user = auth.currentUser;
    
            if (user) {
              const completedCollectionRef = doc(db, "users", user.uid); // Reference to the "Completed" collection within the user document
              const docSnapshot = await getDoc(completedCollectionRef);
    
              if (docSnapshot.exists()) {
                setCountCompletedQuestions(docSnapshot.data().Completed.length);
                setTotalSeconds(docSnapshot.data().TotalTime);
              } else {
                console.log("User not found");
              }
            } else {
              console.log("No authenticated user");
            }
          } catch (error) {
            console.error(
              'Error retrieving "Completed" collection for user:',
              error
            );
          }
        };
    
        fetchData();
      }, []);

    return {countCompletedQuestions, totalSeconds}
}