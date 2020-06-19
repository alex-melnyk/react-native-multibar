import * as React from 'react';
import { MultiBarContextProps, MultiBarOverlayProps } from '../types';

export const MultiBarContext = React.createContext<MultiBarContextProps>({} as MultiBarContextProps);

type Props = Pick<MultiBarContextProps, 'data'> & {
  initialExtrasVisible?: boolean;
  overlayProps?: MultiBarOverlayProps;
};

export const MultiBarProvider: React.FC<Props> = ({
  children,
  data,
  initialExtrasVisible = false,
  overlayProps
}) => {
  const [extrasVisible, setExtrasVisible] = React.useState(initialExtrasVisible);

  return (
    <MultiBarContext.Provider
      value={{
        data,
        extrasVisible,
        setExtrasVisible,
        overlayProps
      }}
    >
      {children}
    </MultiBarContext.Provider>
  );
};
