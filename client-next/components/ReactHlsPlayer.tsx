import React, {useRef} from "react";
import HlsPlayer from 'react-hls-player';

const ReactHlsPlayer = ({url}: {url: string}) => {
    const playerRef = useRef<HTMLVideoElement>();
    return (
        <>
            {/*
                // @ts-ignore */}
            <HlsPlayer playerRef={playerRef || null}
                src={url}
                autoPlay={true}
                muted={true}
                controls={true}
                width="100%"
                height="auto"
            />
        </>
    );
};

export default ReactHlsPlayer;