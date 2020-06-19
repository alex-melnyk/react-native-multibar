export type MultiBarOverlayProps = {
  iconSize?: number;
  overlayRadius?: number;
  expandingMode?: 'staging' | 'flat'
};

export type MultiBarPassThroughParams = {
  params?: any;
};

export type MultiBarExtrasRender = (props: MultiBarPassThroughParams) => React.ReactNode;

export type MultiBarContextProps = {
  data: MultiBarExtrasRender[];
  extrasVisible: boolean;
  overlayProps?: MultiBarOverlayProps;
  setExtrasVisible: (visible: boolean) => void;
};
