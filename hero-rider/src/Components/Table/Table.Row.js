import React from 'react';
import PropTypes from 'prop-types';
import tableStyle from './table.module.css';

function TableRow () {

 return (
    <tr className={TableRow['table-row']}>
    <td className="w-4 p-4">
        <div className="flex items-center">
            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
        </div>
    </td>
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        Apple MacBook Pro 17"
    </th>
    <td className="px-6 py-4">
        Silver
    </td>
    <td className="px-6 py-4">
        Laptop
    </td>
    <td className="px-6 py-4">
        Yes
    </td>
    <td className="px-6 py-4">
        Yes
    </td>
    <td className="px-6 py-4">
        $2999
    </td>
    <td className="px-6 py-4">
        3.0 lb.
    </td>
    <td className="flex items-center px-6 py-4 space-x-3">
        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
    </td>
    </tr>
  );
};

TableRow.propTypes = {}
export default TableRow;