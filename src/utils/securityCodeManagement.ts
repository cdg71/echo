import { password } from "bun";
import { randomBytes as randomBytesSync } from "crypto";
import { promisify } from "util";

const randomBytes = promisify(randomBytesSync);

// Define a URL-safe and user-friendly character set
const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

export const createSecurityCode = async () => {
  const accumulator = [];
  for (let i = 0; i < 20; i++) {
    const bytes = await randomBytes(1);
    const randomIndex = bytes[0] % charset.length;
    accumulator.push(charset[randomIndex]);
  }
  // Format the code into groups of 5 characters
  const code =
    accumulator
      .join("")
      .match(/.{1,5}/g)
      ?.join("-") ?? "";
  const hash = await password.hash(code);
  return {
    code,
    hash,
  };
};

export const validateSecurityCode = async (props: {
  code: string;
  hash: string;
}) => await password.verify(props.code, props.hash);
