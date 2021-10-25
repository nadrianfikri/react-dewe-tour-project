import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Regist from './pages/Auth/Regist';
import DetailTrip from './pages/DetailTrip';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import IncomeTrip from './pages/IncomeTrip';
import ListTransaction from './pages/ListTransaction';
import AddTrip from './pages/AddTrip';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Regist} />
        <Route exact path="/detail-trip/:id" component={DetailTrip} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/payment" component={Payment} />
        <PrivateRoute exact path="/income-trip" component={IncomeTrip} />
        <PrivateRoute exact path="/add-trip" component={AddTrip} />
        <PrivateRoute exact path="/list-transaction" component={ListTransaction} />
      </Switch>
    </>
  );
}

export default App;
