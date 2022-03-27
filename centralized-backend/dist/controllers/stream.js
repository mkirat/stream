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
exports.cleanStreamProps = exports.createStream = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const Stream_1 = require("../models/Stream");
const RTMP_BASE_URL = 'rtmp://rtmp.livepeer.com/live';
const HLS_CDN_URL = 'https://cdn.livepeer.com/hls/';
const PROFILES = [
    {
        name: '720p',
        bitrate: 2000000,
        fps: 30,
        width: 1280,
        height: 720,
    },
    {
        name: '480p',
        bitrate: 1000000,
        fps: 30,
        width: 854,
        height: 480,
    },
    {
        name: '360p',
        bitrate: 500000,
        fps: 30,
        width: 640,
        height: 360,
    },
];
const createStream = ({ publicKey, streamId, title, description, thumbnail, }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Bearer ${config_1.LIVEPEER_KEY}`);
    const response = yield axios_1.default.post(`${config_1.LIVEPEER_API_URL}/api/stream`, {
        name: streamId,
        profiles: PROFILES,
    }, {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${config_1.LIVEPEER_KEY}`,
        },
    }).catch((e) => console.log(e));
    // @ts-ignore
    const { streamKey, playbackId, id } = ((response === null || response === void 0 ? void 0 : response.data) || {});
    const stream = {
        id: streamId,
        rtmpUrl: RTMP_BASE_URL,
        hlsUrl: `${HLS_CDN_URL}/${playbackId}/index.m3u8`,
        title,
        description,
        userId: publicKey,
        streamKey,
        parentContractId: '',
        providerStreamId: id,
        hasEnded: false,
        startTime: new Date(),
        thumbnail,
        videoContractId: id,
    };
    yield Stream_1.Streams.create(stream).catch((e) => console.log(e));
    return stream;
});
exports.createStream = createStream;
const cleanStreamProps = (streams, isOwner) => {
    if (isOwner) {
        return streams;
    }
    return streams.map((stream) => ({
        hlsUrl: stream.hlsUrl,
        title: stream.title,
        description: stream.description,
        thumbnail: stream.thumbnail,
        id: stream.id,
        createdAt: stream.createdAt,
        type: 0,
        userId: stream.userId,
        hasEnded: stream.hasEnded,
    }));
};
exports.cleanStreamProps = cleanStreamProps;
//# sourceMappingURL=stream.js.map