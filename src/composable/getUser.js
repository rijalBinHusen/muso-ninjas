import { ref } from "vue";
import { projectAuth } from "../firebase/firebaseApp";

const user = ref();

// WILL fire when state auth change, like login, logout,
projectAuth.onAuthStateChanged((_user) => {
  //   console.log("User state change, current user is:" + _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
