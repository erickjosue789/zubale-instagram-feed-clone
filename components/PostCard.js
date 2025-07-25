import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PostHeader from './PostComponents/PostHeader';
import PostInteractions from './PostComponents/PostInteractions';
import PostFooter from './PostComponents/PostFooter';
import PostImage from './PostComponents/PostImage';

const PostCard = ({ post }) => {
    const [isLiked, setIsLiked] = useState(post.liked);
    const [likesCount, setLikesCount] = useState(post.likes);
    const [isSaved, setIsSaved] = useState(post.saved);

    const handleLikeToggle = (liked) => {
        setIsLiked(liked);
        
        if (liked && !post.liked) {
            setLikesCount(prev => prev + 1);
        } else if (!liked && post.liked) {
            setLikesCount(prev => prev - 1);
        }
    };

    const handleLikePress = () => {
        const newLikedState = !isLiked;
        setIsLiked(newLikedState);
        
        
        if (newLikedState) {
            
            if (!post.liked) {
                setLikesCount(prev => prev + 1);
            }
        } else {
            
            if (post.liked) {
                setLikesCount(prev => prev - 1);
            }
        }
    };

    const handleSavePress = () => {
        setIsSaved(!isSaved);
    };

    return (
        <View style={styles.card}>
            {/* Header */}
            <PostHeader avatar={post.avatar} name={post.name} location={post.location} />

            {/* Content Image */}
            <PostImage
                imageUri={post.image}
                style={styles.postImage}
                onLikeToggle={handleLikeToggle}
            />

            {/* Interaction */}
            <PostInteractions
                liked={isLiked}
                likes={likesCount}
                comments={post.comments}
                saved={isSaved}
                onLikePress={handleLikePress}
                onSavePress={handleSavePress}
            />

            {/* Footer */}
            <PostFooter
                name={post.name}
                description={post.description}
                createdAt={post.createdAt}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 2,
        backgroundColor: 'white',
        paddingBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 500,
    },
});

export default PostCard;
