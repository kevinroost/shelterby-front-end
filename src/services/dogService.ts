import * as tokenService from './tokenService'

import { EditDogFormData, CreateDogFormData } from '../types/forms';

import { Dog } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/dogs`

async function getAllDogs(): Promise<Dog[]> {
  try {
    
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    
    return await res.json() as Dog[]
  } catch (error) {
    console.log(error);
    
    throw error
  }
}

async function getDog(dogId: number): Promise<Dog> {
  try {
    
    const res = await fetch(`${BASE_URL}/${dogId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    
    return await res.json() as Dog
  } catch (error) {
    console.log(error);
    
    throw error
  }
}

async function addDogPhoto(
  photoData: FormData, 
  dogId: number
): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/${dogId}/add-photo`, {
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

async function create(formData: CreateDogFormData): Promise<Dog> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    
    return await res.json() as Dog
  } catch (error) {
    throw error
  }
}

async function update(formData: EditDogFormData): Promise<Dog> {
  try {
    const res = await fetch(`${BASE_URL}/${formData.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    return await res.json() as Dog
  } catch (error) {
    throw error
  }
}

async function deleteDog(dogId: number): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${dogId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      }
    })
  } catch (error) {
    throw error
  }
}

export {
  getAllDogs,
  getDog,
  update,
  deleteDog,
  create,
  addDogPhoto
}