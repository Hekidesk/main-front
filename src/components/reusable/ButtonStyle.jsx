const btn = {
  fontSize: "18px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.4em 0.6em",
  borderRadius: "6px",
  textDecoration: "auto",
  margin: "1em 0",
};

export const ButtonStyle = {
  backgroundColor: "var(--title-color)",
  borderColor: "var(--title-color)",
  color: "white",
  ...btn,
};

export const ButtonOutlineStyle = {
  color: "var(--title-color)",
  border: "1px solid var(--title-color)",
  ...btn,
};
