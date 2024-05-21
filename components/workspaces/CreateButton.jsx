import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CreateButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.addButton}>
      <FontAwesome name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#8A8A8A',
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
  }
});

export default CreateButton;
