import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './Styles';

type Props = Pick<TouchableOpacityProps, 'onPress'> & {
  color?: string;
  name: string;
  size?: number;
};

export const TouchIcon: React.FC<Props> = ({
  color,
  name,
  size,
  onPress
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
  >
    <FontAwesome
      name={name}
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </TouchableOpacity>
);
