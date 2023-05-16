import { Field, ErrorMessage } from 'formik';


const TextError = (props) => {
	return <div style={{ color: "red", paddingLeft: "2rem" }}>{props.children}</div>;
};


const InputField = ({ label, name, type, placeholder }) => {
  return (
    <div className="mt-2">
      <label htmlFor={name}>{label}</label>
      <Field name={name} type={type} placeholder={placeholder} className="flex flex-col w-full p-2 border rounded-md"/>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default InputField;
