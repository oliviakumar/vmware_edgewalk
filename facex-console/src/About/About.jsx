import React from "react";
// import "./card-style.css";
import rpi from "../rpi.jpg";
import RoutedNav from '../RoutedNav/RoutedNav';
import '../Team/Team.css';

const About = (props) => {
  // document.getElementById('veryimportant').style.display = "none";
  document.getElementById('banner').style.display = "none"
  
  return (
    <div className='card text-center shadow Team'>
    <RoutedNav/>

      <div className='overflow'>
        <img src={rpi} alt='Image 1' className='card-img-top' />
      </div>
      <div className='card-body text-dark'>
        <h4 className='card-title'>{props.title}</h4>
        <p className='card-text text-secondary'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          distinctio maxime, sapiente temporibus cum quisquam totam voluptatum
          asperiores. Necessitatibus, repellendus!
        </p>
        <a href='#' className='btn btn-outline-success'>
          Go Anywhere
        </a>
      </div>
    </div>
  );
};

export default About;
