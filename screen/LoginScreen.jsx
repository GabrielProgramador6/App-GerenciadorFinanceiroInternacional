import React from 'react';
import { Button } from 'react-native';

export default function LoginScreen({ navigation }) {
	return (
		<Button
			title="Entrar"
			onPress={() => navigation.navigate('TransacaoList')}
		/>
	);
}
