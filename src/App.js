// import Login from './pages/Auth/Login';
// import Regist from './pages/Auth/Regist';
// import Profile from './pages/Profile';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Regist from './pages/Auth/Regist';

function App() {
  return (
    <>
      <Home />
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route path="/profile" component={Profile} /> */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Regist} />
      </Switch>
    </>
  );
}

export default App;
