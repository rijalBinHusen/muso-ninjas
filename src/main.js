import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// global style
import "./assets/main.css";
import { projectAuth } from "./firebase/firebaseApp";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});
