import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Discription = () => {
  const { id } = useParams();
//   console.log(id);
  const [data, setdata] = useState({});

  const getdatafromderver = () => {
    axios
      .get(`http://localhost:8080/discription/${id}`)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   getdatafromderver()
  useEffect(() => {
    getdatafromderver();
  }, []);

  return (
    <div>
      <img
        src={data.image}
        width={100}
        style={{
          margin: "0px 10px 20px 250px",
          border: "2px solid black",
          padding: "20px",
        }}
        alt=""
      />
      <h1 style={{ margin: "0px 10px 20px 190px" }}>{data.title}</h1>
      <h2 style={{ margin: "0px 10px 20px 260px" }}>{data.price}</h2>
      <h2 style={{ margin: "0px 10px 20px 260px" }}>{data.category}</h2>

      <p style={{ margin: "0px 10px 20px 260px" }}>{data.Discription}</p>
    </div>
  );
};

export default Discription;
