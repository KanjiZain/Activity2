import { useState } from "react";

const Header = (props) => {
  const [headingcolor] = useState({color:"green"})
  const [sloganStyle] = useState({fontStyle: 'italic'})
  return (
    <div>
      <h1 style={headingcolor}>{props.heading}</h1>
      <p style={sloganStyle}>{props.slogan}</p>
    </div>
  );
};

const Exercise3 = () => {
  return (
    <div>
        <Header heading="Welcome To Baham Application" slogan="At your service at one Click!"/>

    </div>
  );
};

export default Exercise3;
