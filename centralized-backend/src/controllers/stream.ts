import axios from 'axios';
import { LIVEPEER_API_URL, LIVEPEER_KEY } from '../config';
import { StreamAttributes, Streams } from '../models/Stream';

interface CreateStreamProps {
    publicKey: string;
    streamId: string;
    title: string;
    description: string;
  thumbnail: string;
}
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

export const createStream = async ({
  publicKey, streamId, title, description, thumbnail,
}: CreateStreamProps): Promise<StreamAttributes> => {
  console.log(`Bearer ${LIVEPEER_KEY}`);
  const response = await axios.post(`${LIVEPEER_API_URL}/api/stream`, {
    name: streamId,
    profiles: PROFILES,
  }, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${LIVEPEER_KEY}`,
    },
  }).catch((e) => console.log(e));
  // @ts-ignore
  const { streamKey, playbackId, id } = (response?.data || {});
  const stream: StreamAttributes = {
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
  await Streams.create(stream).catch((e) => console.log(e));
  return stream;
};

export const cleanStreamProps = (streams: StreamAttributes[], isOwner) => {
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
