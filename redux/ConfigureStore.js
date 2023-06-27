import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { leaders } from './leaders';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { users } from './users';
import { doctors } from './doctors';
import { services } from './services';

const config = { key: 'root', storage: AsyncStorage, debug: true };

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, { leaders, dishes, comments, promotions, favorites, users, doctors, services }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};

