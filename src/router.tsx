import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./features/books/pages/Dashboard";
import Books from "./features/books/pages/Books";
import SignIn from "./features/auth/pages/Signin";
import SignUp from "./features/auth/pages/Signup";
import AuthGuard from "./features/auth/authGuard";
import AuthLayout from "./features/auth/authLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: (
          <AuthGuard>
            <Dashboard/>
        </AuthGuard>
      ),
      },
      {
        path: "/home",
        element:(
          <AuthGuard>
            <Books/>
          </AuthGuard>
        ),
      }
    ]
  },
  {
    path: "/",
    element: <AuthLayout />, // No sidebar for auth pages
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ]
    }
]);

export default router;