import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { TabIconStyles } from './Styles';

const Styles = TabIconStyles;

type Props = {
  route: object;
  renderIcon: object;
  activeTintColor: string;
  inactiveTintColor: string;
  focused?: boolean;
  onPress?: () => void;
};

export const TabIcon: React.FC<Props> = ({
  route,
  renderIcon,
  focused,
  activeTintColor,
  inactiveTintColor,
  onPress
}) => {
  const icon = useMemo(() => renderIcon({
    route,
    focused,
    tintColor: focused
      ? activeTintColor
      : inactiveTintColor
  }), [renderIcon, route, focused, activeTintColor, inactiveTintColor]);

  return (
    <TouchableOpacity
      style={Styles.tabStyle}
      onPress={() => onPress && onPress()}
    >
      {icon}
      {route.params && (
        <Text
          style={[
            Styles.labelStyle,
            { color: focused ? activeTintColor : inactiveTintColor }
          ]}
        >
          {route.params.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
