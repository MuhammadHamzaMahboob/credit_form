import { useState, useEffect } from "react";
import ProgressIndicator from "../../components/ProgressIndicator";
import FormField from "../../components/FormField";

const CreditCardForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    addressLine2: "",
    zipCode: "",
    city: "",
    region: "",
    country: "",
    creditCardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const [filledPercentage, setFilledPercentage] = useState(0);
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    const checkFields = async () => {
      const fields = Object.keys(formValues);
      const filledFields = fields.filter((field) => formValues[field]);
      const missingFields = fields.filter((field) => !formValues[field]);

      setFilledPercentage((filledFields.length / fields.length) * 100);
      setMissingFields(missingFields);
    };

    checkFields();
  }, [formValues]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      const data = await response.json();
      if (data.status === "failed") {
        alert(`Error: ${data.message}`);
      } else {
        alert(`Success: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.log(error);
    }
  };

  return (
    <div>
      <ProgressIndicator
        filledPercentage={filledPercentage}
        missingFields={missingFields}
      />
      <form onSubmit={handleSubmit}>
        {Object.keys(formValues).map((field) => (
          <FormField
            type={"text"}
            key={field}
            name={field}
            value={formValues[field]}
            onChange={handleChange}
            placeholder={field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreditCardForm;
