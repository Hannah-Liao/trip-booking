import React, { useState, useContext } from 'react';
import axios from "axios";
import "./booking.css";

import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {

    const { price, reviews, title } = tour;
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const token = user?.token

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: "",
        phone: "",
        guestSize: 1,
        bookAt: ""
    })

    const handleChange = (event) => {
        setBooking(prev => ({ ...prev, [event.target.id]: event.target.value }))
    }

    const serviceFee = 10;
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

    //send data to server
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!user || user === undefined || user === null) {
                return alert("Please sign in")
            }

            const res = await axios.post(`${BASE_URL}/booking`, booking, { headers: { authorization: token } });

            alert(res.data.message)

            navigate("/thank-you")
        } catch (err) {
            alert(err.message)

        }
    }

    return (
        <div className='booking'>
            <div className="d-flex align-items-center justify-content-between">
                <h3>£{price} <span>/per person</span></h3>
                <span className="tour_rating d-flex align-items-center">
                    <i className="ri-star-fill">
                    </i>
                    {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>

            {/* ==================== booking form ==================== */}
            <div className="booking_form">
                <h5>Information</h5>
                <Form onSubmit={handleSubmit} className='booking_info-form'>
                    <FormGroup>
                        <input onChange={handleChange} type="text" placeholder='Full Name' id='fullName' required />
                    </FormGroup>

                    <FormGroup>
                        <input onChange={handleChange} type="number" placeholder='Phone' id='phone' required />
                    </FormGroup>

                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input onChange={handleChange} type="date" placeholder='' id='bookAt' required />
                        <input onChange={handleChange} type="number" placeholder='Guest' id='guestSize' required />
                    </FormGroup>
                </Form>
            </div>
            {/* ==================== booking form end==================== */}

            {/* ==================== booking button==================== */}
            <div className="booking_bottom">
                <ListGroup>
                    <ListGroupItem className='border-0 px-0'>
                        <h5 className='d-flex align-items-center gap-1'>
                            £{price} <i className="ri-close-line"></i> 1 person
                        </h5>
                        <span> £{price}</span>
                    </ListGroupItem>

                    <ListGroupItem className='border-0 px-0'>
                        <h5>Service charge</h5>
                        <span> £{serviceFee}</span>
                    </ListGroupItem>

                    <ListGroupItem className='total border-0 px-0'>
                        <h5>Total</h5>
                        <span> £{totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>

                <Button onClick={handleSubmit} className='btn primary_btn w-100 mt-4'>Book Now</Button>
            </div>
            {/* ==================== booking button end==================== */}
        </div>
    )
}

export default Booking