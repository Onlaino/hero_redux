import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addHero, filterFetched, filterFetchingError } from '../../actions';
import { useHttp } from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе COMPLETE
// данных из фильтров

const HeroesAddForm = () => {
	const { request } = useHttp();

	const dispatch = useDispatch();

	const { filters, filtersLoadingStatus } = useSelector(state => state);

	const [heroName, setHeroName] = useState('');
	const [heroDescr, setHeroDescr] = useState('');
	const [heroElement, setHeroElement] = useState('');

	useEffect(() => {
		request('http://localhost:3001/filters')
			.then(data => dispatch(filterFetched(data)))
			.catch(() => dispatch(filterFetchingError()));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (filtersLoadingStatus === 'loading') {
		return <Spinner />;
	} else if (filtersLoadingStatus === 'error') {
		return <h5 className='text-center mt-5'>Произошла ошибка загрузки</h5>;
	}

	const handleSubmit = e => {
		e.preventDefault();
		const newObj = {
			id: uuidv4(),
			name: heroName,
			description: heroDescr,
			element: heroElement,
		};

		request('http://localhost:3001/heroes', 'POST', JSON.stringify(newObj))
			.then(res => console.log(res, 'Send Ok'))
			.then(dispatch(addHero(newObj)))
			.catch(err => console.log(err));

		setHeroElement('');
		setHeroDescr('');
		setHeroName('');
	};

	const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        // Если фильтры есть, то рендерим их
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // Один из фильтров нам тут не нужен
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

	return (
		<form className='border p-4 shadow-lg rounded' onSubmit={handleSubmit}>
			<div className='mb-3'>
				<label htmlFor='name' className='form-label fs-4'>
					Имя нового героя
				</label>
				<input
					required
					type='text'
					name='name'
					className='form-control'
					id='name'
					placeholder='Как меня зовут?'
					onChange={e => setHeroName(e.target.value)}
				/>
			</div>

			<div className='mb-3'>
				<label htmlFor='text' className='form-label fs-4'>
					Описание
				</label>
				<textarea
					required
					name='text'
					className='form-control'
					id='text'
					placeholder='Что я умею?'
					style={{ height: '130px' }}
					onChange={e => setHeroDescr(e.target.value)}
				/>
			</div>

			<div className='mb-3'>
				<label htmlFor='element' className='form-label'>
					Выбрать элемент героя
				</label>
				<select
					onChange={e => setHeroElement(e.target.value)}
					value={heroElement}
					required
					className='form-select'
					id='element'
					name='element'
				>
					<option>Я владею элементом...</option>
					{renderFilters(filters, filtersLoadingStatus)}
				</select>
			</div>

			<button type='submit' className='btn btn-primary'>
				Создать
			</button>
		</form>
	);
};

export default HeroesAddForm;
