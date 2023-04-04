import { useState } from "react";

const Header = (props) => {

  const [theme, setTheme] = useState({ name: "light", style: {} });

  // Click handler
  function themeHandler() {

    if (theme.name === "dark") {
      setTheme({ name: "light", style: { backgroundColor: "white" ,  color: "green" } });
    }

    else if (theme.name === "light") {
      setTheme({ name: "dark", style: { backgroundColor: "black" , color: "white" } });
    }
  }

  return (
    <div style={theme.style}>
      <h1>Welcome To Baham Application</h1>
      <button id="themeButton" onClick={themeHandler}>
        Switch Theme
      </button>
    </div>
  );
};

const Exercise4 = () => {
  return <Header heading="Baham!" slogan="At your service at one Click!" />;
};

export default Exercise4;
