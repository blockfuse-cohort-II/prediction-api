import * as crypto from "crypto";

export const encrypt = (privateKey: string, encryptionKey: string): string => {
  if (!privateKey) throw new Error("Private key is undefined");
  if (!encryptionKey) throw new Error("Encryption key is undefined");

  try {
    const keyBuffer = Buffer.from(encryptionKey, "hex");
    if (keyBuffer.length !== 32) {
      throw new Error(
        "Encryption key must be 32 bytes (64 hex characters) long"
      );
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);
    let encryptedBuffer = cipher.update(Buffer.from(privateKey, "utf-8"));
    encryptedBuffer = Buffer.concat([encryptedBuffer, cipher.final()]);

    // Return IV and encrypted data as hex strings, separated by colon
    return `${iv.toString("hex")}:${encryptedBuffer.toString("hex")}`;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
    throw new Error("Encryption failed with unknown error");
  }
};

export const decrypt = (encryptedData: string, encryptionKey: string): string => {
  // Input validation
  if (!encryptedData) {
    throw new Error("Encrypted data is required");
  }

  if (!encryptionKey) {
    throw new Error("Encryption key is required");
  }

  try {
    // Split the encrypted data into IV and actual encrypted content
    const parts = encryptedData.split(":");

    if (parts.length !== 2) {
      throw new Error(
        "Invalid encrypted data format. Expected format: iv:encryptedData"
      );
    }

    const iv = Buffer.from(parts[0], "hex");
    const encryptedBuffer = Buffer.from(parts[1], "hex");

    // Convert hex string key to Buffer
    const keyBuffer = Buffer.from(encryptionKey, "hex");

    // Validate key length
    if (keyBuffer.length !== 32) {
      throw new Error(
        "Encryption key must be 32 bytes (64 hex characters) long"
      );
    }

    // Create decipher using the same algorithm, key and IV
    const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);

    // Decrypt the data
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Return the decrypted private key
    return decrypted.toString("utf-8");
  } catch (error) {
    if (error instanceof Error) {
      // Provide more context for the error
      if (error.message.includes("bad decrypt")) {
        throw new Error("Decryption failed: Invalid key or corrupted data");
      }
      throw new Error(`Decryption failed: ${error.message}`);
    }
    throw new Error("Decryption failed with unknown error");
  }
};
