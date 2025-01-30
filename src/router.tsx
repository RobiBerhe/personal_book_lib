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
      // {
      //   path: "/signin",
      //   element: <SignIn />,
      // },
      // {
      //   path: "/signup",
      //   element: <SignUp />,
      // },
      // {
      //   path: "/",
      //   // element: <h1>Home</h1>,
      //   element: <Dashboard/>,
      // },
      // {
      //   path: "/home",
      //   // element: <h1>Add Book</h1>,
      //   element: <Books/>,
      // }
      {
        path: "/",
        // element: <h1>Home</h1>,
        element: (
          <AuthGuard>
            <Dashboard/>
        </AuthGuard>
      ),
      },
      {
        path: "/home",
        // element: <h1>Add Book</h1>,
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