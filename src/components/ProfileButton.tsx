import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface ProfileButtonProps {
  onPress: () => void;
  size?: number;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onPress, size = 24 }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 8,
        marginRight: 8,
      }}
      activeOpacity={0.7}
    >
      <Ionicons 
        name="person-circle" 
        size={size} 
        color={colors.TEXT_WHITE} 
      />
    </TouchableOpacity>
  );
};

export default ProfileButton;
