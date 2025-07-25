import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const Header = ({ translateY, borderOpacity }) => {
  return (
    <>
      <View style={styles.topOverlay} />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.borderContainer,
            {
              borderBottomColor: borderOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.06)'],
              }),
            },
          ]}
        >
          <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Zubagram</Text>
              <View style={styles.iconRow}>
                <TouchableOpacity style={styles.iconSpacing}>
                  <AntDesign name="hearto" size={22} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome6 name="facebook-messenger" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  topOverlay: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight+6 : 60,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: Platform.OS === 'ios' ? 1001 : 999, // Adjust zIndex for iOS
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  borderContainer: {
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight+4 : 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 12,
  },
});

export default Header;
