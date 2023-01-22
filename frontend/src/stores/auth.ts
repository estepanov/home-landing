
import { derived, writable } from 'svelte/store';
import { Auth, CognitoUser } from '@aws-amplify/auth'
import { Amplify } from '@aws-amplify/core'
import { AMPLIFY_CONFIG } from '../utils/amplifyConfig';

export enum AuthRequestStatus {
  INIT,
  LOADING,
  FAIL,
  COMPLETE,
}

Amplify.configure(AMPLIFY_CONFIG)

export const userStore = writable<null | CognitoUser>(null); // start with no user

export const authError = writable<null | string>(null);

export const authReqState = writable<AuthRequestStatus>(AuthRequestStatus.INIT);

export const isAuthenticating = derived([authReqState], ([$authReqState]) => {
  return $authReqState === AuthRequestStatus.LOADING;
});

export const isAuthenticated = derived([userStore], ([$userStore]) => { 
  return $userStore?.getUsername() !== undefined;
});

export const isAdmin = derived([userStore], ([$userStore]) => {
  return $userStore?.getSignInUserSession()?.getIdToken().payload['cognito:groups']?.includes('admin');
});

export const login = (username: string, password: string) => {
  authError.set(null)
  if(!username.trim().length || !password.trim().length) {
    authError.set('Please enter a username and password')
    return;
  }
  authReqState.set(AuthRequestStatus.LOADING)
  return Auth.signIn(username, password)
    .then((data) => {
      authReqState.set(AuthRequestStatus.COMPLETE)
      userStore.set(data)
    })
    .catch((err)=>{ 
      authReqState.set(AuthRequestStatus.FAIL)
      authError.set(err?.message)
      userStore.set(null)
    })
}

export const logout = () => {
  authError.set(null)
  authReqState.set(AuthRequestStatus.LOADING)
  return Auth.signOut()
    .then(() => {
      authReqState.set(AuthRequestStatus.COMPLETE)
      userStore.set(null)
    })
    .catch((err)=>{ 
      authReqState.set(AuthRequestStatus.FAIL)
      authError.set(err?.message)
      userStore.set(null)
    })
};

export async function checkCurrentUser() {
  authError.set(null)
  authReqState.set(AuthRequestStatus.LOADING)
  return Auth.currentAuthenticatedUser()
          .then((data) => {
            authReqState.set(AuthRequestStatus.COMPLETE)
            userStore.set(data)
          })
          .catch((err)=>{ 
            authReqState.set(AuthRequestStatus.FAIL)
            authError.set(err?.message)
            userStore.set(null)
          })
}