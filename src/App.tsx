import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const totalItems = items.length;
  const indexOfFirstItem = currentPage * itemsPerPage - itemsPerPage;
  const indexofLastItem = currentPage * itemsPerPage <= totalItems
    ? currentPage * itemsPerPage
    : totalItems;
  const currentItems = items.slice(indexOfFirstItem, indexofLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleSelect = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexOfFirstItem + 1} - ${indexofLastItem} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleSelect}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        paginate={paginate}
        setCurrentPage={setCurrentPage}
      />

      <ul>
        {currentItems.map((item) => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}

      </ul>
    </div>
  );
};

export default App;
