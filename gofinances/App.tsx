import React from "react";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";
import { Routes } from "./src/routes";
import { AppRoutes } from "./src/routes/app.routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/Hooks/Auth";
import { SignIn } from "./src/pages/SignIn";
import theme from "./src/global/styles/theme";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
          <StatusBar barStyle={"light-content"} />
          <AuthProvider>
            <Routes />
          </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
