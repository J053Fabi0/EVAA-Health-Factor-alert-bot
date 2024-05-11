import cron from "node-cron";
import checkHealthScore from "./checkHealthScore";

const every = 5;
cron.schedule(`*/${every} * * * *`, () => checkHealthScore());
