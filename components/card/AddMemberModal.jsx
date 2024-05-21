import { StyleSheet, TouchableOpacity, Modal, View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";

const AddMemberModal = ({ isVisible, onConfirm, onCancel, members, id, apiKey, token, addMemberToCardState}) => {


  const addMemberToCard = async ({ idCard, params }) => {
    const url = `https://api.trello.com/1/cards/${idCard}/idMembers?${new URLSearchParams(params)}`;
    console.log(url)
    const response = await fetch(url, { method: 'POST' });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  const handleConfirm = (memberId) => {
    addMemberToCard({
      idCard: id,
      params: {
        key: apiKey,
        token,
        value: memberId
      }
    });
    addMemberToCardState(id, memberId);
  }
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
              Ajouter un membre à la carte
            </Text>
            <View style={styles.memberList}>
              {members.map((member, index) => (
                <React.Fragment key={member.id}>
                  <TouchableOpacity style={styles.memberItem} onPress={() => handleConfirm(member.id)}>
                    {/* Icone du membre (cercle) */}
                    <Image source={{ uri: member.avatarUrl }} style={styles.memberIcon} />
                    {/* Nom du membre */}
                    <Text style={styles.memberName}>{member.fullName}</Text>
                  </TouchableOpacity>
                  {index !== members.length - 1 && <View style={styles.separator} />}
                </React.Fragment>
              ))}
            </View>
            {/* Bouton de confirmation */}
            <TouchableOpacity onPress={onConfirm} style={styles.modalButton}>
              <Text style={styles.buttonText}>Terminé</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
    //? Modal
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
      backgroundColor: "blue",
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

    //? Members
    memberList: {
      flexDirection: 'column',
      width: '80%',
    },
    memberItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    memberIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'lightgray',
      marginRight: 10,
    },
    memberName: {
      fontSize: 16,
    },
    separator: {
      height: 1,
      backgroundColor: 'lightgray',
      marginVertical: 5,
    },
  });

export default AddMemberModal;
