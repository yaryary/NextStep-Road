import app from "./app.js";
import { env } from "./config/env.js";

function start() {
    app.listen(env.port, () => {
        console.log(`Server running in ${env.nodeEnv} mode on hhtp://localhost:${env.port}`);
    });
}

start();

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
});