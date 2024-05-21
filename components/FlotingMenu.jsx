import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const FloatingMenu = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const toggleSubMenu = () => {
    console.log("Toggle submenu");
    setSubMenuVisible(!isSubMenuVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {toggleSubMenu}}
      >
        <FontAwesome
          name="gear"
          size={20}
          color="white"
          style={{ margin: 5 }}
        />
      </TouchableOpacity>
      {isSubMenuVisible && (
        <View style={styles.subMenu}>
          <TouchableOpacity style={styles.subMenuItem}>
            <FontAwesome name="plus" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.subMenuItem}>
            <FontAwesome name="trash" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#f52d56",
    width: 45,
    height: 45,
    position: "absolute",
    bottom: 25,
    right: 25,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subMenu: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 110, // ajuste la position verticale des boutons du sous-menu selon tes besoins
    right: 40,
},
subMenuItem: {
    backgroundColor: '#f52d56',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
},
});

export default FloatingMenu;
