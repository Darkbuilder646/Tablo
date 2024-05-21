import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ApiState } from "../Context/ApiProvider";
import { FontAwesome } from "@expo/vector-icons";
import DeleteListModal from "../components/lists/DeleteListModal";
import RenameCardModal from "../components/card/RenameCardModal";
import DeleteCardModal from "../components/card/DeleteCardModal";
import RenameListModal from "../components/lists/RenameListModal";
import AddMemberModal from "../components/card/AddMemberModal";
import AddCard from "../components/card/AddCard";
import CreateButton from "../components/workspaces/CreateButton";
import CreateCard from "../components/card/CreateCard";
import AddList from "../components/lists/AddList";

const Lists = ({ route }) => {
  const { idBoard, apiKey, token, members } = route.params;
  const { fetchData, lists, resetLists, cards, setCards,  resetCards, setLists, deleteData, updateData, createData, closeList } = ApiState();
  const [openListId, setOpenListId] = useState(null);
  const [listName, setListName] = useState("");

  //? Delete Modal List
  const [isDeleteListModalVisible, setDeleteListModalVisible] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  //? Rename Modal List
  const [isRenameListModalVisible, setRenameListModalVisible] = useState(false);
  const [listLastName, setListLastName] = useState("");
  //? Delete Modal Card
  const [isDeleteCardModalVisible, setDeleteCardModalVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  //? Rename Modal Card
  const [isRenameCardModalVisible, setRenameCardModalVisible] = useState(false);
  const [cardLastName, setCardLastName] = useState("");
  //? Add Member Modal
  const [isAddMemberModalVisible, setAddMemberModalVisible] = useState(false);
  // ? Add card Modal
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [cardName, setCardName] = useState("");
  //? Add List Modal
  const [isAddListModalVisible, setAddListModalVisible] = useState(false);


  useEffect(() => {
    fetchData({
      apiPath: `boards/${idBoard}/lists`,
      params: {
        key: apiKey,
        token,
      },
      setter: setLists,
    });
    return () => {
      resetLists();
    };
  }, [apiKey]);

  const handlePress = (idList) => {
    if (openListId === idList) {
      setOpenListId(null);
    } else {
      resetCards();
      setOpenListId(idList);
      fetchData({
        apiPath: `lists/${idList}/cards`,
        params: {
          key: apiKey,
          token,
        },
        setter: setCards,
      });
    }
  };
  const addMemberToCardState = (cardId, memberId) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const card = newCards.find((c) => c.id === cardId);
      if (card) {
        card.idMembers.push(memberId);
      }
      return newCards;
    });
  };

  //? Delete list function
  const deleteList = (id) => {
    setSelectedListId(id);
    setDeleteListModalVisible(true);
  };

  const confirmDeleteList = () => {
    setDeleteListModalVisible(false);
  };

  const cancelDeleteList = () => {
    setDeleteListModalVisible(false);
  };

  //? Delete card function
  const deleteCard = (id) => {
    setSelectedCardId(id);
    setDeleteCardModalVisible(true);
  };

  const confirmDeleteCard = () => {
    setDeleteCardModalVisible(false);
  };

  const cancelDeleteCard = () => {
    setDeleteCardModalVisible(false);
  };

  //? Rename List function
  const renameList = (id, lastName) => {
    setSelectedListId(id);
    setListLastName(lastName);
    setRenameListModalVisible(true);
  };

  const confirmRenameList = () => {
    setRenameListModalVisible(false);
  };

  const cancelRenameList = () => {
    setRenameListModalVisible(false);
  };

  //? Rename Card function
  const renameCard = (id, lastName) => {
    setSelectedCardId(id);
    setCardLastName(lastName);
    setRenameCardModalVisible(true);
  };

  const confirmRenameCard = () => {
    setRenameCardModalVisible(false);
  };

  const cancelRenameCard = () => {
    setRenameCardModalVisible(false);
  };

  //? Add Member Function
  const addMember = (id) => {
    setSelectedCardId(id);
    setAddMemberModalVisible(true);
  };

  const confirmAddMember = () => {
    setAddMemberModalVisible(false);
  };

  const cancelAddMember = () => {
    setAddMemberModalVisible(false);
  };

  //? Add Card Function
    //? ----- Add Board -----
    const addCard = (id) => {
      setSelectedListId(id);
      setAddModalVisible(true);
    };
  
    const confirmAddCard = () => {
      setCardName(""); 
      setAddModalVisible(false);
    };
    const cancelAddCard = () => {
      setCardName(""); 
      setAddModalVisible(false);
    };
  
  //? Add List function
  const addList = (id) => {
    setSelectedListId(id);
    setAddListModalVisible(true);
  };
  
  const confirmAddList = () => {
    setListName(""); 
    setAddListModalVisible(false);
  };

  const cancelAddList = () => {
    setListName(""); 
    setAddListModalVisible(false);
  };


  return (
    <View style={styles.container}>
      {lists.map((list) => (
        <View key={list.id}>
          <View style={styles.list}>
            <View style={styles.listView}>
              <Text style={styles.cardText}>{list.name}</Text>
              <TouchableOpacity
                onPress={() => handlePress(list.id)}
                style={styles.icon}
              >
                <FontAwesome name="arrow-down" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => renameList(list.id, list.name)} style={styles.icon}>
                <FontAwesome name="pencil" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteList(list.id)}
                style={styles.icon}
              >
                <FontAwesome name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
            {openListId === list.id &&
              cards.map((card) => (
                <View key={card.id} style={styles.card}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.cardText}>{card.name}</Text>
                  <TouchableOpacity onPress={() => addMember(card.id)} style={styles.icon}>
                    <FontAwesome name="user-plus" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => renameCard(card.id, card.name)} style={styles.icon}>
                    <FontAwesome name="pencil" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteCard(card.id)}
                    style={styles.icon}
                  >
                    <FontAwesome name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
                  <View style={styles.iconAvatar}>
                   {/* Display member avatar */}
                    {card.idMembers.map((memberId) => {
                      const member = members.find((m) => m.id === memberId);
                      return (
                        <Image key={memberId} source={{ uri: member.avatarUrl }} style={styles.memberIcon} />
                      );
                    })}
                  </View>
                </View>
              ))}
              {openListId === list.id && <CreateCard onPress={() => addCard(list.id)} />}
          </View>
        </View>
        
      ))}

      <DeleteListModal
        apiKey={apiKey}
        token={token}
        closeList={closeList}
        isVisible={isDeleteListModalVisible}
        onConfirm={confirmDeleteList}
        onCancel={cancelDeleteList}
        id={selectedListId}
        setter={setLists}
        idBoard={idBoard}
      />
      <RenameListModal 
        isVisible={isRenameListModalVisible}
        onConfirm={confirmRenameList}
        onCancel={cancelRenameList}
        id={selectedListId}
        placeholderText={listLastName}
        apiKey={apiKey}
        token={token}
        setter={setLists}
        updateData={updateData}
      />

      <AddCard
        isVisible={isAddModalVisible}
        onConfirm={confirmAddCard}
        onCancel={cancelAddCard}
        apiKey={apiKey}
        token={token}
        idList={selectedListId}
        createData={createData}
        setter={setCards} 
      />
      <RenameCardModal 
        isVisible={isRenameCardModalVisible} 
        onConfirm={confirmRenameCard} 
        onCancel={cancelRenameCard} 
        id={selectedCardId}
        apiKey={apiKey}
        token={token}
        setter={setCards}
        updateData={updateData}
        placeholderText={cardLastName} 
      />
      <DeleteCardModal 
        isVisible={isDeleteCardModalVisible} 
        onConfirm={confirmDeleteCard} 
        onCancel={cancelDeleteCard} 
        id={selectedCardId} 
        apiKey={apiKey}
        token={token}
        setter={setCards}
        deleteData={deleteData}
      />
      <AddMemberModal
        isVisible={isAddMemberModalVisible}
        onConfirm={confirmAddMember}
        onCancel={cancelAddMember}
        members={members}
        id={selectedCardId}
        apiKey={apiKey}
        token={token}
        addMemberToCardState={addMemberToCardState}
      />
      <AddList
        isVisible={isAddListModalVisible}
        onConfirm={confirmAddList}
        onCancel={cancelAddList}
        apiKey={apiKey}
        token={token}
        idBoard={idBoard}
        createData={createData}
        setter={setLists}
      />
      <CreateButton onPress={addList}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
    elevation: 5,
  },
  listView: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    flex: 1,
  },
  icon: {
    marginLeft: 20,
  },
  memberIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
    borderRadius: 10,
  },
  iconAvatar: {
    flexDirection: 'row',
    marginTop: 10,
  },

});

export default Lists;
