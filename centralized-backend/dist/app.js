"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const models_1 = require("./models");
models_1.db.sync({ alter: false });
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json({
    verify: (req, res, buf) => {
        if (buf && buf.length) {
            req.rawBody = buf;
        }
    },
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/v1', routes_1.default);
app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
//# sourceMappingURL=app.js.map