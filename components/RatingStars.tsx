import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  value: number;
  size?: number;
  max?: number;
  onChange?: (value: number) => void; 
}

export default function RatingStars({ value, size = 20, max = 5, onChange }: Props) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars.map((n) => {
        const fill = Math.max(0, Math.min(1, value - (n - 1))) * 100; 

        const star = (
          <View style={{ width: size, height: size }}>
            <Text style={{ fontSize: size, lineHeight: size, color: '#ccc' }}>★</Text>
            <View
              style={{
                position: 'absolute', left: 0, top: 0,
                width: `${fill}%`, overflow: 'hidden',
              }}
            >
              <Text
                style={{ fontSize: size, lineHeight: size, color: '#fbc02d', width: size }}
                numberOfLines={1}
              >
                ★
              </Text>
            </View>
          </View>
        );

        return onChange ? (
          <TouchableOpacity key={n} onPress={() => onChange(n)} style={{ marginRight: 4 }}>
            {star}
          </TouchableOpacity>
        ) : (
          <View key={n} style={{ marginRight: 2 }}>{star}</View>
        );
      })}
    </View>
  );
}