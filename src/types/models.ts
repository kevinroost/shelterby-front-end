/* ---------===== custom props ====--------- */

export interface Dog {
  name: string,
  id: number,
  age: number,
  breed: string,
  about?: string,
  photo?: string,
  ownerId: number
}

/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  lastName?: string;
  id: number;
  userId: number;
  children?: number;
  backyard?: string;
  about?: string
  futureDogs?: [];
  listedDogs?: [];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: Profile;
  id: number;
  createdAt: string;
  updatedAt: string;
}
