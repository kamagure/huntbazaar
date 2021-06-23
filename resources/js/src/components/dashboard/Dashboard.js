import React, { useEffect, useState } from 'react';
import Global from '../layouts/Global';
import api from '../../api';
import GuestList from './GuestList';
import DesignerList from './DesignerList';

// Functional component of dashboard page
const Dashboard = () => {
  const [data, setData] = useState({
    guests: null,
    designers: null
  });

  // Function to fetch dashboard data (consists of guests and favorite designers data)
  const fetchDashboard = () => {
    api.getAllGuests().then(res => {
      const result = res.data;
      setData({
        guests: result.guests,
        designers: result.designers
      });
    })
  } 

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Rendering part of dashboard (consists of guest table and designer table)
  return ( 
    <Global
      title="Guest List"
    >
      <GuestList guests={data.guests} />
      <DesignerList designers={data.designers} />

    </Global>
   );
}
 
export default Dashboard;