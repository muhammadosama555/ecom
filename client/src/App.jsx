import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"

const App = () => {
  const user = true;
  return (
 <Router>
  <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/products/:category" element={<ProductList />}>
        </Route>
        <Route path="/products/:id" element={<Product />}>
        </Route>
        <Route path="/cart" element={<Cart />}>
        </Route>
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />}>
        </Route>
        <Route path="/register" element={user ? <Navigate replace to="/" /> :<Register />}>
        </Route>
      </Routes>
 </Router>
  );
};

export default App;