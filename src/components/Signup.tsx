import "./Login.css";
import { Envelope, Lock } from "phosphor-react";
import { Button, InputIcon, Input, Label } from "keep-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setEmail(value);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setPassword(value);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault(); // Prevent default form submission

    try {
      const result = await axios.post(
        "https://keepitbackend-xvp5.onrender.com/signup",
        {
          email,
          password,
        }
      );

      const { status, message } = result.data;
      if (status === 1) {
        console.log(message);
        navigate("/login", {state: {message: message, stat: true}});
      } else {
        console.error("Signup failed:", message);
      }
    } catch (error) {
      console.error("Error during axios call signup:", error);
    }
  }

  return (
    <div className="Login">
      <form
        className="mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md Form"
        onSubmit={handleSubmit}
      >
        <fieldset className="space-y-1">
          <Label htmlFor="name">Email</Label>
          <div className="relative">
            <Input
              placeholder="Enter email"
              name="Email"
              value={email}
              onChange={handleEmail}
              className="ps-11"
            />
            <InputIcon>
              <Envelope size={19} color="#AFBACA" />
            </InputIcon>
          </div>
        </fieldset>
        <fieldset className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="Enter password"
              type="password"
              className="ps-11"
              value={password}
              onChange={handlePassword}
            />
            <InputIcon>
              <Lock size={19} color="#AFBACA" />
            </InputIcon>
          </div>
        </fieldset>
        <Button className="inButton" size="sm" color="secondary" type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
