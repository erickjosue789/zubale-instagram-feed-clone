import React, { memo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import GradientIcon from './GradientIcon';

const HeartAnimation = ({ visible, position, scaleAnim, opacityAnim, rotateAnim, translateXAnim, translateYAnim }) => {
  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.heartContainer,
        {
          left: position.x,
          top: position.y,
          transform: [
            { translateX: translateXAnim },
            { translateY: translateYAnim },
            { scale: scaleAnim },
            { 
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })
            }
          ],
          opacity: opacityAnim,
        }
      ]}
    >
      <GradientIcon size={24} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heartContainer: {
    position: 'absolute',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
});

export default memo(HeartAnimation);
