import { useContext, useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
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
import Notfound from './components/Notfound';

// get API config and setAuthToken
import { API, setAuthToken } from './config/api';

//init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let history = useHistory();

  // init authContext
  const [state, dispatch] = useContext(AuthContext);
  const [loading, setLoading] = useState(null);

  // create function for check user token
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status !== 200) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: 'AUTH_SUCCESS',
        payload,
      });
    } catch (error) {
      history.push('/');
    }
  };

  // Call function check user with useEffect
  useEffect(() => {
    checkUser();
    setLoading(true);
  }, []);

  return (
    <>
      <ScrollToTop />
      <>
        {loading === null ? (
          <div className="flex h-screen justify-center items-center ">
            <p className="animate-spin text-5xl">+</p>
          </div>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/detail-trip/:id" component={DetailTrip} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Regist} />
            {state.user.role === 'admin' ? (
              <Switch>
                <Route exact path="/list-transaction" component={ListTransaction} />
                <Route exact path="/income-trip" component={IncomeTrip} />
                <Route exact path="/add-trip" component={AddTrip} />
                <Route path="*" component={Notfound} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/payment" component={Payment} />
                <Route path="*" component={Notfound} />
              </Switch>
            )}
          </Switch>
        )}
      </>
    </>
  );
}

export default App;
