import React from 'reactn';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from 'react-apollo-hooks';
import ApolloClient from "apollo-client";
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import Navigation from './components/organisms/navigation';
import WelcomePage from './components/pages/welcome';

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://climbers4climbers.com:8080/graphql', credentials: 'include'}),
  cache: new InMemoryCache()
});

const App = () => {
  console.log("AppRender")
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navigation  loggedUser={null} isAuthenticated={false}/>
          <div className="nav-filler"></div>
          <Route exact path="/" component={WelcomePage} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
