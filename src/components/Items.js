
import { React, useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import "./Custom-card.css";
import { useNavigate } from "react-router-dom";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function Items() {

  const [cardsData, setCardsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = " http://localhost:7071/api/HttpTrigger1";
        // const url ="https://acb0-2409-40c2-1024-547-a130-8b81-6ac6-f81.in.ngrok.io/api/product"
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        setCardsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);

  const handleAddToCart = (item) => {

    setCartItems([...cartItems, item]);
    console.log("added")
    setAddedToCart(true);

    // Reset addedToCart to false after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };
  const navigate = useNavigate();

  const handleViewCart = () => {

    navigate('/MyCart', { state: { cartItems: cartItems } });
    console.log(cartItems);
  };
  // use card.c.name etc while using local API's
  return (
    <Container fluid>
      {addedToCart && (
        <div className="notification">
          <p>Item added to cart!</p>
        </div>
      )}
      <Row xs={1} sm={2} md={3} lg={3} className="mb-3">
        {cardsData.map((card) => (
          <Col key={card.id} className="mb-5">
            <Card className="custom-card">
              <Card.Img variant="top" src={card.url} style={{ objectFit: "cover", height: "200px" }} />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{card.name}</Card.Title>
                  <Card.Text>{card.desc}</Card.Text>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                  <div className="price-box">
                    <Card.Text className="mb-0" style={{ color: "white" }} >Rs {card.price}</Card.Text>
                  </div>
                  <div className="text-end">
                    <Button
                      variant="primary"
                      className="btn-box"
                      onClick={() => handleAddToCart(card)}
                    >
                      Add to cart

                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="primary" onClick={handleViewCart}>View Cart</Button>
    </Container>
  )
}

