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
     

      

     
        if(credential){
          const userLogget = {
            id: String(result.user.id),
            email: result.user.email!,
            name: result.user.name!,
            photo: result.user.photoUrl!,
        };
        setUser(userLogged);
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
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
