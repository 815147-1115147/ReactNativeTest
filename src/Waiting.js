/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
//import database from "@react-native-firebase/database";
import MMKVStorage from "react-native-mmkv-storage";

import { color } from "../constants.json";
//import { deleteGame, getGame } from "./Helper/server";
//import useInterval from "./Helper/useInterval";
import useInterval from "./useInterval";
//import { wsSend } from "../App";

export default Waiting = ({ navigation }) => {
  const MMKV = new MMKVStorage.Loader().initialize();

  //const [game, setGame] = useState(MMKV.getMap("joinedGame"));
  const [roomInfo, setRoomInfo] = useState(null);
  const [playerView, setPlayersView] = useState([]);
  //   const gameID = MMKV.getString("gameID");
  //   const userID = MMKV.getString("userID");
  const gameID = "gameID";
  const userID = "userID";
  let status;
  let playerList = [];
  
  var Player = function() {
    this.pid = pid;
    this.name = name;
  };

  var game = {
      gid: "Game ID",
      gname: "gameName",
      status: "PREPARE",
      //hostID: MMKV.getString("userID"),
      hostID: "pid1",
      //hostName: MMKV.getString("userName"),
      hostName: "userName1",
      checkpoints: [
          {
              cp1: "cp1",
              cp2: "cp2",
              cp3: "cp3",
              cp4: "cp4",
              cp5: "cp5",
          },
        ],
      players: [
          {
            //   pid: MMKV.getString("userID"),
            //   name: MMKV.getString("userName"),
            //   avatar: "None",
            pid: "pid1",
            name: "userName1",
            avatar: "None1",
          },
          {
            pid: "pid2",
            name: "userName2",
            avatar: "None2",
          },
          {
            pid: "pid3",
            name: "userName3",
            avatar: "None3",
          },
          {
            pid: "pid4",
            name: "userName4",
            avatar: "None4",
          },
          {
            pid: "pid5",
            name: "userName5",
            avatar: "None5",
          },
          {
            pid: "pid6",
            name: "userName6",
            avatar: "None6",
          },
          {
            pid: "pid7",
            name: "userName7",
            avatar: "None7",
          },
          {
            pid: "pid8",
            name: "userName8",
            avatar: "None8",
          }
        ],
      teams: ["RED", "BLUE"],
    };

  const deleteRoom = () => {
    deleteGame.then(() => {
      MMKV.removeItem("gameID");
      database().ref(`games/${gameID}`).set(null);
      database()
        .ref("users/" + userID)
        .update({ status: "ONLINE" });
    });
    navigation.replace("Home");
  };

  useInterval(() => {
    setRoomInfo(MMKV.getMap("roomInfo"));
  }, 100);

  useEffect(() => {
    let list = [];
    game.players.map((value) => list.push(value.name));
    playerList = list;
    setPlayersView(renderPlayersList());
  }, []);

  useEffect(() => {
    if (roomInfo == null) return;
    status = roomInfo.status;
    let game = MMKV.getMap("joinedGame");
    game.players = roomInfo.players;
    let list = [];
    roomInfo.players.map((value) => {
      list.push(value.name);
      if (value.team != null) {
        if (value.pid === MMKV.getString("userID")) {
          MMKV.setString("team", value.team);
          MMKV.setInt("key", value.key);
        }
      }
    });
    playerList = list;
    setPlayersView(renderPlayersList());
    if (status === "RUNNING") {
      navigation.replace("InGame");
      return;
    }
  }, [roomInfo]);

  const renderPlayersList = () => {
    if (playerList.length === 0) return;
    let list = [],
      i;
    for (i = 0; i + 1 < playerList.length; i += 2) {
      list.push(
        <View style={styles.playerListRowConatiner} key={i % 2}>
          <View style={styles.leftPlayer} key={i}>
            <Text style={styles.headerText} key={i}>
              {playerList[i]}
            </Text>
          </View>
          <View style={styles.rightPlayer} key={i + 1}>
            <Text style={styles.headerText} key={i + 1}>
              {playerList[i + 1]}
            </Text>
          </View>
        </View>
      );
    }
    if (i < playerList.length) {
      list.push(
        <View style={styles.playerListRowConatiner} key={i % 2}>
          <View style={styles.leftPlayer} key={i}>
            <Text style={styles.headerText} key={i}>
              {playerList[i]}
            </Text>
          </View>
        </View>
      );
    }
    return list;
  };

  const renderButton = () => {
    if (MMKV.getString == "PREPARE_HOST") {
      return <Button containerstyle={styles.button} title={"Confirm"}></Button>;
    }
  };

  const handleOnPressStart = () => {
    wsSend("header: ");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {`${game.hostName}'s Room`}
          {`\nRoom ID: ${game.gid}`}
        </Text>
      </View>
      <ScrollView style={styles.playersListContainer}>{playerView}</ScrollView>
      <Button
        title={"Confirm"}
        containerStyle={styles.button}
        titleStyle={{ color: "white", fontSize: 24 }}
        buttonStyle={{ backgroundColor: color.brown }}
        onPress={() => {
          //wsSend(JSON.stringify({ header: "START", content: gameID }));
          console.log("start");
        }}
      ></Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.offWhite,
    flex: 1,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 70,
    height: "10%",
    backgroundColor: "#00000080",
    width: "48%",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    alignContent: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
  },
  playersListContainer: { height: "60%" },
  button: {
    height: 50,
    width: "50%",
    marginVertical: 50,
    alignSelf: "center",
    color: color.brown,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.37,
    shadowRadius: 15,
    elevation: 5,
  },
  playerListRowConatiner: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftPlayer: {
    flex: 0.36,
    height: "100%",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "#00000080",
    alignContent: "center",
    justifyContent: "center",
  },
  rightPlayer: {
    flex: 0.36,
    height: "100%",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: "#00000080",
    alignContent: "center",
    justifyContent: "center",
  },
});
