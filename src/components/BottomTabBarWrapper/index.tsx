import * as React from 'react';
import { View } from 'react-native';

import { MultiBarOverlay } from '../MultiBarOverlay';
import { styles } from './Styles';

type Props = {
  navigation?: any;
}

export const BottomTabBarWrapper: React.FC<Props> = ({
  children,
  navigation
}) => (
  <View
    pointerEvents="box-none"
    style={styles.container}
  >
    <MultiBarOverlay
      navigation={navigation}
    />
    {children}
  </View>
);
