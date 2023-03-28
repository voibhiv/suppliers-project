import { App } from "./app";

const app = new App();
app.init();
app.runServer(process.env.PORT);