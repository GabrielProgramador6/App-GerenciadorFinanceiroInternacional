import React, { useEffect, useState } from 'react';
import {
	View,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	Pressable,
	ScrollView,
} from 'react-native';
import TransacaoItemList from '../components/TransacaoItemList';
import { useFinacialContext } from '../Context/context';
import { Picker } from '@react-native-picker/picker';

const TransacaoListScreen = ({ navigation }) => {
	const { transacoes } = useFinacialContext();
	const [tipo, setTipo] = useState('Receita');

	let sorted = transacoes;

	const filtrarTransacoesPorValor = () => {
		sorted = transacoes.sort((a, b) => b.valor - a.valor);

		return sorted;
	};

	const filtrarTransacoesPorTipo = () => {
		sorted = transacoes.sort((a, b) => a.valor - b.valor);

		return sorted;
	};

	const renderTransacao = ({ item }) => <TransacaoItemList transacao={item} />;

	const renderEmptyList = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>Nenhuma transação encontrada</Text>
		</View>
	);

	console.log(transacoes);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>Minhas Transações</Text>
				<Pressable onPress={() => navigation.navigate('Form')}>
					<Text style={styles.headerTitle}>Form</Text>
				</Pressable>
			</View>

			<View style={styles.headerContainer}>
				<Pressable onPress={filtrarTransacoesPorValor}>
					<Text style={styles.headerTitle}>Filter By Value</Text>
				</Pressable>

				<Pressable onPress={filtrarTransacoesPorTipo}>
					<Text style={styles.headerTitle}>Filter By Type</Text>
					<Picker
						selectedValue={tipo}
						onValueChange={(itemValue) => setTipo(itemValue)}>
						<Picker.Item label="Despesa" value="Despesa" />
						<Picker.Item label="Receita" value="Receita" />
					</Picker>
				</Pressable>
			</View>

			<FlatList
				data={sorted}
				renderItem={renderTransacao}
				keyExtractor={(item, i) => item.id + i}
				ListEmptyComponent={renderEmptyList}
				contentContainerStyle={styles.listContainer}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	headerContainer: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerTitle: {
		backgroundColor: '#3498db',
		paddingHorizontal: 20,
		paddingVertical: 5,
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	},
	listContainer: {
		flexGrow: 1,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50,
	},
	emptyText: {
		fontSize: 18,
		color: '#999',
	},
});

export default TransacaoListScreen;
