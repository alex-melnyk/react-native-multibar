import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarWrapper, MultiBarButton, MultiBarProvider } from 'react-native-multibar';

import { TouchIcon } from './src/components';
import { DemoScreen } from './src/screens';

export default function App() {
  const Tab = React.useRef<ReturnType<typeof createBottomTabNavigator>>(createBottomTabNavigator()).current;

  return (
    <NavigationContainer>
      <MultiBarProvider
        overlayProps={{
          expandingMode: 'staging'
        }}
        data={[
          ({ params }) => (
            <TouchIcon
              name="chevron-left"
              color="#E24E1B"
              size={20}
              onPress={() => {
                if (params.canGoBack()) {
                  params.goBack();
                }
              }}
            />
          ),
          ({ params }) => (
            <TouchIcon
              name="flag"
              color="#E24E1B"
              size={20}
              onPress={() => {
              }}
            />
          ),
          ({ params }) => (
            <TouchIcon
              name="headphones"
              color="#E24E1B"
              size={20}
              onPress={() => {
              }}
            />
          ),
          ({ params }) => (
            <TouchIcon
              name="heart"
              color="#E24E1B"
              size={20}
              onPress={() => {
              }}
            />
          ),
          ({ params }) => (
            <TouchIcon
              name="star"
              color="#E24E1B"
              size={20}
              onPress={() => {
              }}
            />
          ),
          ({ params }) => (
            <TouchIcon
              name="music"
              color="#E24E1B"
              size={20}
              onPress={() => {
              }}
            />
          ),
        ]}
        initialExtrasVisible={false}
      >
        <Tab.Navigator
          tabBar={(props) => (
            <BottomTabBarWrapper params={props.navigation}>
              <BottomTabBar {...props} />
            </BottomTabBarWrapper>
          )}
        >
          <Tab.Screen
            name="Home"
            component={DemoScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="home"
                  style={{
                    fontSize: size,
                    color: color
                  }}
                />
              )
            }}
          />
          <Tab.Screen
            name="Likes"
            component={DemoScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="star"
                  style={{
                    fontSize: size,
                    color: color
                  }}
                />
              )
            }}
          />
          <Tab.Screen
            name="Center"
            component={DemoScreen}
            options={{
              tabBarLabel: '',
              tabBarButton: () => (
                <MultiBarButton
                  rotationDegrees={135}
                  style={{
                    backgroundColor: '#E24E1B'
                  }}
                >
                  <MaterialIcons
                    name="add"
                    style={{
                      fontSize: 32,
                      color: '#EDF2F4'
                    }}
                  />
                </MultiBarButton>
              )
            }}
          />
          <Tab.Screen
            name="Posts"
            component={DemoScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="message"
                  style={{
                    fontSize: size,
                    color: color
                  }}
                />
              )
            }}
          />
          <Tab.Screen
            name="Settings"
            component={DemoScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="settings"
                  style={{
                    fontSize: size,
                    color: color
                  }}
                />
              )
            }}
          />
        </Tab.Navigator>
      </MultiBarProvider>
    </NavigationContainer>
  );
}
