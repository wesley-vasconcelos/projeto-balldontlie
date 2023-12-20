import { createApp } from "vue";
import axios from "axios";
import { notify } from "notiwind";
import Notifications from "notiwind";
import VueAxios from "vue-axios";
import router from "@/router";
import App from "./App.vue";

import "@/assets/css/fonts.css";
import "@/assets/css/tailwind.css";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
const app = createApp(App);

axios.interceptors.response.use(
  function (response) {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    if (error.response) {
      const apiError = /[api]\w\w\d\d\d/g;
      if (
        typeof error.response === "string" &&
        error.response.match(apiError)
      ) {
        notify(
          {
            group: "white",
            title:
              error.response.data.detail === "api014"
                ? error.response.data.detail
                : "generic",
            type: "error",
            text: error.response.data.detail,
          },
          4000
        );
      } else {
        notify(
          {
            group: "white",
            title: "generic",
            type: "error",
          },
          4000
        );
      }
    }
    return Promise.reject(error);
  }
);

function setHeaderAutomatically(config) {
  config.headers.accept = "application/json, text/plain, */*, blob";
  config.headers.authorization = `Bearer `;
  return config;
}
axios.interceptors.request.use(setHeaderAutomatically);

app.use(VueAxios, axios).use(router).use(Notifications).mount("#app");

app.config.devtools = true;
