import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HelpIcon from "@material-ui/icons/Help";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbUpOutlined from "@material-ui/icons/ThumbUpOutlined";
import { Link } from "react-router-dom";
import "./Restaurant.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Restaurant({ id, name, image, detail, place, phone, address, time }) {
  const [likeIcon, setLikeIcon] = useState(false);

  const changeLikeIcon = () => {
    setLikeIcon(!likeIcon);
  };

  // const gotoDetail = () => {
  //   <Detail id name image detail/>
  // };

  const classes = useStyles();

  return (
    <article>
      <Card
        className={classes.root}
        id="cards"
        elevation="0"
        variant="outlined"
      >
        <div>
          {/* <img src = { image } alt = {name} /> */}
          <CardMedia
            id="image"
            className={classes.media}
            image={image}
            title={name}
          />
          <CardContent className="parent">
            <div className="child">
              <Typography
                id="restaurantName"
                color="primary"
                gutterBottom
                variant="h5"
                component="h2"
              >
                {name}
              </Typography>
              <Typography variant="body2" color="black" component="p">
                {detail}
              </Typography>
            </div>
            <div className="child" id="likeButton">
              <div onClick={changeLikeIcon}>
                {likeIcon ? (
                  <Button variant="contained" color="primary" id="button1">
                    {<ThumbUp />}
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" id="button1">
                    {<ThumbUpOutlined />}
                  </Button>
                )}
              </div>
              <div>
                <Link
                  to={{
                    // eslint-disable-next-line no-template-curly-in-string
                    pathname: `/detail/${id}`,
                    state: {
                      id,
                      name,
                      image,
                      detail,
                      place,
                      phone,
                      address,
                      time,
                    },
                  }}
                >
                  <Button variant="contained" color="primary" id="button2">
                    {<HelpIcon />}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </article>
  );
}

export default Restaurant;
