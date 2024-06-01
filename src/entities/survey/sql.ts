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
