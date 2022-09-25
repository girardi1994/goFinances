import React, { useContext } from "react";
import { Alert } from "react-native";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../Hooks/Auth";

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert("Não foi possível conectar a conta Google");
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {"\n"} uma das contas a baixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            title="Entrar com o Apple"
            svg={AppleSvg}
            onPress={signInWithGoogle}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
