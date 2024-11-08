import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { DatePicker, TimePicker, message } from 'antd'
import moment from "moment";
import {useDispatch, useSelector} from 'react-redux'
import { showLoading, hideLoading } from "../redux/features/alertSlice";


const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams()
  const [doctors , setDoctors]= useState([])
  const [date,setDate] = useState(new Date())
  const [actDate,setActDate]=useState()
  const [time, setTime] = useState()
  const [isAvailable,setIsAvailable] = useState(false)
  const dispatch = useDispatch();


  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < moment().endOf('day');
  };
  //Login User Data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getEmpById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };


  // Booking Function



const handleBooking = async () => {
  try {
    setIsAvailable(true);
    if(!date && !time){
      return alert("Date and Time are required fields");
    }

    dispatch(showLoading());
    const res = await axios.post(
      "/api/v1/user/book-appointment",
      {
        doctorId: params.doctorId,
        userId: user._id,
        doctorInfo: doctors,
        userInfo: user,
        date: date,
        time: time,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(hideLoading());
    if (res.data.success) {
      message.success(res.data.message);
    }
  } catch (error) {
    dispatch(hideLoading());
    console.log(error);
  }
};

// Booking Function

//Booking Availablity Function





useEffect(() => {
  getUserData()
  //eslint-disable-next-line
}, [])
  
  
return (
  <Layout>
    <h3>Booking Page</h3>
    <div className="container m-2">
      {doctors && (
        <div>
          <h4>
            {doctors.firstName} {doctors.lastName}
          
            Timings : {doctors.timings && doctors.timings[0]} -{" "}
            {doctors.timings && doctors.timings[1]}{" "}
          </h4>
          <div className="d-flex flex-column w-50">
          <DatePicker
      aria-required="true"
      className="m-2"
      format="DD-MM-YYYY" // Make sure this format matches the one used in the onChange handler
      onChange={(value) => {
        // console.log(new Date(value))
        setActDate(value)
        setDate(new Date(value));
      }}
      disabledDate={disabledDate}
      value={actDate}
    />

            {/* <DatePicker
      aria-required="true"
      className="m-2"
      format="DD-MM-YYYY"
      onChange={(value) => {
        setDate(value);
      }}
      disabledDate={disabledDate}
      value={date}
    /> */}

            <TimePicker
              aria-required={"true"}
              format="HH:mm"
              className="m-2"
              onChange={(value) => {
                // console.log(value)
                // setIsAvailable(false)
                const date= new Date()
                date.setHours(value.$H)
                date.setMinutes(value.$m)
                setTime(moment(date).format("HH:mm"));
              }}
            />
            {/* <button className="btn btn-primary mt-2" onClick={handleAvailability}>
              Check Availability
            </button> */}
            
            <button className="btn btn-dark mt-2" onClick={handleBooking}>
              Book Now
            </button>

          </div>
        </div>
      )}
    </div>
  </Layout>
);
}

export default BookingPage

