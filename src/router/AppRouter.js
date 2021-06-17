import { Route, Switch } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard';
import Navbar from '../components/Navbar';

const AppRouter = () => {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route path='/' exact component={DashboardPage} />
            
          </Switch>
        </div>
      </div>
    );
  };
  
  export default AppRouter;