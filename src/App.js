import React, {useState,useEffect} from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import './App.css';
import AuthContext from './components/UI/store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn]= useState(false);

  useEffect(()=>{
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if(storedUserLoggedInInformation ==='1'){
      setIsLoggedIn(true);
    }
  },[]);
  const loginHandler = (email, password)=>{
    setIsLoggedIn(true);
  }
const logoutHandler =()=>{
  localStorage.removeItem('isloggedIn');
  setIsLoggedIn(false);
};
return(
  <AuthContext.Provider
  value={{
    isLoggedIn: isLoggedIn,
  }}>

     <MainHeader onLogout={logoutHandler}/>
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler}/>}
      {isLoggedIn && <Home onLogout={logoutHandler}/>}
      </main> 
      </AuthContext.Provider>
);
};

export default App;
