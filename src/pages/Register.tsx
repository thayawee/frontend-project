import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import classes from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (confirmPassword !== password) {
        toast.error("Please confirmpassword");
        navigate("/register");
      } else {
        await register(username, name, password);
        await login(username, password);

        toast.success("Register successful!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Register</h1>
      </div>

      <form className={classes.form} onSubmit={handleRegister}>
        <div className={classes.formGroup}>
          <label>Username</label>
          <input
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label>Your Name</label>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
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
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <button>Register</button>
        </div>
      </form>

      <div className={classes.subtitle}>
        <h2>
          Already have an account?
          <Link to="/login">Login</Link>
        </h2>
      </div>
    </div>
  );
};

export default Register;
