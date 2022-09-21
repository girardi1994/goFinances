import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title, ChartContainer } from "./styles";
import { categories } from "../../Utils/Categories";
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}
interface CategoryData {
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const theme = useTheme();

  async function loadData() {
    const datakey = "@gofinance:transactions";
    const response = await AsyncStorage.getItem(datakey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === "negative"
    );

    const expensivesTotal = expensives.reduce(
      (acumullator: Number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensives.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });
    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <ScrollView style={{ padding: 24, flex: 1 }}>
        <>
          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={60}
              x="percent"
              y="total"
            />
          </ChartContainer>
          {totalByCategories.map((item) => (
            <HistoryCard
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </>
      </ScrollView>
    </Container>
  );
}
