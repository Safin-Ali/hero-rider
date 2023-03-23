import React, { memo, useEffect, useState } from 'react';
import tableStyle from './table.module.css';
import TableRow from './Table.Row';
import PropTypes  from 'prop-types';

function DashTable({
    data,
    callback,
}) {

    const [checkedUser,setCheckedUser] = useState([]);
    const [allMark,setAllMark] = useState(false);

    const handleCheck = (id,type) => {
        if(type === 'all'){
            const newArr = [];
            data.forEach(user => newArr.push(user._id));
            setAllMark(true);
            return setCheckedUser(newArr);
        };

        if(type === 'none') {
            setCheckedUser([])
            return setAllMark(false);
        } ;

        if(type) return setCheckedUser(prev => [...prev,id]);
        return setCheckedUser(prev => prev.filter(item => item !== id));
    };

    useEffect(()=>{
        if(!checkedUser.length) setAllMark(false);
        if(data.length && data.length ===  checkedUser.length) setAllMark(true);
        return () => {}
    },[checkedUser])

    return (

        <div className={tableStyle['table-head-container']}>
            <table>
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="flex items-center">
                                <input
                                    checked={allMark}
                                 onChange={()=>handleCheck('',!allMark ? 'all' : 'none')}
                                 type="checkbox" />
                            </div>
                        </th>
                        <th scope="col" className="">
                            User Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Avatar
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            suspicious behavior
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(user => <TableRow allMark={allMark} onCheck={handleCheck} key={user._id} data={user} />)
                    }
                </tbody>
            </table>
        </div>
    );
}

DashTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    callback: PropTypes.func
}

export default memo(DashTable);