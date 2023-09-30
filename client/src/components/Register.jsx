import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './register.css'
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, Snackbar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name:"",email:"",password:"",cpassword:""
  })
  const [err, setErr] = useState(false)
  const [success, setSuccess] = useState(false)
  const [visibility, setVisibility] = useState(false)

  const handleChange = (e) => {
    const {name,value} = e.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]:value
      }
    })
  }

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {name,email,password,cpassword} = user;
    const res = await fetch('/register',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,password,cpassword
      })
    })
    const data = await res.json();
    setLoading(false);
    if(res.status === 422 || !data){
      // window.alert("Invalid Registration");
      setErr(true);
      console.log("Invalid Registration");
    }else{
      // window.alert("Registration Successful");
      setSuccess(true);
      console.log("Registration Successful");

      navigate("/signin");
    }
  }


  return (
    <div className="box">

    <div className="container">
      <form method="POST">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="passwordDiv">

          <input
            type={visibility ? "text" : "password"}
            placeholder="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />

          {
            visibility ?
            <VisibilityIcon
              style={{fontSize:"1.9rem"}}
              onClick={() => setVisibility(!visibility)}
            />
            :
            <VisibilityOffIcon
              style={{fontSize:"1.9rem"}}
              onClick={() => setVisibility(!visibility)}
            />
          }

          </div>

        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            placeholder="confirm password"
            name="cpassword"
            id="cpassword"
            value={user.cpassword}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button type="submit" name="register" id="register" disabled={loading} className='auth-button' onClick={postData}>
            Register
            {loading && (
              <div className="spinner">
                <CircularProgress size={16} color='primary' thickness={6} />
              </div>
              )}
          </button>
        </div>
      </form>
    </div>
    {err && (
      <Snackbar
        anchorOrigin={{vertical:"top",horizontal:"center"}}
        open={err}
        autoHideDuration={2000}
        onClose={() => setErr(false)}
      >
        <Alert severity='error' sx={{width:'100%'}}>Invalid Registration</Alert>
      </Snackbar>
    )}
    {success && (
      <Snackbar
        anchorOrigin={{vertical:"top",horizontal:"center"}}
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        message="Registration Successful"
      >
        <Alert severity='success' sx={{width:'100%'}}>Registration Successful</Alert>
      </Snackbar>
    )}
    </div>

  )
}

export default Register