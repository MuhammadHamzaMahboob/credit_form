const ProgressIndicator = ({ filledPercentage, missingFields }) => (
  <div>
    <p>{`Form filled: ${filledPercentage.toFixed(2)}%`}</p>
    {missingFields.length > 0 && (
      <p>Please fill out the following fields: {missingFields.join(", ")}</p>
    )}
  </div>
);

export default ProgressIndicator;
