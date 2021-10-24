import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(AuthContext);

  const isLogin = state.isLogin;

  return (
    <>
      <Route {...rest} render={(props) => (isLogin ? <Component {...props} /> : <Redirect to="/" />)} />
    </>
  );
};

export default PrivateRoute;
