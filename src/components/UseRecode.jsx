import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function UserRecode() {
    let[userRecode,setUserRecode]=useState([])
    let nevigater = useNavigate()

    useEffect(()=>{
        fetchRecode();
    },[])

    let fetchRecode=()=>{
        fetch("http://localhost:3000/users",{
            method:"GET"
        }).then(async(res)=>{
            let data=await res.json();
            console.log(data)
            setUserRecode(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    let deleteData=(id)=>{
        fetch(`http://localhost:3000/users/${id}`,{
            method:"DELETE",
        }).then(()=>{
            fetchRecode();
            console.log("Data Deleted")
        }).catch((err)=>{
            console.log(err)
        })
    }
    let editData =(id)=>{
        nevigater(`/editdata/${id}`)  
    }
  return (
    <>
        <table align='center' border={1}>
            <caption>
                <h2>User Recode...</h2>
               <Link to={'/'}>Form</Link>
               <br /> <br />
            </caption>
            
            <thead>
                <tr>
                    <td>Username</td>
                    <td>Email</td>
                    <td>Password</td>
                    <td>Gender</td>
                    <td>Hobby</td>
                    <td>City</td>
                    <td>Address</td>
                    <td>Action</td>
                </tr>
            </thead>

            <tbody>
                {
                    userRecode.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.gender}</td>
                            <td>{user.hobby.toString()}</td>
                            <td>{user.city}</td>
                            <td>{user.address}</td>
                           
                            <td>
                                <button onClick={()=>deleteData(user.id)}>Delete</button>
                                <button onClick={()=>editData(user.id)}>Edit</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </>
  )
}

export default UserRecode
