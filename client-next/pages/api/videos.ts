// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import {apiUrl} from "../../config";
import {getToken} from "./auth";

enum VideoType {
    Live,
    Offline
}

export interface VideoCreateProps {
    title: string;
    description: string;
    thumbnail: string;
    videoContractId: string;
    account: string;
}

export interface Video {
    title: string;
    description: string;
    type: VideoType;
    thumbnail: string;
    createdAt: number;
    hasEnded: boolean;
    id: string;
    userId: string;
}

interface VideoFetchBody {
    creatorId: string;
    videoId: string;
}

type Data = {
    name: string
}

export const getVideos = async (
): Promise<Video[]> => {
    const response = await axios.get(`${apiUrl}/video/spotlight`);
    return response.data.streams
}

export const getStreams = async ({ publicKey }: {publicKey: string}) => {
    const response = await axios.get(`${apiUrl}/video/bulk?publicKey=${publicKey}`,
       {
        headers: {
            "Authorization": `Bearer: ${getToken()}`
        }
    }).catch(e => console.log(e));

    return {
        streams: response?.data.streams || []
    }
}

export const createStream = async ({title, description, thumbnail, account, videoContractId}: VideoCreateProps): Promise<{ id: string }> => {
    const response = await axios.post(`${apiUrl}/video`, {
        type: VideoType.Live,
        title,
        description,
        thumbnail,
        videoContractId
    }, {
        headers: {
            "Authorization": `Bearer: ${account}`
        }
    });
    return {id: response.data?.id || ""};
}

export const endStream = async({videoContractId, account}: {videoContractId: string}) => {
    await axios.delete(`${apiUrl}/video?id=${videoContractId}`, {
        headers: {
            "Authorization": `Bearer: ${account}`
        }
    });
}

export const getStream = async({videoContractId}: {videoContractId: string}) => {
    const response = await axios.get(`${apiUrl}/video?id=${videoContractId}`, {
        headers: {
            "Authorization": `Bearer: ${getToken()}`
        }
    });
    return {
        hlsUrl: response.data.hlsUrl,
        title: response.data.title,
        description: response.data.description,
        rtmpUrl: response.data.rtmpUrl,
        streamKey: response.data.streamKey,
        userId: response.data.userId,
        hasEnded: response.data.hasEnded
    };
}