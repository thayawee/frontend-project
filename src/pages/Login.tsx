import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await login(username, password);

      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Login</h1>
      </div>

      <form className={classes.form} onSubmit={handleLogin}>
        <div className={classes.formGroup}>
          <label>Username</label>
          <input
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label>Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <button>Login</button>
        </div>
      </form>

      <div className={classes.subtitle}>
        <h2>
          Don't have an account?
          <Link to="/register">Register</Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;
