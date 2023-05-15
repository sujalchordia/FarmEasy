import React, { useState } from 'react';
import Navbar from './Navbar';
import { useGlobalContext } from './context';
import { useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function UpdateReview() {
    const {setUsername,setImage,username,image}=useGlobalContext();
    const location = useLocation();
    const navigate=useNavigate();
  const _id=location.state
  console.log(_id)
  const descriptions=location.state.description
  const star =location.state.stars;
  const [description, setDescription] = useState(descriptions);
  const [stars, setStars] = useState(star+1);
  const [img, setImg] = useState(image);
  const [by, setBy] = useState(username);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(stars===0){
      setStars(1);
    }
    const review = {
      description,
      img,
      stars,
      by,
      _id
    };
    const response= await fetch("https://farmeasy-zwa7.onrender.com/api/updatereviews",{
            method:"POST",
            headers:{
                'Content-Type':"application/json",
            },
            body:JSON.stringify({
                "_id":review._id,
                "img":localStorage.getItem("image"),
                "description":review.description,
                "by":localStorage.getItem("name"),
                "stars":review.stars
              })
        }).then(async (res)=>{
          navigate("/");
        });
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const response= await fetch("https://farmeasy-zwa7.onrender.com/api/deletereviews",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                },
                body:JSON.stringify({
                    "_id":_id,
                    "by":localStorage.getItem("name"),
                  })
            }).then(async (res)=>{
              navigate("/");
            });
        }
  return (
    <>
    <Navbar />
    <div className="container" style={{maxWidth:"30rem",padding:"2rem"}}>
      <h2>Review</h2>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stars">Stars:</label>
          <select
            className="form-control"
            id="stars"
            value={stars}
            onChange={(e) => setStars(parseInt(e.target.value))}
            required
          >
            <option value={0}>Select a rating</option>
            <option value={1}>1 star</option>
            <option value={2}>2 stars</option>
            <option value={3}>3 stars</option>
            <option value={4}>4 stars</option>
            <option value={5}>5 stars</option>
          </select>
        </div>
        <div style={{marginTop:"1rem"}}>
        <button type="submit" className="btn" style={{backgroundColor:"#9cac88",color:"white"}}>
          Submit
        </button>
        </div>
        <div style={{marginTop:"1rem"}}>
        <button type="button" className="btn" style={{backgroundColor:"#9cac88",color:"white"}} onClick={(e)=>handleDelete(e)}>
          Delete the review
        </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default UpdateReview;
