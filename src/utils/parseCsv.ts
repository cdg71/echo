type ParsedCsv = string[][];

export const parseCsv = (csvString: string, colSeparator = ";"): ParsedCsv => {
  // Split the input string by newlines to get rows
  const rows = csvString.trim().split("\n");

  // Split each row by the column separator to get columns
  const parsedData = rows.map((row) =>
    row.split(colSeparator).map((col) => col.trim())
  );

  return parsedData;
};
