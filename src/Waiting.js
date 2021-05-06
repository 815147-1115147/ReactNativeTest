/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet, View, Image} from "react-native";
import { Avatar, Button, Card} from "react-native-elements";
//import database from "@react-native-firebase/database";
import MMKVStorage from "react-native-mmkv-storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { color } from "../constants.json";
//import { deleteGame, getGame } from "./Helper/server";
//import useInterval from "./Helper/useInterval";
import useInterval from "./useInterval";
//import { Icon } from "react-native-elements/dist/icons/Icon";
import Icon from "react-native-vector-icons";
//import { wsSend } from "../App";
// AsyncStorage.clear();

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

  var Player = function () {
    this.pid = pid;
    this.name = name;
  };

  var game = {
    gid: "Game ID",
    gname: "gameName",
    status: "PREPARE",
    //hostID: MMKV.getString("userID"),
    hostID: "userID",
    //hostName: MMKV.getString("userName"),
    hostName: "userName",
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
      //   {
      //     pid: "pid4",
      //     name: "userName4",
      //     avatar: "None4",
      //   },
      //   {
      //     pid: "pid5",
      //     name: "userName5",
      //     avatar: "None5",
      //   },
      //   {
      //     pid: "pid6",
      //     name: "userName6",
      //     avatar: "None6",
      //   },
      //   {
      //     pid: "pid7",
      //     name: "userName7",
      //     avatar: "None7",
      //   },
      //   {
      //     pid: "pid8",
      //     name: "userName8",
      //     avatar: "None8",
      //   }
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
    //game.players.map((value) => list.push(value.name));
    playerList = ["Player1", "Player2", "Player3", "Player4", "Player5", "Player6", "Player7", "Player8", "Player9", "Player10"];
    setPlayersView(renderPlayersList());
  }, []);

  useEffect(() => {
    if (roomInfo == null) return;
    status = roomInfo.status;
    //let game = MMKV.getMap("joinedGame");
    game.players = roomInfo.players;
    //let list = [];
    // roomInfo.players.map((value) => {
    //   list.push(value.name);
    //   if (value.team != null) {
    //     if (value.pid === MMKV.getString("userID")) {
    //       MMKV.setString("team", value.team);
    //       MMKV.setInt("key", value.key);
    //     }
    //   }
    // });
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
            <Card containerStyle={{ borderTopRightRadius: 50, borderBottomRightRadius: 50, width: "100%", height: 100, backgroundColor:"FFFFFF"}}>
              <View>
                <Text style={styles.RplayerName} key={i}>
                  {playerList[i]}
                </Text>
                <Image source={{
                  uri: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/7bbe5762c79ee0ad11c1267483b4a2d5e12868de779eaf751e8e86596e978bbb._V_SX1080_.jpg",
                }}
                >
                </Image>
              </View>
            </Card>
          </View>
          <View style={styles.rightPlayer} key={i + 1}>
            <Avatar
              rounded

              source={{
                uri: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/7bbe5762c79ee0ad11c1267483b4a2d5e12868de779eaf751e8e86596e978bbb._V_SX1080_.jpg",
              }}
            //icon={{name: 'home'}}
            />
            <Text style={styles.RplayerName} key={i + 1}>
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
            <Text style={styles.LplayerName} key={i}>
              {playerList[i]}
            </Text>
            <Avatar
              rounded
              source={{
                uri: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/7bbe5762c79ee0ad11c1267483b4a2d5e12868de779eaf751e8e86596e978bbb._V_SX1080_.jpg",
              }}
            //icon={{name: 'home'}}
            />
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
        <Avatar
          rounded
          //style={{alignSelf: "center"}}
          source={{
            uri: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/7bbe5762c79ee0ad11c1267483b4a2d5e12868de779eaf751e8e86596e978bbb._V_SX1080_.jpg",
          }}
        //icon={{name: 'home'}}
        />
      </View>
      <ScrollView style={styles.playersListContainer}>{playerView}</ScrollView>
      <Button
        title={"Confirm"}
        containerStyle={styles.button}
        titleStyle={{ color: "white", fontSize: 24 }}
        buttonStyle={{ backgroundColor: color.brown }}
        onPress={() => {
          //wsSend(JSON.stringify({ header: "START", content: gameID }));
          console.log("start" + gameID);
        }}
      ></Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    //backgroundColor: color.offWhite,
    backgroundColor: color.darkGrey,
    flex: 1,
  },
  headerContainer: {
    marginTop: "10%",
    marginBottom: "20%",
    height: "10%",
    backgroundColor: "#00000080",
    width: "50%",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    //alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "700",
    width: "90%",
    color: "white",
    textAlign: "left",
    textAlignVertical: "center",
    paddingLeft: "10%",
  },
  LplayerName: {
    fontSize: 14,
    fontWeight: "700",
    width: "70%",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    paddingLeft: "10%",
  },
  RplayerName: {
    fontSize: 14,
    fontWeight: "700",
    width: "70%",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    paddingRight: 5,
  },
  playersListContainer: { height: "60%" },
  button: {
    height: 60,
    width: "50%",
    marginVertical: 30,
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
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  leftPlayer: {
    //flex: 0.36,
    flexDirection: "row",
    width: "40%",
    height: "100%",
    backgroundColor: "#00000080",
    alignContent: "center",
    justifyContent: "center",
  },
  rightPlayer: {
    //flex: 0.36,
    flexDirection: "row",
    width: "40%",
    height: "100%",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: "#00000080",
    alignContent: "center",
    justifyContent: "center",
  },
});
