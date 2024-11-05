import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import EventsImage from "../../../assets/Events.svg"; // Keep this if you need a fallback image

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8000/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data); // Assuming the API returns an array of events
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 3 : prevIndex - 1
    );
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-[57.57px]">
      <div className="container max-w-[1280px] m-auto">
        <div className="flex justify-between mb-[40px]">
          <div className="font-normal text-[32px] leading-[30.62px] font-gotham">
            <h2>Other events</h2>
          </div>
          <div className="flex">
            <div
              className="border bg-[#F0F0F0] text-black items-center flex text-center px-2.5 cursor-pointer"
              onClick={prevSlide}
            >
              <MdChevronLeft className="w-[24px] h-[24px]" />
            </div>
            <div
              className="border bg-[#F0F0F0] text-black items-center flex text-center px-2.5 cursor-pointer"
              onClick={nextSlide}
            >
              <MdChevronRight className="w-[24px] h-[24px]" />
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
          >
            {events.map((event, index) => (
              <div key={event.id} className="w-[33.33%] flex-shrink-0 px-2">
                <div className="mb-[19px]">
                  <img src={event.image || EventsImage} alt={event.title} />
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <h2 className="font-normal text-lg leading-[20.57px]">
                    {event.name}
                  </h2>
                  <p className="font-semibold text-[22px] leading-[26.63px]">
                    {event.category}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-lg mb-2 leading-[20.57px]">
                    {  event.date}
                  </p>
                  <h2 className="font-normal text-lg leading-[20.57px]">
                    {event.description}
                  </h2>

                  <h2 className="font-normal text-base leading-[19.36px] mb-[29px] mt-2">
                    {/* {event.description} */}
                  </h2>
                  <button
                    className="mt-4 w-[203.4px] h-[47.54px] bg-[#C8102E] text-white font-bold text-lg leading-[17.14px] rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => handleMoreInfoClick(event)}
                  >
                    More info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-4 rounded-lg w-[90%] max-w-[600px]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-semibold text-xl">{selectedEvent?.title}</h2>
              <img
                src={selectedEvent?.image}
                alt={selectedEvent?.title}
                className="mb-4 w-full rounded-lg"
              />
              <p className="font-medium text-lg">{selectedEvent?.date}</p>
              <p className="font-normal text-lg">
                {selectedEvent?.description}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  className="w-[48%] h-[47.54px] border text-black font-bold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleBuyTicketClick}
                >
                  Buy Ticket
                </button>
                <button
                  className="w-[48%] h-[47.54px] border text-black font-bold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={closeModal}
                >
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

export default Events;
