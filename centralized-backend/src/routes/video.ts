import express from 'express';
import { cleanStreamProps, createStream } from '../controllers/stream';
import { extractUserIfThere, tokenMiddleware } from '../auth/middlewares';
import { Streams } from '../models/Stream';

const router = express.Router();

enum VideoType {
  Live,
  Offline
}

router.post('/', tokenMiddleware, async (req, res) => {
  const {
    type, title, description, thumbnail, videoContractId,
  } = req.body;
  const streamId = videoContractId;
  if (type === VideoType.Live) {
    await createStream({
      // @ts-ignore
      publicKey: req.user.publicKey, streamId, title, description, thumbnail, videoContractId,
    });
    return res.json({});
  }
});

router.get('/bulk', extractUserIfThere, async (req, res) => {
  // @ts-ignore
  const { publicKey: requesterPublicKey } = (req.user || {});
  const { publicKey } = (req.query || {});
  const streams = await Streams.findAll({
    where: {
      userId: publicKey,
    },
    raw: true,
  });
  return res.json({
    streams: cleanStreamProps(streams, requesterPublicKey === publicKey),
  });
});

router.get('/', async (req, res) => {
  const { id } = (req.query || {});
  console.log(id);
  const stream = await Streams.findOne({
    where: {
      id,
    },
    raw: true,
  });
  return res.json({
    hlsUrl: stream.hlsUrl,
    title: stream.title,
    description: stream.description,
  });
});
let count = 6;
router.post('/subspace', (req, res) => {
  count -= 1;
  console.log(count);
  if (count <= 0) {
    return res.json({});
  }
  return res.status(401).json({});
});
export default router;
