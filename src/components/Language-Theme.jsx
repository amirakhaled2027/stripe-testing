import { useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

function Language() {
    const elements = useElements();
    const [message, setMessage] = useState("");

  
    const updateLocale = () => {
      if (elements) {
        elements.update({ locale: "ar" }); 
        // Clear message or add specific message if needed
      setMessage(""); // Clear any previous messages
      }
    };

  
    const updateAppearance = () => {
      if (elements) {
        elements.update({
          appearance: {
            theme: "night",
            variables: {
              colorPrimary: "#333333",
              colorText: "#ffffff",
            },
          },
        }); 
        // Clear message or add specific message if needed
      setMessage(""); // Clear any previous messages
      }
    };
   


  // Function to reset to default settings (Stripe theme & auto locale)
  const resetSettings = () => {
    if (elements) {
      elements.update({
        locale: "auto", // Default locale (auto-detect)
        appearance: {
          theme: "stripe", // Default Stripe theme
        },
      });
       // Show a success message when the update is complete
       setMessage("Language & Theme reset to the default successfully!");
    }
  };


   //Sucess message 
   // Using useEffect to add the event listener inside the component
   useEffect(() => {
    // Adding an event listener for the 'update-end' event
    const handleUpdateEnd = (event) => {
      console.log(" Reset to Default Language & Theme Successully!", event);
     
    };

    if (elements) {
      elements.on("update-end", handleUpdateEnd);
    }

    // Cleaning-up the event listener on component unmount
    return () => {
      if (elements) {
        elements.off("update-end", handleUpdateEnd);
      }
    };
  }, [elements]); // Dependency array ensures the effect runs when `elements` is available
  
    return (
      <div id="btns">
        <div id="main-btns">
            <button onClick={updateLocale} id="lang-btn">Arabic</button>
            <button onClick={updateAppearance} id="theme-btn">Night Theme</button>
        </div>
        <button onClick={resetSettings} id="reset-btn">Reset to Default</button>
        {message && <div className="success-message">{message}</div>}
      </div>
    );
  }


  export default Language