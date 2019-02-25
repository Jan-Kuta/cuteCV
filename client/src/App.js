import React, { useContext, useReducer } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from 'react-apollo-hooks';
import ApolloClient from "apollo-client";
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import Navigation from './components/organisms/navigation';
import WelcomePage from './components/pages/welcome';
import Context from './context';
import reducer from './reducer';

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://climbers4climbers.com:8080/graphql', credentials: 'include'}),
  cache: new InMemoryCache()
});

const App = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState); 

  console.log({state});
  return (
    <ApolloProvider client={client}>
      <Router>
        <Context.Provider value={{state, dispatch}}>
          <div>
            <Navigation  loggedUser={null} isAuthenticated={false}/>
            <div className="nav-filler"></div>
            <Route exact path="/" component={WelcomePage} />
          </div>
        </Context.Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
