"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.verifyToken = exports.createToken = exports.verifySignature = exports.TOKEN_EXPIRY_INTERVAL = void 0;
/*
 * The file contains a mechanism to create short lived tokens and refresh them
 * after a user signs in once. This token refreshes until the user refreshes the page
 * and they need to re-sign a message to get a fresh token.
 */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bs58_1 = __importDefault(require("bs58"));
const bn_js_1 = __importDefault(require("bn.js"));
/*
 * Create a fresh token when a user signs a message
 * for the first time
 */
const tweetnacl_1 = require("tweetnacl");
const config_1 = require("../config");
exports.TOKEN_EXPIRY_INTERVAL = 7 * 60;
const verifySignature = ({ originalMessage, signedMessage, publicKey }) => {
    const signature = bs58_1.default.decode(signedMessage);
    const message = new TextEncoder().encode(originalMessage);
    const decoded = bs58_1.default.decode(publicKey);
    const bn = new bn_js_1.default(decoded);
    let toBuffer = bn.toArrayLike(Buffer);
    if (toBuffer.length !== 32) {
        const zeroPad = Buffer.alloc(32);
        toBuffer.copy(zeroPad, 32 - toBuffer.length);
        toBuffer = zeroPad;
    }
    if (!tweetnacl_1.sign.detached.verify(message, signature, toBuffer)) {
        return false;
    }
    return true;
};
exports.verifySignature = verifySignature;
const createToken = ({ message, publicKey }) => {
    if ((0, exports.verifySignature)({ originalMessage: config_1.SIGNATURE_MESSAGE, signedMessage: message, publicKey })) {
        return jsonwebtoken_1.default.sign({ publicKey }, config_1.TOKEN_SECRET, { expiresIn: exports.TOKEN_EXPIRY_INTERVAL });
    }
    throw new Error('Error while creating token');
};
exports.createToken = createToken;
const verifyToken = ({ token }) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET);
        return {
            publicKey: decoded.publicKey,
        };
    }
    catch (e) {
        throw new Error('Token invalid or expired');
    }
};
exports.verifyToken = verifyToken;
const refreshToken = ({ token }) => {
    const { publicKey } = (0, exports.verifyToken)({ token });
    return jsonwebtoken_1.default.sign({ publicKey }, config_1.TOKEN_SECRET, { expiresIn: exports.TOKEN_EXPIRY_INTERVAL });
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=token.js.map