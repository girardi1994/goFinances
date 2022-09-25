import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from 'expo-apple-authentication'

const {CLIENT_ID} = process.env;
const {REDIRECT_URI} = process.env;

interface AuthProviderProps {
  children: ReactNode;
}
interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const userStorageKey = '@gofinances:user';

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri${REDIRECT_URI}&response_type${RESPONSE_TYPE}&scope${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfon?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        if(credential){
          const userLogget = {
            id: String(result.user.id),
            email: result.user.email!,
            name: result.user.name!,
            photo: result.user.photoUrl!,
        });
      }
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async function signInWithApple() {
    try {
      const credencial = await AppleAuthentication.signInAsync({
        requestedScopes:[
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });
      if(credential){
        const userLogget = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined
        }
        setUser(userLogged);
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
      }
     
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(()=> {
    async function loadUserStorageData() {
      const data = await AsyncStorage.getItem();
    }
  },[]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  return context; 
}

export { AuthProvider, useAuth };
