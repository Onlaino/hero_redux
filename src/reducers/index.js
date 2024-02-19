const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	filters: [],
	filterLoadingStatus: 'idle',
	activeFilter: 'all',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HEROES_FETCHING':
			return {
				...state,
				heroesLoadingStatus: 'loading',
			};
		case 'HEROES_FETCHED':
			return {
				...state,
				heroes: action.payload,
				heroesLoadingStatus: 'idle',
			};
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error',
			};
		case 'HEROES_DELETED':
			return {
				...state,
				heroes: state.heroes.filter(el => el.id !== action.payload),
			};
		case 'HERO_ADD':
			return {
				...state,
				heroes: [...state.heroes, action.payload],
			};
		case 'FILTER_FETCHING':
			return {
				...state,
				filterLoadingStatus: 'loading',
			};
		case 'FILTER_FETCHED':
			return {
				...state,
				filters: action.payload,
				filterLoadingStatus: 'idle',
			};
		case 'FILTER_FETCHING_ERROR':
			return {
				...state,
				filterLoadingStatus: 'error',
			};
		case 'ACTIVE_FILTER_CHANGED':
			return {
				...state,
				activeFilter: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
