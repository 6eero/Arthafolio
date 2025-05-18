import PageTitle from "@/components/layout/PageTitle";
import Card from "@/components/Card";

const Dashboard = () => {
  return (
    <div className="w-full">
      <PageTitle title="Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 pt-8">
        <Card
          title="Portfolio Total"
          value={1250.34}
          currency="$"
          percentage={12.5}
        />
        <Card
          title="Liquidity"
          value={439.11}
          currency="$"
          percentage={-32.5}
        />
        <Card title="Crypto" value={14.67} currency="$" percentage={12.5} />
        <Card
          title="ETF & Stocks"
          value={3255.87}
          currency="$"
          percentage={12.5}
        />
      </div>
    </div>
  );
};

export default Dashboard;
