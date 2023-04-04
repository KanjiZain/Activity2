const Header = (props) => {
  return (
    <div>
      <h1 style={{ color: "blue" }}>{props.heading}</h1>
      <p>{props.slogan}</p>
    </div>
  );
};

const Exercise2 = () => {
  return (
    <div>
        <Header heading="Welcome To Baham Application" slogan="At your service at one Click!"/>

    </div>
  );
};

export default Exercise2;
