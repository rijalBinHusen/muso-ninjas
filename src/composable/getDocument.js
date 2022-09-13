import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/firebaseApp";

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);

  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsubscribe = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "That document doesn't exists";
      }
    },
    (err) => {
      document.value = null;
      error.value = err.message || "Could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { document, error };
};

export default getDocument;
