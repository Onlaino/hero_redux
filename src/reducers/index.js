const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	filters: [],
	filterLoadingStatus: 'idle',
	activeFilter:'all',
	filteredHeroes: [],
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
				filteredHeroes: state.activeFilter === 'all' ? 
								action.payload : 
								action.payload.filter(item => item.element === state.activeFilter),
			};
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error',
			};
		case 'HEROES_DELETED':
			const newHeroList =  state.heroes.filter(el => el.id !== action.payload); 
			return {
				...state,
				heroes: newHeroList,
				filteredHeroes: state.activeFilter === 'all' ? 
                                newHeroList : 
                                newHeroList.filter(item => item.element === state.activeFilter)
			};
		case 'HERO_ADD':
			let newCreatedHeroList = [...state.heroes, action.payload];
			return {
				...state,
				heroes: [...state.heroes, action.payload],
				filteredHeroes: state.activeFilter === 'all' ?
								newCreatedHeroList : 
								newCreatedHeroList.filter(item => item.element === state.activeFilter)
			}
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
		case 'ACTIVE_FILTER_CHANGED' : 
			return {
				...state, 
				activeFilter: action.payload,
				filteredHeroes : action.payload === 'all' ? 
								state.heroes : 
								state.heroes.filter(item => item.element === action.payload)
			}
		default:
			return state;
	}
};

export default reducer;
