import {
	encryptValue,
	encryptString,
	decryptString,
	encryptNumber,
	decryptNumber,
	encryptBoolean,
	decryptBoolean,
} from '../src/encryption'; // Update this with your actual file name

test('encrypt and decrypt value', () => {
	const originalValue = 'testValue';
	const encryptedValue = encryptValue(originalValue);
	const decryptedValue = decryptString(encryptedValue);

	expect(decryptedValue).toEqual(originalValue);
});

test('encrypt and decrypt string', () => {
	const originalValue = 'testValue';
	const encryptedValue = encryptString(originalValue);
	const decryptedValue = decryptString(encryptedValue);

	expect(decryptedValue).toEqual(originalValue);
});

test('encrypt and decrypt float number', () => {
	const originalValue = 10.4;
	const encryptedValue = encryptNumber(originalValue);
	const decryptedValue = decryptNumber(encryptedValue);

	expect(decryptedValue).toEqual(originalValue);
});

test('encrypt and decrypt number', () => {
	const originalValue = 130;
	const encryptedValue = encryptNumber(originalValue);
	const decryptedValue = decryptNumber(encryptedValue);

	expect(decryptedValue).toEqual(originalValue);
});


test('encrypt and decrypt boolean true', () => {
	const originalValue = true;
	const encryptedValue = encryptBoolean(originalValue);
	const decryptedValue = decryptBoolean(encryptedValue);

	expect(decryptedValue).toEqual(originalValue);
});

test('encrypt and decrypt boolean false', () => {
	const originalValue = false;
	const encryptedValue = encryptBoolean(originalValue);
	const decryptedValue = decryptBoolean(encryptedValue);

	expect(decryptedValue).toEqual(originalValue);
});
