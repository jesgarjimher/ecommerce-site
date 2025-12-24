import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./views/Login"
import Register from "./views/Register"
import UpdateProduct from './views/UpdateProduct';
import AddProduct from "./views/AddProduct"
import Protected from "./views/Protected"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/updateproduct" element={<Protected component={UpdateProduct}/>} />
          
          <Route path="/addproduct" element={<Protected component={AddProduct}/>} />
          

        </Routes>
        
      </BrowserRouter>
      
     
    </div>
  );
}

export default App;
