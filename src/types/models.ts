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
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
