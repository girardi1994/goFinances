import React from "react";
import { HighLightCard } from "../../components/HighLightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

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
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from "./styles";
 
export interface DataListProps extends TransactionCardProps{
  id: string,
}

export function Dashboard() {
  const data : DataListProps[]=[
    {
      id: '1',
      type: 'positive',
    title:"Desenvolvimento de site",
    amount:"R$ 12.000,00", 
    category: {
      name: 'Vendas',
      icon: 'dollar-sign'
      
    },
    date:'13/04/2020',
  },
  {
    id: '2',
    type: 'negative',
    title:"Hamburguer pizza",
    amount:"R$ 50,00", 
    category: {
      name: 'Alimentação',
      icon: 'coffee'
      
    },
    date:'13/04/2020',
  },
  {
    id: '3',
    type: 'negative',
    title:"Aluguel do apartamento",
    amount:"R$ 1.200,00", 
    category: {
      name: 'Casa',
      icon: 'shopping-bag'
      
    },
    date:'13/04/2020',
  }
];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/30416996?v=4"
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Ricardo Girardi</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
          <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighLightCards>
        <HighLightCard type='up' title='Entradas' amount='R$ 17.400,00' lastTransation='Última entrada dia 13 de abril'/>
        <HighLightCard type='down' title='Saídas' amount='R$ 1.250,00' lastTransation='Última saída dia 14 de abril'/>
        <HighLightCard type='total' title='Total' amount='R$ 16.150,00' lastTransation='01 à 16 de abril'/>
      </HighLightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList 
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TransactionCard data= {item}/> }
       
        />
        
      </Transactions>
    </Container>
  )
}
