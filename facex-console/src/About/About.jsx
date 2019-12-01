import React from "react";
// import "./card-style.css";
import RoutedNav from '../RoutedNav/RoutedNav';
import '../Team/Team.css';
import InfoCard from "./InfoCard/InfoCard";
import "./About.css";
import { Row } from 'reactstrap'
import {CardColumns, Card} from "react-bootstrap";
import dataflow from "../logos/data-flow.png";
import arch from "../logos/architecture.png";
import edge from "../logos/edgex.png";

const About = (props) => {
  // document.getElementById('veryimportant').style.display = "none";
  document.getElementById('banner').style.display = "none"
  // document.body.style.backgroundImage = "../logos/rpi.jpg";

  const info = ["Project FaceX Data Flow", "Project FaceX Architecture", "EdgeX Foundry Platform Architecture"]

  return (
    <div className="rpi details">
        <RoutedNav/>


        <CardColumns className="p-3">
        {
            // todo: map out
        }
            <InfoCard imgsrc={arch} name={arch} info={info[1]}/>
            <InfoCard imgsrc={dataflow} name={dataflow} info={info[0]}/>
            <InfoCard imgsrc={edge} name={edge} info={info[2]}/>
        </CardColumns>


        /* details section */
        <div className="overflow">
            <div  id="s1">
              <h1>Section 1</h1>
            </div>
            <div  id="s2">
              <h1>Section 2</h1>
            </div>
            <div  id="s3">
              <h1>Section 3</h1>
            </div>
            <div  id="s4">
              <h1>Section 4</h1>
            </div>
            <div  id="s5">
              <h1>Section 5</h1>
            </div>
            <div  id="s6">
              <h1>Section 6</h1>
            </div>
            <div  id="s7">
              <h1>Section 7</h1>
            </div>
            <div  id="s8">
              <h1>Section 8</h1>
            </div>
        </div>


    </div>
  );
};

export default About;
