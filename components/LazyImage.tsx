import React, { memo, useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";

export const LazyImageContainer = styled.div`

`;

export const Image = styled.img`

`;

export const LoadingImage = styled(ContentLoader)`
    height: 100%;
    width: 100%;
`;

interface LazyImageProps {
    src: string;
    className?: string;
}

const LazyImage = memo(({ src, className }: LazyImageProps) => {
    const [loaded, setLoaded] = useState(false);
    const [imgSrc, setImgSrc] = useState("");

    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    useEffect(() => {
        if (src) {
            fetch(src).then(res => {
                if (res.ok) {
                    setImgSrc(src);
                    setTimeout(() => {
                        setLoaded(true);
                    }, 500);
                }
            });
        }
    }, [src]);

    return <LazyImageContainer className={className}>
        {
            loaded ? <Image src={imgSrc} /> : <LoadingImage
                speed={2}
                backgroundColor={isDarkMode ? "#10001e" : "#fffaff"}
                foregroundColor={isDarkMode ? "#270049" : "#fff0f9"}
            >
                <rect width="100%" height="100%" />
            </LoadingImage>
        }
    </LazyImageContainer>;
});

export default LazyImage;