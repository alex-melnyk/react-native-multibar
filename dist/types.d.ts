/// <reference types="react" />
export declare type MultiBarOverlayProps = {
    iconSize?: number;
    overlayRadius?: number;
    expandingMode?: 'staging' | 'flat';
};
export declare type MultiBarPassThroughParams = {
    params?: any;
};
export declare type MultiBarExtrasRender = (props: MultiBarPassThroughParams) => React.ReactNode;
export declare type MultiBarContextProps = {
    data: MultiBarExtrasRender[];
    extrasVisible: boolean;
    overlayProps?: MultiBarOverlayProps;
    setExtrasVisible: (visible: boolean) => void;
};
