import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CreateCard = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.addButton}>
      <Text style={styles.buttonText}>Ajouter une carte</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    addButton: {
      backgroundColor: '#008000',
      marginBottom: 5,
      marginTop: 10,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      width: '50%', 
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    }
  });

export default CreateCard;