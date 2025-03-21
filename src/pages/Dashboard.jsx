import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      alert(`Welcome, ${response.data.role}: ${response.data.username}`);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar isLoggedIn={true} userRole={user?.role} />
      <h1>Dashboard</h1>
      {user?.role === 'admin' && <p>Admin Panel</p>}
      {user?.role === 'customer' && <p>Customer Dashboard</p>}
      {user?.role === 'driver' && <p>Driver Dashboard</p>}
    </div>
  );
};

export default Dashboard;