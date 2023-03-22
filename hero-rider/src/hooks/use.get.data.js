import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import instance from '../api/axios.config';

function useGetData (
    path,
    header
) {

    const [data,setData] = useState([]);

    useEffect(()=>{
        instance.get(path,{headers:header})
        .then(res => setData(res.data))
        .catch(err => console.log(err.response.data.message));
    },[])

    return [data,setData];
};

export default useGetData;