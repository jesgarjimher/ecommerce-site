import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./views/Login"
import Register from "./views/Register"
import UpdateProduct from './views/UpdateProduct';
import AddProduct from "./views/AddProduct"
import Protected from "./views/Protected"
import ProductList from './views/ProductList';
import SearchProduct from './views/SearchProduct';
import Product from './views/Product';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/updateproduct/:id" element={<Protected component={UpdateProduct}/>} />
          
          <Route path="/addproduct" element={<Protected component={AddProduct}/>} />
          <Route path='/' element={<Protected component={ProductList}/> } />
          <Route path='/search' element={<Protected component={SearchProduct}/> } />
          <Route path="/product/:id" element={<Protected component={Product}/> } />
        </Routes>
        
      </BrowserRouter>
      
     
    </div>
  );
}

export default App;
