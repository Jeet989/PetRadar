import React from 'react';
import { StatusBar } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigation from './src/navigation';
import { persistor, store } from './src/redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar animated={true} barStyle={'dark-content'} backgroundColor={'white'} />
        <RootNavigation />
        <Toast />
      </PersistGate>
    </Provider>
  )
}

export default App;