import React from "react";
import { Container, Error } from "./style";
import { Input } from "../Input";
import { Control } from "react-hook-form";
import { Controller, FieldError } from "react-hook-form";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error?: any;
}

export function InputForm({ error, control, name, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
