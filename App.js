/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Waiting from "./src/Waiting";
import LoadingHome from "./src/LoadingHome";
import Test from "./src/Test";
import Temp from "./src/Temp";

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Waiting"
          component={Waiting}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={() => ({
            headerShown: false,
          })}
        />
        {/* <Stack.Screen
          name="LoadingHome"
          component={LoadingHome}
          options={() => ({
            headerShown: false,
          })}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
