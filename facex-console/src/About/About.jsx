import React from "react";
// import "./card-style.css";
import RoutedNav from '../RoutedNav/RoutedNav';
import '../Team/Team.css';
import InfoCard from "./InfoCard/InfoCard";
import "./About.css";
import { Row } from 'reactstrap'
import {CardColumns} from "react-bootstrap";
import dataflow from "../logos/data-flow.png";
import arch from "../logos/architecture.png";
import edge from "../logos/edgex.png";

const About = (props) => {
  // document.getElementById('veryimportant').style.display = "none";
  document.getElementById('banner').style.display = "none"
  const info = ["Project FaceX Data Flow", "Project FaceX Architecture", "EdgeX Foundry Platform Architecture"]

  return (
    <div >
        <RoutedNav/>

        <CardColumns className="p-5 dawg">
        {
            // todo: map out
        }
            <InfoCard imgsrc={arch} name={arch} info={info[1]}/>
            <InfoCard imgsrc={dataflow} name={dataflow} info={info[0]}/>
            <InfoCard imgsrc={edge} name={edge} info={info[2]}/>
        </CardColumns>
    </div>
  );
};

export default About;
