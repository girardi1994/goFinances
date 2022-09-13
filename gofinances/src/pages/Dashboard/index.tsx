import React from "react";
import { HighLightCard } from "../../components/HighLightCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighLightCards,
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/30416996?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Ricardo Girardi</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighLightCards>
        <HighLightCard type='up' title='Entradas' amount='R$ 17.400,00' lastTransation='Última entrada dia 13 de abril'/>
        <HighLightCard type='down' title='Saídas' amount='R$ 1.250,00' lastTransation='Última saída dia 14 de abril'/>
        <HighLightCard type='total' title='Total' amount='R$ 16.150,00' lastTransation='01 à 16 de abril'/>
      </HighLightCards>
    </Container>
  );
}
