function hashPassword(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

function xorBuffer(buffer, key) {
    const keyBytes = CryptoJS.enc.Hex.parse(key);
    const result = new Uint8Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
        result[i] = buffer[i] ^ keyBytes.words[i % keyBytes.words.length] & 0xFF;
    }
    return result;
}

function base64Encode(array) {
    let binary = '';
    const bytes = new Uint8Array(array);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function base64Decode(encoded) {
    const binaryString = atob(encoded);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

function encryptMessage(message, password) {
    const key = hashPassword(password);
    const messageBytes = new TextEncoder().encode(message);
    const encrypted = xorBuffer(messageBytes, key);
    return base64Encode(encrypted);
}

function decryptMessage(encodedMessage, password) {
    const key = hashPassword(password);
    const encryptedBytes = base64Decode(encodedMessage);
    const decrypted = xorBuffer(encryptedBytes, key);
    return new TextDecoder().decode(decrypted);
}

// Example usage
(async () => {
    const message = "Hello, World!";
    const password = "mysecretpassword";

    const encrypted = encryptMessage(message, password);
    console.log("Encrypted:", encrypted);
    console.log("type:", typeof encrypted);

    const decrypted = decryptMessage(encrypted, password);
    console.log("Decrypted:", decrypted);
    console.log("type:", typeof decrypted);
})();