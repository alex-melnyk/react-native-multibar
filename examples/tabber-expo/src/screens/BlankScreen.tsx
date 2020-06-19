import React, { useMemo } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

const randomColor = () =>
  `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;

export const BlankScreen: React.FC = () => {
  const cards = useMemo(() => [...new Array(20)].map((v, idx) => ({
    color: randomColor()
  })), []);

  return (
    <SafeAreaView>
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
