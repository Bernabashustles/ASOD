"use client";

import Link from 'next/link';
import { Laptop } from 'lucide-react';
import { motion } from 'framer-motion';
import { pageVariants, logoVariants, buttonVariants, linkButtonVariants } from '@/lib/animations';

export default function NotFound() {
  return (
    <motion.div
      className="gradient-bg min-h-screen flex items-center justify-center p-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="gradient-blob gradient-blob-1"></div>
      <div className="gradient-blob gradient-blob-2"></div>
      <div className="gradient-blob gradient-blob-3"></div>
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <motion.div
            className="bg-black p-3 rounded-xl mb-4"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Laptop className="w-6 h-6 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
          <div className="text-gray-600 mt-2 text-center">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <motion.div
            className="w-full"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Link 
              href="/auth"
              className="block w-full bg-black text-white py-3 rounded-xl text-center"
            >
              Back to Sign In
            </Link>
          </motion.div>
          
          <motion.div
            variants={linkButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="/auth/signup"
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Create an Account
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}