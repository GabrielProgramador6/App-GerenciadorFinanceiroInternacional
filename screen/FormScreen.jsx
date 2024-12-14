import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useFinacialContext } from '../Context/context';

const TransacaoFormScreen = () => {
	const [descricao, setDescricao] = useState('');
	const [valor, setValor] = useState('');
	const [data, setData] = useState(new Date());
	const [hora, setHora] = useState(new Date());
	const [categoria, setCategoria] = useState('');
	const [tipo, setTipo] = useState('Despesa');
	const [moeda, setMoeda] = useState('BRL');

	const { transacoes, setTransacoes } = useFinacialContext();

	const categorias = [
		'Alimentação',
		'Saúde',
		'Transporte',
		'Educação',
		'Lazer',
		'Moradia',
		'Outros',
	];

	const moedas = ['BRL', 'USD', 'EUR', 'GBP', 'JPY', 'AUD'];

	const handleSalvarTransacao = () => {
		const novaTransacao = {
			descricao,
			valor: parseFloat(valor),
			data: data.toLocaleDateString(),
			hora: hora.toLocaleTimeString(),
			categoria,
			tipo,
			moeda,
		};

		setTransacoes((transacoes) => [...transacoes, novaTransacao]);

		setDescricao('');
		setValor('');
		setData(new Date());
		setHora(new Date());
		setCategoria('');
		setTipo('Despesa');
		setMoeda('BRL');
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.titulo}>Nova Transação</Text>

			<TouchableOpacity
				style={styles.botaoSalvar}
				onPress={handleSalvarTransacao}>
				<Text style={styles.textoBotao}>Salvar Transação</Text>
			</TouchableOpacity>

			<Text style={styles.label}>Descrição</Text>
			<TextInput
				style={styles.input}
				placeholder="Descrição da transação"
				value={descricao}
				onChangeText={setDescricao}
			/>

			<Text style={styles.label}>Valor</Text>
			<TextInput
				style={styles.input}
				placeholder="Valor da transação"
				keyboardType="numeric"
				value={valor}
				onChangeText={setValor}
			/>

			<Text style={styles.label}>Data (dd-mm-yyyy):</Text>
			<TextInput
				style={styles.input}
				onChangeText={setData}
				value={data}
				placeholder="Data (dd-mm-yyyy)"
			/>

			<Text style={styles.label}>Hora (hh:mm):</Text>
			<TextInput
				style={styles.input}
				onChangeText={setHora}
				value={hora}
				placeholder="Hora (hh:mm)"
			/>

			<Text style={styles.label}>Categoria</Text>
			<Picker
				selectedValue={categoria}
				onValueChange={(itemValue) => setCategoria(itemValue)}>
				{categorias.map((cat) => (
					<Picker.Item key={cat} label={cat} value={cat} />
				))}
			</Picker>

			<Text style={styles.label}>Tipo de Transação</Text>
			<Picker
				selectedValue={tipo}
				onValueChange={(itemValue) => setTipo(itemValue)}>
				<Picker.Item label="Despesa" value="Despesa" />
				<Picker.Item label="Receita" value="Receita" />
			</Picker>

			<Text style={styles.label}>Moeda</Text>
			<Picker
				selectedValue={moeda}
				onValueChange={(itemValue) => setMoeda(itemValue)}>
				{moedas.map((currency) => (
					<Picker.Item key={currency} label={currency} value={currency} />
				))}
			</Picker>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f5f5f5',
		minHeight: '100dvh',
	},
	titulo: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
		color: '#333',
	},
	label: {
		fontSize: 16,
		marginTop: 10,
		marginBottom: 5,
		color: '#666',
	},
	input: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
	},
	dateText: {
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
		textAlign: 'center',
	},
	botaoSalvar: {
		backgroundColor: '#3498db',
		padding: 15,
		borderRadius: 8,
		marginTop: 20,
	},
	textoBotao: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

export default TransacaoFormScreen;
