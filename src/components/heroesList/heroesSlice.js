import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle'
};


const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers : {
		heroesFetching : state => {
			state.heroesLoadingStatus = 'error'
		},
		heroesFetched : (state, action) => {
			state.heroesLoadingStatus = 'idle';
			state.heroes = action.payload;
		},
		heroesFetchingError : state => {
			state.heroesLoadingStatus = 'error';
		},
		addHero: (state, action) => {
			state.heroes.push(action.payload);
		},
		deleteHero: (state, action) => {
			state.heroes = state.heroes.filter(el => el.id !== action.payload);
		}
	}
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
	heroesFetching,
	heroesFetched,
	heroesFetchingError,
	addHero,
	deleteHero
} = actions;