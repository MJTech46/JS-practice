async function encryptMessage(message, password) {
    // Generate a random salt
    const salt = window.crypto.getRandomValues(new Uint8Array(16));

    // Derive a key using the password and salt
    const keyMaterial = await getKeyMaterial(password);
    const key = await deriveKey(keyMaterial, salt);

    // Generate a random initialization vector
    const iv = window.crypto.getRandomValues(new Uint8Array(16));

    // Create AES-GCM cipher
    const encryptedContent = new TextEncoder().encode(message);
    const cipherText = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encryptedContent
    );

    // Combine salt, iv, and cipher text
    const encryptedMessage = new Uint8Array(salt.length + iv.length + cipherText.byteLength);
    encryptedMessage.set(salt);
    encryptedMessage.set(iv, salt.length);
    encryptedMessage.set(new Uint8Array(cipherText), salt.length + iv.length);

    // Encode the encrypted message in base64 for readability
    return btoa(String.fromCharCode(...encryptedMessage));
}

async function decryptMessage(encryptedMessage, password) {
    // Decode the base64 encoded message
    const encryptedData = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));

    // Extract the salt, iv, and encrypted content
    const salt = encryptedData.slice(0, 16);
    const iv = encryptedData.slice(16, 32);
    const cipherText = encryptedData.slice(32);

    // Derive the key using the password and salt
    const keyMaterial = await getKeyMaterial(password);
    const key = await deriveKey(keyMaterial, salt);

    // Create AES-GCM cipher
    const decryptedContent = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        key,
        cipherText
    );

    return new TextDecoder().decode(decryptedContent);
}

async function getKeyMaterial(password) {
    const encoder = new TextEncoder();
    return window.crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );
}

async function deriveKey(keyMaterial, salt) {
    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 2**14,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

// Example usage
(async () => {
    const message = "Hello, World!";
    const password = "mysecretpassword";

    const encrypted = await encryptMessage(message, password);
    console.log("Encrypted:", encrypted);
    console.log("type:", typeof encrypted);

    const decrypted = await decryptMessage(encrypted, password);
    console.log("Decrypted:", decrypted);
    console.log("type:", typeof decrypted);
})();
