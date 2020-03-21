import React from "react";
import Card from "@material-ui/core/Grid";

export class Calendar extends React.Component {
  render() {
    console.log(this.props);
    const location = this.props.history.location.state;
    return (
      <Card>
        <h1>Benvenuto,{location.name}</h1>
        <img src={location.imgUrl} alt="profileImage" />
      </Card>
    );
  }
}
