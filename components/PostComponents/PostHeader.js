import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostHeader = ({ avatar, name, location }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.header}>
      <Image 
        source={imageError || !avatar ? require('../../assets/imgs/userDefault.jpg') : { uri: avatar }} 
        style={styles.avatar}
        onError={handleImageError}
      />
      <View>
        <Text style={styles.name}>{name}</Text>
        {location ? <Text style={styles.location}>{location}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 30, 
    height: 30, 
    borderRadius: 20, 
    marginRight: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  location: {
    fontSize: 12,
    color: 'gray',
  },
});

export default PostHeader;
