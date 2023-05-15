import React from 'react'
import { useState,useEffect } from 'react';
import { useGlobalContext } from './context';
import { Link, useNavigate } from 'react-router-dom';
import ItemDetails from './ItemDetails';
import StarRating from './StarRating';
import StarRatingforCard from './StarRatingforcard';

export default function Card({_id,name,description,img,options}) {
  let priceOptions=Object.keys(options[0]);
  const option=options[0]
  const [number, setNumber] = useState(1);
  const [like, setLike] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);
  const [price, setPrice] = useState(number*getkey(size));
  const [reviews, setReview] = useState();
  const navigate=useNavigate();
  const{adding,cart,showsuccessmessage,setShowSuccessMessage,fooditems}=useGlobalContext();
  const loadData=async()=>{
    let response= await fetch("https://farmeasy-zwa7.onrender.com/api/listitems",{
      method:"POST",
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify({
        _id:_id
      })
    })
    response=await response.json();
    setReview(response.reviews)
}
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
    loadData();
  }, []);

  function calStars() {
    if(reviews.length===0){
      return(
      <StarRatingforCard rating={0}/>
      )
    }
    else{
      let sum=0;
      reviews.map((review)=>{
        sum+=review.stars
      })
      return(
        <StarRatingforCard rating={sum/reviews.length}/>
      )
    }
  }
    return (
    <div className='m-2 container' style={{"border":"none !important"}}>
  <section className=" my-5" style={{"maxWidth": "20rem"}}>    
    <div className="card border-0">
      <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img src={img} className="img-fluid" style={{"height":"9rem","width":"16rem","objectFit":"cover"}} />
        <a href="#!">
          <div className="mask" style={{"backgroundColor":" rgba(251, 251, 251, 0.15)"}}></div>
        </a>
      </div>
      <div className="card-body" style={{backgroundColor:"#fcf8e8"}}>
        {
          reviews?
          <div style={{display:"flex"}}>
        <h5 className="card-title font-weight-bold" style={{"fontSize":"1.3rem",display:"inline",marginRight:"auto"}}><a>{name}</a></h5>
        {calStars()}
        </div>:
        <h1></h1>
        }

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
            <div className='d-inline h-100 fs-5 m-1'>              
              {`Total Price : ${price} ₹`}
            </div>
            <hr />
            <div>
            <button className='btn 'style={{color:"white",backgroundColor:"#9cac88", width:"100%"}} onClick={()=>{
              navigate("/ItemDetails", { state: { _id:{_id}, name: {name}, img:{img},options:{options},description:{description} } })
            }}>See More</button>
            </div>
      </div>
    </div>
    
  </section>
</div>
  )
}
