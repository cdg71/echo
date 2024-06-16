import { dbSetup, getSurveyTestDatasetStatement } from "@src/config/sql.ts";
import { Database } from "bun:sqlite";

export const db =
  import.meta.env.NODE_ENV === "production"
    ? new Database(`${process.cwd()}/data/db.sqlite`, { create: true })
    : new Database(":memory:");

const executeTransaction = db.transaction((statements: string[]) => {
  for (const statement of statements) {
    const query = db.prepare(statement);
    query.run();
  }
});

executeTransaction.exclusive(dbSetup);

if (import.meta.env.NODE_ENV !== "production") {
  const testDataset = await getSurveyTestDatasetStatement();
  executeTransaction.exclusive(testDataset);
}
