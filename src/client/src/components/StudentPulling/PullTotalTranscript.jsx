import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ButtonType from "../ButtonType";

const PullTotalSemesters = () => {
  const [StuId, setStuId] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = `https://knj.horus.edu.eg/api/hue/portal/v1/CurrentTranscript&student_id=${StuId}`;

  const handleInputChange = (event) => {
    setStuId(event.target.value);
  };

  const handlePullData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} Error fetching data from "${apiUrl}"`
        );
      }

      setStatus("Success");
      toast.success(" Success!");
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

  useEffect(() => {
    // Reset the status when input value changes
    setStatus(null);
  }, [StuId]);

  return (
    <div className="flex-wrap justify-center items-center flex gap-6">
      <label className="block text-gray-700 mt-4  dark:text-white">
        Total Transcript
        <input
          id="studentId"
          className="border border-black rounded-md p-4 mt-1 ml-4 dark:text-black"
          type="number"
          value={StuId}
          onChange={handleInputChange}
          placeholder="Enter Student ID"
          required
          min="0"
        />
      </label>

      <ButtonType onClick={handlePullData} className="btn-primary" type="button"  disabled={isLoading || !StuId} isLoading={isLoading} status={status}>
    {isLoading ? "Loading..." : status ? status : "Pull"}
    </ButtonType>
      <div className="max-w-24 max-h-20">
        {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
      </div>
    </div>
  );
};

export default PullTotalSemesters;
