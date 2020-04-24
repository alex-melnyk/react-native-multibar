import React from 'react';
import { View } from 'react-native';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { MultiBarOverlay } from '../MultiBarOverlay';
import { styles } from './Styles';

export const BottomTabBarWrapper: React.FC<BottomTabBarProps> = (props) => (
  <View
    pointerEvents="box-none"
    style={styles.container}
  >
    <MultiBarOverlay
      {...props}
    />
    <BottomTabBar {...props}/>
  </View>
);
