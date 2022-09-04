/* eslint-disable */
import { ref } from "vue";
import { projectAuth } from "../firebase/firebaseApp";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
  try {
    isPending.value = false;
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error("Could not complete the signup");
    }
    await res.user.updateProfile({ displayName: displayName });
    // console.log(res.user);
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err) {
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
