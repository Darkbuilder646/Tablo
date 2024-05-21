import { StyleSheet, TouchableOpacity, Modal, View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

const RenameListModal = ({ isVisible, onConfirm, onCancel, placeholderText, apiKey, token, data, id,  setter, updateData}) => {
    const [listName, setListName] = useState("");
    const handleConfirm = () => {
        updateData({
            apiPath: `lists`,
            params: {
                key: apiKey,
                token,
                name: listName,
            },
            setter,
            id,
        });
    setListName("");
    onConfirm();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Renommer la liste
          </Text>
          <TextInput
            style={styles.input}
            value={listName}
            onChangeText={(text) => setListName(text)}
            placeholder={placeholderText}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleConfirm}
              style={[styles.modalButton, styles.confirmButton]}
            >
              <Text style={styles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.modalButton}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      width: "80%",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      width: '80%',
    },
    modalButton: {
      backgroundColor: "#f52d56",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      textAlign: "center",
    },
    buttonContainer: {
      marginTop: 10,
    },
    confirmButton: {
      backgroundColor: "blue",
    },
  });

export default RenameListModal;
