import * as React from 'react';
import { View } from 'react-native';

import { MultiBarOverlay } from '../MultiBarOverlay';
import { styles } from './Styles';
import { MultiBarPassThroughParams } from '../../context';

type Props = Pick<MultiBarPassThroughParams, 'params'>;

export const BottomTabBarWrapper: React.FC<Props> = ({
  children,
  params
}) => (
  <View
    pointerEvents="box-none"
    style={styles.container}
  >
    <MultiBarOverlay
      params={params}
    />
    {children}
  </View>
);
