import React from "react";
import { SafeAreaView, Text, StyleSheet, View, ActivityIndicator } from "react-native";
// import auth from "@react-native-firebase/auth";
// import database from "@react-native-firebase/database";

// import MMKVStorage from "react-native-mmkv-storage";

function Spinner(props) {
    return (
        <View style={[styles.container, props.style]}>
            <ActivityIndicator style={styles.activityIndicator1}></ActivityIndicator>
        </View>
    );
}

export default LoadingHome = ({ navigation }) => {
    //   const MMKV = new MMKVStorage.Loader().initialize();
    //   MMKV.clearStore();
    let userID, userName, userStatus, gameID;
    //   async function getDataFromDB() {
    //     userID = auth().currentUser.uid;
    //     database()
    //       .ref(`users/${userID}`)
    //       .once("value")
    //       .then((snapshot) => {
    //         userName = snapshot.child("username").val();
    //         userStatus = snapshot.child("status").val();
    //         gameID = snapshot.child("gameID").val();
    //       })
    //       .then(() => {
    //         setLocal();
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    //   }
    //   async function setLocal() {
    //     console.log(userID, userName);
    //     await MMKV.setStringAsync("userID", userID);
    //     await MMKV.setStringAsync("userName", userName);
    //     if (userStatus === "OFFLINE") {
    //       userStatus = "ONLINE";
    //       database().ref(`users/${userID}`).update({ status: "ONLINE" });
    //     }
    //     await MMKV.setStringAsync("userStatus", userStatus);
    //     if (gameID != null) {
    //       MMKV.setString("userGameID", gameID);
    //     }
    //     await navigation.replace("Home");
    //   }
    //   const temp = async () => {
    //     await getDataFromDB();
    //   };
    //   temp();
    return (
        <SafeAreaView>
            <Text>Loading</Text>
            <View style={styles.container}>
                <Spinner style={styles.Spinner}></Spinner>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        // justifyContent: "center"
        flex: 1
    },
    Spinner: {
        width: 22,
        height: 22,
        marginTop: 340,
        marginLeft: 151
    },
    activityIndicator1: {
        width: 22,
        height: 22
    }
});