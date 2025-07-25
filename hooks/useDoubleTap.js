import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const DOUBLE_PRESS_DELAY = 300;
const ANIMATION_COOLDOWN = 2000;
const IMAGE_HEIGHT = 500;
const INTERACTION_PADDING = 15;

export const useDoubleTap = (onLikeToggle) => {
  const [showHeart, setShowHeart] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  const lastTap = useRef(null);
  const lastAnimationTime = useRef(null);
  const currentAnimation = useRef(null);
  const isAnimating = useRef(false);

  const stopPreviousAnimation = () => {
    if (currentAnimation.current) {
      currentAnimation.current.stop();
      currentAnimation.current = null;
    }
  };

  const resetAnimationValues = () => {
    scaleAnim.setValue(0);
    opacityAnim.setValue(1);
    rotateAnim.setValue(0);
    translateXAnim.setValue(0);
    translateYAnim.setValue(0);
  };

  const calculateMovement = ({ locationX, locationY }) => {
    const destination = {
      x: INTERACTION_PADDING,
      y: IMAGE_HEIGHT + 20,
    };

    return {
      deltaX: destination.x - locationX,
      deltaY: destination.y - locationY,
      centeredX: locationX - 12,
      centeredY: locationY - 12,
    };
  };

  const animateHeart = (deltaX, deltaY) => {
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 2.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(rotateAnim, { toValue: 0.083, duration: 100, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: -0.055, duration: 100, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: 0.028, duration: 80, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: -0.014, duration: 60, useNativeDriver: true }),
          Animated.timing(rotateAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
        ]),
      ]),

      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(translateXAnim, {
          toValue: deltaX+15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: deltaY,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(700),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 215,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]);
  };

  const handleDoubleTap = (event) => {
    const now = Date.now();

    if (
      lastTap.current &&
      now - lastTap.current < DOUBLE_PRESS_DELAY &&
      (!lastAnimationTime.current || now - lastAnimationTime.current > ANIMATION_COOLDOWN) &&
      !isAnimating.current
    ) {
      const { locationX, locationY } = event.nativeEvent;
      const { deltaX, deltaY, centeredX, centeredY } = calculateMovement({ locationX, locationY });

      stopPreviousAnimation();
      resetAnimationValues();

      setHeartPosition({ x: centeredX, y: centeredY });
      setShowHeart(true);
      isAnimating.current = true;
      lastAnimationTime.current = now;

      if (onLikeToggle) {
        onLikeToggle(false);
      }

      currentAnimation.current = animateHeart(deltaX, deltaY);
      
      setTimeout(() => {
        if (onLikeToggle) {
          onLikeToggle(true);
        }
      }, 1710);

      currentAnimation.current.start(({ finished }) => {
        if (finished) {
          setShowHeart(false);
          isAnimating.current = false;
          currentAnimation.current = null;
        }
      });

      lastTap.current = null;
    } else {
      lastTap.current = now;
    }
  };

  useEffect(() => {
    return () => {
      stopPreviousAnimation();
      isAnimating.current = false;
    };
  }, []);

  return {
    showHeart,
    heartPosition,
    scaleAnim,
    opacityAnim,
    rotateAnim,
    translateXAnim,
    translateYAnim,
    handleDoubleTap,
  };
};
