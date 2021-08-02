import { Redirect } from "react-router";
import { useState } from "react";
import axios from "axios";

const Publish = ({ userToken }) => {
  const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setData(response.data);
      console.log("Les données :", response.data);
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return userToken ? (
    <div className="publish-form">
      <h1>Vends ton article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            onChange={(event) => {
              setPicture(event.target.files);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Titre"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <textarea
            placeholder="Décris ton article"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Marque"
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Taille"
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Couleur"
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="État"
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Lieu"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Prix"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <span>Je suis intéressé·e par les échanges</span>
          <input type="checkbox" />
        </div>
        <button type="submit">Ajouter</button>
      </form>
      {data && <img src={data.secure_url} alt="" />}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
