import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDashboard from './components/User/UserDashboard';
import VendorDashboard from './components/Vendor/VendorDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user-dashboard" component={UserDashboard} />
        <Route path="/vendor-dashboard" component={VendorDashboard} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;
