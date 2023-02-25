// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Dogs from './pages/Dogs/Dogs'
import EditProfile from './pages/EditProfile/EditProfile'
import EditDog from './pages/EditDog/EditDog'
import ViewProfile from './pages/ViewProfile/ViewProfile'
import ViewDog from './pages/ViewDog/ViewDog'
import MyProfile from './pages/MyProfile/MyProfile'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as dogService from './services/dogService'
import * as profileService from './services/profileService'


// stylesheets
import './App.css'

// types
import { User, Dog, Profile } from './types/models'
import { addToFutureDogsFormData } from './types/forms'

function App(): JSX.Element {
  const navigate = useNavigate()
  
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [dogs, setDogs] = useState<Dog[]>([])
  const [profile, setProfile] = useState<Profile>()


  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  
  const addToFutureDogs = async(formData: addToFutureDogsFormData): Promise<void> => {
    try {
      await profileService.createAssociation(formData)
      const profile = await profileService.getProfile(formData.profileId)
      setProfile(profile)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  if (user){
    useEffect((): void  => {
      const fetchProfile = async (): Promise<void> => {
        try {
          const profileData: Profile = await profileService.getProfile(user.profile.id)
          setProfile(profileData)
        } catch (error) {
          console.log(error)
        }
      }
      if (user) fetchProfile()
      console.log(profile)
    }, [])
  }


  useEffect((): void => {
    const fetchDogs = async (): Promise<void> => {
      try {
        const dogData: Dog[] = await dogService.getAllDogs()
        setDogs(dogData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDogs()
  }, [])
  console.log(user);
  

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route 
          path="/dogs" 
          element={<Dogs dogs={dogs}/>} 
        />
        <Route 
          path="/" 
          element={<Landing handleAuthEvt={handleAuthEvt} user={user} />} 
        />
        <Route
          path="/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
        path="/profile/edit"
        element={
          <EditProfile user={user}/>
        }
        />
        <Route
        path="/dog/edit"
        element={
          <EditDog />
        }
        />
        <Route
        path="/dog/:id"
        element={
          <ViewDog addToFutureDogs={addToFutureDogs} profile={profile}/>
        }
        />
        <Route
        path="/myProfile"
        element={
          <MyProfile user={user!}/>
        }
        />
        <Route
        path="/profiles/:profileId"
        element={
          <ViewProfile />
        }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
