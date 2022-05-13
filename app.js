import {createApp} from "vue";
import Main from "./view/Main"
import {router} from "./router";

createApp(Main)
    .use(router)
    .mount("#app")

require('./bootstrap');
