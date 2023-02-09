import React from "react";
import Input from "../../src/components/forms/Input";
import t from "../../src/utils/traductor";

const LoginView = ({
  errors,
  formState,
  handleChange,
  handleSubmit,
  config,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default LoginView;
