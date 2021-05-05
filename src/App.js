import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import InGame from "./components/InGame/InGame";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import RealHome from "./components/RealHome";
import Riddle from "./components/InGame/Riddle";
import Sudoku from "./components/InGame/Sudoku";
import CreateGame from "./components/CreateGame";
import Waiting from "./components/Waiting";
import LoadingHome from "./components/LoadingHome";
import setmap from "./components/setmap";
import Maths from "./components/InGame/Math";
import rsetmap from "./components/rsetmap";
import history from "./components/history";
import { color } from "./constants";
[];

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: null,
            title: "Home",
            headerStyle: {
              backgroundColor: color.primary,
            },
          }}
        />
        <Stack.Screen
          name="Waiting"
          component={Waiting}
          options={() => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
