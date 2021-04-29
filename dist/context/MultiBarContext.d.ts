import * as React from 'react';
import { MultiBarContextProps, MultiBarOverlayProps } from '../types';
export declare const MultiBarContext: React.Context<MultiBarContextProps>;
declare type Props = Pick<MultiBarContextProps, 'data'> & {
    initialExtrasVisible?: boolean;
    overlayProps?: MultiBarOverlayProps;
};
export declare const MultiBarProvider: React.FC<Props>;
export {};
