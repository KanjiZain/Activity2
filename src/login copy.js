import React, { useRef, useState } from "react";
import classes from "./login.module.css";
import "./auth.css";
import axios from "axios";
import { Router, useNavigate } from "react-router";
import Home from "./home";
import { Link } from "react-router-dom";
export default function Auth(props) {

  let [authMode, setAuthMode] = useState("signup");
  let [authMode1, setAuthMode1] = useState("sign");
  let [signusername1, setsignusername] = useState("");
  let [signemail1, setsignemail] = useState("");
  let [signpassword1, setsignpassword] = useState("");
  let [emailisvalid, setemailisvalid] = useState(false);
  let [emailisvalidlogin, setemailisvalidlogin] = useState(false);
  let [passwordisvalid, setpasswordisvalid] = useState(false);
  let [updatepassword1, setupdatepassword1] = useState("");

  const signusername = useRef("");
  const signemail = useRef("");
  const signpassword = useRef("");
  const updatepassword = useRef("");
  const navigate = useNavigate();

  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  

  const changeAuthMode = () => {
    if (authMode === "login") {
      setAuthMode("signup");
    } else if (authMode === "signup") {
      setAuthMode("login");
    } else {
      setAuthMode("forgotpw");
    }
  };

  const usernamehandler = (e) => {
    setsignusername(e.target.value);
  };

  const emailhandler = (e) => {
    setsignemail(e.target.value);
  };

  const passwordhandler = (e) => {
    setsignpassword(e.target.value);
  };

  const updatepasswordhandler = (e) => {
    setupdatepassword1(e.target.value);
  };

  async function SignupHandler(e) {
    const enteredusername = signusername.current.value;
    const enteredemail = signemail.current.value;
    const enteredpassword = signpassword.current.value;

    e.preventDefault();

    if (signemail1 === "" || signpassword1 === "" || signusername1 === "") {
      window.alert("Please insert all the feilds");
    } else {
      if (!pattern.test([enteredemail])) {
        window.alert("Please insert valid email");
      } else {
        let payload = {
          username: signusername.current.value,
          email: signemail.current.value,
          password: signpassword.current.value,
        };

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
  }

  const loginHandler = (e) => {
    const enteredemail = signemail.current.value;
    let enteredpassword = signpassword.current.value;
    let payload = {
      password: enteredpassword,
      email: enteredemail,
    };


    if (signemail1 === "" || signpassword1 === "") {
      window.alert("Please insert all the feilds");
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
              }
            }
          });
      }
    }
    e.preventDefault();
  };

  const deleteHandler = (e) => {
    const enteredemail = signemail.current.value;
    const enteredpassword = signpassword.current.value;

    let payload = {
      email: signemail.current.value,
      password: signpassword.current.value,
    };

    if (signemail1 === "" || signpassword1 === "") {
      window.alert("Please insert all the feilds");
    } else {
      let check = axios

        .delete(
          "http://localhost:4000/auths/deleteauth/" +
            enteredemail +
            "/" +
            enteredpassword,
          payload
        )

        .then((response) => {
          let check1 = response.data;
        });
    }

    e.preventDefault();
  };

  const updateHandler = (e) => {
    const enteredemail = signemail.current.value;
    const enteredpassword = signpassword.current.value;
    const enteredupdatepassword = updatepassword.current.value;

    let payload = {
      email: signemail.current.value,
      password: signpassword.current.value,
      updatepassword: updatepassword.current.value,
    };

    if (signemail1 === "" || signpassword1 === "") {
      window.alert("Please insert all the feilds");
    } else {
      let check = axios

        .post("http://localhost:4000/auths/updatepw/", payload)

        .then((response) => {
          let check1 = response.data;

          if (check1 === "The user does not exsist") {
            setemailisvalidlogin(true);
          } else {
            if (check1 === "The password is not correct") {
              setpasswordisvalid(true);
            } else {
            }
          }
        });
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
                value={signemail1}
                onChange={emailhandler}
                ref={signemail}
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
                value={signpassword1}
                onChange={passwordhandler}
                ref={signpassword}
              />
              {passwordisvalid && (
                <p className={classes.error}>The password is not correct</p>
              )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={loginHandler}
              >
                Submit
              </button>
            </div>
            <label className="link-primary" onClick={changeAuthMode}>
              Update Password?
            </label>
            <p className="text-center mt-2"></p>
          </div>
        </form>
      </div>
    );
  } else if (authMode === "signup") {
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
                ref={signusername}
                value={signusername1}
                onChange={usernamehandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                ref={signemail}
                value={signemail1}
                onChange={emailhandler}
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
                ref={signpassword}
                value={signpassword1}
                onChange={passwordhandler}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={SignupHandler}
              >
                Submit
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
          <h3 className="Auth-form-title">Update Password</h3>
          <div className="text-center">
            Already registered? <label className="link-primary">Log In</label>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              ref={signemail}
              value={signemail1}
              onChange={emailhandler}
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
              placeholder="Password"
              ref={signpassword}
              value={signpassword1}
              onChange={passwordhandler}
            />
          </div>
          {passwordisvalid && (
            <p className={classes.error}>The password is not correct</p>
          )}
          <div className="form-group mt-3">
            <label>Updated Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Updated Password"
              ref={updatepassword}
              value={updatepassword1}
              onChange={updatepasswordhandler}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={updateHandler}
            >
              Update Password
            </button>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={deleteHandler}
            >
              Delete User
            </button>
          </div>
          <p className="text-center mt-2"></p>
        </div>
      </form>
    </div>
  );
}
