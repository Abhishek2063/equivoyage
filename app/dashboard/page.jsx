"use client";
import React, { useEffect, useState } from 'react'
import TripList from './TripList';
import { getTripListData } from './event';

const Dashboard = () => {
  const [tripListData,setTripListData] = useState([])
  useEffect(()=>{
    getTripListData(setTripListData)
  },[])
  return (
    <>
    <TripList 
    tripListData={tripListData}
    setTripListData = {setTripListData}
    />
    </>
  )
}

export default Dashboard