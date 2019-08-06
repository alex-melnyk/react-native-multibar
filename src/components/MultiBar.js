import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '../utils';
import { TabIcon } from './TabIcon';
import { MultibarStyles } from './Styles';

const Styles = MultibarStyles;

const MultiBar = ({ style, navigation, activeTintColor, inactiveTintColor, renderIcon, jumpTo }) => {
  const {
    index,
    routes
  } = navigation.state;

  return (
    <SafeAreaView
      pointerEvents="box-none"
      style={Styles.container}
      forceInset={{
        top: 'never',
        bottom: 'always'
      }}
    >
      <SafeAreaView
        style={[Styles.fakeBackground, style]}
        forceInset={{
          top: 'never',
          bottom: 'always'
        }}
      >
        <View style={{ height: 49 }}/>
      </SafeAreaView>
      <View
        pointerEvents="box-none"
        style={Styles.content}
      >
        {routes.map((route, idx) => {
          const focused = index === idx;

          if (!route.params || !route.params.navigationDisabled) {
            return (
              <TabIcon
                key={route.key}
                route={route}
                renderIcon={renderIcon}
                focused={focused}
                activeTintColor={activeTintColor}
                inactiveTintColor={inactiveTintColor}
                onPress={() => (!route.params || !route.params.navigationDisabled) && jumpTo(route.key)}
              />
            );
          }

          const Icon = renderIcon({
            route,
            focused,
            tintColor: focused
              ? activeTintColor
              : inactiveTintColor
          });

          return {
            ...Icon,
            key: 'simple'
          };
        })}
      </View>
    </SafeAreaView>
  );
};

MultiBar.propTypes = {
  style: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  renderIcon: PropTypes.func.isRequired,
  jumpTo: PropTypes.func.isRequired,
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string
};

MultiBar.defaultProps = {
  activeTintColor: Colors.activeTintColor,
  inactiveTintColor: Colors.inactiveTintColor
};

export { MultiBar };