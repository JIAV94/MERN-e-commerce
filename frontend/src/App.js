import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import CartScreen from './screens/CartScreen.js'
import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import OrderScreen from './screens/OrderScreen.js'
import PaymentScreen from './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import UserEditScreen from './screens/UserEditScreen.js'
import UserListScreen from './screens/UserListScreen.js'
import ProductEditScreen from './screens/ProductEditScreen.js'
import ProductListScreen from './screens/ProductListScreen.js'
import OrderListScreen from './screens/OrderListScreen.js'


const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container >
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
