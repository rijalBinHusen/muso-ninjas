/* eslint-disable */
import { ref } from "vue";
import { projectAuth } from "../firebase/firebaseApp";

const error = ref(null);
const isPending = ref(false);

const logout = async () => {
  // reset the error
  error.value = null;
  try {
    await projectAuth.signOut();
    isPending.value = false;
  } catch (err) {
    // console.log(err);
    error.value = err.message;
    isPending.value = false;
  }
};

const useLogout = () => {
  return { logout, error };
};

export default useLogout;
