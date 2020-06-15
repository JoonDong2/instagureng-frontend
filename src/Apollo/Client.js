import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';
import { Auth } from 'aws-amplify';

export default new ApolloClient({
    uri:"https://91wtlgl0v1.execute-api.ap-northeast-2.amazonaws.com/dev/apollo",
    //uri: "https://f6bb3ad5.ngrok.io/dev/apollo",
    clientState: {
        defaults: defaults,
        resolvers: resolvers
    },
    request: async operation => {
        const token = (await Auth.currentAuthenticatedUser()).signInUserSession.idToken.jwtToken;
        //console.log(token);
        return operation.setContext({
            headers: {
                "authorization": token
            }
        });
    }
});

