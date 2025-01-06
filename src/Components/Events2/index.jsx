import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const apiUrl = import.meta.env.VITE_API_URL;

const Events2 = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiUrl}/streams`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleMoreInfoClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleBuyTicketClick = () => {
    alert("Ticket purchase functionality goes here.");
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-[57.57px]">
      <div className="container max-w-[1280px] m-auto">
        <div className="flex justify-between mb-[40px]">
          <div className="font-thin text-[32px] leading-[30.62px] uppercase font-gotham">
            <h2>New on Royal Opera House Stream</h2>
          </div>
        </div>

        <Slider {...sliderSettings}>
          {events.map((event, index) => (
            <div
              key={index}
              className="w-full sm:w-[33.33%] flex-shrink-0 px-2"
              data-aos="fade-up"
              data-aos-duration="1500">
              <div className="mb-[19px]">
                <img src={event.image} alt={event.title} />
              </div>
              <div className="flex flex-col gap-2 mb-2">
                <h2 className="font-normal text-base leading-[19.36px] mt-2">
                  {event.name}
                </h2>
                <p className="font-semibold text-[22px] leading-[26.63px]">
                  {event.category}
                </p>
              </div>
              <div>
                <p className="font-medium text-lg mb-2 font-gotham leading-[20.57px]">
                  {event.date}
                </p>
                <h2 className="font-normal text-lg leading-[20.57px]">
                  {event.subtitle}
                </h2>

                <button
                  className="mt-4 w-[203.4px] h-[47.54px] bg-[#1866DC] text-white font-bold text-lg leading-[17.14px] rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => handleMoreInfoClick(event)}
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="1500">
                  More info
                </button>
              </div>
            </div>
          ))}
        </Slider>

        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50 z-50"
            onClick={closeModal}>
            <div
              className="bg-white p-4 rounded-lg w-[90%] max-w-[600px]"
              onClick={(e) => e.stopPropagation()}
              data-aos="fade-in"
              data-aos-duration="1000">
              <h2 className="font-semibold text-xl">{selectedEvent?.name}</h2>
              <img
                src={selectedEvent?.image}
                alt={selectedEvent?.name}
                className="mb-4 w-full rounded-lg"
              />
              <p className="font-medium text-lg">{selectedEvent?.category}</p>
              <p className="font-medium text-lg">{selectedEvent?.date}</p>
              <h2 className="font-normal text-lg leading-[20.57px]">
                {selectedEvent?.subtitle}
              </h2>

              <div className="mt-4 flex justify-between ">
                <button
                  className="w-[48%] h-[47.54px] border text-black font-bold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events2;
