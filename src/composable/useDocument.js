import { ref } from "vue";
import { projectFirestore } from "../firebase/firebaseApp";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  let docRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.delete();
      isPending.value = false;
      return res;
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
      console.log(err.message);
    }
  };

  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.update(updates);
      isPending.value = false;
      return res;
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
      console.log(err.message);
    }
  };

  return { error, isPending, deleteDoc, updateDoc };
};

export default useDocument;
