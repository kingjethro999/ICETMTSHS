import React from "react";

export const GoogleMap: React.FC = () => {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16281728.847171122!2d3.161176572793144!3d8.68361715421503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0d%3A0x85ad83221d496a7d!2sNigeria!5e0!3m2!1sen!2sng!4v1715334000000!5m2!1sen!2sng"
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
