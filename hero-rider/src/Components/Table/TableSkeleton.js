import React from 'react';

function TableSkeleton() {

    return (
        [...Array(7).keys()].map(tr =><tr>
        <td className={`bg-white border-b`}>
            <span className={`w-5 h-5 mx-auto rounded-sm inline-block bg-[#CBD5E0] animate-pulse`}></span>
        </td>
        {[...Array(7).keys()].map(td => <td key={td} className={`bg-white border-b`}>
            <span className={`w-24 mx-auto h-5 block rounded-md bg-[#CBD5E0] animate-pulse`}></span>
        </td>)}
    </tr>)
    );
};

TableSkeleton.propTypes = {}
export default TableSkeleton;