import './App.css';
import AddProduct from './components/products/AddProduct';
import AllProducts from './components/products/AllProducts';
import UpdateProducts from './components/products/UpdateProducts'; 
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Movies from './components/movietheatre/Movie';
import Parent from './components/movietheatre/Parent';

import Player from './components/movietheatre/player';
import ParentComponent from './components/movietheatre/Parent';
import MovieContainer from './components/movietheatre/Movieparent';

import AddShop from './components/shops/AddShop';
import UpdateShops from './components/shops/UpdateShops';
import AllShops from './components/shops/AllShops';
import ViewProduct from './components/shops/ViewProduct';

import AddEmployee from './components/employees/AddEmployee';
import ViewUpdateEmployee from './components/employees/ViewUpdateEmployee';
import EmployeeList from './components/employees/EmployeeList';
import ViewEmployee from './components/employees/ViewEmployee';
import EHome from './components/employees/EHome';

import Spin from './components/games/Spin';
import BuyCoins from './components/games/BuyCoins';

import Registration from './assets/Registration';
import Login from './assets/Login';

import AvailableShops from './components/shopsxproducts/AvailableShops';
import ShopList from './components/shopsxproducts/ShopList';
import ViewProducts from './components/shopsxproducts/ViewProducts';

import Payment from './components/payment/Payment';

import CartItems from './components/shoppingcart/CartItems';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




function App() {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/g" element={<Home />} />       

          {/* Movies */}
          <Route path="/movies" element={<Movies />} />
          <Route path="/booking" element={<Parent />} />

          {/* Shops */}
          <Route path="/addshop" element={<AddShop />} />
          <Route path="/updateshop/:id" element={<UpdateShops />} /> 
          <Route path="/shops" element={<AllShops />} /> 
          <Route path="/viewproduct/:shopId" element={<ViewProduct />} />

          {/* Products */}
          <Route path="/add" element={<AddProduct />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/update/:productid" element={<UpdateProducts />} /> 

          {/* Employee */}
          <Route path="/addemp" element={<AddEmployee />} />
          <Route path="/empupdate/:id" element={<ViewUpdateEmployee />} /> 
          <Route path="/emplist" element={<EmployeeList />} /> 
          <Route path="/viewemp/:id" element={<ViewEmployee />} />
          <Route path="/ehome" element={<EHome/>} /> 

          {/* <Route path="/viewemp/" element={<ViewEmployee />} /> */}

          {/* Login */}
          <Route path='/register' element={<Registration />}></Route>
          <Route path='/' element={<Login />}></Route>

          {/* ShopXProducts */}
          <Route path="/availableshops" element={<AvailableShops />} />
          <Route path="/shoplist" element={<ShopList />} />
          <Route path="/viewproducts/:shopId" element={<ViewProducts />} />


          <Route path="/add/:shopId/:shopName" element={<AddProduct />} />

          {/* BuyProducts */}

          <Route path="/payment/:productName/:productPrice" element={<Payment />} />

          {/* CartItems */}
          <Route path="/cartitems" element={<CartItems />} /> 
          <Route path="/payment/:totalPrice" element={<Payment/>} />

          {/* MoviePlayer */}

          <Route path="/player" element={<Player/>} />
          <Route path="/pc" element={<ParentComponent/>} />
          <Route path="/mp" element={<MovieContainer/>} />

          {/* Games */}

          <Route path="/playgames" element={<Spin />} />
          <Route path="/buy" element={<BuyCoins />} />

        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
