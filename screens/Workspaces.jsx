import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthState } from "../Context/AuthProvider";
import { ApiState } from "../Context/ApiProvider";
import { FontAwesome } from "@expo/vector-icons";
import CreateButton from "../components/workspaces/CreateButton";
import AddWorkspaceModal from "../components/workspaces/AddWorkspaceModal";
import DeleteConfirmationModal from "../components/workspaces/DeleteConfirmationModal";
import RenameWorkspaceModal from "../components/workspaces/RenameWorkspaceModal";

const Workspaces = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [workspaceLastName, setWorkspaceLastName] = useState("");
  //? Delete Modal
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  //? Add Modal
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  //? Rename Modal
  const [isRenameModalVisible, setRenameModaleVisible] = useState(false);
  
  //? Other
  const navigation = useNavigation();
  const { userInfo, userID } = AuthState();
  const apiKey = userInfo.apiKey;
  const token = userInfo.token;
  const { workspaces, setWorkspaces, fetchData, createData, updateData, deleteData } = ApiState();

  useEffect(() => {
    if (userID) {
      fetchData({ 
        apiPath: `members/${userID}/organizations`, 
        params: { key: apiKey, token }, 
        setter: setWorkspaces 
      });    
    }
  }, [userID, apiKey, token]);

  
  //? ----- Delete Workspace -----
  const deleteWorkspace = (id) => {
    setSelectedWorkspaceId(id);
    setDeleteModalVisible(true); 
  };

  const confirmDeleteWorkspace = () => {
    setDeleteModalVisible(false);
  };

  const cancelDeleteWorkspace = () => {
    setDeleteModalVisible(false);
  };

  //? ----- Add Workspace -----
  const addWorkspace = () => {
    setAddModalVisible(true);
  };

  const confirmAddWorkspace = () => {
    setWorkspaceName(""); 
    setAddModalVisible(false);
  };

  const cancelAddWorkspace = () => {
    setWorkspaceName(""); 
    setAddModalVisible(false);
  };

  //? ----- Rename Workspace -----
  const renameWorkspace = (id, name) => {
    setSelectedWorkspaceId(id); 
    setWorkspaceLastName(name);
    setRenameModaleVisible(true);
  }

  const confirmRenameWorkspace = () => {
    setRenameModaleVisible(false);
  };

  const cancelRenameWorkspace = () => {
    setRenameModaleVisible(false);
  };

  return (
    <View style={styles.container}>
      {workspaces.map((workspace) => (
        <TouchableOpacity
          key={workspace.id}
          style={styles.card}
          onPress={() => {
            navigation.navigate("Tableaux", {
              idWorkspace: workspace.id,
              membersParams: workspace.memberships.map(membership => membership.idMember),
              apiKey,
              token,
            });
          }}
        >
          <Text style={styles.cardText}>{workspace.displayName}</Text>
          <TouchableOpacity onPress={() => renameWorkspace(workspace.id, workspace.displayName)} style={styles.icon}>
            <FontAwesome name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteWorkspace(workspace.id)} style={styles.icon}>
            <FontAwesome name="trash" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      <AddWorkspaceModal
        isVisible={isAddModalVisible}
        onConfirm={confirmAddWorkspace}
        onCancel={cancelAddWorkspace}
        apiKey={apiKey}
        token={token}
        createData={createData}
        setter={setWorkspaces} 
      />
      <RenameWorkspaceModal
        isVisible={isRenameModalVisible}
        onConfirm={confirmRenameWorkspace}
        onCancel={cancelRenameWorkspace}
        apiKey={apiKey}
        token={token}
        updateData={updateData}
        setter={setWorkspaces} 
        id={selectedWorkspaceId}
        placeholderText={workspaceLastName}
      />
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onConfirm={confirmDeleteWorkspace}
        onCancel={cancelDeleteWorkspace}
        apiKey={apiKey}
        token={token}
        deleteData={deleteData}
        setter={setWorkspaces} 
        id={selectedWorkspaceId}
      />
      <CreateButton onPress={addWorkspace} />
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

export default Workspaces;
