import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Spin from './component/Spin'
import { useSelector } from 'react-redux'
import ProtectedRoute from './component/ProtectedRoute'
import Notification from './pages/Notification'
import PublicRoute from './component/PublicRoute'
import ApplyDoctor from './pages/ApplyDoctor'
import User from './pages/admin/User'
import Doctor from './pages/admin/Doctor'
import Profile from './pages/doctor/Profile'
import BookingPage from './pages/BookingPage'
import UserProfile from './pages/Profile'

import Appointments from './pages/Appointment'
import DoctorAppointment from './pages/doctor/DoctorAppointment'
import UpdateAppointement from './pages/UpdateAppointement'
function App() {
  const  loading =useSelector(state => state.alerts)
  console.log(loading)
  return (
    <>
      <BrowserRouter>
      { loading.loading ? (<Spin/> ):(<Routes>
        // routin element so we  use navigationS
        <Route path='/' element={
          <ProtectedRoute>
          <Home/>
          </ProtectedRoute>
          }
          />
          <Route path='/apply-doctor' element={
          <ProtectedRoute>
          <ApplyDoctor/>
          </ProtectedRoute>
          }/>
          <Route path='/admin/user' element={
          <ProtectedRoute>
          <User/>
          </ProtectedRoute>
          }/>
          <Route path='/admin/doctor' element={
          <ProtectedRoute>
          <Doctor/>
          </ProtectedRoute>
          }
          />
          <Route path='/doctor/profile/:id' element={
          <ProtectedRoute>
          <Profile/>
          </ProtectedRoute>
          }
          />
          <Route path='/updateAppointment/:doctorId' element={
          <ProtectedRoute>
          <UpdateAppointement/>
          </ProtectedRoute>
          }
          />
          
          <Route path='/notification' element={
          <ProtectedRoute>
          <Notification/>
          </ProtectedRoute>
          }
          />
          
        <Route path='/login' element={
          <PublicRoute>
             <Login/>
          </PublicRoute>
          }
          />
        <Route path='/doctor/book-appointment/:doctorId' element={
          <ProtectedRoute>
             <BookingPage></BookingPage>
          </ProtectedRoute>
          }
          />
        <Route path='/register' element={
          <PublicRoute>
              <Register/>
          </PublicRoute>
          }
          />
           <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>

              }
            />
           <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>

              }
            />
           <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppointment />
                </ProtectedRoute>
              }
            />
      </Routes>)
      }
      
      </BrowserRouter>
    </>
  )
}

export default App
