import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import ballerinaImages from "../../assets/school.png";
import "./../Products/loading.css";

const apiUrl = import.meta.env.VITE_API_URL;

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(0);

  const fetchFaqs = async () => {
    try {
      const response = await fetch(`${apiUrl}/faqs`);
      if (!response.ok) {
        throw new Error("Failed to retrieve FAQ data");
      }
      const data = await response.json();
      setFaqData(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      alert("An error occurred while retrieving FAQ data.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="ballerina-figure">
          <img src={ballerinaImages} alt="Loading Ballerina" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-black text-white p-6 max-w-6xl mx-auto mt-8 rounded-lg shadow-lg space-x-10">
      <div className="w-full">
        <h2 className="text-4xl font-bold mb-10">Frequently Asked Questions</h2>
        {faqData.map((item, index) => (
          <Accordion
            key={index}
            open={open === index + 1}
            animate={CUSTOM_ANIMATION}
            className="mb-2 rounded-lg border border-gray-300 px-6"
            style={{ minHeight: "50px", padding: "20px" }}>
            <AccordionHeader
              onClick={() => handleOpen(index + 1)}
              className={`border-b-0 text-xl transition-colors ${
                open === index + 1 ? "text-blue-500 hover:!text-blue-700" : ""
              }`}>
              {item.question}
            </AccordionHeader>
            <AccordionBody className="pt-0 text-lg font-normal text-white">
              {item.answer}
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Faq;
