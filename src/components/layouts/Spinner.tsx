import Image from "next/image";
import config from "../../config";
import style from "../../../styles/spinner.module.css";
const Spinner = () => {
  return (
    <div className={`${style.fallbackSpinner} ${style.appLoader}`}>
      <Image
        className={style.fallbackLogo}
        src={config.app.appLogoImage}
        alt="logo"
      />
      <div className={style.loading}>
        <div className={`${style.effect1} ${style.effects}`}></div>
        <div className={`${style.effect2} ${style.effects}`}></div>
        <div className={`${style.effect3} ${style.effects}`}></div>
      </div>
    </div>
  );
};

export default Spinner;
