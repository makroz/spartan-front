import dynamic from "next/dynamic";
const Checkbox = dynamic(() => import("./Checkbox"), {
  loading: () => <>Loading...</>,
});
const EditorHtml = dynamic(() => import("./EditorHtml"), {
  loading: () => <>Loading...</>,
});
const Input = dynamic(() => import("./Input"), {
  loading: () => <>Loading...</>,
});
const Select = dynamic(() => import("./Select"), {
  loading: () => <>Loading...</>,
});
const Subselect = dynamic(() => import("./Subselect"), {
  loading: () => <>Loading...</>,
});
const TextArea = dynamic(() => import("./TextArea"), {
  loading: () => <>Loading...</>,
});

const UploadImageEdit = dynamic(() => import("./UploadImageEdit"), {
  loading: () => <>Loading...</>,
  ssr: false,
});

const DbForm = ({
  fields,
  formState,
  errors = {},
  handleChangeInput,
  action,
  open,
}: any) => {
  let i = 0;
  const render = (indexAct) => {
    let quit = false;
    return Object.keys(fields).map((key, index) => {
      if (quit || index < indexAct || index < i) return null;
      i = index;
      if (fields[key].inputType == "flex") {
        return (
          <div className="flex gap-1" key={index + "-flex"}>
            {render(index + 1)}
          </div>
        );
      }
      if (fields[key].inputType == "flexend") {
        i = index + 1;
        quit = true;
        return null;
      }

      // if (quit || index < indexAct || index < i) return null;
      if (!fields[key].actions?.includes(action)) {
        return null;
      }
      const readOnly =
        action === "view" ||
        (Array.isArray(fields[key].readOnly)
          ? fields[key].readOnly.includes(action)
          : fields[key].readOnly);

      if (fields[key].inputType == "subSelect") {
        return (
          <div key={key}>
            <Subselect
              label={fields[key].label}
              name={key}
              error={errors}
              readOnly={readOnly}
              disabled={fields[key].disabled}
              required={fields[key].required}
              value={formState[key]}
              onChange={handleChangeInput}
              onBlur={fields[key].onBlur}
              options={fields[key].options}
              optionValue={fields[key].optionValue}
              optionLabel={fields[key].optionLabel}
              optionsSub={fields[key].optionsSub}
              className={fields[key].className}
            />
          </div>
        );
      }
      if (fields[key].inputType == "imageUploadEdit" && open) {
        return (
          <div key={key}>
            <UploadImageEdit
              label={fields[key].label}
              name={key}
              error={errors}
              readOnly={readOnly}
              disabled={fields[key].disabled}
              required={fields[key].required}
              value={formState[key]}
              onChange={handleChangeInput}
              onBlur={fields[key].onBlur}
              width={fields[key].width}
              height={fields[key].height}
              rounded={fields[key].rounded}
              className={fields[key].className}
              named={fields[key].named}
              formState={formState}
              action={action}
            />
          </div>
        );
      }
      if (fields[key].inputType == "textarea") {
        return (
          <div key={key}>
            <TextArea
              label={fields[key].label}
              name={key}
              error={errors}
              readOnly={readOnly}
              disabled={fields[key].disabled}
              required={fields[key].required}
              value={formState[key]}
              onChange={handleChangeInput}
              onBlur={fields[key].onBlur}
              options={fields[key].options}
              optionValue={fields[key].optionValue}
              optionLabel={fields[key].optionLabel}
              className={fields[key].className}
            />
          </div>
        );
      }
      if (fields[key].inputType == "editor") {
        return (
          <div key={key}>
            <EditorHtml
              label={fields[key].label}
              type={fields[key].inputType}
              name={key}
              error={errors}
              readOnly={readOnly}
              disabled={fields[key].disabled}
              required={fields[key].required}
              value={formState[key]}
              onChange={handleChangeInput}
              onBlur={fields[key].onBlur}
              className={fields[key].className}
            />
          </div>
        );
      }

      if (fields[key].inputType == "password") {
        return (
          <form key={key}>
            <Input
              label={fields[key].label}
              type={fields[key].inputType}
              name={key}
              error={errors}
              readOnly={readOnly}
              disabled={fields[key].disabled}
              required={fields[key].required}
              value={formState[key]}
              onChange={handleChangeInput}
              onBlur={fields[key].onBlur}
              className={fields[key].className}
            ></Input>
          </form>
        );
      }

      if (fields[key].inputType == "checkbox") {
        return (
          <div key={key}>
            <Checkbox
              label={fields[key].label}
              name={key}
              error={errors}
              readOnly={readOnly}
              disabled={fields[key].disabled}
              required={fields[key].required}
              value={formState[key]}
              onChange={handleChangeInput}
              onBlur={fields[key].onBlur}
              options={fields[key].options}
              optionValue={fields[key].optionValue}
              optionLabel={fields[key].optionLabel}
              className={fields[key].className}
            />
          </div>
        );
      }
      if (fields[key].inputType == "select") {
        if (!fields[key].options) {
          const k = key.indexOf("_id") > -1 ? key.replace("_id", "") : "";
          if (k != "" && formState[k] && formState[k]) {
            fields[key].options = [formState[k]];
          }
        }
        return (
          <div key={key}>
            <Select
              label={fields[key].label}
              name={key}
              error={errors}
              readOnly={readOnly}
              disabled={fields[key].disabled}
              required={fields[key].required}
              value={formState[key]}
              onChange={handleChangeInput}
              onBlur={fields[key].onBlur}
              options={fields[key].options}
              optionValue={fields[key].optionValue}
              optionLabel={fields[key].optionLabel}
              optionsDisabled={fields[key].optionsDisabled}
              className={fields[key].className}
            ></Select>
          </div>
        );
      }
      return (
        <div key={key}>
          <Input
            label={fields[key].label}
            type={fields[key].inputType}
            name={key}
            error={errors}
            readOnly={readOnly}
            disabled={fields[key].disabled}
            required={fields[key].required}
            value={formState[key]}
            onChange={handleChangeInput}
            onBlur={fields[key].onBlur}
            className={fields[key].className}
          ></Input>
        </div>
      );
    });
  };

  return <div>{render(0)}</div>;
};

export default DbForm;
