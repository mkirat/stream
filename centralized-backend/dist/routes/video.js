"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stream_1 = require("../controllers/stream");
const middlewares_1 = require("../auth/middlewares");
const Stream_1 = require("../models/Stream");
const router = express_1.default.Router();
var VideoType;
(function (VideoType) {
    VideoType[VideoType["Live"] = 0] = "Live";
    VideoType[VideoType["Offline"] = 1] = "Offline";
})(VideoType || (VideoType = {}));
router.post('/', middlewares_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, title, description, thumbnail, videoContractId, } = req.body;
    const streamId = videoContractId;
    if (type === VideoType.Live) {
        yield (0, stream_1.createStream)({
            // @ts-ignore
            publicKey: req.user.publicKey, streamId, title, description, thumbnail, videoContractId,
        });
        return res.json({});
    }
}));
router.get('/bulk', middlewares_1.extractUserIfThere, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { publicKey: requesterPublicKey } = (req.user || {});
    const { publicKey } = (req.query || {});
    const streams = yield Stream_1.Streams.findAll({
        where: {
            userId: publicKey,
        },
        raw: true,
    });
    return res.json({
        streams: (0, stream_1.cleanStreamProps)(streams, requesterPublicKey === publicKey),
    });
}));
router.get('/spotlight', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const streams = yield Stream_1.Streams.findAll({
        limit: 10,
        raw: true,
    });
    return res.json({
        streams: (0, stream_1.cleanStreamProps)(streams, false),
    });
}));
let ctr = 10;
router.post('/test', (req, res) => {
    console.log(ctr);
    if (ctr === 0) {
        ctr -= 1;
        return res.json({});
    }
    ctr -= 1;
    return res.status(404).json({});
});
router.delete('/', middlewares_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const stream = yield Stream_1.Streams.findOne({
        where: {
            id,
        },
    });
    console.log('updating stream');
    yield stream.update({
        hasEnded: true,
    });
    res.json({});
}));
router.get('/', middlewares_1.extractUserIfThere, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (req.query || {});
    // @ts-ignore
    const { publicKey: requesterPublicKey } = (req.user || {});
    const stream = yield Stream_1.Streams.findOne({
        where: {
            id,
        },
        raw: true,
    });
    return res.json({
        hlsUrl: stream.hlsUrl,
        title: stream.title,
        description: stream.description,
        rtmpUrl: stream.rtmpUrl,
        streamKey: stream.streamKey,
        userId: stream.userId,
        hasEnded: stream.hasEnded,
    });
}));
exports.default = router;
//# sourceMappingURL=video.js.map