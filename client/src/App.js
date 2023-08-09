import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/Admin/AdminLogin';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import PrivateRoutes from './privateRoute/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz'; // Import your Quiz component
import NavBar from './Components/NavBar';
import AdminNavBar from './pages/Admin/AdminNavBar'
import AdminDashboard from './pages/Admin/AdminDashboard';
import History from './pages/History';
import AdminResult from './pages/Admin/AdminResult';
import UsersList from './pages/Admin/UsersList';
import Quizes from './pages/Admin/Quizes';
import Submissions from './pages/Admin/Submissions';
import CreateQuiz from './pages/Admin/CreateQuiz';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBarConditional />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/result" element={<AdminResult />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/quizes" element={<Quizes />} />
            <Route path="/admin/quizes/create" element={<CreateQuiz />} />
            <Route path="/admin/submission" element={<Submissions />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function NavBarConditional() {
  const location = useLocation();

  // Render NavBar on all routes except '/quiz'
  if (location.pathname.startsWith('/quiz')) {
    return null;
  }
  if(location.pathname.startsWith('/admin')){
    return <AdminNavBar />
  }

  return <NavBar />;
}

export default App;
