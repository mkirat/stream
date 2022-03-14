"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_1 = require("../auth/token");
const router = express_1.default.Router();
router.get('/token', (req, res) => {
    const { message, publicKey } = req.query;
    if (!message || !publicKey) {
        return res.status(403).json({ msg: 'Invalid inputs, please sign the message' });
    }
    try {
        const token = (0, token_1.createToken)({ message, publicKey });
        return res.json({
            token,
            expiry: token_1.TOKEN_EXPIRY_INTERVAL,
        });
    }
    catch (e) {
        res.status(403).json({
            msg: 'Incorrect signed message/public key',
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map