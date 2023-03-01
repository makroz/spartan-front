import { useEffect, useState } from "react";

const getChecked = (
  value: any,
  options: any,
  optionValue: string,
  optionsSub: any
) => {
  if (!value || value == "") return {};
  let result = {};
  options.map((op: any, index) => {
    optionsSub.map((sub: any) => {
      let valueSub = "";
      (value + "|").split("|").map((fila: any) => {
        if (fila != "") {
          let ind: any = (fila + ":").split(":");
          if (ind[0] == op[optionValue]) {
            valueSub = "";
            if (ind[1].indexOf(sub.value) > -1) {
              valueSub = sub.value;
            }
            result = {
              ...result,
              [op[optionValue] + "-" + sub.value]: valueSub,
            };
          }
        }
      });
    });
  });
  return result;
};

const Subselect = (props) => {
  const [subState, setSubState]: any = useState({});
  useEffect(() => {
    setSubState(
      getChecked(
        props.value,
        props.options,
        props.optionValue,
        props.optionsSub
      )
    );
  }, [props.value]);

  if (!props.options || !props.optionsSub) return null;
  const claser =
    "border border-solid border-gray-700 p-3" +
    (props.className || "") +
    " " +
    (props.rounded
      ? props.rounded === "l"
        ? "rounded-l-lg"
        : "rounded-r-lg"
      : "rounded-lg");
  return (
    <>
      <fieldset className={claser}>
        <legend className="px-2">{props.label}</legend>
        <div className="flex flex-col text-xs md:text-sm">
          {props.options.map((op: any, index) => {
            return (
              <div
                key={op[props.optionValue] + "-" + index}
                className="grid grid-cols-5 "
              >
                <div className="flex-grow">{op[props.optionLabel]}</div>
                {props.optionsSub.map((sub: any, inde) => {
                  return (
                    <div
                      key={op[props.optionValue] + "-" + sub.value}
                      className="px-2"
                    >
                      <input
                        type="checkbox"
                        id={op[props.optionValue] + "-" + sub.value}
                        name={op[props.optionValue] + "-" + sub.value}
                        readOnly={props.readOnly}
                        disabled={props.readOnly}
                        value={sub.value}
                        checked={
                          !!subState[op[props.optionValue] + "-" + sub.value]
                        }
                        onChange={(e: any) => {
                          const name = e.target.name;
                          const value = e.target.value;
                          let val = props.value;
                          if (val == "") {
                            if (e.target.checked) {
                              val = "|" + op[props.optionValue] + ":" + value;
                            }
                          } else {
                            if (val.indexOf(op[props.optionValue]) > -1) {
                              let ind = (val + "|").split("|");
                              ind.map((v: any, i: any) => {
                                if (v != "") {
                                  if (v.indexOf(op[props.optionValue]) > -1) {
                                    let vv = (v + ":").split(":");
                                    vv[1] = vv[1].replace(sub.value, "");
                                    if (e.target.checked) {
                                      vv[1] = vv[1] + sub.value;
                                    }
                                    ind[i] = "";
                                    if (vv[1] != "") {
                                      ind[i] = vv[0] + ":" + vv[1];
                                    }
                                  } else {
                                  }
                                }
                              });
                              val = ind.join("|");
                            } else {
                              val =
                                val +
                                "|" +
                                op[props.optionValue] +
                                ":" +
                                sub.value;
                            }
                          }
                          val = val.replace("||", "|");
                          if (val.length > 0 && val[val.length - 1] == "|")
                            val = val.substring(0, val.length - 1);

                          if (val == "|") val = "";
                          props.onChange({
                            target: { name: props.name, value: val },
                          });
                        }}
                      />
                      <label
                        className="ml-2 text-[10px] md:text-sm"
                        htmlFor={op[props.optionValue] + "-" + sub.value}
                      >
                        {sub.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </fieldset>
      {props.error && (
        <p className="px-2 mt-0 mb-1 text-xs text-red-600 dark:text-red-500">
          {props.error[props.name] || null} &nbsp;
        </p>
      )}
    </>
  );
};

export default Subselect;
