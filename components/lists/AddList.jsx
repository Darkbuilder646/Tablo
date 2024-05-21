import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const AddListModal = ({ isVisible, onConfirm, onCancel, apiKey, token, createData, setter, idBoard }) => {
  const [listName, setListName] = useState("");

  const handleConfirm = () => {
    createData({
      apiPath: 'lists',
      params: {
        key: apiKey,
        token,
        name: listName,
        idBoard
      },
      setter
    });
    setListName("");
    onConfirm(listName);
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
          <Text style={styles.modalText}>Ajouter une Liste</Text>
          <TextInput
            style={styles.input}
            value={listName}
            onChangeText={(text) => setListName(text)}
            placeholder="Nom de la Liste"
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
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#f52d56",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
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

export default AddListModal;
