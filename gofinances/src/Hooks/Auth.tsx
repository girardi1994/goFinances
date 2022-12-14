import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_ID =
  "457976087388-1p1pic4jj6sbk70qhdj7hpt3pqkas1c2.apps.googleusercontent.com";
const REDIRECT_URI = "https://auth.expo.io/@ferrahh/gofinances";

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
  signOut(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const userStorageKey = "@gofinances:user";

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoding, setUserStorageLoding] = useState(true);

  async function signInWithGoogle() {
    try {
      // const RESPONSE_TYPE = "token";
      // const SCOPE = encodeURI("profile email");

      // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      // const { type, params } = (await AuthSession.startAsync({
      //   authUrl,
      // })) as AuthorizationResponse;

      // console.log(type, params);

      // if (type === "success") {
      // const response = await fetch(
      //   `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
      // );

      // const responseUser = await response.json();

      const userLogged = {
        id: "87687263812638712",
        email: "girard88@gmail.com",
        name: "Ricardo Girardi",
        photo: "https://avatars.githubusercontent.com/u/30416996?v=4",
      };

      setUser(userLogged);
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      // }
    } catch (error) {
      throw new Error(error as any);
    }
  }
  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey)
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }
      setUserStorageLoding(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOut,
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
