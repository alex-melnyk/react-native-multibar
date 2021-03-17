import React, { useContext, useMemo } from 'react';
import { FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { MultiBarContext } from 'react-native-multibar';

const randomColor = () =>
  `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;

export const DemoScreen: React.FC = () => {
  const multiBarContext = useContext(MultiBarContext);

  const toggleButtonColor = useMemo(randomColor, []);

  const cards = useMemo(() => [...new Array(20)].map((v, idx) => ({
    color: randomColor()
  })), []);

  return (
    <View style={{flex: 1, paddingBottom: 50}}>
      <StatusBar
        barStyle="light-content"
      />
      <SafeAreaView
        style={{flex: 1}}
      >
        <View
          style={{
            width: '100%',
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              paddingBottom: 10,
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: '#00AF54'
              }}
              onPress={() => {
                multiBarContext.setExtrasVisible(!multiBarContext.extrasVisible);
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                }}
              >
                Toggle Multibar Through Context
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center'
            }}
          >
            <View
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: '#D7263D'
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  color: 'white'
                }}
              >
                State: {multiBarContext.extrasVisible ? 'Visible' : 'Hidden'}
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          data={cards}
          keyExtractor={(v, idx) => `card_item_${idx}`}
          renderItem={({ item, index }) => (
            <View
              style={{
                margin: 10,
                height: 100,
                borderRadius: 10,
                backgroundColor: item.color
              }}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}
