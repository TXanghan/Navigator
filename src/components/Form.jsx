import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
  let [hobby, setHobby] = useState([])
  let [data,setData] = useState({})
  let nevigater = useNavigate()
  let[error,setError]=useState({});
  let handleInput = (e) => {
      let { name, value } = e.target;

      let ho = [...hobby];
      if (name == 'hobby') {
          if (e.target.checked) {
              ho.push(value);
          } else {
              let pos = ho.findIndex((v, i) => value == v);
              ho.splice(pos, 1);
          }
          console.log(ho);

      }
      setHobby(ho);
      setData({ ...data, [name]: value });
  }

  let validationForm=()=>{
    let tempErrors={};
   
    if(!data.username)tempErrors.username="Uaername is required.";
    if(!data.email)tempErrors.email="Email is required.";
    else if(!/\S+@\S+\.\S+/.test(data.email))tempErrors.email="Email is required."
    if(!data.password)tempErrors.password="password is required.";
    if(!data.gender)tempErrors.gender="gender is required.";
    if(!data.hobby)tempErrors.hobby="Hobby is required.";
    if(!data.city)tempErrors.city="city is required.";
     if(!data.address)tempErrors.address="address is required.";
    setError(tempErrors);
    return Object.keys(tempErrors).length  === 0;

  };

  let handleSubmit = (e) => {
      e.preventDefault();

      if (!validationForm()) return;

      fetch('http://localhost:3000/users', {
          method: 'POST',
          body: JSON.stringify(data)
      }).then(() => {
          toast.success("Data Add..");
      }).catch((err) => {
          toast.error(err);
      })
      setTimeout(()=>{
          nevigater('/UserRecode')
      },1000)

  }
return (
  <>
       <form method='post' onSubmit={handleSubmit}>
              <table align='center' border={1}>
                  <caption>
                      <h2>Add User Data</h2>
                      <Link to="/userRecode">View Recode</Link>
                      <br /> <br />
                  </caption>
            
                  <tbody>
                      <tr>
                          <td>UserName</td>
                          <td><input type="text" name="username" onChange={handleInput} />{error.username ?<span style={{color:"red"}}>{error.username}</span>:null}</td>
                      </tr>
                      <tr>
                          <td>Email</td>
                          <td><input type="text" name="email" onChange={handleInput} />{error.email ?<span style={{color:"red"}}>{error.email}</span>:null}</td>
                      </tr>
                      <tr>
                          <td>Password</td>
                          <td><input type="text" name="password" onChange={handleInput} />{error.password ?<span style={{color:"red"}}>{error.password}</span>:null}</td>
                      </tr>
                      <tr>
                          <td>Gender</td>
                          <td>
                              <input type="radio" name="gender" value='male' onChange={handleInput} /> Male
                              <input type="radio" name="gender" value='female' onChange={handleInput} /> Female
                              {error.gender ?<span style={{color:"red"}}>{error.gender}</span>:null}
                          </td>
                      </tr>
                      <tr>
                          <td>Hobby</td>
                          <td>
                              <input type="checkbox" name="hobby" value='Dance' onChange={handleInput} /> Dance
                              <input type="checkbox" name="hobby" value='Writing' onChange={handleInput} /> Writing
                              {error.hobby ?<span style={{color:"red"}}>{error.hobby}</span>:null}
                          </td>
                      </tr>
                      <tr>
                          <td>City</td>
                          <td>
                              <select name="city" onChange={handleInput}>
                                  <option value="" disabled selected>--select-city--</option>
                                  <option value="surat">surat</option>
                                  <option value="pune">pune</option>
                              </select>
                              {error.city ?<span style={{color:"red"}}>{error.city}</span>:null}
                          </td>
                      </tr>
                      <tr>
                          <td>Address</td>
                          <td>
                              <textarea name="address" onChange={handleInput} ></textarea>
                              {error.address ?<span style={{color:"red"}}>{error.address}</span>:null}
                          </td>
                      </tr>
                      <tr>
                          <td></td>
                          <td><input type="submit" value="Add Recode" /></td>
                      </tr>
                  </tbody>
              </table>
          </form>

          <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
  </>
)
}
export default Form
