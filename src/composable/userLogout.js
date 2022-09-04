/* eslint-disable */
import { ref } from "vue";
import { projectAuth } from "../firebase/firebaseApp";

const error = ref(null);

const logout = async () => {
  // reset the error
  error.value = null;
  try {
    await projectAuth.signOut();
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
};

const useLogout = () => {
  return { logout, error };
};

export default useLogout;
