import { ref } from "vue";
import { projectFirestore } from "../firebase/firebaseApp";

const useCollection = (collection) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDoc = async (doc) => {
    isPending.value = true;
    error.value = null;
    try {
      const res = await projectFirestore.collection(collection).add(doc);
      isPending.value = false;
      return res;
    } catch (err) {
      // console.log(err.message);
      error.value = err.message || "Could not send the message";
      isPending.value = false;
    }
  };

  return { error, addDoc };
};

export default useCollection;
