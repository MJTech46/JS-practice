// Function to generate a key from the password
function generateKey(password) {
    // Use SHA-256 to hash the password
    const hashedPassword = CryptoJS.SHA256(password);
    // Use the first 32 bytes of the hashed password to create the key
    const key = CryptoJS.enc.Base64.stringify(hashedPassword);
    return key;
}

// Encrypt the message
function encryptMessage(message, password) {
    const key = generateKey(password);
    const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
    return encryptedMessage;
}

// Decrypt the message
function decryptMessage(encryptedMessage, password) {
    const key = generateKey(password);
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
}

// Sample usage
const message = "hello geeks";
var password = "mypassword";

// Encrypt the message
const encryptedMessage = encryptMessage(message, password);
console.log("Encrypted:", encryptedMessage);
console.log("type:", typeof encryptedMessage);

// Decrypt the message
const decryptedMessage = decryptMessage(encryptedMessage, password);
console.log("Decrypted:", decryptedMessage);
console.log("type:", typeof decryptedMessage);