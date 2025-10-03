"use client";

import { motion } from "framer-motion";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`relative ${sizeClasses[size]} flex items-center justify-center`}
        animate={{
          background: [
            "linear-gradient(90deg, #7e22ce, #3b82f6, #06b6d4)",
            "linear-gradient(90deg, #06b6d4, #7e22ce, #3b82f6)",
            "linear-gradient(90deg, #3b82f6, #06b6d4, #7e22ce)",
            "linear-gradient(90deg, #7e22ce, #3b82f6, #06b6d4)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          borderRadius: "50%",
          boxShadow: "0 0 15px rgba(126, 34, 206, 0.5), 0 0 30px rgba(59, 130, 246, 0.3), 0 0 45px rgba(6, 182, 212, 0.2)",
        }}
      >
        {/* Infinity symbol */}
        <svg
          viewBox="0 0 24 24"
          className="absolute w-1/2 h-1/2 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 12c2.1-2.1 4.2-2.1 6.3 0 2.1 2.1 2.1 5.5 0 7.6-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.6 1.05-1.05 2.1-1.575 3.15-1.575" />
          <path d="M12 12c-2.1 2.1-4.2 2.1-6.3 0-2.1-2.1-2.1-5.5 0-7.6 2.1-2.1 5.5-2.1 7.6 0 2.1 2.1 2.1 5.5 0 7.6-1.05 1.05-2.1 1.575-3.15 1.575" />
        </svg>
        
        {/* Pixel/camera fusion element */}
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-white rounded-sm" />
        <div className="absolute top-0 left-0 w-1/6 h-1/6 bg-white rounded-full" />
      </motion.div>
      
      <motion.span 
        className={`mt-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 ${textSizeClasses[size]}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Infinipics
      </motion.span>
    </motion.div>
  );
}