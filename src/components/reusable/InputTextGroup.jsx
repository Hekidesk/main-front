import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export const InputTextGroup = ({
  state,
  setState,
  label,
  placeHolder,
  warning,
  necessary = false,
  warningMessage,
  feedback = false,
}) => {
  return (
    <div style={{ display: "block", width: "100%" }}>
      <div>
        <label htmlFor={label} style={{ marginBottom: "0.4em" }}>
          {label}
          {necessary && (
            <div style={{ display: "inline", color: "red" }}> *</div>
          )}
        </label>
        {label !== "Password" ? (
          <InputText
            id={label}
            aria-describedby={label}
            style={{ width: "100%" }}
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder={placeHolder}
            className={(warning ? "p-invalid" : {})}
          />
        ) : (
          <Password
            id={label}
            aria-describedby={label}
            style={{ width: "100%" }}
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder={placeHolder}
            feedback={feedback}
            className={(warning ? "p-invalid" : {})}
            tabIndex={1}
          />
        )}
      </div>
      <div style={{ textAlign: "left" }}>
        {warning && (
          <div
            style={{
              color: "red",
              fontSize: "12px",
              float: "left",
            }}
          >
            {warningMessage}
          </div>
        )}
      </div>
    </div>
  );
};
