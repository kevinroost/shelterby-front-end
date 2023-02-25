// services
import * as tokenService from './tokenService'

// types
import { Profile, Dog } from '../types/models'
import { addToFutureDogsFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/profiles`

async function getAllProfiles(): Promise<Profile[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as Profile[]
  } catch (error) {
    throw error
  }
}

async function getProfile(profileId: number): Promise<Profile> {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}`, {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      }
    })
    return await res.json() as Profile
  } catch (error) {
    throw error
  }
}

async function createAssociation(formData: addToFutureDogsFormData): Promise<Dog> {
  try {
    const res = await fetch(`${BASE_URL}/${formData.profileId}/futureDogs/${formData.dogId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    console.log('ASSOCIATION RESPONSE', res);
    
    return await res.json() as Dog
  } catch (error) {
    throw error
  }
}

async function addPhoto(
  photoData: FormData, 
  profileId: number
): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoData
    })
    return await res.json() as string
  } catch (error) {
    throw error
  }
}

export { getAllProfiles, addPhoto, getProfile, createAssociation, }
