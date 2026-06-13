import * as crypto from 'crypto';
import { secretKey } from './data/constants';

/**
 * Replicates the OpenSSL/CryptoJS Key Derivation (EvpKDF)
 * This is the "Bridge" that allows native Node.js to read old crypto-js data.
 */
function deriveKeyAndIv(password: string, salt: Buffer) {
	let combined = Buffer.concat([Buffer.from(password), salt]);
	let hash0 = crypto.createHash('md5').update(combined).digest();
	let hash1 = crypto.createHash('md5').update(Buffer.concat([hash0, combined])).digest();

	// CryptoJS AES-256 uses 32 bytes for key and 16 bytes for IV
	const key = Buffer.concat([hash0, hash1]).subarray(0, 32);
	const iv = crypto.createHash('md5').update(Buffer.concat([hash1, combined])).digest().subarray(0, 16);

	return { key, iv };
}

export function encryptString(data: string): string {
	const salt = crypto.randomBytes(8);
	const { key, iv } = deriveKeyAndIv(secretKey, salt);

	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
	let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
	encrypted += cipher.final('base64');

	// Prepend "Salted__" and the salt to match CryptoJS format
	const output = Buffer.concat([Buffer.from("Salted__"), salt, Buffer.from(encrypted, 'base64')]);
	return output.toString('base64');
}

export function decryptString(encryptedData: string): string {
	const ciphertextBuffer = Buffer.from(encryptedData, 'base64');

	// Check for "Salted__" prefix
	if (ciphertextBuffer.subarray(0, 8).toString() !== "Salted__") {
		throw new Error("Invalid encrypted format: Missing Salted__ prefix");
	}

	const salt = ciphertextBuffer.subarray(8, 16);
	const actualCiphertext = ciphertextBuffer.subarray(16);
	const { key, iv } = deriveKeyAndIv(secretKey, salt);

	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
	let decrypted = decipher.update(actualCiphertext, undefined, 'utf8');
	decrypted += decipher.final('utf8');

	return JSON.parse(decrypted);
}

// Reuse logic for other types
export const encryptValue = encryptString;
export const encryptNumber = (n: number) => encryptString(n.toString());
export const decryptNumber = (s: string) => parseFloat(decryptString(s));
export const encryptBoolean = (b: boolean) => encryptString(b.toString());
export const decryptBoolean = (s: string) => JSON.parse(decryptString(s));
