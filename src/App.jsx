import React from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import { Route, Routes } from 'react-router';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';
import { Navigate } from 'react-router';
import Chat from './components/Chat';
import Todos from './components/Todos';

function App() {
  return (
    <div>
      {/* <h1 className='text-center text-3xl font-bold'>
        Firebase Auth & Context
      </h1> */}
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path='/chat'
            element={
              <ProtectedRoute>
                <Account children={<Chat />} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/todo'
            element={
              <ProtectedRoute>
                <Account children={<Todos />} />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Navigate to={"/signin"}></Navigate>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;