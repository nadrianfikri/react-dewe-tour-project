// import Login from './pages/Auth/Login';
// import Regist from './pages/Auth/Regist';
// import Profile from './pages/Profile';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import DetailTrip from './pages/DetailTrip';
import Login from './pages/Auth/Login';
import Regist from './pages/Auth/Regist';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/profile" component={Profile} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Regist} />
        <Route exact path="/detail-trip/:id" component={DetailTrip} />
      </Switch>
    </>
  );
}

export default App;
