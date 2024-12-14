async function fetchCoin() {
	const response = await fetch(
		'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json'
	);

	// const response = await fetch(
	// 	'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda=EUR&@dataCotacao=11-01-2024&$top=1&$format=json'
	// );

	const data = await response.json();

	console.log(data);

	if (!data) return Error('Error in fetching coin');

	return data;
}

export { fetchCoin };
