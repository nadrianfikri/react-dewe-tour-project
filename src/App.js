import { useContext, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { AuthContext } from './context/authContext';

import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import DetailTrip from './pages/DetailTrip';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import IncomeTrip from './pages/IncomeTrip';
import ListTransaction from './pages/ListTransaction';
import AddTrip from './pages/AddTrip';
import Notfound from './components/Notfound';

// get API config and setAuthToken
import { API, setAuthToken } from './config/api';
import SkeletonHome from './components/SkeletonHome';
import Navbar from './components/Navbar';

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
      console.log(error);
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  // Call function check user with useEffect
  useEffect(() => {
    checkUser();
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  return (
    <>
      <ScrollToTop />
      <>
        {loading === null ? (
          <>
            <Navbar class="bg-navbar" />
            <SkeletonHome />
          </>
        ) : (
          <>
            {state.isLogin === false ? (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/detail-trip/:id" component={DetailTrip} />
                <Route path="*" component={Notfound} />
              </Switch>
            ) : (
              <>
                {state.user.role === 'admin' ? (
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/detail-trip/:id" component={DetailTrip} />
                    <Route path="/list-transaction" component={ListTransaction} />
                    <Route path="/income-trip" component={IncomeTrip} />
                    <Route path="/add-trip" component={AddTrip} />
                    <Route path="*" component={Notfound} />
                  </Switch>
                ) : (
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/detail-trip/:id" component={DetailTrip} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/payment" component={Payment} />
                    <Route path="*" component={Notfound} />
                  </Switch>
                )}
              </>
            )}
          </>
        )}
      </>
    </>
  );
}

export default App;
