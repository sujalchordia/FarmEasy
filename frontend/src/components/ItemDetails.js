import React from 'react'
import Navbar from './Navbar'
import { useState,useEffect } from 'react';
import { useGlobalContext } from './context';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import StarRating from './StarRating';
import Footer from './Footer';

function ItemDetails() {
  const location = useLocation();
  const _id=location.state._id._id
  const name=location.state.name.name
  const options=location.state.options.options
  const img=location.state.img.img
  const images=localStorage.getItem("image")
  const description=location.state.description.description
  const username=localStorage.getItem("name");
  const [reviews, setReviews] = useState([]);
  const option=options[0]
  let priceOptions=Object.keys(option);
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);
  const [price, setPrice] = useState(number*getkey(size));
  const navigate=useNavigate();
  const{adding,cart,showsuccessmessage,setShowSuccessMessage,image}=useGlobalContext();
  
  function getkey(size){
    for(let i in option){
      if(i===size)
      return(option[i])
    }
  }
  useEffect(() => {
    setPrice(number*getkey(size)) 
  }, [size,number]);
  useEffect(() => {
    fetchReviews();
  }, []);

    async function fetchReviews() {
    const response = await fetch("https://farmeasy-zwa7.onrender.com/api/listitems",{
        method:"POST",
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify({
           _id:_id
        })
      });
    const data = await response.json();
    setReviews(data.reviews);
    console.log(reviews)
  }

  function handleCart(){
    if(!localStorage.getItem("authToken")){
      navigate("/login")
    }else{
    setShowSuccessMessage(true);
    setTimeout(() => {
    setShowSuccessMessage(false);
    }, 2500);
    }
  adding({_id:_id,name:name,img:img,size:size,number:number,price:price,review:0});
  navigate("/")
  }
  return (
    <>
    <Navbar />
        <div className='text-center container' style={{"border":"none !important","display":"flow-root"}}>
      <div className=" my-5 text-center" style={{"maxWidth": "70%",margin:"0 auto",backgroundColor:"#fffcf4"}}>    
        <div className="card border-0">
          <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
            <img src={img} className="img-fluid" style={{"height":"20rem","width":"100%","objectFit":"cover"}} />
            <a href="#!">
              <div className="mask" style={{"backgroundColor":" rgba(251, 251, 251, 0.15)"}}></div>
            </a>
          </div>
          <span style={{ fontSize:"1rem",padding:"1rem",backgroundColor:"#fffcf4"}} >
            {description}
          </span>
          <div className="card-body" style={{backgroundColor:"#fffcf4"}}>
            <div style={{display:"flex"}}>
            <h5 className="card-title font-weight-bold" style={{"fontSize":"1.3rem",display:"inline"}}><a>{name}</a></h5>
            </div>
            <hr className="my-4" />
            <select onClick={(e)=>{setNumber(e.target.value)}} className='m-2 h-100 w-40 rounded form-select form-select-sm'style={{"width":"40%","display":"inline"}}>
                         {Array.from(Array(6),(e,i)=>{
                            return(
                                <option key={i+1} value={i+1}>{i+1}</option>
                            )
                        })}
                </select>
                <select className='m-2 h-100 w-40 rounded form-select form-select-sm'style={{"width":"40%","display":"inline"}} onClick={(e)=>{setSize(e.target.value)}}>
                  {priceOptions.map((option)=>{
                    return(
                      <option key={option} value={option}>{option}</option>
                    )
                    }
                  )}
                </select>
                <div className='d-block h-100 fs-5 m-1'>              
                  {`Total Price : ${price}₹`}
                </div>
                <hr />
                <div>
                <button className='btn 'style={{color:"white",backgroundColor:"#9cac88", width:"100%"}} onClick={()=>{handleCart()}}>Add to Cart</button>
                </div>
          </div>
        </div>
      </div>
      </div>
      <section>
          <h2 className='text-center mb-4'>Reviews</h2>
          {reviews.length === 0 ? (
            <p className='text-center'>No reviews for this product</p>
          ) : (
            <div className='row'>
    <section>
      <div className="row text-center">
        <div className="col-md-12">
          {/* Carousel wrapper */}
          <div className="carousel slide carousel-dark" data-bs-ride="carousel">
            {/* Inner */}
            <div className="carousel-inner">
                {reviews.map((review,index)=>{
                    return (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                          <div className="mx-5 mb-3">
                            <StarRating rating={review.stars} />
                          </div>
                          <p className="lead font-italic  mx-5">
                            {review.description}
                          </p>
                          <div className="mt-5 mb-4">
                            <img
                              src={review.img}
                              className="rounded-circle img-fluid shadow-1-strong"
                              alt="sample image"
                              width="100"
                              height="100"
                            />
                          </div>
                          <p className="text-muted mb-0">{review.by}</p>
                          {
                            username===review.by?
                            <button className="btn" 
                            onClick={()=>{
                              navigate("/UpdateReview", { state: { _id:_id,stars:review.stars,description:review.description,by:review.by, img:review.img} })
                            }}
                            style={{backgroundColor:"#9cac88",color:"white"}}>
                              Update Your Review
                            </button>:
                            <></>
                          }
                        </div>
                      );                      
                })
                }
            </div>
            {/* Inner */}

            {/* Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target=".carousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target=".carousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
            </div>
        </div>
      </div>
    </section>
            </div>
          )}
        </section>
        <Footer />
    </>
  )
}

export default ItemDetails
