import React, { useContext, useReducer, Suspense } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from 'react-apollo-hooks';
import ApolloClient from "apollo-client";
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import io from 'socket.io-client';
import Navigation from './components/organisms/navigation';
import WelcomePage from './components/pages/welcome';
import UserContext from './context/userContext';
import reducer from './reducer/userReducer';

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://climbers4climbers.com:8080/graphql', credentials: 'include'}),
  cache: new InMemoryCache()
});

const socket = io.connect(process.env.REACT_APP_API_URL, {transports: ['websocket']})

const App = () => {
  const initialState = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState); 
  
  console.log({state});
  return (
    <ApolloProvider client={client}>
      <Router>
        <UserContext.Provider value={{state, dispatch}}>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation  socket={socket}/>
            <div className="nav-filler"></div>
            <Route exact path="/" component={WelcomePage} />
          </Suspense>
        </UserContext.Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
