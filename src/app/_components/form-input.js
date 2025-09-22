export const FormInput = (props) => {
  const { inputTag, handleChange, name, value, errors, errorsMess, place } =
    props;
  return (
    <div className="logo3">
      <p className="firstname">
        {inputTag} <span className="star">*</span>
      </p>
      <input
        className="box "
        onChange={handleChange}
        name={name}
        value={value === undefined ? "" : value}
        placeholder={place}
        style={{
          borderColor: errors ? "#e14942" : "lightgray",
          color: errors ? "#e14942" : "black",
        }}
      />
      {errors && <div style={{ color: "#e14942" }}>{errorsMess}</div>}
    </div>
  );
};
