import { surveyTable } from "@src/entities/survey/sql.ts";
import { Database } from "bun:sqlite";

const dbSetup = [surveyTable];

export const db =
  import.meta.env.NODE_ENV === "production"
    ? new Database(`${process.cwd()}/storage/db.sqlite`, { create: true })
    : new Database(":memory:");

const setupDB = db.transaction((creationStatements: string[]) => {
  for (const statement of creationStatements) {
    const query = db.prepare(statement);
    query.run();
  }
});

setupDB.exclusive(dbSetup);
