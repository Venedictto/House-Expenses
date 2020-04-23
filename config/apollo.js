import {ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    // @ts-ignore
    fetch
});

const authLink = setContext((_, {headers}) => {
    
    const token = localStorage.getItem('token');
    
    return {
        headers:{
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    // @ts-ignore
    link: authLink.concat(httpLink),
});



export default client;