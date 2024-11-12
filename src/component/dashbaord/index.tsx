import DashboardCards from './dashboardCards';
import MonthlyExpenseTable from './table';
import QuickLinks from './quickLink';
const Index = () => {
  return (
    <div>
      <DashboardCards />
      <div className='hidden md:block'>
        <MonthlyExpenseTable />
      </div>
      <QuickLinks />
    </div>
  );
};
export default Index;
