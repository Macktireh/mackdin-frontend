export type TRoutesList = { path: string; element: JSX.Element };
export interface IAuthUserLogin {
  email: string;
  password: string;
}

export interface IAuthUserSignUp extends IAuthUserLogin {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface IAuthUser {
  public_id?: string;
  first_name: string;
  last_name: string;
}

export interface IAuthUserProfile {
  user: IAuthUser;
  pseudo: string;
  birthDate?: string | null;
  profilePicture?: string;
  coverPicture?: string;
  bio: string;
  updated?: string;
  created?: string;
}

// export type TAuthUserReducer = { userReducer: IAuthUserState };

/****************** */
export type TTabState = { id: number; title: string; grow: boolean };

export interface IAuthorDetail {
  public_id: string;
  first_name: string;
  last_name: string;
}

export interface IPost {
  publicId: string;
  authorDetail: IAuthorDetail;
  body: string;
  image: string;
  is_updated: boolean;
  created: Date;
  updated: Date;
  liked: IAuthorDetail[];
  comments: IComment[];
}

export interface IComment {
  commentPublicId: string;
  authorDetail: IAuthorDetail;
  message: string;
  image: string;
  is_updated: boolean;
  created: Date;
  updated: Date;
  liked: IAuthorDetail[];
}

/**
 *************
 */
export interface IAuthUserState {
  isAuthenticated: boolean | null;
  currentUser: IAuthUserProfile | null;
}

export interface IUsersState {
  users: IAuthUserProfile[] | null;
}

export type PostReducerType = IPost[] | null;

export interface IStateReduce {
  authReducer: IAuthUserState;
  postReducer: PostReducerType;
  userReducer: IUsersState;
}

export interface IActionState {
  type: string;
  payload?: any;
}

export interface PropsStateType {
  currentUser: IAuthUserProfile | null;
  posts: IPost[] | null;
  users: IAuthUserProfile[] | null;
}

/**
 * post add
 */

export type bodyStateType = { body: string; setBody: (value: string) => void };
export type emojiStateType = { chosenEmoji: boolean; setChosenEmoji: (value: boolean) => void };
export type imageStateType = {
  image: File | null;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type imagePreviewStateType = { imagePreview: string; setImagePreview: (value: string) => void };
