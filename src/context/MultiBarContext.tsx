import * as React from 'react';

type MultiBarExtrasRender = (props: {
  navigation: any;
}) => React.ReactNode;

export type MultiBarContextProps = {
  data: MultiBarExtrasRender[];
  extrasVisible: boolean;
  iconSize: number;
  overlayRadius: number;
  setExtrasVisible: (visible: boolean) => void;
};

export const MultiBarContext = React.createContext<MultiBarContextProps>({} as MultiBarContextProps);

type Props = Pick<MultiBarContextProps, 'data'> & {
  iconSize?: number;
  initialExtrasVisible?: boolean;
  overlayRadius?: number;
};

export const MultiBarProvider: React.FC<Props> = ({
  children,
  data,
  iconSize = 30,
  initialExtrasVisible = false,
  overlayRadius = 80
}) => {
  const [extrasVisible, setExtrasVisible] = React.useState(initialExtrasVisible);

  return (
    <MultiBarContext.Provider value={{
      data,
      extrasVisible,
      iconSize,
      overlayRadius,
      setExtrasVisible
    }}>
      {children}
    </MultiBarContext.Provider>
  );
};
