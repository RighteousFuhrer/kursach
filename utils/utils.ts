import { promises } from "fs";
import { join } from "path";

interface query {
  [key: string]: string;
}

export const loadSqlQueries = async (folderName: string) => {
  const filePath = join(process.cwd(), "controllers", folderName);
  const files = await promises.readdir(filePath);
  const sqlFiles = files.filter((file: string) => file.endsWith(".sql"));
  const queries: query = {};
  for (const sqlFile of sqlFiles) {
    const query = await promises.readFile(join(filePath, sqlFile), {
      encoding: "utf-8",
    });
    queries[sqlFile.replace(".sql", "")] = query;
  }
  return queries;
};

