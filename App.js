import React, { Component } from 'react';
import Main from './components/MainComponent';
// redux
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
const { persistor, store } = ConfigureStore();
// firebase
import { initializeApp } from 'firebase/app';
const firebaseConfig = { databaseURL: 'https://anhpht-505a1-default-rtdb.firebaseio.com/' };
initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;