import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GuestMode from "./components/protect/GuestMode";
import ContextProvider from "./components/ContextProvider";
import ProtectRoute from "./components/protect/ProtectRoute";
import CartPage from "./pages/CartPage";
import AdminRoute from "./components/protect/AdminRoute";
import AdminPage from "./pages/AdminPage";
import ProductsControl from "./components/Admin/ProductsControl";
import Orders from "./components/Admin/Orders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "product/:id", element: <ProductPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "contact", element: <ContactPage /> },
        {
          path: "register",
          element: (
            <GuestMode>
              <RegisterPage />
            </GuestMode>
          ),
        },
        {
          path: "login",
          element: (
            <GuestMode>
              <LoginPage />
            </GuestMode>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectRoute>
              <CartPage />
            </ProtectRoute>
          ),
        },
        {
          path: "grdhb26",
          element: (
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          ),
          children: [
            {
              index: true,
              path: "products",
              element: (
                <AdminRoute>
                  <ProductsControl />
                </AdminRoute>
              ),
            },
            {
              path: "orders",
              element: (
                <AdminRoute>
                  <Orders />
                </AdminRoute>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
