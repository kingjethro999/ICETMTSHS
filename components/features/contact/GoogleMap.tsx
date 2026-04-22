import React from "react";

export const GoogleMap: React.FC = () => {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252163.4566835265!2d7.3333333!3d9.0666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7d488d49%3A0xda5a0695029e2624!2sAbuja%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1712497000000!5m2!1sen!2sng"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Lincoln University College Nigeria Location"
      ></iframe>
    </div>
  );
};
