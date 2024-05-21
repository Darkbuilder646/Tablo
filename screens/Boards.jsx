import React, { useEffect, useState } from 'react';
import { ApiState } from '../Context/ApiProvider';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CreateButton from '../components/workspaces/CreateButton';
import DeleteBoard from '../components/boards/DeleteBoard';
import AddBoard from '../components/boards/AddBoard';
import RenameBoard from '../components/boards/RenameBoard';

const Boards = ({ route }) => {

  const navigation = useNavigation();
  const { idWorkspace, apiKey, token, membersParams } = route.params;
  const { fetchData, resetBoards, boards, setBoards, deleteData, createData, updateData} = ApiState();
  const [BoardName, setBoardName] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [BoardLastName, setBoardLastName] = useState("");
  //? Delete Modal
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  //? Add Modal
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  //? Rename Modal
  const [isRenameModalVisible, setRenameModaleVisible] = useState(false);
  console.log(membersParams)

  useEffect(() => {
    resetBoards();
    fetchData({
      apiPath: `organizations/${idWorkspace}/boards`,
      params: { key: apiKey, token },
      setter: setBoards
    });
  
    Promise.all(
      membersParams.map(async (memberId) => {
        const response = await fetch(`https://api.trello.com/1/members/${memberId}?key=${apiKey}&token=${token}`);
        const memberData = await response.json();
        return {
          id: memberData.id,
          fullName: memberData.fullName,
          avatarUrl: memberData.avatarHash ? `https://trello-members.s3.amazonaws.com/${memberData.id}/${memberData.avatarHash}/50.png` : `http://www.gravatar.com/avatar/${memberData.gravatarHash}.jpg`
        };
      })
    )
    .then((membersWithAvatars) => {
      setMembers(membersWithAvatars);
      console.log(membersWithAvatars);
    });
  
  }, [apiKey, membersParams]);

    //? ----- Delete Board -----
    const deteleBoard = (id) => {
      setSelectedBoardId(id);
      setDeleteModalVisible(true); 
    };
  
    const confirmDeleteBoard = () => {
      setDeleteModalVisible(false);
    };
  
    const cancelDeleteBoard = () => {
      setDeleteModalVisible(false);
    };

  //? ----- Add Board -----
  const addBoard = () => {
    setAddModalVisible(true);
  };

  const confirmAddBoard = () => {
    setBoardName(""); 
    setAddModalVisible(false);
  };

  const cancelAddBoard = () => {
    setBoardName(""); 
    setAddModalVisible(false);
  };

    //? ----- Rename Board -----
    const renameBoard = (id, name) => {
      setSelectedBoardId(id); 
      setBoardLastName(name);
      setRenameModaleVisible(true);
    }
  
    const confirmRenameBoard = () => {
      setRenameModaleVisible(false);
    };
  
    const cancelRenameBoard = () => {
      setRenameModaleVisible(false);
    };

  return (
    <View style={styles.container}>
      {boards.map(board => (
        <TouchableOpacity 
          key={board.id} 
          style={styles.card}
          onPress={() => {
            navigation.navigate('Listes', 
            { 
              idBoard: board.id, 
              apiKey, 
              token ,
              members,
            });
          }}
        >
          <Text style={styles.cardText}>{board.name}</Text>
          <TouchableOpacity onPress={() => renameBoard(board.id, board.name)} style={styles.icon}>
            <FontAwesome name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deteleBoard(board.id)} style={styles.icon}>
            <FontAwesome name="trash" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      <AddBoard
        isVisible={isAddModalVisible}
        onConfirm={confirmAddBoard}
        onCancel={cancelAddBoard}
        apiKey={apiKey}
        token={token}
        idOrganization={idWorkspace}
        createData={createData}
        setter={setBoards} 
      />
      <RenameBoard
        isVisible={isRenameModalVisible}
        onConfirm={confirmRenameBoard}
        onCancel={cancelRenameBoard}
        apiKey={apiKey}
        token={token}
        updateData={updateData}
        setter={setBoards} 
        id={selectedBoardId}
        placeholderText={BoardLastName}
      />
      <DeleteBoard
        isVisible={isDeleteModalVisible}
        onConfirm={confirmDeleteBoard}
        onCancel={cancelDeleteBoard}
        apiKey={apiKey}
        token={token}
        deleteData={deleteData}
        setter={setBoards} 
        id={selectedBoardId}
      />

      <CreateButton onPress={addBoard}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "row",
  },
  cardText: {
    fontSize: 18,
    flex: 1,
  },
  icon: {
    marginLeft: 20,
  },
});

export default Boards;