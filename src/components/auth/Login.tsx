import { useRouter } from "next/router";
import { useState } from "react";
import config from "../../config";
import useAuth from "../../hooks/useAuth";
import Input from "../forms/Input";

const Login = () => {
  const { user, error, login }: any = useAuth();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const validaciones = () => {
    let errors = {};
    if (!formState.email) {
      errors = { ...errors, email: "Email is required" };
    }

    if (!formState.password) {
      errors = { ...errors, password: "Password is required" };
    }
    return errors;
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validaciones();
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    login(formState).then((data) => {
      console.log("====================================");
      console.log("login", user);
      console.log("====================================");

      if (user || data) {
        router.push("/");
      } else {
        const err = error;
        setErrors({ ...errors, email: err });
        console.log("====================================");
        console.log("Error", errors);
        console.log("====================================");
      }
      return;
    });
  };

  return (
    <form className="p-2">
      <h1>Welcome to {config.app.appName}!</h1>
      <h2>Please sign-in to your account and start the adventure</h2>
      <br />
      <Input
        label="Email"
        type="text"
        name="email"
        error={errors}
        value={formState.email}
        onChange={(e) => handleChange(e)}
      ></Input>
      <Input
        label="Password"
        type="password"
        name="password"
        error={errors}
        value={formState.password}
        onChange={(e) => handleChange(e)}
      ></Input>
      <div>
        <button
          className="btn btn-primary w-full"
          onClick={(e) => handleSubmit(e)}
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Login;
