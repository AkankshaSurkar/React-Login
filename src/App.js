import React, {useState,useEffect,Fragment} from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn]= useState(false);

  // useEffect(()=>{
  //   const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  //   if(storedUserLoggedInInformation ==='1'){
  //     setIsLoggedIn(true);
  //   }
  // },[]);
  const loginHandler = (email, password)=>{
    setIsLoggedIn(true);
  }
const logoutHandler =()=>{
  setIsLoggedIn(false);
};
return(
<Fragment>
     <MainHeader  isAuthenticated= {isLoggedIn} onLogout={logoutHandler}/>
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler}/>}
      {isLoggedIn && <Home onLogout={logoutHandler}/>}
      </main> 
      </Fragment>
);
};

export default App;
