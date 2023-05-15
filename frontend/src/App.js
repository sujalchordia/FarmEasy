import './App.css';

import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from 'react-router-dom'
import Login from './screens/Login.js';
import SignUp from './screens/SignUp.js';
import MyCart from './components/myCart';
import MyOrders from './components/Orders';
import ItemDetails from './components/ItemDetails';
import ReviewForm from './components/AddReview';
import UpdateReview from './components/UpdateReview';

function App() {
  return (
    <Router>
      <div style={{backgroundColor:"#fcf8e8"}}>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/createuser" element={<SignUp />}/>
          <Route exact path="/myCart" element={<MyCart />}/>
          <Route exact path="/myOrder" element={<MyOrders />}/>
          <Route exact path="/ItemDetails" element={<ItemDetails />}/>
          <Route exact path="/AddReview" element={<ReviewForm />}/>
          <Route exact path="/UpdateReview" element={<UpdateReview/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
