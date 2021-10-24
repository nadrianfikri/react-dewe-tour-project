import { Route, Switch } from 'react-router-dom';

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
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/income-trip" component={IncomeTrip} />
        <Route exact path="/add-trip" component={AddTrip} />
        <Route exact path="/list-transaction" component={ListTransaction} />
        <Route exact path="/detail-trip/:id" component={DetailTrip} />
      </Switch>
    </>
  );
}

export default App;
