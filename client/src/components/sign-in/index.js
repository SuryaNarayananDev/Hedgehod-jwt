import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import GoogleImg from "../assets/googleImg.png";
import MsImg from "../assets/MS.png"
// import GoogleImg from "../assets/"
// import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import axios from "axios";
const SignIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
	const [Error, setError] = useState("");

  // const notify = (s, msg) => {
  //   if (s === 0) {
  //     toast.error(msg);
  //   } else {
  //     toast.success(msg);
  //   }
  // }

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
    console.log(data,Error);
    
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
        // notify(0,Error)
			}
		}
	};
  return (
    <section className="section signInPage">
      {/* <ToastContainer /> */}
      <div className="shape-bottom">
        {" "}
        <svg
          fill="#fff"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 1921 819.8"
          style={{ enableBackground: "new 0 0 1921 819.8" }}
        >
          {" "}
          <path
            class="st0"
            d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
          ></path>{" "}
        </svg>
      </div>

      <div className="container">
        <div className="box card p-3 shadow border-0">
          <div className="text-center">
            {/* <img src={Logo} /> */}
          </div>

          <form className="mt-3" onSubmit={handleSubmit}>
            <h2 className="mb-4">Sign In</h2>

            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Email"
                type="email"
                required
                variant="standard"
                className="w-100"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                required
                variant="standard"
                className="w-100"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            {Error&&<p style={{color:"red"}}>{Error}</p>}<br/>
            <a className="border-effect cursor txt">Forgot Password?</a>

            <div className="d-flex align-items-center mt-3 mb-3 ">
              <Button type="submit" className="btn-blue col btn-lg btn-big">
                SignIn
                {/* {isLoading === true ? <CircularProgress /> : "Sign In"} */}
              </Button>
              <Link to="/">
                {" "}
                <Button
                  className="btn-lg btn-big col ml-3"
                  variant="outlined"
                  // onClick={() => context.setisHeaderFooterShow(true)}
                >
                  Cancel
                </Button>
              </Link>
            </div>

            <p className="txt">
              Not Registered?{" "}
              <Link to="/signUp" className="border-effect">
                Sign Up
              </Link>
            </p>

            <h6 className="mt-4 text-center font-weight-bold">
              Or continue with social account
            </h6>

            <Button
              className="loginWithGoogle mt-2"
              variant="outlined"
              // onClick={signInWithGoogle}
              
            // onClick={()=>notify(1,"SignIn With Google")}
            >
              <img src={GoogleImg} /> Sign In with Google
            </Button>

            
            <Button
              className="loginWithGoogle mt-2"
              variant="outlined"
              
            // onClick={()=>notify(1,"SignIn With MS")}
              // onClick={signInWithGoogle}
            >
              <img src={MsImg} /> Sign In with MicroSoft
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
