import search from '../assets/images/svg/search.svg';
import filter from '../assets/images/svg/filter.svg';

function Search() {
  return (
    <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Medicines</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50">
          <span
            className="input-group-text bg-white border-end-0 search"
          >
            <img src={search} alt="search" />
          </span>
          <input
            type="text"
            className="form-control border-start-0 search ps-0"
            placeholder="Search"
          />
        </div>
        <button className="filter-btn ms-2 d-flex flex-row align-items-center">
          <img src={filter} className="me-2" alt="filter" />
          Filter
        </button>
      </div>
    </div>
  );
}

export default Search;
