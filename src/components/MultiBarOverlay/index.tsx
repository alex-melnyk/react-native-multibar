import * as React from 'react';
import { Animated } from 'react-native';

import { MultiBarContext } from '../../context';
import { styles } from './Styles';

const COMMON_DEGREES = 180;

type Props = {
  navigation?: any;
};

export const MultiBarOverlay: React.FC<Props> = ({ navigation }) => {
  const {
    data,
    extrasVisible,
    iconSize,
    overlayRadius,
    setExtrasVisible
  } = React.useContext(MultiBarContext);

  const iconSizeHalf = React.useMemo(() => iconSize / 2, [iconSize]);
  const surfaceSize = React.useMemo(() => (overlayRadius * 2) + iconSize, [iconSize, overlayRadius]);
  const surfaceSizeHalf = React.useMemo(() => surfaceSize / 2, [surfaceSize]);
  const angleStep = React.useMemo(() => COMMON_DEGREES / data.length, [data]);
  const animations = React.useMemo(() => data.map(() => new Animated.Value(extrasVisible ? 1 : 0)), [data]);

  React.useEffect(() => {
    // TODO: Implement animation switch.
    const animate = Animated.spring || Animated.timing;

    const animationsList = animations.map((anim, idx) => animate(anim, {
      toValue: extrasVisible ? 1 : 0,
      delay: idx * 150,
      useNativeDriver: false
    }));

    Animated.parallel(animationsList).start();
  }, [extrasVisible]);

  const itemsList = React.useMemo(() => data.map((extrasRender, idx) => {
    const handleTouchEnd = () => {
      setExtrasVisible(false);
    };

    const angle = COMMON_DEGREES + (angleStep * idx) + (angleStep / 2);

    const x = overlayRadius * Math.cos(angle * Math.PI / COMMON_DEGREES) + (surfaceSizeHalf - iconSizeHalf);
    const y = overlayRadius * Math.sin(angle * Math.PI / COMMON_DEGREES) + (surfaceSizeHalf);

    const left = animations[idx].interpolate({
      inputRange: [0, 1],
      outputRange: [surfaceSizeHalf - iconSizeHalf, x]
    });

    const top = animations[idx].interpolate({
      inputRange: [0, 1],
      outputRange: [surfaceSize, y]
    });

    const rotation = animations[idx].interpolate({
      inputRange: [0, 1],
      outputRange: [90, 0]
    });

    return (
      <Animated.View
        key={`extra_item_${idx}`}
        style={[styles.itemContainer, {
          left,
          top,
          width: iconSize,
          height: iconSize,
          transform: [
            { rotateZ: rotation }
          ]
        }]}
        onTouchEnd={handleTouchEnd}
      >
        {extrasRender({
          navigation
        })}
      </Animated.View>
    )
  }), [animations, angleStep, data, iconSize, overlayRadius, surfaceSizeHalf, iconSizeHalf]);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.container, {
        width: surfaceSize,
        height: surfaceSizeHalf * (surfaceSize / overlayRadius / 2)
      }]}
    >
      {itemsList}
    </Animated.View>
  );
};
