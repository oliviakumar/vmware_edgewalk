import React from "react";
// import "./card-style.css";
import rpi from "../logos/rpi.jpg";
import RoutedNav from '../RoutedNav/RoutedNav';
import '../Team/Team.css';
import InfoCard from "./InfoCard/InfoCard";
import "./About.css";
import { Row } from 'reactstrap'
import {CardColumns} from "react-bootstrap";
import dataflow from "../logos/data-flow.png";
import arch from "../logos/architecture.png";

const About = (props) => {
  // document.getElementById('veryimportant').style.display = "none";
  document.getElementById('banner').style.display = "none"

  return (
    <div>

        <CardColumns className="p-5">
            <InfoCard imgsrc={dataflow} />
            <InfoCard imgsrc={arch} />
            <InfoCard/>
        </CardColumns>
    </div>
  );
};

export default About;
