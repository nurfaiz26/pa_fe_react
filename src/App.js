import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import { MainProvider } from './context/mainContext';
import Dashboard from './pages/dashboard';
import Sidebar from './components/sidebar';
import Cookies from 'js-cookie';
import Classification from './pages/classification';
import Profile from './pages/profile';
import Detail from './pages/detail';
import Landing from './pages/landing';
import Navbar from './components/navbar';

function App() {
  const LoginRoute = (props) => {

    if (Cookies.get('token') !== undefined) {
      return <Navigate to={'/dashboard'} />
    } else if (Cookies.get('token') === undefined) {
      return props.children
    }
  }

  const LoggedRoute = (props) => {

    if (Cookies.get('token') === undefined) {
      return <Navigate to={'/'} />
    } else if (Cookies.get('token') !== undefined) {
      return props.children
    }
  }

  return (
    <>
      <BrowserRouter>
        <MainProvider>
          <Routes>
            <Route path='/' element={
              <LoginRoute>
                <Navbar />
                <Landing />
              </LoginRoute>
            } />
            <Route path='/login' element={
              <LoginRoute>
                <Navbar />
                <Login />
              </LoginRoute>
            } />
            <Route path='/dashboard' element={
              <LoggedRoute>
                <Sidebar />
                <Dashboard />
              </LoggedRoute>
            } />
            <Route path='/classification' element={
              <LoggedRoute>
                <Sidebar />
                <Classification />
              </LoggedRoute>
            } />
            <Route path='/profile' element={
              <LoggedRoute>
                <Sidebar />
                <Profile />
              </LoggedRoute>
            } />
            <Route path='/detail/:id' element={
              <LoggedRoute>
                <Sidebar />
                <Detail />
              </LoggedRoute>
            } />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </MainProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
