import Datastore from "nedb-promises";

export interface Alert {
  /** The last percentage that was alerted */
  lastAlert: number | null;
  /** If null, it will alert on every change */
  alertNumber: number | null;
}

const alert = Datastore.create({ filename: "./database/database.db" }) as Datastore<Alert>;

const db = {
  alert,
};

export default db;
