import "./Login.css";
import { Envelope, Lock } from "phosphor-react";
import { Button, InputIcon, Input, Label } from "keep-react";
import {
  Alert,
  AlertContainer,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "keep-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { stat } = location.state || { stat: false }; // Default to false if state is undefined
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertStat, setAlertStat] = useState<number | null>(null); // State for alert handling

  // useEffect to automatically clear alertStat after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (alertStat !== null) {
      timer = setTimeout(() => {
        setAlertStat(null);
      }, 5000); // 5000 milliseconds = 5 seconds
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [alertStat]); // Run effect whenever alertStat changes

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/signin", {
        email,
        password,
      });
      const { status } = result.data;
      setAlertStat(status); // Update alert state based on API response status
      if (status === 1) {
        navigate("/todo", { state: { email, password } });
      }
    } catch (error) {
      console.error("Error during axios call signin:", error);
    }
  }

  return (
    <div className="Login">
      <div className="AlertBox" style={{ display: stat ? "block" : "none" }}>
        <Alert color="success">
          <AlertContainer>
            <AlertIcon />
            <AlertTitle> Wohoo </AlertTitle>
            <AlertDescription> Sign up successful </AlertDescription>
          </AlertContainer>
        </Alert>
      </div>

      {alertStat === -1 && (
        <div className="AlertBox">
          <Alert color="error">
            <AlertContainer>
              <AlertIcon />
              <AlertTitle>Error </AlertTitle>
              <AlertDescription>Email not found</AlertDescription>
            </AlertContainer>
          </Alert>
        </div>
      )}

      {alertStat === 0 && (
        <div className="AlertBox">
          <Alert color="error">
            <AlertContainer>
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Password is wrong</AlertDescription>
            </AlertContainer>
          </Alert>
        </div>
      )}

      <form
        className="mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md Form"
        onSubmit={handleSubmit}
      >
        <fieldset className="space-y-1">
          <Label htmlFor="name">Email</Label>
          <div className="relative">
            <Input
              placeholder="Enter email"
              className="ps-11"
              value={email}
              onChange={handleEmail}
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
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default Login;
