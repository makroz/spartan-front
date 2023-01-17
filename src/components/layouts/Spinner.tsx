import style from "../../../styles/spinner.module.css";
import useConfig from "../../hooks/useConfig";
const Spinner = () => {
  const config = useConfig();
  return (
    <div className={`${style.fallbackSpinner} ${style.appLoader}`}>
      {config?.app.appLogoImage && (
        <img
          className={style.fallbackLogo}
          src={config?.app.appLogoImage}
          alt="logo"
          width={80}
          height={80}
        />
      )}
      <div className={style.loading}>
        <div className={`${style.effect1} ${style.effects}`}></div>
        <div className={`${style.effect2} ${style.effects}`}></div>
        <div className={`${style.effect3} ${style.effects}`}></div>
      </div>
    </div>
  );
};

export default Spinner;
