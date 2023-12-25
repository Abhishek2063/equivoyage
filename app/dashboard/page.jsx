"use client";
import React, { useEffect, useState } from 'react'
import TripList from './TripList';
import { getTripListData } from './event';
import { getUserDetails } from '@/storage/user';

const Dashboard = () => {
  const [tripListData,setTripListData] = useState([])
  const [page,setPage] = useState(1)
  const [totalPage,setTotalPage] = useState(0)
  const [totalRecords,setTotalRecords] = useState(0)
  const userData = getUserDetails()
  console.log(userData,"userData");
  useEffect(()=>{
    getTripListData(setTripListData,userData,setPage, setTotalPage,setTotalRecords,page )
  },[])
  return (
    <>
    <TripList 
    tripListData={tripListData}
    setTripListData = {setTripListData}
    page={page}
    setPage={setPage}
    totalPage={totalPage}
    setTotalPage={setTotalPage}
    totalRecords={totalRecords}
    setTotalRecords={setTotalRecords}

    />
    </>
  )
}

export default Dashboard