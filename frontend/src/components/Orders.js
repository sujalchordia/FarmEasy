import React from 'react'
import { useState,useEffect } from 'react';
import { useGlobalContext } from './context';
import Navb from '../components/Navbar'
import { AiFillDelete} from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';


function MyOrders() {
    const [orderData, setorderData] = useState([]);
    const {showsuccessmessage}=useGlobalContext();
    const navigate=useNavigate();
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response.orderData.order_data)
        })
    }
    useEffect(()=>{
        fetchMyOrder();
    },[])
    if(orderData.length===0){
        return(
        <>
        <Navb />
        {showsuccessmessage && 
                <div style={{position: "sticky",top:"50%",opacity:"0.75",textAlign:"center",width:"fit-content", margin: "auto",zIndex:"9999"}} className="alert alert-success" role="alert">
                Order Placed Succesfully!
                </div>
              }
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <i className="bi bi-cart-x" style={{"font-size": "4rem;"}}></i>
            <h4 className="mt-3">You havent't ordered yet</h4>
            <p className="text-muted">Start shopping now to add items to your cart.</p>
            <Link to="/" className="btn btn-secondary">Shop Now</Link>
          </div>
        </div>
      </div>
      </>)
    }else{
        return (
          <>
          <Navb />
            <div className='container'>
                <section className="h-100 h-custom row justify-content-center">
          <div className="container h-100 py-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
        
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="h5">MyOrders</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Option</th>
                        <th scope="col">Date</th>
                        <th scope="col">Review Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {orderData.map((ite)=>{
                       const myArray=ite.slice(1);
                            return(
                                <>
                                <>
                                  {
                                  myArray.map((item,index)=>{
                                    return(
                                      <>
                                      <tr>
                                      <th scope="row">
                                  <div className="d-flex align-items-center">
                                    <img src={item.img} className="img-fluid rounded-3"
                                      style={{"width": "120px"}} alt="Book" />
                                  </div>
                                </th>
                                <td className="align-middle">
                                  <p className="mb-0" style={{"fontWeight": "500;"}}>{item.name}</p>
                                </td>
                                <td className="align-middle">
                                  <p className="mb-0" style={{"fontWeight": "500;"}}>{item.number}</p>
                                </td>
                                <td className="align-middle">
                                  <p className="mb-0" style={{"fontWeight": "500;"}}>{item.size}</p>
                                </td>
                                <td className="align-middle">
                                  <p className="mb-0" style={{"fontWeight": "500;"}}>{`${ite[0].Order_date}`}</p>
                                </td>{

                                  item.review?
                                  <td className="align-middle">
                                  <button className='btn mb-0'style={{color:"white",backgroundColor:"#9cac88", width:"100%"}}>Update the review</button></td>
                                  : 
                                  <td className="align-middle">                        
                                  <button className='btn mb-0'onClick={()=>{
                                    navigate("/AddReview", { state: { _id:item._id,index:index} })
                                  }}style={{color:"white",backgroundColor:"#9cac88", width:"100%"}}>Add a review</button>
                                  </td>  
                                }
                                </tr>
                                </>
                                    )
                                  })
                                }
                                <td>
                                </td>                     
                                </>
                                </>
                                )   
                    })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className=' text-center'>
          <Link to="/" className="btn" style={{backgroundColor:"#9cac88",color:"white"}}>Shop More</Link>
          </div>
          </div>
          </section>
            </div>
            </>
        )
}
    }


export default MyOrders
