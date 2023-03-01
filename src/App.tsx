// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
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
import { addToFutureDogsFormData, EditProfileFormData, EditDogFormData, PhotoFormData, CreateDogFormData } from './types/forms'

function App(): JSX.Element {
  const navigate = useNavigate()
  
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [dogs, setDogs] = useState<Dog[]>([])
  const [profile, setProfile] = useState<Profile| null >(null)


  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    setProfile(null)
    navigate('/')
  }



  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }
  
  const handleEditProfile = async(formData: EditProfileFormData): Promise<void> => {
    try {
      const updatedProfile = await profileService.update(formData)
      setProfile(updatedProfile)
      console.log(updatedProfile);
      
      navigate('/myProfile')
    } catch (error) {
      console.log(error);
    }
  }

  const setProfileHelper = async (profile: Profile): Promise<void> => {
    const profileData: Profile = await profileService.getProfile(profile.id)
    setProfile(profileData)
  }

  const handleCreateDog = async(dogFormData: CreateDogFormData, photoFormData: PhotoFormData): 
  Promise<void> => {
    try {
      const newDog = await dogService.create(dogFormData)
      if (photoFormData.photo) {
        const photoData = new FormData()
        photoData.append('photo', photoFormData.photo)        
        await dogService.addDogPhoto(photoData, newDog.id)
      }
      dogs.push(newDog)
      setDogs(dogs)
      if (profile) setProfileHelper(profile)
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  const handleEditDog = async(formData: EditDogFormData, photoFormData: PhotoFormData): Promise<void> => {
    try {
      if (photoFormData.photo) {
        const photoData = new FormData()
        photoData.append('photo', photoFormData.photo)        
        await dogService.addDogPhoto(photoData, formData.id)
      }
      const updatedDog = await dogService.update(formData)


      setDogs(dogs.map((dog) => (
        (dog.id === updatedDog.id) ? updatedDog : dog
        )))

      
      if (profile) setProfileHelper(profile)

      
      navigate(`/myProfile`)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteDog = async(dogId:number): Promise<void> => {
    try {
      await dogService.deleteDog(dogId)
      const updatedDogs = profile?.listedDogs ? profile?.listedDogs.filter((dog: Dog) => (dog.id !== dogId)) : []
      if (profile) setProfileHelper(profile)
      setDogs(updatedDogs)
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveDog = async(dogId:number, profileId:number): Promise<void> => {
    try {
      console.log('BEFORE', profile);
      await profileService.deleteAssociation(profileId, dogId)

      if (profile) setProfileHelper(profile)
      console.log('AFTER', profile);
      
    } catch (error) {
      console.log(error);
    }
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

  useEffect((): void  => {
    const fetchProfile = async (): Promise<void> => {
      let profileData: Profile | undefined
      try {
        if (user) {
          profileData = await profileService.getProfile(user.profile.id)

          
          setProfile(profileData)
        }

      } catch (error) {
        console.log(error)
      } 
    }
    if (user) fetchProfile()
  }, [user])

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
        path="/profile/edit"
        element={
          <ProtectedRoute user={user}>
            <EditProfile profile={profile} handleEditProfile={handleEditProfile}/>
          </ProtectedRoute>
        }
        />
        <Route
        path="/dog/edit"
        element={
          <ProtectedRoute user={user}>
            <EditDog handleEditDog={handleEditDog}/>
          </ProtectedRoute>
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
          <MyProfile 
            handleDeleteDog={handleDeleteDog}
            handleRemoveDog={handleRemoveDog}
            handleCreateDog={handleCreateDog}
            user={user}
            profile={profile}
          />
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
              <ChangePassword user={user} handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App