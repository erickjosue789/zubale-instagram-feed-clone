import React from 'react';
import { View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const GradientIcon = ({ size = 60 }) => {
  return (
    <MaskedView
      maskElement={
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name="heart" size={size} color="black" />
        </View>
      }
    >
      <LinearGradient
        colors={['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5']} // estilo Instagram
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: size, height: size }}
      />
    </MaskedView>
  );
};

export default GradientIcon;
