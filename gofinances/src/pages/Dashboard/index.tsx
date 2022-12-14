import React, { useCallback, useEffect, useState } from "react";
import { HighLightCard } from "../../components/HighLightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../Hooks/Auth";

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
  lastTransactions: string;
}
interface HighLightData {
  entries: HighLightDataProps;
  expensives: HighLightDataProps;
  finalTotal: HighLightDataProps; 
}
function getLastTransactionDate(
  collection: DataListProps[],
  type: "positive" | "negative"
) {
  const collectionFilttered = collection.filter(
    (transaction) => transaction.type === type
  );
  if(collectionFilttered.length === 0)
  return "0"

  const lastTransactions = new Date(
    Math.max.apply(
      Math,
      collectionFilttered
      .map((transaction) => new Date(transaction.date).getTime())
    )
  );

  return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString(
    "pt-BR",
    { month: "long" }
  )}`;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>(
    {} as HighLightData
  );
  const { signOut, user } = useAuth();

  async function loadTransactions() {
    const datakey = `@gofinance:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(datakey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

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
    const lastTransactionsEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionsExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );
    const totalInterval = `01 a ${lastTransactionsExpensives}`;

    const finalTotal = entriesTotal - expensiveTotal;
    setHighLightData({
      entries: {
        total: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: lastTransactionsEntries === "0" ? 'N??o h?? transa????es' :
         `??ltima entrada dia ${lastTransactionsEntries}`,
      },
      expensives: {
        total: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: lastTransactionsExpensives === "0" ? 'N??o h?? transa????es' :
         `??ltima sa??da dia ${lastTransactionsExpensives}`,
      },
      finalTotal: {
        total: finalTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: totalInterval,
      },
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
            <Photo source={{ uri: user.photo }} />
            <User>
              <UserGreeting>Ol??,</UserGreeting>
              <UserName>|{user.name}</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={signOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighLightCards>
        <HighLightCard
          type="up"
          title="Entradas"
          amount={highLightData?.entries?.total}
          lastTransation={highLightData?.entries?.lastTransactions}
        />
        <HighLightCard
          type="down"
          title="Sa??das"
          amount={highLightData?.expensives?.total}
          lastTransation={highLightData?.expensives?.lastTransactions}
        />
        <HighLightCard
          type="total"
          title="Total"
          amount={highLightData?.finalTotal?.total}
          lastTransation={highLightData?.totalInterval?.lastTransactions}
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
