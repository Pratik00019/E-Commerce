import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Container, Table, Button } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';


export default function MyCart(props) {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(location.state.cartItems || []);

  const generateId = () => {
    const id = uuidv4();
    return id;
  }

  // console.log(cartItems)
  const handleRemoveFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += parseInt(cartItems[i].price);
    }
    return total;
  };

  // const handleOrder = () => {
  //   alert("Your order has been placed!");
  // };

  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [totalPrice, settotalPrice] = useState("");
  const [email, setCustomerEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const p = calculateTotal()
    settotalPrice(p);
    const id = generateId();

    try {
      console.log("jiiss")
      const response = await fetch("http://localhost:7071/api/HttpTrigger1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerAddress,
          // items: cartItems,
          // totalPrice,
          email,
          id
        }),
      })
        .catch((error) => {
          console.error(error);
        });
  

      if (response.ok) {
        console.log("Order placed successfully");
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error(error);
    }
    alert("Your order has been placed!");
  };
  return (
    <div>
      <h1>My Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          <Container>
            <h1 className="text-center mt-5">Order Summary </h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td><img src={item.url} alt={item.name} width="100" height="100" /></td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end">
              <h4>Total: Rs {calculateTotal()}</h4>
              {/* <Button variant="success" onClick={handleOrder}>
                Order Now
              </Button> */}
              <form >
                <div>
                  <label htmlFor="name">Name:&nbsp;</label>
                  <input type="text" id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="address">Address:&nbsp;</label>
                  <input type="text" id="address" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="email">Email:&nbsp;</label>
                  <input type="text" id="email" value={email} onChange={(e) => setCustomerEmail(e.target.value)} />
                </div>
                <button type="button" className="btn btn-success" onClick={handleSubmit}>Order Items</button>
              </form>

            </div>
          </Container>
        </div>
      )}
    </div>
  )
}
