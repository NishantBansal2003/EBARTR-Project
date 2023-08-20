import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemDetails.css";
import Header from "../Header/Code/HeaderSec";
import axios from "axios";
const ItemDetailsPage = () => {
  const { collection, itemId } = useParams();
  const [selectedImage, setSelectedImage] = useState(
    "https://source.unsplash.com/1440x600/?ecommerce"
  );

  const productGalleryImages = [
    "https://source.unsplash.com/1440x600/?ecommerce,games",
    "https://source.unsplash.com/1440x600/?ecommerce,shoes",
    "https://source.unsplash.com/1440x600/?ecommerce,laptop",
    "https://source.unsplash.com/1440x600/?ecommerce,furniture",
  ];

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsr, setSelectedUsr] = useState(null);
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  // Fetch user profile data when the component mounts
  useEffect(() => {
    // Send an HTTP GET request to '/profile' endpoint using Axios
    axios.get("/profile").then((response) => {
      // Update the state variables with the received data
      setId(response.data.userId);
      setUsername(response.data.username);
    });
  }, []);
  useEffect(() => {
    const currentURL = window.location.href;
    // console.log(currentURL);
    const queryParams = new URLSearchParams(currentURL.split("?")[1]);
    const selectUserValue = queryParams.get("currUser");
    setSelectedUsr(selectUserValue);
    console.log(selectUserValue);
  }, []);
  const handleMsgClick = () => {
    if (id != selectedUsr)
      window.location.href = `http://localhost:3000/message?selectUser=${selectedUsr}`;
  };
  useEffect(() => {
    fetch(`http://localhost:4040/Ebartr/items/${collection}/${itemId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Item not found");
        }
        return response.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [itemId]);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await fetch(`http://localhost:4040/Ebartr/images/${item.position}/${item._id}`);
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };
    fetchImageUrl();
  }, [item]);

  if (loading) {
    return <div className="item-details-loading">Loading...</div>;
  }

  if (error) {
    return <div className="item-details-error">{error}</div>;
  }

  if (!item) {
    return <div className="item-details-error">Item not found</div>;
  }

  return (
    <div>
      <Header />
      <div className="product__background">
        <section className="product">
          <div className="product__photo">
            <div className="photo-container">
              <div className="photo-main">
                <div className="controls"></div>
                <img
                  src={imageUrl}
                  alt=""
                  className="carousel-image current"
                />
              </div>
            </div>
          </div>
          <div className="product__info">
            <div className="title">
              <h1>{item.position}</h1>
            </div>
            <div className="price">
              <h3>Price</h3>
              Rs <span>{item.price}</span>
            </div>
            <div className="description">
              <h3>Description</h3>
              <ul>
                <div className="descript">{item.description}</div>
              </ul>
            </div>
            <button className="buy--btn" onClick={handleMsgClick}>
              CHAT WITH SELLER
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
