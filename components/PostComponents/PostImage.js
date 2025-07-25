import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDoubleTap } from '../../hooks/useDoubleTap';
import HeartAnimation from './HeartAnimation';
import ErrorStateImage from './ErrorStateImage';

const PostImage = ({ imageUri, style, onLikeToggle }) => {
  const [imageError, setImageError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  
  const {
    showHeart,
    heartPosition,
    scaleAnim,
    opacityAnim,
    rotateAnim,
    translateXAnim,
    translateYAnim,
    handleDoubleTap
  } = useDoubleTap(onLikeToggle);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleRetry = () => {
    setImageError(false);
    setRetryKey(prev => prev + 1);
  };

  if (imageError) {
    return <ErrorStateImage style={style} onRetry={handleRetry} />;
  }

  return (
    <View style={[style, styles.imageContainer]}>
      <TouchableOpacity 
        activeOpacity={1}
        onPress={handleDoubleTap}
        style={styles.touchableImage}
      >
        <Image 
          key={retryKey}
          // Temporary image replacement since the URLs from the endpoint are no longer working
          source={{ uri: "https://static.photos/blurred/1024x576/142" }}
          //source={{ uri: imageUri }}
          style={style}
          onError={handleImageError}
        />
      </TouchableOpacity>
      
      <HeartAnimation
        visible={showHeart}
        position={heartPosition}
        scaleAnim={scaleAnim}
        opacityAnim={opacityAnim}
        rotateAnim={rotateAnim}
        translateXAnim={translateXAnim}
        translateYAnim={translateYAnim}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  touchableImage: {
    width: '100%',
    height: '100%',
  },
});

export default PostImage;
