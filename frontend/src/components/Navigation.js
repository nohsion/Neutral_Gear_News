import React from "react";
import { Link } from "react-router-dom";
import { Paper, Tabs, LinkTab, Tab } from "@material-ui/core";
import "./Navigation.css";
import { makeStyles } from "@material-ui/core/styles";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function Navigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="disabled tabs example"
        centered
      >
        <Tab component={Link} icon={<HomeIcon />} to="/" />
        <Tab component={Link} icon={<ThumbUp />} to="/" />
        <Tab component={Link} icon={<PersonPinIcon />} to="/about" />
      </Tabs>
    </Paper>
    // <div className="nav">
    //      <Link to="/">Home</Link>
    //     <Link to="/about">About</Link>
    // </div>
  );
}

export default Navigation;
