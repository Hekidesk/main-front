const btn = {
  fontSize: "1.2em",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.4em 0.6em",
  borderRadius: "6px",
  textDecoration: "auto",
  margin: "1em 0",
  cursor: "pointer",
};

export const ButtonStyle = {
  backgroundColor: "var(--green-color)",
  borderColor: "var(--green-color)",
  color: "white",
  ...btn,
};

export const ButtonOutlineStyle = {
  color: "var(--green-color)",
  border: "1px solid var(--green-color)",
  ...btn,
};

export const ButtonMyDeskStyle = {
  backgroundColor: "var(--green-color)",
  borderColor: "var(--green-color)",
  color: "white",
  alignItems: "right",
  ...btn,
  marginRight: "41px",
  width: "200px",
  padding: "0.4em 0.5em 0.4em 0.2em",
};

export const ButtonBackStyle = {
  backgroundColor: "var(--green-color)",
  borderColor: "var(--green-color)",
  color: "white",
  alignItems: "right",
  ...btn,
  marginTop: "50px",
  marginLeft: "50px",
  width: "200px",
  padding: "0.4em 1em 0.4em 0.2em",
};

export const ButtonMeasurementStyle = {
  backgroundColor: "transparent",
  border: "none",
  color: "black",
  ...btn,
  width: "8rem",
  borderRadius: "4rem",
};


export const ButtonHistoryStyle = {
  backgroundColor: "var(--green-color)",
  borderColor: "var(--green-color)",
  color: "white",
  alignItems: "right",
  ...btn,
  marginRight: "90px",
  width: "200px",
};