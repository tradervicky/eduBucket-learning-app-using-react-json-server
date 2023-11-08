import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const StudentLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  //states for signUp
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  //states for Login in admin panel
  const [loginEmail, setLoginEmail] = useState("");
  const [error, setError] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  //login states for logics
  const [loginData, setLoginData] = useState([]);
//  logic for toggle in signup and login
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(false)
  };
  // navigate logic
  const navigate = useNavigate();

// signuphandleclick
  const signuphandleClick =(e) => {
    e.preventDefault();
    addData();

  };
// add data in db.json logic for signup
  const addData = async () => {
    if (!name || !signUpEmail || !signupPassword ) {
      setError("Please enter all details");
      return;
    }

 

    if (name && signUpEmail && signupPassword) {
      try {
        const url = "http://localhost:8080/students";
        const response = await axios.post(url, {
          name: name,
          email: signUpEmail,
          password: signupPassword,
          enrolled: []

        });
        setName("");
        setSignUpEmail("");
        setSignupPassword("");
        
        setError(false)
        // update the new user data for login
        setLoginData((prevLoginData) => [...prevLoginData, { name, email: signUpEmail, password: signupPassword }]);
        console.log(response.data); 
      } catch (error) {
        console.error("Error adding data:", error);
      }
    }
  };

  //login logic for admin and fetching data from db.json

  // loginhandleclick logic
  const loginhandleClick = async (e) => {
    e.preventDefault();
    if(!loginEmail || ! loginPassword){
        setError("Please enter email and password");
        return;
    }
    try {
        
        const user = loginData.find((user) => user.email === loginEmail);
        if (user) {
          
          if (user.password === loginPassword) {
            
            console.log("Login successful");
            setLoginEmail("");
            setLoginPassword("");
            localStorage.setItem('studentlogin', true)
            navigate(`/?sId=${user.id}`);
           
          } else {
            setError("Incorrect password");
          }
        } else {
          setError("User not found");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    
  };

  //fetch data for student user
  useEffect(()=>{
    fetchAdminLogin();
  },[])
  const fetchAdminLogin = async()=>{
    try{
        const response =await axios.get("http://localhost:8080/students")
        setLoginData(response.data)
    }catch(error){
        console.error(error)
    }  
  }


  return (
    <div className="maincontainer">
      <div className="wrapper">
        <div className="content-container">
          <div className="form-container">
            <div className="title-text">
              <div className={`title ${isLogin ? 'login' : 'signup'}`}>
                {isLogin ? 'Student Login' : 'Student Signup'}
              </div>
            </div>
            <div className="slide-controls">
              <input type="radio" name="slide" id="login" checked={isLogin} onChange={toggleForm} />
              <input type="radio" name="slide" id="signup" checked={!isLogin} onChange={toggleForm} />
              <label htmlFor="login" className="slide login">
                Login
              </label>
              <label htmlFor="signup" className="slide signup">
                Signup
              </label>
              <div className="slider-tab"></div>
            </div>
            <div className="form-inner">
              <form className={isLogin ? 'login' : 'signup'}>
                {isLogin ? (
                  <div>
                    <div className="field">
                      <input type="text" placeholder="Email Address" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="field">
                      <input type="password" placeholder="Password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    
                    <div className="field btn">
                      <div className="btn-layer"></div>
                      <input type="submit" value="Login" onClick={loginhandleClick} />
                    </div>
                    <div className="signup-link">
                      Not a member? <a href="#">Signup now</a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="field">
                      <input type="text" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="field">
                      <input type="text" placeholder="Email Address" required value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
                    </div>
                    <div className="field">
                      <input type="password" placeholder="Password" required value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                    </div>
                    
                    <div className="field btn">
                      <div className="btn-layer"></div>
                      <input type="submit" value="Signup" onClick={signuphandleClick} />
                    </div>
                    <br />
                    <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="image-container">
            {isLogin ? (
              <img src="/images/Login.jpg" alt="Login" />
            ) : (
              <img src="/images/register.jpg" alt="Signup" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
