import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screen/LoginScreen';
import TransacaoListScreen from './screen/TransacaoListScreen';
import FormScreen from './screen/FormScreen';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="TransacaoList" component={TransacaoListScreen} />
				<Stack.Screen name="Form" component={FormScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
