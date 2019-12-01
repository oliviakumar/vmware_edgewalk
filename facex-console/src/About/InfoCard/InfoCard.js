import React from "react";
import "./InfoCard.css";

const InfoCard = props => {
  return (

    <div className='card text-center shadow' style={{width: '100%'}}>

      <div className='overflow'>
        <img src={props.imgsrc} alt={props.name} className='card-img-top' />
      </div>
      <div className='card-body text-dark'>
        <h4 className='card-title'>{props.title}</h4>
        <p className='card-text boom'>
          {props.info}
        </p>
        <a href='#' className='btn btn-outline-success'>
          Go Anywhere
        </a>
      </div>
    </div>
  );
};

export default InfoCard;
