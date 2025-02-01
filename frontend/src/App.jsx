import React from "react";
import FAQList from "./components/FAQList";
import FAQForm from "./components/FAQForm";

const App = () => {
  return (
    <div>
      <h1>FAQ Management System</h1>
      <FAQForm />
      <FAQList />
    </div>
  );
};

export default App;
