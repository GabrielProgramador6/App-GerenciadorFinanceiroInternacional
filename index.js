import { registerRootComponent } from 'expo';

import App from './App';

import React from 'react';
import { FinancialContext } from './Context/context';

export default function Main() {
	return (
		<FinancialContext>
			<App />
		</FinancialContext>
	);
}

registerRootComponent(Main);
