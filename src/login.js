import React, { useRef, useState } from "react";
import classes from "./login.module.css";
import "./auth.css";
import axios from "axios";
import { Router, useNavigate } from "react-router";
import Home from "./home";
import { Link } from "react-router-dom";

const Auth = () => {
  let [authMode, setAuthMode] = useState("signup");

  let [signusername, setsignusername] = useState("");
  let [signemail, setsignemail] = useState("");
  let [signpassword, setsignpassword] = useState("");

  let [loginusername, setloginusername] = useState("");
  let [loginemail, setloginemail] = useState("");
  let [loginpassword, setloginpassword] = useState("");

  let [emailisvalid, setemailisvalid] = useState(false);
  let [emailisvalidlogin, setemailisvalidlogin] = useState(false);

  let [passwordisvalid, setpasswordisvalid] = useState(false);
  let [passwordisvalidlogin, setpasswordisvalidlogin] = useState(false);

  let [userisvalid, setuserisvalid] = useState("");


  const signusernameref = useRef("");
  const signemailref = useRef("");
  const signpasswordref = useRef("");

  const loginusernameref = useRef("");
  const loginemailref = useRef("");
  const loginpasswordref = useRef("");

  const updatepasswordref = useRef("");
  const navigate = useNavigate();

  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  const changeAuthMode = () => {
    if (authMode === "login") {
      setAuthMode("signup");
    } else {
      setAuthMode("login");
    }

    setloginemail("");
    setloginpassword("");
    setsignemail("");
    setsignpassword("");
    setsignusername("");
  };

  const signusernamehandler = (e) => {
    const { value } = e.target;
    console.log("Input value: ", value);

    const re = /^[A-Za-z0-9]+$/;
    if (value === "" || re.test(value)) {
      setsignusername(e.target.value);
    }
  };

  const signemailhandler = (e) => {
    setsignemail(e.target.value);
  };

  const signpasswordhandler = (e) => {
    setsignpassword(e.target.value);
  };

  const loginemailhandler = (e) => {
    setloginemail(e.target.value);
  };

  const loginpasswordhandler = (e) => {
    setloginpassword(e.target.value);
  };

  const loginHandler = (e) => {
    const enteredemail = loginemailref.current.value;
    const enteredpassword = loginpasswordref.current.value;

    let payload = {
      email: enteredemail,
      password: enteredpassword,
    };

    if (loginemail === "" || loginpassword === "" || loginusername === "") {
      window.alert("Please insert all the feilds");
    } else {
      if (!pattern.test([enteredemail])) {
        window.alert("Please insert valid email");
      } else {
        if (!pattern.test([enteredemail])) {
          window.alert("Please insert valid email");
        } else {
          let check = axios

            .post("http://localhost:4000/auths/login/", payload)

            .then((response) => {
              let check1 = response.data;

              if (check1 === "The user does not exsist") {
                setemailisvalidlogin(true);
              } else {
                if (check1 === "The password is not correct") {
                  setpasswordisvalid(true);
                } else {
                  localStorage.setItem("useremail", enteredemail);
                  navigate("/home");
                }
              }
            });
        }
      }
    }
    e.preventDefault();
  };

  const SignupHandler = (e) => {
    const enteredusername = signusernameref.current.value;
    const enteredemail = signemailref.current.value;
    const enteredpassword = signpasswordref.current.value;

    let payload = {
      username: enteredusername,
      email: enteredemail,
      password: enteredpassword,
    };

    if (signemail === "" || signpassword === "" || signusername === "") {
      window.alert("Please insert all the feilds");
    } else {
      if (!pattern.test([enteredemail])) {
        window.alert("Please insert valid email");
      } else {
        let check = axios
          .post("http://localhost:4000/auths/signup/", payload)
          .then((response) => {
            let check1 = response.data;

            if (check1 === "The user does not exsist") {
              changeAuthMode();
              setsignemail("");
              setsignpassword("");
              setsignusername("");
              setemailisvalid(false);
            } else {
              setemailisvalid(true);
            }
          });
      }
    }
    e.preventDefault();
  };

  if (authMode === "login") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <label className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </label>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={loginemail}
                onChange={loginemailhandler}
                ref={loginemailref}
              />
              {emailisvalidlogin && (
                <p className={classes.error}>The Email is not correct</p>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={loginpassword}
                onChange={loginpasswordhandler}
                ref={loginpasswordref}
              />
              {passwordisvalidlogin && (
                <p className={classes.error}>The password is not correct</p>
              )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={loginHandler}
              >
                Log in
              </button>
            </div>

            <p className="text-center mt-2"></p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign up</h3>
          <div className="text-center">
            Already registered?{" "}
            <label className="link-primary" onClick={changeAuthMode}>
              Log In
            </label>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              ref={signusernameref}
              value={signusername}
              onChange={signusernamehandler}
            />
          </div>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              ref={signemailref}
              value={signemail}
              onChange={signemailhandler}
            />
            {emailisvalid && (
              <p className={classes.error}>The Email is Already in use</p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              ref={signpasswordref}
              value={signpassword}
              onChange={signpasswordhandler}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={SignupHandler}
            >
              Sign Up
            </button>
          </div>
          <p className="text-center mt-2"></p>
        </div>
      </form>
    </div>
  );
};

export default Auth;
