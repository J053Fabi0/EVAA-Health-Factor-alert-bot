import cron from "node-cron";
import checkHealthFactor from "./checkHealthFactor";

const every = 5;
cron.schedule(`*/${every} * * * *`, () => checkHealthFactor());
