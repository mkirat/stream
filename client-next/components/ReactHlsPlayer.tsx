import React, {useRef} from "react";
import HlsPlayer from 'react-hls-player';
export default function({url}: {url: string}) {
    const playerRef = useRef<HTMLVideoElement>();
    return (
        <>
            <HlsPlayer
                playerRef={playerRef}
                src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
            />
        </>
    );
};