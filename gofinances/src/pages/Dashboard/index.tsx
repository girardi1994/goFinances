import React, { useCallback, useEffect, useState } from "react";
import { HighLightCard } from "../../components/HighLightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

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
  LogoutButton,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}
interface HighLightDataProps {
  total: string;
}
interface HighLightData {
  entries: HighLightDataProps;
  expensives: HighLightDataProps;
  finalTotal: HighLightDataProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>(
    {} as HighLightData
  );

  async function loadTransactions() {
    const datakey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(datakey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        console.log(item)
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        };
      
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    setTransactions(transactionsFormatted);
    const finalTotal = entriesTotal - expensiveTotal;
    console.log({
      entries: {
        total: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensives: {
        total: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      finalTotal: {
        total: finalTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      }
    })
    setHighLightData({
      entries: {
        total: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensives: {
        total: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      finalTotal: {
        total: finalTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      }
    });
  }
  
  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighLightCards>
        <HighLightCard
          type="up"
          title="Entradas"
          amount={highLightData?.entries?.total}
          lastTransation="Última entrada dia 13 de abril"
        />
        <HighLightCard
          type="down"
          title="Saídas"
          amount={highLightData?.expensives?.total}
          lastTransation="Última saída dia 14 de abril"
        />
        <HighLightCard
          type="total"
          title="Total"
          amount={highLightData?.finalTotal?.total}
          lastTransation="01 à 16 de abril"
        />
      </HighLightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
