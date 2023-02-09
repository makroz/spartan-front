import { useRouter } from "next/router";
import { useState } from "react";
import LoginView from "../../../components/auth/LoginView";
import useAuth from "../../hooks/useAuth";
import t from "../../utils/traductor";

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
    <LoginView
      config={config}
      errors={errors}
      formState={formState}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
