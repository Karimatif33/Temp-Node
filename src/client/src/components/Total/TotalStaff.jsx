import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ButtonType from "../ButtonType";

const TotalStaff = () => {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = `https://knj.horus.edu.eg/api/hue/portal/v1/staff`;

  const handlePullData = async () => {
    try {
      setIsLoading(true);
      if (setIsLoading) {
        toast.success("Staff Loading...");
      }
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} Error fetching data from "${apiUrl}"`
        );
      }

      toast.success("Staff Success!");
      setIsLoading(false);
    } catch (error) {
      console.error(error.message, "Error fetching data:");
      setStatus("Failed");
      setIsLoading(false);
      setError(error.message);
      toast.error(error.message);

      // Clear the error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 7000);
    }
  };

  return (
    <div className="flex-wrap justify-center  flex gap-6">
          
          <ButtonType
        onClick={handlePullData}
        className="btn-primary"
        type="button"
        disabled={isLoading}
        isLoading={isLoading}
        status={status}
      >
        Staff
      </ButtonType>
      <div className="max-w-24 max-h-20"></div>
    </div>
  );
};

export default TotalStaff;
