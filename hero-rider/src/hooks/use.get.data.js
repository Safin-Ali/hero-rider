import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import instance from '../api/axios.config';

function useGetData (
    path,
    header,
    dependencies = undefined
) {

    const [data,setData] = useState(null);

    useEffect(()=>{
        instance.get(path,{headers:header})
        .then(res => setData(res.data))
        .catch(err => console.log(err.response.data.message));
    },[dependencies])

    return [data,setData];
};

export default useGetData;