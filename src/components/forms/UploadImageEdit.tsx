import { useState } from "react";
import { Camera, Trash, XCircle } from "react-feather";
import ReactImagePickerEditor, {
  ImagePickerConf,
} from "react-image-picker-editor";
import "react-image-picker-editor/dist/index.css";
import ControlLabel from "./ControlLabel";

const UploadImageEdit = (props) => {
  const config2: ImagePickerConf = {
    borderRadius: "8px",
    language: "en",
    width: props.width || "464px",
    height: props.height || "150px",
    objectFit: "contain",
    compressInitial: 60,
  };
  if (props.rounded) {
    config2.borderRadius = "50%";
    config2.height = config2.width;
    config2.objectFit = "cover";
  }

  let initialImage = "";
  if (props.named) {
    const initial = (props.named + ",,").split(",");
    if (initial[0] == "field") {
      initialImage = props.formState[initial[1]] || "";
      if (initialImage != "" && initial[2] != "") {
        initialImage =
          initial[2].replace("*", initialImage) + "?" + new Date().getTime();
        //console.log("initialImage", initialImage);
      }
    }
  }
  const [initialImg, setInitialImg] = useState(initialImage);
  return (
    <ControlLabel {...props}>
      {(props.readOnly || props.action != "add") && initialImg != "" && (
        <>
          <img
            id={props.name}
            className={
              props.clasesName +
              " object-contain p-[2px] z-0 " +
              (props.action != "view" ? "absolute" : "")
            }
            style={{
              borderRadius: config2.borderRadius,
              width: config2.width,
              height: config2.height,
              objectFit: config2.objectFit,
            }}
            src={initialImage || ""}
            onError={(e) => {
              setInitialImg("");
            }}
          />
          {props.value && props.value == "delete" && (
            <XCircle
              size={props.width}
              className="absolute  text-red-700  rounded-full p-[2px] z-1"
            />
          )}
          {props.action != "view" && (!props.value || props.value == "delete") && (
            <>
              <Camera
                size={20}
                className="absolute top-5 left-0 bg-green-700 text-white rounded-full p-[2px] z-2"
                style={{ marginTop: "calc(" + config2.height + "* 1 - 6px)" }}
              />
              <Trash
                size={20}
                className={
                  "absolute top-5 left-1  text-white rounded-full p-[2px] z-20 " +
                  (props.value != "delete" ? "bg-red-700" : "bg-gray-700")
                }
                style={{
                  marginTop: "calc(" + config2.height + "* 1 - 6px)",
                  marginLeft: "calc(" + config2.width + "* 1 - 18px)",
                }}
                onClick={() => {
                  let val = "delete";
                  if (props.value == "delete") val = "";
                  if (props.onChange) {
                    props.onChange({
                      target: {
                        name: props.name,
                        value: val,
                      },
                    });
                  }
                }}
              />
            </>
          )}
        </>
      )}
      {(!props.readOnly || props.action != "view") && (
        <div
          className={
            (!props.value || props.value == "delete") &&
            props.action != "add" &&
            initialImg != ""
              ? "opacity-0"
              : ""
          }
          style={
            (!props.value || props.value == "delete") && props.action != "add"
              ? { height: config2.height }
              : {}
          }
        >
          <ReactImagePickerEditor
            config={config2}
            imageSrcProp=""
            imageChanged={(newDataUri: any) => {
              if (props.onChange) {
                props.onChange({
                  target: {
                    name: props.name,
                    value: newDataUri,
                  },
                });
              }
            }}
          />
        </div>
      )}
    </ControlLabel>
  );
};

export default UploadImageEdit;
