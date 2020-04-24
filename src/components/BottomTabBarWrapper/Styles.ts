import { Dimensions, StyleSheet } from 'react-native';

const {
  width: screenWidth
} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: screenWidth,
    justifyContent: 'flex-end'
  }
});
