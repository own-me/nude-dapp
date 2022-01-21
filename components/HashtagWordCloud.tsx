import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import { Wordcloud } from "@visx/wordcloud";

const SvgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const WordText = styled(Text)`
    cursor: pointer;
    &:hover {
        fill: yellow;
    }
`;

const colors = ["#6c27a5", "#c252d1", "#c73c9d"];

interface HashtagWordCloudProps {
    width: number;
    height: number;
    hashtags: string[];
}

export interface WordData {
    text: string;
    value: number;
}

const HashtagWordCloud = ({ width, height, hashtags }: HashtagWordCloudProps) => {

    const wordFreq = useCallback((text: string): WordData[] => {
        const words: string[] = text.replace(/\./g, "").split(/\s/);
        const freqMap: Record<string, number> = {};

        for (const w of words) {
            if (!freqMap[w]) freqMap[w] = 0;
            freqMap[w] += 1;
        }
        return Object.keys(freqMap).map((word) => ({ text: word, value: freqMap[word] }));
    }, []);

    const words = useMemo(() => wordFreq(hashtags.join(" ")), [hashtags, wordFreq]);

    const fontScale = scaleLog({
        domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
        range: [20, 150],
    });

    const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

    const fixedValueGenerator = () => 0.5;

    return (
        <SvgContainer>
            <Wordcloud
                words={words}
                width={width}
                height={height}
                fontSize={fontSizeSetter}
                font={"Rock Salt"}
                padding={10}
                spiral={"rectangular"}
                rotate={0}
                random={fixedValueGenerator}
            >
                {(cloudWords) =>
                    cloudWords.map((w, i) => (
                        <WordText
                            key={w.text}
                            fill={colors[i % colors.length]}
                            textAnchor={"middle"}
                            fontSize={w.size}
                            fontFamily={w.font}
                            transform={`translate(${w.x}, ${w.y})`}
                        >
                            {w.text}
                        </WordText>
                    ))
                }
            </Wordcloud>
        </SvgContainer>
    );
};

export default HashtagWordCloud;