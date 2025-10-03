"use client";

import { useState } from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { Copy, Heart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageItem {
  id: number;
  url: string;
  prompt: string;
  category: string;
  tags: string[];
}

export default function ImageGrid({ images }: { images: ImageItem[] }) {
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const copyPrompt = (id: number, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <Masonry
      breakpointCols={{
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      }}
      className="my-masonry-grid flex w-auto"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
        >
          <div className="relative">
            <div 
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                size="sm"
                onClick={() => copyPrompt(image.id, image.prompt)}
                className="flex items-center gap-2"
              >
                {copiedPrompt === image.id ? "Copied!" : <Copy size={16} />}
              </Button>
              <Button 
                size="sm"
                variant="outline"
                onClick={() => toggleLike(image.id)}
                className={`flex items-center gap-2 ${likedImages.has(image.id) ? "text-red-400 border-red-400" : ""}`}
              >
                <Heart size={16} fill={likedImages.has(image.id) ? "currentColor" : "none"} />
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Download size={16} />
              </Button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm line-clamp-2">{image.prompt}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="text-xs px-2 py-1 bg-gray-700/50 rounded">{image.category}</span>
                {image.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-700/50 rounded">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </Masonry>
  );
}