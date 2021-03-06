import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions.js'
import {selectCurrentUser} from './redux/user/user.selector';

class App extends React.Component{
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser}=this.props;

    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth =>{
      //continuously open subscription that notifies when auth stat changes
      //needs to close the subscription when app unmounts to prevent memory leak
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          //REREAD!
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          });
        });
      }
      else{
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
    //close continuous subscription
  }
  
  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path ='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' 
            render={() => 
              this.props.currentUser?(
                <Redirect to='/' />
                ):(
                <SignInAndSignUpPage />
                )
              }
            />
        </Switch>
      </div>
  );
  }
}

const mapStateToProps = createStructuredSelector({
  //gives scalability
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
