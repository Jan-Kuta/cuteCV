import React, { useContext, useReducer, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from 'react-apollo-hooks';
import ApolloClient from "apollo-client";
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import io from 'socket.io-client';
import Navigation from './components/organisms/navigation';
import Snackbar from './components/atoms/snackbar'
import WelcomePage from './components/pages/welcome';
import ConfirmPage from './components/pages/confirm';
import ResetPasswordPage from './components/pages/resetPassword';
import UserContext from './context/userContext';
import UserReducer from './reducer/userReducer';
import SnackbarContext from './context/snackbarContext';
import SnackbarReducer from './reducer/snackbarReducer';

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://climbers4climbers.com:8080/graphql', credentials: 'include'}),
  cache: new InMemoryCache()
});

const socket = io.connect(process.env.REACT_APP_API_URL, {transports: ['websocket']})

const App = () => {
  const initialUserState = useContext(UserContext);
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);

  const initialSnackbarState = useContext(SnackbarContext);
  const [snackbarSate, snackbarDispatch] = useReducer(SnackbarReducer, initialSnackbarState); 
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <UserContext.Provider value={{state: userState, dispatch: userDispatch}}>
          <SnackbarContext.Provider value={{state: snackbarSate, dispatch: snackbarDispatch}}>
            <Suspense fallback={<div>Loading...</div>}>
              <Snackbar />
              <Navigation  socket={socket}/>
              <div className="nav-filler"></div>
              <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route exact path='/confirm/:uuid' component={ConfirmPage} />
                <Route exact path='/resetPassword/:uuid' component={ResetPasswordPage} />
                </Switch>
            </Suspense>
          </SnackbarContext.Provider>
        </UserContext.Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
