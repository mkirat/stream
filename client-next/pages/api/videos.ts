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
}

export interface Video {
    title: string;
    description: string;
    link: string;
    type: VideoType;
    thumbnail: string;
    uploadDate: number;
    id: string;
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
    await new Promise((resolve, reject) => setTimeout(resolve, 500))
    return [
        {
            id: "123",
            title: "My first live stream",
            description: "This is my first live stream",
            type: 0,
            link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            thumbnail: "https://i.ytimg.com/vi/cEmlaDsK7GQ/maxresdefault.jpg",
            uploadDate: new Date().getTime()
        },
        {
            id: "123",
            title: "My first live stream",
            description: "This is my first live stream",
            type: 0,
            link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            thumbnail: "https://i.ytimg.com/vi/cEmlaDsK7GQ/maxresdefault.jpg",
            uploadDate: new Date().getTime()
        },
        {
            id: "123",
            title: "My first live stream",
            description: "This is my first live stream",
            type: 0,
            link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            thumbnail: "https://i.ytimg.com/vi/cEmlaDsK7GQ/maxresdefault.jpg",
            uploadDate: new Date().getTime()
        },
        {
            id: "123",
            title: "My first live stream",
            description: "This is my first live stream",
            type: 0,
            link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            thumbnail: "https://i.ytimg.com/vi/cEmlaDsK7GQ/maxresdefault.jpg",
            uploadDate: new Date().getTime()
        },
        {
            id: "123",
            title: "My first live stream",
            description: "This is my first live stream",
            type: 0,
            link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            thumbnail: "https://i.ytimg.com/vi/cEmlaDsK7GQ/maxresdefault.jpg",
            uploadDate: new Date().getTime()
        },
        {
            id: "123",
            title: "My first live stream",
            description: "This is my first live stream",
            type: 0,
            link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            thumbnail: "https://i.ytimg.com/vi/cEmlaDsK7GQ/maxresdefault.jpg",
            uploadDate: new Date().getTime()
        },
    ]
}

export const getVideo = async (props: VideoFetchBody): Promise<Video> => {
    await new Promise((resolve, reject) => setTimeout(resolve, 500))
    return {
        id: "123",
        title: "My first live stream",
        description: "This is my first live stream",
        type: 0,
        link: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        thumbnail: "https://i.ytimg.com/vi/cEmlaDsK7GQ/maxresdefault.jpg",
        uploadDate: new Date().getTime()
    };
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

export const createStream = async ({title, description, thumbnail, videoContractId}: VideoCreateProps): Promise<{ id: string }> => {
    const response = await axios.post(`${apiUrl}/video`, {
        type: VideoType.Live,
        title,
        description,
        thumbnail,
        videoContractId
    }, {
        headers: {
            "Authorization": `Bearer: ${getToken()}`
        }
    });
    return {id: response.data?.id || ""};
}

export const getStream = async({videoContractId}: {videoContractId: string}) => {
    const response = await axios.get(`${apiUrl}/video?id=${videoContractId}`);
    return {
        hlsUrl: response.data.hlsUrl,
        title: response.data.title,
        description: response.data.description,
    };
}