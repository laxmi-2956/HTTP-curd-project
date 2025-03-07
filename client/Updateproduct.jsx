// import React from 'react'
import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { useParams,useNavigate } from 'react-router';
import axios from "axios";

const Updateproduct = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();


  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: ""
  });

 const [message, setMessage] = useState("");


  useEffect(() => {
    axios
      .get(`http://localhost:8080/discription/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log("Error fetching product:", err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/updateproduct/${id}`, product)
      .then(() => {
        setMessage("Product updated successfully!");
        setTimeout(() => navigate("/"), 1500); 
      })
      .catch(() => setMessage("Error updating product"));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Product</h2>

      {message && <p className="text-center text-green-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Product Title:</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Price:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        /><br></br>

        <label className="block mb-2">Description:</label>
        <input 
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        ></input>

        <label className="block mb-2">Image URL:</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default Updateproduct
