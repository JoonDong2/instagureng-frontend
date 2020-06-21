import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { ApolloProvider } from "@apollo/react-hooks";
import Client from './Apollo/Client';

import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'
import { AuthProvider } from './Contexts/AuthContext';

const amplifyConfiture = async () => {
    await Amplify.configure(aws_exports);
}

amplifyConfiture();

ReactDOM.render(
    <ApolloProvider client={Client}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ApolloProvider>
, document.getElementById('root'));