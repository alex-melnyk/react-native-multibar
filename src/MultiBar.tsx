import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { NavigationRoute, NavigationScreenProp, SafeAreaView } from 'react-navigation';

import { Colors } from './utils';
import { TabIcon } from './TabIcon';

import { MultibarStyles as Styles } from './Styles';

type Props = {
  style: StyleProp<ViewStyle>;
  navigation: NavigationScreenProp<NavigationRoute>;
  renderIcon: () => void;
  jumpTo: (routeKey: string) => void;
  activeTintColor: string;
  inactiveTintColor: string;
}

export const MultiBar: React.FC<Props> = ({
  style,
  navigation,
  activeTintColor = Colors.activeTintColor,
  inactiveTintColor = Colors.inactiveTintColor,
  renderIcon,
  jumpTo
}) => {
  const {
    index,
    routes
  } = navigation.state;

  const tabIcons = useMemo(() => routes.map((route, idx) => {
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
  }), [routes, renderIcon, activeTintColor, inactiveTintColor, jumpTo]);

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
        {tabIcons}
      </View>
    </SafeAreaView>
  );
};
