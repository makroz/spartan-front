import { useRouter } from "next/router";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import t from "../../utils/traductor";
import Input from "../forms/Input";

const Login = () => {
  const { user, error, login, config }: any = useAuth();
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
      errors = { ...errors, email: t("Email is required") };
    }

    if (!formState.password) {
      errors = { ...errors, password: t("Password is required") };
    }
    return errors;
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validaciones();
    setErrors(valid);
    if (Object.keys(valid).length > 0) return;

    login(formState).then((data) => {
      // console.log("====================================");
      // console.log("login", user, "data", data, "error", error);
      // console.log("====================================");

      if (user || data?.user) {
        router.push((config?.app.link || "") + config?.auth.success);
      } else {
        setErrors({ password: error, ...data.errors });
        console.log("====================================");
        console.log("Error222", errors, data.errors);
        console.log("====================================");
      }
      return;
    });
  };

  return (
    <form className="p-2">
      <h1>
        {t("Welcome to")} {config?.app.appName}!
      </h1>
      <h2>{t("Please sign-in to your account and start the adventure")}</h2>
      <br />
      <Input
        label={config?.app.loginLabel || "Email"}
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
          {t("Sign in")}
        </button>
      </div>
    </form>
  );
};

export default Login;
