import { verifyTokenInRoute } from "@/middleware/verifyTokenInRoute";
import "./BookingPage.scss";

const BookingPage = async () => {  
    await verifyTokenInRoute();
  return (
    <div className="booking-page">
      <div className="container-wrapper">
        <p >This section is in the development phase.</p>
        <p className="title">You will soon be able to book your stays with us.</p>
        <span>Thankyou for your Patience.</span>
      </div>
    </div>
  );
};

export default BookingPage;
