import * as CryptoJS from 'crypto-js'; // Use namespace import for better test compatibility
import { secretKey } from './data/constants';

export function encryptString(data: string): string {
	// We use JSON.stringify because your original code did.
	// It ensures that special characters are escaped.
	const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
	return cipherText;
}

export function decryptString(encryptedData: string): string {
	if (!encryptedData) return "";

	try {
		const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
		const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);

		if (!decryptedStr) {
			// This happens if the key is wrong or data is corrupted
			throw new Error("Decryption returned empty string");
		}

		return JSON.parse(decryptedStr);
	} catch (e) {
		// In tests, this catch block helps identify what went wrong
		console.error("Decryption Error:", e.message);
		throw e;
	}
}

// Reuse logic for other types
export const encryptValue = encryptString;
export const encryptNumber = (n: number) => encryptString(n.toString());
export const decryptNumber = (s: string) => parseFloat(decryptString(s));
export const encryptBoolean = (b: boolean) => encryptString(b.toString());
export const decryptBoolean = (s: string) => JSON.parse(decryptString(s));
