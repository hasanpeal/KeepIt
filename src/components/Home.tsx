import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Button } from "keep-react";
function Home() {
  const navigate = useNavigate();

  function handleSignin() {
    console.log("success");
    navigate("/login");
  }

  function handleSignup() {
    console.log("success");
    navigate("/signup");
  }

  return (
    <div className="Home">
      <div className="Title">
        <h6 className="text-heading-6">KeepIt </h6>
      </div>
      <div>
        <h3 className="text-heading-7">
          {" "}
          Keep your to do list updated {" "}
        </h3>
      </div>
      <div className="Buttons">
        <Button className="inButton" size="sm" color="secondary" onClick={handleSignin} >
          Sign in
        </Button>

        <Button className="inButton" size="sm" color="secondary" onClick={handleSignup}>
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default Home;
