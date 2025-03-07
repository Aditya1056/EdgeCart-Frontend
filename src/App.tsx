import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Root from "./pages/Root/Root";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products/Products";
import Product from "./pages/Products/Product";
import Cart from "./pages/User/Cart";
import Orders from "./pages/Orders/Orders";
import Order from "./pages/Orders/Order";
import Profile from "./pages/User/Profile";
import Error from "./pages/Error/Error";

import AuthProtection from "./protectors/AuthProtection";
import UnAuthProtection from "./protectors/UnAuthProtection";

import AuthContextProvider from "./providers/AuthContextProvider";
import ToastContextProvider from "./providers/ToastContextProvider";

import queryClient from "./util/helpers/queryClient";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index:true,
        element: <AuthProtection element={ <Products /> } />
      },
      {
        path:'product/:id',
        element: <AuthProtection element={ <Product /> } />
      },
      {
        path:'cart',
        element: <AuthProtection element={ <Cart /> } />
      },
      {
        path:'orders',
        element: <AuthProtection element={ <Orders /> } />
      },
      {
        path:'orders/:id',
        element: <AuthProtection element={ <Order /> } />
      },
      {
        path:'profile',
        element: <AuthProtection element={ <Profile /> } />
      },
      {
        path: 'login',
        element: <UnAuthProtection element={ <Login /> } />
      },
      {
        path:'signup',
        element: <UnAuthProtection element={ <Signup /> } />
      },
      {
        path:'*',
        element: <Error />
      }
    ]
  }
]);

function App() {

  return (
    <ToastContextProvider>
      <QueryClientProvider client={queryClient} >
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
      </QueryClientProvider>
    </ToastContextProvider>
  );
}

export default App;