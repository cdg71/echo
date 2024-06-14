import { dbSetup, getSurveyTestDatasetStatement } from "@src/config/sql.ts";
import { Database } from "bun:sqlite";

try {
  const db = new Database(`${process.cwd()}/data/db.sqlite`, { create: true });
  const executeTransaction = db.transaction((statements: string[]) => {
    for (const statement of statements) {
      const query = db.prepare(statement);
      query.run();
    }
  });
  executeTransaction.exclusive(dbSetup);
  const testDataset = [await getSurveyTestDatasetStatement()];
  executeTransaction.exclusive(testDataset);
  console.log({ status: "success" });
} catch (error) {
  console.log({ status: "error", error });
}
