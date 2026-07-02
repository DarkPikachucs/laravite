import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DataPointForm = () => {
  const [dataPoint, setDataPoint] = useState({
    name: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDataPoint({ ...dataPoint, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/datapoints`, dataPoint);
      console.log(response.data);
      navigate("/datapoints");
    } catch (error) {
      console.error("Error creating data point:", error);
    }
  };

  return (
    <div>
      <h2>Create Data Point</h2>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={dataPoint.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={dataPoint.description} onChange={handleChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}