import { randomBytes as randomBytesSync } from "crypto";
import fs from "fs/promises";
import path from "path";
import { promisify } from "util";

const randomBytes = promisify(randomBytesSync);

const JWT_SECRET_PATH = path.join(
  process.cwd(),
  import.meta.env.JWT_SECRET_PATH
);

export const createSecret = async (length = 32): Promise<Readonly<string>> => {
  const bytes = await randomBytes(length);
  return bytes.toString("hex");
};

export const getJwtSecret = async (): Promise<string> => {
  try {
    // Check if the jwtSecret file exists
    await fs.access(JWT_SECRET_PATH);

    // Read the secret from the file
    const secret = await fs.readFile(JWT_SECRET_PATH, "utf-8");

    if (secret) {
      return secret;
    }

    throw new Error("Secret key not found in file");
  } catch (error) {
    // File doesn't exist or secret not found, generate a new secret
    const secret = await createSecret();

    // Save the new secret to the file
    await fs.mkdir(path.dirname(JWT_SECRET_PATH), { recursive: true });
    await fs.writeFile(JWT_SECRET_PATH, secret, "utf-8");

    return secret;
  }
};
