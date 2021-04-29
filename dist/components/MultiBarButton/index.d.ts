import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
declare type Props = {
    rotationDegrees?: number;
    style?: StyleProp<ViewStyle>;
    onPress?: () => boolean | void;
};
export declare const MultiBarButton: React.FC<Props>;
export {};
