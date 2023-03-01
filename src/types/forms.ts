/* ---------==== custom forms ====--------- */

export interface addToFutureDogsFormData {
  profileId: number;
  dogId: number
}

export interface EditProfileFormData {
  id?: number;
  name: string;
  lastName: string;
  children: number;
  backyard: string;
  about: string;
  phoneNumber?: string;
  email?: string;
}

export interface EditDogFormData {
  id: number;
  name: string;
  age: number;
  breed: string;
  about?: string;
}

export interface CreateDogFormData {
  id?: number;
  name: string;
  age: number;
  breed: string;
  about?: string;
}

/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
