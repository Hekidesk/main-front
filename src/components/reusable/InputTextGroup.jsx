import { InputText } from "primereact/inputtext";

export const InputTextGroup = ({
  state,
  setState,
  label,
  placeHolder,
  warning,
  necessary = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <label htmlFor={label} style={{ marginBottom: "0.4em" }}>
        {label}
        {necessary && <div style={{ display: "inline", color: "red" }}> *</div>}
      </label>
      <InputText
        id={label}
        aria-describedby={label}
        style={{ width: "100%" }}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeHolder}
        className={"p-inputtext-sm " + (warning ? "p-invalid" : {})}
      />
    </div>
  );
};
