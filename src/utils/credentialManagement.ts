import { password as bunPassword } from "bun";
import { randomBytes as randomBytesSync } from "crypto";
import { promisify } from "util";

const randomBytes = promisify(randomBytesSync);

// Define a URL-safe and user-friendly character set
const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

export const createCredential = async () => {
  const accumulator = [];
  for (let i = 0; i < 20; i++) {
    const bytes = await randomBytes(1);
    const randomIndex = bytes[0] % charset.length;
    accumulator.push(charset[randomIndex]);
  }
  // Format the code into groups of 5 characters
  const password =
    accumulator
      .join("")
      .match(/.{1,5}/g)
      ?.join("-") ?? "";
  const hash = await bunPassword.hash(password);
  return {
    password,
    hash,
  };
};

export const validatePassword = async (props: {
  password: string;
  hash: string;
}) => await bunPassword.verify(props.password, props.hash);
