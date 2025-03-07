import axios from "axios";
import React, { useState } from "react";

const initialState = {
  image: "",
  title: "",
  category: "",
  price: "",
  description: "",
};

const Addproduct = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    
    axios.post("http://localhost:8080/Addproduct", formData)
      .then((res) => {
        console.log("Product added:", res.data);
        setFormData(initialState);
      })
      .catch((err) => console.log("Error:", err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <br />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <br />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <br />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="electronics">Electronics</option>
        </select>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Addproduct;
