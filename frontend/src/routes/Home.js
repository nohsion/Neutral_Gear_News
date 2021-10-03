import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NewsHeadline from "../components/NewsHeadline";
import NewsBigData from "../components/NewsBigData";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <div class="home_parent">
        <NewsBigData></NewsBigData>
        <NewsHeadline className="news_headline"></NewsHeadline>
      </div>
    );
  }
}

export default Home;
