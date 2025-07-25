import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Foundation, MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomBar = ({ activeTab = 'home', onTabPress }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const insets = useSafeAreaInsets();

  const handleTabPress = (tabName) => {
    setCurrentTab(tabName);
    onTabPress?.(tabName);
  };

  const TabButton = ({ name, iconSet: IconSet, iconName, isActive, onPress }) => (
    <TouchableOpacity 
      style={styles.tabButton} 
      onPress={() => handleTabPress(name)}
      activeOpacity={0.7}
    >
      <IconSet 
        name={iconName} 
        size={26} 
        color={isActive ? 'black' : '#8e8e93'} 
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabContainer}>
        {/* Home */}
        <TabButton
          name="home"
          iconSet={Foundation}
          iconName={currentTab === 'home' ? 'home' : 'home'}
          isActive={currentTab === 'home'}
        />
        
        {/* Search */}
        <TabButton
          name="search"
          iconSet={AntDesign}
          iconName="search1"
          isActive={currentTab === 'search'}
        />
        
        {/* Add/Create */}
        <TabButton
          name="add"
          iconSet={Feather}
          iconName="plus-square"
          isActive={currentTab === 'add'}
        />
        
        {/* Reels */}
        <TabButton
          name="reels"
          iconSet={MaterialCommunityIcons}
          iconName="movie"
          isActive={currentTab === 'reels'}
        />
        
        {/* Profile */}
        <View style={styles.profileContainer}>
          <TouchableOpacity 
            style={[
              styles.profileButton,
              currentTab === 'profile' && styles.profileButtonActive
            ]} 
            onPress={() => handleTabPress('profile')}
            activeOpacity={0.7}
          >
            <FontAwesome 
              name={currentTab === 'profile' ? 'user-circle' : 'user-circle-o'} 
              size={23} 
              color={currentTab === 'profile' ? 'black' : '#8e8e93'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#ebebebff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: 'row',
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    minHeight: 50,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  profileButtonActive: {
    // Puedes añadir estilos adicionales para cuando esté activo
  },
});

export default BottomBar;
