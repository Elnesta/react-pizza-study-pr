import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories';
import Sort, {list} from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../scss/components/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);
  const {items, status}  = useSelector((state) => state.pizza);
  const sortType = sort.sortProperty;

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  };

  const getPizzas = async () => {

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const search = searchValue > 0 ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }));
  };

  React.useEffect(() => {
    if (window.location.search) {
       const params = qs.parse(window.location.search.substring(1));

       const sort = list.find(obj => obj.sortProperty === params.sortProperty);

       dispatch(setFilters({
         ...params,
         sort
       }),);
       isSearch.current = true;
    }
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
      .map((obj) => <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj} /></Link>);
  const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? (<div className="content__error-info">
              <h2>Произошла ошибка <icon>😕</icon></h2>
              <p>
                Не удалось получить питсы. Попробуйте повторить попытку позже
              </p>
        </div>) : (
            <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
      )}

      <Pagination itemsPerPage={8} currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
};

export default Home;
