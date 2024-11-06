import DashboardCards from './dashboardCards';
import MonthlyExpenseTable from './table';
import QuickLinks from './quickLink';
const Index = () => {
  return (
    <div>
      <DashboardCards />
      <MonthlyExpenseTable />
      <QuickLinks />
    </div>
  );
};
export default Index;
