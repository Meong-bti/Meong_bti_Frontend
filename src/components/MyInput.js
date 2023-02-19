const MyInput = ({ name, type, value, text }) => {
  if (type === "radio") {
    return (
      <label className="check-container">
        <input
          type="radio"
          className="check-point input-value"
          name={name}
          value={value}
          style={{ display: "none" }}
        />
        <span className={`check-box`} style={{ textAlign: "center" }}>
          {text}
        </span>
      </label>
    );
  }

  return (
    <input
      className="input input-value"
      name={name}
      type={type}
      placeholder={text}
    />
  );
};

export default MyInput;
