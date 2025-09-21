import crypto from 'crypto';
function generateShortCode() {
    return crypto.randomBytes(3).toString('hex');
}


function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}


function getCurrentTimestamp() {
    return new Date().toISOString();
}

export {isValidUrl, generateShortCode, getCurrentTimestamp};