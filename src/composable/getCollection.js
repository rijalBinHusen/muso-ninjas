import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/firebaseApp";

const getCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  const unsubscribe = collectionRef.onSnapshot(
    (snap) => {
      let result = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && result.push({ ...doc.data(), id: doc.id });
      });
      documents.value = result;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "Could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { documents, error };
};

export default getCollection;
