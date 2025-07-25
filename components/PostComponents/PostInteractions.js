import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { formatNumber } from '../../utils/formatNumbers';

const PostInteractions = ({ liked, likes, comments, saved, onLikePress, onSavePress }) => {
  const likeScale = useRef(new Animated.Value(1)).current;
  const saveScale = useRef(new Animated.Value(1)).current;

  const animateButton = (scale) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLikePress = () => {
    animateButton(likeScale);
    onLikePress?.();
  };

  const handleSavePress = () => {
    animateButton(saveScale);
    onSavePress?.();
  };

  return (
    <View style={styles.interactionRow}>
      <TouchableOpacity onPress={handleLikePress} activeOpacity={0.7}>
        <Animated.View style={{ transform: [{ scale: likeScale }] }}>
          <FontAwesome name={liked ? "heart" : "heart-o"} size={24} color={liked ? "red" : "black"} />
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.count}>{formatNumber(likes)}</Text>
      
      <TouchableOpacity activeOpacity={0.7}>
        <Feather name="message-circle" size={24} color="black" style={{ transform: [{ scaleX: -1 }] }}/>
      </TouchableOpacity>
      <Text style={styles.count}>{formatNumber(comments)}</Text>
      
      <TouchableOpacity activeOpacity={0.7}>
        <Feather name="send" size={24} color="black" />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleSavePress} style={[styles.iconButton, styles.saveIcon]} activeOpacity={0.7}>
        <Animated.View style={{ transform: [{ scale: saveScale }] }}>
          <FontAwesome name={saved ? "bookmark" : "bookmark-o"} size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  interactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 5,
    marginVertical: 10,
  },
  count: {
    marginRight: 10,
    fontWeight: 600
  },
  saveIcon: {
    marginLeft: 'auto',
    marginRight: 0,
  },
});

export default PostInteractions;
