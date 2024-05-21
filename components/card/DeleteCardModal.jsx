import { StyleSheet, TouchableOpacity, Modal, View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const DeleteCardModal = ({ isVisible, onConfirm, onCancel, apiKey, token, id, deleteData, setter }) => {

  const handleConfirm = () => {
    deleteData({
      apiPath: 'cards',
      params: {
        key: apiKey,
        token
      },
      setter,
      id
    });
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
            Êtes-vous sûr de vouloir archiver cette card ?
          </Text>
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

export default DeleteCardModal;
