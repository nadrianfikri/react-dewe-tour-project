import { Route, Switch, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

import ScrollToTop from './components/ScrollToTop';
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
  const { state } = useContext(AuthContext);
  // const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <ScrollToTop />
      <Switch>
        {state.isLogin === false ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Regist} />
            <Route exact path="/detail-trip/:id" component={DetailTrip} />
            <Redirect to="/" />
          </>
        ) : (
          <>
            {state.user.status === 1 ? (
              <>
                <Route exact path="/" component={Home} />
                <Route exact path="/detail-trip/:id" component={DetailTrip} />
                <Route exact path="/income-trip" component={IncomeTrip} />
                <Route exact path="/add-trip" component={AddTrip} />
                <Route exact path="/list-transaction" component={ListTransaction} />
                <Redirect to="/" />
              </>
            ) : (
              <>
                <Route exact path="/" component={Home} />
                <Route exact path="/detail-trip/:id" component={DetailTrip} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/payment" component={Payment} />
                <Redirect to="/" />
              </>
            )}
          </>
        )}
      </Switch>
    </>
  );
}

export default App;
