import {
	CryptoJS,
	secretKey
} from './constants';
//import CryptoJS from 'crypto-js';
// Function to encrypt a string
export function encryptValue(data: string) {
	return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

// Function to encrypt a string
export function encryptString(data: string) {
	return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}
// Function to decrypt a string
export function decryptString(encryptedData: string) {
	const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
// Function to encrypt a number
export function encryptNumber(number: number) {
	return CryptoJS.AES.encrypt(number.toString(), secretKey).toString();
}
// Function to decrypt an encrypted number
export function decryptNumber(encryptedNumber: string) {
	const bytes = CryptoJS.AES.decrypt(encryptedNumber, secretKey);
	//return parseInt(bytes.toString(CryptoJS.enc.Utf8));
	return parseFloat(bytes.toString(CryptoJS.enc.Utf8));
}
// Function to encrypt a boolean
export function encryptBoolean(booleanValue: boolean) {
	return CryptoJS.AES.encrypt(booleanValue.toString(), secretKey).toString();
}
// Function to decrypt an encrypted boolean
export function decryptBoolean(encryptedBoolean: string) {
	const bytes = CryptoJS.AES.decrypt(encryptedBoolean, secretKey);
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
