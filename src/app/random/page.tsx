"use client";

import { useState } from "react";

export default function RandomPage() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mock function to generate a random image
  const generateRandomImage = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockPrompts = [
        "A cyberpunk cityscape at night with neon lights",
        "An abstract composition of geometric shapes",
        "A surreal landscape with floating islands",
        "A minimalist scene with a single tree",
      ];
      
      const newPrompt = mockPrompts[Math.floor(Math.random() * mockPrompts.length)];
      
      setCurrentImage("mock-image");
      setPrompt(newPrompt);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Random Generator
            </h1>
            <p className="text-gray-400 mt-2">Discover unique AI-generated images</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden bg-gray-800 border border-gray-700 h-96 flex items-center justify-center">
              {isLoading ? (
                <div className="text-gray-400">Generating...</div>
              ) : currentImage ? (
                <div className="text-center">
                  <div className="bg-gray-700 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center mx-auto" />
                  <p className="mt-4 text-gray-300">Generated Image</p>
                </div>
              ) : (
                <div className="text-gray-400">Click &quot;Generate New&quot; to create an image</div>
              )}
            </div>
            
            <div className="mt-6">
              <button 
                onClick={generateRandomImage}
                disabled={isLoading}
                className="w-full py-4 text-lg rounded-xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500 hover:from-violet-700 hover:via-blue-600 hover:to-cyan-600 text-white disabled:opacity-50"
              >
                {isLoading ? "Generating..." : "Generate New"}
              </button>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold mb-4 text-cyan-400">Current Prompt</h2>
              
              {prompt ? (
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-200">{prompt}</p>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Generate an image to see the prompt</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}