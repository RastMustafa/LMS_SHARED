"use client";
import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <Toaster
      containerStyle={{ zIndex: 99999 }}
      position="top-center"
      reverseOrder={false}
    />
  );
};

export default ToasterContext;
