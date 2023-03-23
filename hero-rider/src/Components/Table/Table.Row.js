import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import tableStyle from './table.module.css';

function TableRow({ data,onCheck, allMark}) {

    const {
        _id,
        fullName,
        email,
        userRole,
        block,
        phone,
        profilePicture
    } = data;

    const [check,setCheck] = useState(false);

    useEffect(()=>{
        if(allMark) setCheck(true);
        if(!allMark) setCheck(false);
        return () => {}
    },[allMark])

    return (
        <tr className={tableStyle['table-row']}>
            <td>
                <div className="flex items-center">
                    <input checked={check} value={_id} onChange={()=>{
                        onCheck(_id,!check)
                        return setCheck(!check)
                    }}
                     name={`userId${_id}`} type="checkbox" />
                </div>
            </td>
            <th scope="row">
                {fullName}
            </th>
            <td>
                {email}
            </td>
            <td >
                {phone}
            </td>
            <td>
                <div style={{backgroundImage:`url(${profilePicture})`}} className={tableStyle['tbody-avatar']}></div>
            </td>
            <td>
                {
                    block
                        ?
                        <span className={`font-medium text-red-600`}>Blocked</span>
                        :
                        <span className={`font-medium text-green-600`}>Activated</span>
                }
            </td>
            <td>
                {
                    userRole !== 'learner'
                        ?
                        <span className={`font-medium text-blue-600`}>{userRole}</span>
                        :
                        <span className={`font-medium text-violet-600`}>{userRole}</span>
                }
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    data: PropTypes.object.isRequired,
    onCheck: PropTypes.func,
    checkedUser: PropTypes.array
}
export default memo(TableRow);