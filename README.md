# React Native MultiBar

> This module provides the functionality to implement extended actions by adding a custom tab bar with an advanced button.

[![NPM Version][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/react-native-multibar.svg
[npm-url]: https://www.npmjs.com/package/react-native-multibar

![Preview](./PREVIEW.gif?raw=true "Preview")

## Example
There is an example how to use the react-native-multibar [Tabber Expo](https://github.com/alex-melnyk/tabber-expo) or [Tabber RN](https://github.com/alex-melnyk/Tabber)

## Install

```bash
yarn add react-native-multibar
```
or
```bash
npm i react-native-multibar
```

## Usage

```javascript
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
```

## License (MIT)

Copyright 2021 Melnyk Aleksandr Viktorovych

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
