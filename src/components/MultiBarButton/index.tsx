import * as React from 'react';
import { Animated, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { MultiBarContext } from '../../context';
import { styles } from './Styles';

type Props = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => boolean | void;
};

export const MultiBarButton: React.FC<Props> = ({
  children,
  style,
  onPress
}) => {
  const { extrasVisible, setExtrasVisible } = React.useContext(MultiBarContext);
  const animated = React.useRef<Animated.Value>(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(animated, {
      toValue: extrasVisible ? 1 : 0,
      useNativeDriver: true
    }).start();
  }, [extrasVisible]);

  const handlePress = React.useCallback(() => {
    if (!onPress || !onPress()) {
      setExtrasVisible(!extrasVisible);
    }

  }, [extrasVisible]);

  const rotation = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Animated.View
        style={[styles.contentContainer, {
          transform: [
            {
              rotateZ: rotation
            }
          ]
        }, style]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};
