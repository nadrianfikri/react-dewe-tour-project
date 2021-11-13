import { useContext } from 'react';
import { Route } from 'react-router';
import { AuthContext } from '../context/authContext';

export function PrivateRoute({ children, ...rest }) {
  const [state] = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() => {
        if (state.isLogin) {
          return children;
        }
      }}
    />
  );
}
export function ProtectedRoute({ children, ...rest }) {
  const [state] = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() => {
        if (state.user.role === 'admin') {
          return children;
        }
      }}
    />
  );
}
