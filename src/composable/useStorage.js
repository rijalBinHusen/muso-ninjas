import projectStorage from "@/composable/useStorage";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = res.ref.getDownloadUrl();
    } catch (error) {
      error.value = error.message;
      console.log(error.message);
    }
  };

  return { error, url, filePath, uploadImage };
};

export default useStorage;
