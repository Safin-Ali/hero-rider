import React, { memo, useContext, useEffect, useState } from 'react';
import tableStyle from './table.module.css';
import TableRow from './Table.Row';
import PropTypes from 'prop-types';
import getAuthToken from '../../hooks/get.Auth.Token';
import instance from '../../api/axios.config';
import { UserData } from '../../context/User.Context';
import { BsSearch } from 'react-icons/bs';
import TableSkeleton from './TableSkeleton';

function DashTable({
    data,
    handleAgeFilter,
    handleSearchFeild,
    callback,
}) {

    const { notifyWarning, notifySuccess } = useContext(UserData);

    const [checkedUser, setCheckedUser] = useState([]);
    const [allMark, setAllMark] = useState(false);

    const handleCheck = (id, type) => {
        if (type === 'all') {
            const newArr = [];
            data.forEach(user => newArr.push(user._id));
            setAllMark(true);
            return setCheckedUser(newArr);
        };

        if (type === 'none') {
            setCheckedUser(0)
            return setAllMark(false);
        };

        if (type) return setCheckedUser(prev => [...prev, id]);
        return setCheckedUser(prev => prev.filter(item => item !== id));
    };

    const authToken = getAuthToken();

    const handleBlockAction = async (type) => {
        if(!checkedUser.length) return notifyWarning('select user');
        const res = await instance.patch(`/admin/users-access`, { userList: checkedUser, actionType: type }, { headers: { authorization: authToken } });

        if (res.data.acknowledged && !res.data.modifiedCount) {
            notifyWarning(`User Already ${type}`)
        }
        if (res.data.acknowledged && res.data.modifiedCount) {
            notifySuccess(`User Updated`);
            setCheckedUser([]);
        }

        return callback();
    };

    useEffect(() => {
        if (!checkedUser.length) setAllMark(false);
        if (data.length && data.length === checkedUser.length) setAllMark(true);
        return () => { }
    }, [checkedUser]);

    return (

        <>
            <div className={tableStyle['table-head-container']}>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="flex items-center">
                                    <input
                                        checked={allMark}
                                        onChange={() => handleCheck('', !allMark ? 'all' : 'none')}
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
                                User Age
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
                            !data
                                ?
                                <TableSkeleton></TableSkeleton>
                                :
                                data.map(user => <TableRow allMark={allMark} onCheck={handleCheck} key={user._id} data={user} />)
                        }
                    </tbody>
                </table>
            </div>

            <div className={`px-5 py-2 flex items-center gap-10`}>
                {/* action button here */}

                <div className={`hidden md:block`}>
                    <button onClick={() => handleBlockAction('block')}
                        className={`px-3 py-1.5 rounded-md text-white ${!checkedUser.length ? 'opacity-40' : 'opacity-100'} font-medium bg-red-700`} disabled={!checkedUser.length}>Block</button>
                </div>

                <div className={`hidden md:block`}>
                    <button onClick={() => handleBlockAction('active')}
                        className={`px-3 py-1.5 rounded-md text-white ${!checkedUser.length ? 'opacity-40' : 'opacity-100'} font-medium bg-green-700`} disabled={!checkedUser.length}>Active</button>
                </div>

                <div>
                    <select onChange={handleAgeFilter} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-3 p-2.5">
                        <option value={'00-00'}>Choose Age Range</option>
                        <option value={"18-25"}>18-25</option>
                        <option value={"26-30"}>26-30</option>
                    </select>
                </div>

                <div className={`border border-black/30 bg-[#FBFAF9] rounded-md flex items-center`}>

                    <div className={`border-r border-black/30 p-2`}>
                        <BsSearch></BsSearch>
                    </div>

                    {/* Search Feild */}
                    <div>
                        <input onChange={handleSearchFeild} type="text" className={`w-full p-1 outline-none bg-transparent pl-3`} />
                    </div>
                </div>

            </div>
        </>
    );
}

DashTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    callback: PropTypes.func,
    handleAgeFilter: PropTypes.func,
    handleSearchFeild: PropTypes.func
}

export default memo(DashTable);