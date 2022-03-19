import React, { useState, useEffect } from "react";
import '../style/mediaComp.css'

function MediaComponents(props) {
  const [onHover, setOnHover] = useState(false);

  const movieCallback = ()=>{
    let selected = {id: props.id,  title: props.title,mediaType:props.mediaType,poster: props.poster}
    props.movieCallback(selected)
  }

  let title;
  if (onHover) {
    title = (
      <div className="text-block">
        <p>{props.title}</p>
      </div>
    );
  }
  return (
    <div className="grow" onClick={()=>movieCallback()}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}>
      <img 
        src={`https://image.tmdb.org/t/p/w300${props.poster}`}
        alt="img broken"
        width={300}
        height={200}></img>
        {title}
    </div>
  );
}

export default MediaComponents;
