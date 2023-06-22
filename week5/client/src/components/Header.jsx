import React from "react";
import * as authApi from "../api/authApi";

const Header = ({ title, status, setTitle, setStatus, getAllTask }) => {
  const logoutHandler = async () => {
    await authApi.logout();
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    await getAllTask();
  };
  return (
    <div className='header flex items-center justify-center relative'>
      <form onSubmit={searchHandler} className='flex w-3/4 mr-30'>
        <select
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/4 focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          id='countries'
          name='status'
          onChange={handleChangeStatus}
          value={status}
        >
          <option value=''>Choose status</option>
          <option value='todo'>Todo</option>
          <option value='done'>Done</option>
        </select>
        <label
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300'
          htmlFor='default-search'
        >
          Search
        </label>
        <div className='relative w-3/4'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          <input
            className='block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            id='default-search'
            type='search'
            placeholder='Search by title'
            name='title'
            value={title}
            onChange={handleChangeTitle}
          />
          <button
            type='submit'
            className='text-white absolute bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 right-2.5 bottom-2.5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            // onClick={searchHandler}
          >
            Search
          </button>
        </div>
      </form>
      <button
        className='inline-block absolute right-0 text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 right-2.5 bottom-2.5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        type='submit'
        onClick={logoutHandler}
      >
        Log out
      </button>
    </div>
  );
};

export default Header;
