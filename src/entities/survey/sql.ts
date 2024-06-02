import { password } from "bun";

export const surveyTable = `
    CREATE TABLE IF NOT EXISTS Survey (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        securityCode VARCHAR(255),
        created TIMESTAMP,
        updated TIMESTAMP
    );
`;
export const getSurveyTestDatasetStatement = async () => {
  const hash = await password.hash("test");
  return `
    INSERT INTO Survey (id, name, description, securityCode, created, updated)
    VALUES (
        'test',
        'Sondage de test',
        'Description du sondage',
        '${hash}',
        '1717165982427',
        '1717165982427'
    );
`;
};
