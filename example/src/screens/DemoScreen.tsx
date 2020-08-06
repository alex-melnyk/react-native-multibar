import React, { useContext, useMemo } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
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
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: toggleButtonColor
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
          marginTop: 10,
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
      <View style={{ height: 20 }}/>
      <FlatList
        data={cards}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginHorizontal: 10,
              marginBottom: 10,
              height: 100,
              borderRadius: 10,
              backgroundColor: item.color
            }}
          />
        )}
        keyExtractor={(v, idx) => `card_item_${idx}`}
      />
    </SafeAreaView>
  );
}
