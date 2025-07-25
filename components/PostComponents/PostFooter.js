import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { formatDate } from '../../utils/formatDate';

const PostFooter = ({ name, description, createdAt }) => {
  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.userName}>{name} </Text>
        {description}
      </Text>
      <Text style={styles.date}>{formatDate(createdAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 15,
  },
  userName:{
    fontWeight: 'bold'
  },
  date: {
    color: 'gray',
    fontSize: 12,
    marginTop: 4
  }
});

export default PostFooter;
