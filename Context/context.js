import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCoin } from '../api';

const Context = createContext();

export function FinancialContext({ children }) {
	const [transacoes, setTransacoes] = useState([
		{
			id: '1',
			descricao: 'Compra de livros técnicos',
			valor: 250.75,
			data: '15/01/2024',
			hora: '14:30',
			categoria: 'Educação',
			tipo: 'Despesa',
			moeda: 'USD',
		},
		{
			id: '2',
			descricao: 'Projeto de desenvolvimento web',
			valor: 5000.0,
			data: '20/01/2024',
			hora: '10:45',
			categoria: 'Freelance',
			tipo: 'Receita',
			moeda: 'EUR',
		},
		{
			id: '3',
			descricao: 'Almoço com cliente',
			valor: 75.5,
			data: '22/01/2024',
			hora: '12:15',
			categoria: 'Alimentação',
			tipo: 'Despesa',
			moeda: 'BRL',
		},
	]);

	const [coin, setCoin] = useState(null);

	useEffect(() => {
		async function fetch() {
			const data = await fetchCoin();
			setCoin(data);
		}

		fetch();
	}, []);

	const sharedValue = { transacoes, setTransacoes, coin };

	return <Context.Provider value={sharedValue}>{children}</Context.Provider>;
}

export function useFinacialContext() {
	const context = useContext(Context);

	if (!context) throw new Error('Error in Context API!');

	return context;
}
