import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Animated,
  SafeAreaView,
} from 'react-native';
import { api } from '../services/api';
import PostCard from '../components/PostCard';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const POSTS_PER_PAGE = 5;

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const borderOpacity = useRef(new Animated.Value(0)).current;
  const scrollOffsetY = useRef(0);
  const headerVisible = useRef(true);
  const flatListRef = useRef(null);

  const animatedBannerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });

  const fetchPosts = async (pageNumber = 1, reset = false) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await api.get(`/posts?page=${pageNumber}&limit=${POSTS_PER_PAGE}`);
      const newPosts = response.data.filter(
        post => post.image?.startsWith('http') && post.avatar?.startsWith('http')
      );

      if (reset || pageNumber === 1) setPosts(newPosts);
      else setPosts(prev => [...prev, ...newPosts]);

      setHasMore(newPosts.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error('Error loading posts', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMorePosts = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage);
    }
  };

  const onRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchPosts(1, true);
  };

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    
    
    if (tabName === 'home' && activeTab === 'home') {
      
      if (scrollOffsetY.current > 0) {
        
        flatListRef.current?.scrollToOffset({ 
          offset: 0, 
          animated: true 
        });
        
        
        setTimeout(() => {
          onRefresh();
        }, 300);
        
        if (!headerVisible.current) {
          Animated.timing(headerTranslateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            headerVisible.current = true;
          });
        }
      }
    }
    
    console.log('Tab pressed:', tabName);
  };

  useEffect(() => {
    fetchPosts(1, true);
  }, []);

  const renderFooter = () =>
    loadingMore && hasMore ? (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#999" />
      </View>
    ) : null;

  if (loading && page === 1) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header translateY={headerTranslateY} borderOpacity={borderOpacity} />
      <Animated.View style={[styles.animatedBanner, { height: animatedBannerHeight }]}>
        <View style={styles.bannerContent} />
      </Animated.View>

      <FlatList
        ref={flatListRef}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshing={loading && page === 1}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
            listener: (event) => {
              const y = event.nativeEvent.contentOffset.y;
              const diff = y - scrollOffsetY.current;
              scrollOffsetY.current = y;

              if (y <= 0 && !headerVisible.current) {
                Animated.timing(headerTranslateY, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: true,
                }).start(() => {
                  headerVisible.current = true;
                });
              }

              if (diff < -10 && y > 150 && !headerVisible.current) {
                Animated.timing(headerTranslateY, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: true,
                }).start(() => {
                  headerVisible.current = true;
                });
              }

              if (diff > 10 && y > 100 && headerVisible.current) {
                Animated.timing(headerTranslateY, {
                  toValue: -100,
                  duration: 200,
                  useNativeDriver: true,
                }).start(() => {
                  headerVisible.current = false;
                });
              }

              Animated.timing(borderOpacity, {
                toValue: y <= 0 ? 0 : 1,
                duration: 150,
                useNativeDriver: false,
              }).start();
            },
          }
        )}
      />
      <BottomBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  animatedBanner: {
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 0,
    paddingBottom: 90,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default FeedScreen;
