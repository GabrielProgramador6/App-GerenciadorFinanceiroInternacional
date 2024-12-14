import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { fetchCoin } from '../api';
import { useFinacialContext } from '../Context/context';

const TransacaoItemList = ({ transacao }) => {
	const [onTap, setOnTap] = useState(false);

	const { coin } = useFinacialContext();

	const getValorColor = () => {
		return transacao.tipo === 'Despesa' ? '#FF6347' : '#4CAF50';
	};

	const { width } = useWindowDimensions();

	const isLandscape = width > 500;

	const singleTap = Gesture.Tap().onStart(() => {
		setOnTap((value) => !value);
	});

	return (
		<GestureDetector gesture={Gesture.Exclusive(singleTap)}>
			<>
				<View style={styles.container}>
					<View style={styles.infoContainer}>
						<Text style={styles.descricao}>{transacao.descricao}</Text>
						<Text style={[styles.valor, { color: getValorColor() }]}>
							{transacao.tipo === 'Despesa' ? '- ' : '+ '}
							{transacao.valor
								? transacao.valor.toLocaleString('pt-BR', {
										style: 'currency',
										currency: transacao.moeda,
								  })
								: transacao.valor}
						</Text>
					</View>

					<View style={styles.detalhesContainer}>
						<Text style={styles.detalhesText}>{transacao.data}</Text>
						{isLandscape && (
							<>
								<Text style={styles.detalhesText}>{transacao.hora}</Text>
								<Text style={styles.categoriaText}>{transacao.categoria}</Text>
								<Text style={styles.moedaText}>{transacao.moeda}</Text>
							</>
						)}
					</View>
				</View>

				{onTap && (
					<Text
						style={{
							backgroundColor: '#111',
							color: 'white',
							margin: 'auto',
							textAlign: 'center',
							paddingVertical: 40,
							fontSize: 21,
							fontWeight: 700,
							width: '100%',
						}}>
						{transacao.tipo === 'Despesa' ? '- ' : '+ '}
						{transacao.valor ? (
							<>
								{transacao.valor}
								<br />
								{
									coin?.value?.find(
										(item) => item?.simbolo === transacao?.moeda
									)?.nomeFormatado
								}
							</>
						) : // transacao.valor.toLocaleString('pt-BR', {
						// 		style: 'currency',
						// 		currency: transacao.moeda,
						//   })
						// transacao.valor
						null}
					</Text>
				)}
			</>
		</GestureDetector>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
		backgroundColor: '#fff',
	},
	infoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	descricao: {
		fontSize: 16,
		fontWeight: 'bold',
		flex: 1,
	},
	valor: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	detalhesContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
	detalhesText: {
		fontSize: 12,
		color: '#666',
		marginRight: 10,
	},
	categoriaText: {
		fontSize: 12,
		color: '#888',
		fontStyle: 'italic',
	},
	moedaText: {
		fontSize: 12,
		color: '#999',
		fontWeight: 'bold',
	},
});

export default TransacaoItemList;
