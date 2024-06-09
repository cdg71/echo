import { password } from "bun";

export const dbInitSQLStatements = `-- Table for Survey
CREATE TABLE Survey (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  context TEXT,
  positions TEXT, -- Store as comma-separated values
  areas TEXT, -- Store as comma-separated values
  hash TEXT NOT NULL,
  createdAt INTEGER NOT NULL
);

-- Table for Snapshot
CREATE TABLE Snapshot (
  surveyId TEXT,
  createdAt INTEGER NOT NULL,
  FOREIGN KEY (surveyId) REFERENCES Survey(id) ON DELETE CASCADE
);

-- Table for User
CREATE TABLE User (
  id TEXT PRIMARY KEY,
  surveyId TEXT,
  position TEXT NOT NULL,
  area TEXT NOT NULL,
  FOREIGN KEY (surveyId) REFERENCES Survey(id) ON DELETE CASCADE
);

-- Table for Question
CREATE TABLE Question (
  id TEXT PRIMARY KEY,
  surveyId TEXT,
  label TEXT NOT NULL,
  FOREIGN KEY (surveyId) REFERENCES Survey(id) ON DELETE CASCADE
);

-- Table for Response
CREATE TABLE Response (
  id TEXT PRIMARY KEY,
  questionId TEXT,
  userId TEXT,
  value TEXT NOT NULL,
  comment TEXT,
  createdAt INTEGER NOT NULL,
  FOREIGN KEY (questionId) REFERENCES Question(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);

-- Table for Result
CREATE TABLE Result (
  id TEXT PRIMARY KEY,
  surveyId TEXT,
  snapshotId TEXT,
  data TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  completedAt INTEGER NOT NULL,
  FOREIGN KEY (surveyId) REFERENCES Survey(id) ON DELETE CASCADE,
  FOREIGN KEY (snapshotId) REFERENCES Snapshot(surveyId) ON DELETE CASCADE
);
`;

export const getSurveyTestDatasetStatement = async () => {
  const hash = await password.hash("test");
  return `
    INSERT INTO Survey (id, name, hash, createdAt)
    VALUES (
        'test',
        'Sondage de test',
        '${hash}',
        '1717165982427'
    );
`;
};
