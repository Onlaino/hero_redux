import { configureStore } from '@reduxjs/toolkit';
import filter from '../components/heroesFilters/filtersSlice';
import heroes from '../components/heroesList/heroesSlice';

const stringMiddleWare = () => {
	return next => {
		return action => {
			if (typeof action === 'string') {
				return next({
					type: action,
				});
			}
			return next(action);
		};
	};
};

const enhancer =
	createStore =>
	(...args) => {
		const store = createStore(...args);
		const oldDispatch = store.dispatch;
		store.dispatch = action => {
			if (typeof action === 'string') {
				return oldDispatch({
					type: action,
				});
			}
			return oldDispatch(action);
		};
		return store;
	};

// const store = createStore(
// 	combineReducers({ heroes: heroes, filter: filter }),
// 	compose(
// 		applyMiddleware(thunk, stringMiddleWare),
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 	)
// );

const store = configureStore({
	reducer: { heroes, filter },
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: stringMiddleWare,
			},
			serializableCheck: false,
		}),
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
