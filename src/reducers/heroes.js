import { createReducer } from '@reduxjs/toolkit';
import {
	addHero,
	deleteHero,
	heroesFetched,
	heroesFetching,
	heroesFetchingError,
} from '../actions';

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
};

const heroes = createReducer(initialState, builder => {
	builder.addCase(heroesFetching, state => {
		state.heroesLoadingStatus = 'loading';
	});
	builder.addCase(heroesFetched, (state, action) => {
		state.heroesLoadingStatus = 'idle';
		state.heroes = action.payload;
	});
	builder.addCase(heroesFetchingError, state => {
		state.heroesLoadingStatus = 'error';
	});
	builder.addCase(addHero, (state, action) => {
		state.heroes.push(action.payload);
	});
	builder.addCase(deleteHero, (state, action) => {
		state.heroes = state.heroes.filter(el => el.id !== action.payload);
	});
	builder.addDefaultCase(() => {});
});

// const heroes = (state = initialState, action) => {
// 	switch (action.type) {
// 		case 'HEROES_FETCHING':
// 			return {
// 				...state,
// 				heroesLoadingStatus: 'loading',
// 			};
// 		case 'HEROES_FETCHED':
// 			return {
// 				...state,
// 				heroes: action.payload,
// 				heroesLoadingStatus: 'idle',
// 			};
// 		case 'HEROES_FETCHING_ERROR':
// 			return {
// 				...state,
// 				heroesLoadingStatus: 'error',
// 			};
// 		case 'HEROES_DELETED':
// 			return {
// 				...state,
// 				heroes: state.heroes.filter(el => el.id !== action.payload),
// 			};
// 		case 'HERO_ADD':
// 			return {
// 				...state,
// 				heroes: [...state.heroes, action.payload],
// 			};
// 		default:
// 			return state;
// 	}
// };

// export default heroes;
