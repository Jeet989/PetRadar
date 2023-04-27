import React from 'react';
import { Dimensions } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';

interface Props {
    startColor?: string,
    endColor?: string
}

const Background: React.FC<Props> = ({ startColor = "#FFFFFF", endColor = "#5CBAB5" }: Props) => {
    return (
        <Svg height={Dimensions.get('window').height} width={Dimensions.get('window').width} style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }}>
            <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0" stopColor={startColor} />
                    <Stop offset="1" stopColor={endColor} />
                </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)" />

        </Svg>
    )
}

export default Background;