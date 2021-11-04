import { createContext, useReducer } from 'react';

const initialValue = {
  isLogin: false,
  user: {},
};

export const AuthContext = createContext();

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'AUTH_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);

      return {
        isLogin: true,
        user: payload,
      };

    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');

      return {
        isLogin: false,
        user: {},
      };

    default:
      throw new Error("type doesn't match cases");
  }
}

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
