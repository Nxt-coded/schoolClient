import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img1 from "../../assets/testIMage.jpg";

const FinalMidTestScreenReport = () => {
  return (
    <div className="h-full rounded-md flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-50 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 text-center"
      >
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            🎉 Exam Completed!
          </h1>
          <div className="flex justify-center mb-6">
            <img
              src={img1}
              alt="Exam completed"
              className="w-60 h-60 object-contain"
            />
          </div>
          <p className="text-gray-600 text-sm mb-6">
            You’ve successfully completed your exam.
            <span className="block mt-1">Wishing you the very best!</span>
          </p>
          <Link to="/my-classroom-test-exam">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-2.5 rounded-md font-semibold shadow-md transition duration-200"
            >
              Go to Dashboard
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinalMidTestScreenReport;
