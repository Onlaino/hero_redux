import {
	filtersFetched,
	filtersFetching,
	filtersFetchingError,
} from '../components/heroesFilters/filtersSlice';
import {
	heroesFetched,
	heroesFetching,
	heroesFetchingError,
} from '../components/heroesList/heroesSlice';

export const fetchHeroes = request => dispatch => {
	dispatch(heroesFetching());
	request('http://localhost:3001/heroes')
		.then(data => dispatch(heroesFetched(data)))
		.catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilter = request => dispatch => {
	dispatch(filtersFetching());
	request('http://localhost:3001/filters')
		.then(data => dispatch(filtersFetched(data)))
		.catch(() => dispatch(filtersFetchingError()));
};

// export const heroesFetching = createAction('HEROES_FETCHING');
// export const heroesFetched = createAction('HEROES_FETCHED'); // автоматически добавляется в action.payload
// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
// export const deleteHero = createAction('HEROES_DELETED');
// export const addHero =  createAction('HERO_ADD');

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }
// export const deleteHero = (charId) => {
// 	return {
// 		type : 'HEROES_DELETED',
// 		payload: charId
// 	}
// }

// export const addHero = (hero) => {
// 	return {
// 		type: 'HERO_ADD',
// 		payload: hero
// 	}
// }

// export const filterFetching = () => {
// 	return {
// 		type: 'FILTER_FETCHING',
// 	};
// };

// export const filterFetched = filters => {
// 	return {
// 		type: 'FILTER_FETCHED',
// 		payload: filters,
// 	};
// };

// export const filterFetchingError = () => {
// 	return {
// 		type: 'FILTER_FETCHING_ERROR',
// 	};
// };

// export const activeFilterChanged = filter => {
// 	return {
// 		type: 'ACTIVE_FILTER_CHANGED',
// 		payload: filter,
// 	};
// };

// export const activeFilterChanged = (filter) => (dispatch) => {
// 	setTimeout(() => {
// 		dispatch({
// 			type: 'ACTIVE_FILTER_CHANGED',
// 			payload: filter,
// 		})
// 	}, 1000)
// }
