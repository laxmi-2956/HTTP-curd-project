import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Productdata = () => {
  const [data, setData] = useState([]); // Fixed state variable name (camelCase)

  const getdatafromapi = () => {
    axios
      .get("http://localhost:8080/product")
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:8080/deleteproduct/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getdatafromapi(); 
  }, []);

  return (
    <>
      <h1>Product</h1>
      <div>
        <div>
          {data.length > 0 &&
            data.map((el) => (
              <div key={el.id}>
              <Link to={`/discription/${el.id}`}>
                <img src={el.image} alt="" height={200} width={200} />
                </Link><h2>{el.title}</h2>
                <h2>{el.price}</h2>
                <p>{el.description}</p>
                <button onClick={() => deleteProduct(el.id)}>delete</button>
                <Link to={`/update/${el.id}`}><button>edit</button></Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Productdata;
