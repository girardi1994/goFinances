import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Button, ImagemConteiner, Text } from "./styles";

import { SvgProps, Svg } from 'react-native-svg'

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}   

export function SignInSocialButton({ svg: Svg, title,...rest }: Props) {
  return (
    <Button {...rest}>
      <ImagemConteiner>
        <Svg />
      </ImagemConteiner>
      <Text>{title}</Text>
    </Button>
  );
}
