import { NavigationContainer, useState, Animated } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './Screens/Register';
import LoginScreen from './Screens/Login';
import SessaoAdmin from './Screens/Admin';
import SessaoTrabalhador from "./Screens/Trabalhador";


const Stack = createNativeStackNavigator();

function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{contentStyle: {backgroundColor: '#3C6255'}}}>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Admin" component={SessaoAdmin} options={{headerShown: false}}/>
        <Stack.Screen name="Trabalhador" component={SessaoTrabalhador} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );

}

export default App;