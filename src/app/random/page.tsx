"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Shuffle, Heart, Download, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RandomPage() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<Array<{id: number, image: string, prompt: string}>>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Mock function to generate a random image
  const generateRandomImage = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockImages = [
        "/random1.jpg",
        "/random2.jpg",
        "/random3.jpg",
        "/random4.jpg",
      ];
      
      const mockPrompts = [
        "A cyberpunk cityscape at night with neon lights reflecting on wet streets",
        "An abstract composition of geometric shapes with vibrant colors",
        "A surreal landscape with floating islands and waterfalls in the sky",
        "A minimalist scene with a single tree under a starry night sky",
      ];
      
      const randomIndex = Math.floor(Math.random() * mockImages.length);
      const newImage = mockImages[randomIndex];
      const newPrompt = mockPrompts[randomIndex];
      
      setCurrentImage(newImage);
      setPrompt(newPrompt);
      setIsLoading(false);
      
      // Add to history
      setHistory(prev => [
        { id: Date.now(), image: newImage, prompt: newPrompt },
        ...prev.slice(0, 9) // Keep only the last 10 items
      ]);
    }, 1500);
  };

  useEffect(() => {
    // Generate first image on load
    generateRandomImage();
  }, []);

  const copyPrompt = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500">
              Random Generator
            </h1>
            <p className="text-gray-400 mt-2">Discover unique AI-generated images with one click</p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2"
          >
            <History size={16} />
            {showHistory ? "Hide History" : "Show History"}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              {isLoading ? (
                <div className="h-96 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"
                  />
                </div>
              ) : (
                currentImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <img 
                      src={currentImage} 
                      alt="AI Generated" 
                      className="w-full h-auto max-h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="p-2 rounded-full bg-gray-800/50 text-gray-300 hover:text-red-400 backdrop-blur-sm transition-all">
                        <Heart size={18} />
                      </button>
                      <button className="p-2 rounded-full bg-gray-800/50 text-gray-300 hover:text-cyan-400 backdrop-blur-sm transition-all">
                        <Download size={18} />
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={generateRandomImage}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 py-6 text-lg rounded-xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500 hover:from-violet-700 hover:via-blue-600 hover:to-cyan-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <Shuffle size={20} />
                {isLoading ? "Generating..." : "Generate New"}
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4 text-cyan-400">Current Prompt</h2>
              
              {prompt ? (
                <>
                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4 min-h-[120px]">
                    <p className="text-gray-200">{prompt}</p>
                  </div>
                  
                  <Button 
                    onClick={copyPrompt}
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Copy size={16} />
                    Copy Prompt
                  </Button>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-3 text-gray-300">Generation Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Model:</span>
                        <span className="text-gray-200">DALL-E 3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Resolution:</span>
                        <span className="text-gray-200">1024×1024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Style:</span>
                        <span className="text-gray-200">Vivid</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Quality:</span>
                        <span className="text-gray-200">High</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-center py-8">Generate an image to see the prompt</p>
              )}
            </div>
          </div>
        </div>
        
        {/* History Panel */}
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Generation History</h2>
            
            {history.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {history.map((item) => (
                  <div 
                    key={item.id}
                    className="rounded-lg overflow-hidden bg-gray-800/50 border border-gray-700 cursor-pointer hover:border-cyan-500/50 transition-colors"
                    onClick={() => {
                      setCurrentImage(item.image);
                      setPrompt(item.prompt);
                    }}
                  >
                    <div 
                      className="h-32 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="p-2">
                      <p className="text-xs text-gray-300 truncate">{item.prompt}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
                <p className="text-gray-400">No generation history yet</p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}