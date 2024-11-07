// Encrypt function
function encryptMessage(message, password) {
    // Encrypt the message
    const encrypted = CryptoJS.AES.encrypt(message, password).toString();

    // Encode the encrypted message in base64 for readability
    return encrypted;
}

// Decrypt function
function decryptMessage(encryptedMessage, password) {
    // Decrypt the message
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, password);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedMessage;
}

// Example usage
const message = "Hello, World!";
const password = "mysecretpassword";

const encrypted = encryptMessage(message, password);
console.log("Encrypted:", encrypted);
console.log("type: ", typeof encrypted);

const decrypted = decryptMessage(encrypted, password);
console.log("Decrypted:", decrypted);
console.log("type: ", typeof decrypted);