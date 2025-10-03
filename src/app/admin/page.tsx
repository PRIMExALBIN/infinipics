"use client";

import { useState } from "react";
import { Upload, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"images" | "prompts" | "collections" | "analytics">("images");
  
  // Mock data
  const images = [
    { id: 1, url: "/admin1.jpg", prompt: "Cyberpunk cityscape at night", category: "Urban", tags: ["cyberpunk", "night", "city"] },
    { id: 2, url: "/admin2.jpg", prompt: "Abstract geometric patterns", category: "Abstract", tags: ["abstract", "geometry", "colorful"] },
    { id: 3, url: "/admin3.jpg", prompt: "Serene mountain landscape", category: "Nature", tags: ["mountain", "landscape", "serene"] },
  ];
  
  const prompts = [
    { id: 1, text: "A futuristic cityscape at sunset with flying cars", category: "Urban", style: "Cyberpunk", popularity: 85 },
    { id: 2, text: "Abstract geometric patterns with vibrant neon colors", category: "Abstract", style: "Minimal", popularity: 72 },
    { id: 3, text: "Peaceful mountain landscape with misty clouds", category: "Nature", style: "Realistic", popularity: 68 },
  ];
  
  const collections = [
    { id: 1, name: "Cyberpunk Dreams", description: "Futuristic urban landscapes", cover: "/collection1.jpg", featured: true },
    { id: 2, name: "Nature Reimagined", description: "Surreal natural scenes", cover: "/collection2.jpg", featured: false },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mb-8">Manage your Infinipics platform</p>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800">
          {([
            { id: "images", label: "Images" },
            { id: "prompts", label: "Prompts" },
            { id: "collections", label: "Collections" },
            { id: "analytics", label: "Analytics" }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-gray-800 text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Content based on active tab */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          {activeTab === "images" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">Manage Images</h2>
                <Button className="flex items-center gap-2">
                  <Upload size={16} />
                  Upload Image
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4 text-left text-gray-400 font-medium">Image</th>
                      <th className="py-3 px-4 text-left text-gray-400 font-medium">Prompt</th>
                      <th className="py-3 px-4 text-left text-gray-400 font-medium">Category</th>
                      <th className="py-3 px-4 text-left text-gray-400 font-medium">Tags</th>
                      <th className="py-3 px-4 text-left text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {images.map((image) => (
                      <tr key={image.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                        <td className="py-4 px-4">
                          <div 
                            className="w-16 h-16 bg-cover bg-center rounded"
                            style={{ backgroundImage: `url(${image.url})` }}
                          />
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <p className="text-gray-200 line-clamp-2">{image.prompt}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-gray-700 rounded text-sm">{image.category}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {image.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">{tag}</span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-cyan-400">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-amber-400">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-400">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === "prompts" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">Manage Prompts</h2>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Add Prompt
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4 text-left text-gray-400 font-medium">Prompt</th>
                      <th className="py-3 px-4 text-left text-gray-400 font-medium">Category</th>
                      <th className="py-3 px-4 text-left text-gray-400 font-medium">Style</th>
                      <th className="py-3 px-4 text-left text-gray-400 font-medium">Popularity</th>
                      <th className="py-3 px-4 text-left text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prompts.map((prompt) => (
                      <tr key={prompt.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                        <td className="py-4 px-4 max-w-md">
                          <p className="text-gray-200">{prompt.text}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-gray-700 rounded text-sm">{prompt.category}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-gray-700 rounded text-sm">{prompt.style}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-cyan-500 h-2 rounded-full" 
                                style={{ width: `${prompt.popularity}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-400">{prompt.popularity}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-amber-400">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-400">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === "collections" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-400">Manage Collections</h2>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  New Collection
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <div 
                    key={collection.id}
                    className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                  >
                    <div 
                      className="h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${collection.cover})` }}
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-gray-200">{collection.name}</h3>
                        {collection.featured && (
                          <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded">Featured</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mt-2">{collection.description}</p>
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-2 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "analytics" && (
            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-6">Analytics Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { title: "Total Images", value: "1,248", change: "+12%" },
                  { title: "Active Users", value: "3,421", change: "+8%" },
                  { title: "Collections", value: "24", change: "+3%" },
                  { title: "Avg. Generation Time", value: "2.4s", change: "-0.3s" }
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <div className="flex items-end gap-2 mt-2">
                      <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
                      <span className="text-green-400 text-sm">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="font-bold text-lg text-gray-200 mb-4">Popular Categories</h3>
                  <div className="space-y-4">
                    {[
                      { category: "Urban", percentage: 35 },
                      { category: "Nature", percentage: 28 },
                      { category: "Abstract", percentage: 20 },
                      { category: "Sci-Fi", percentage: 12 },
                      { category: "Minimal", percentage: 5 }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">{item.category}</span>
                          <span className="text-gray-400">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="font-bold text-lg text-gray-200 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { action: "New image uploaded", time: "2 min ago", user: "Admin" },
                      { action: "Collection created", time: "1 hour ago", user: "Moderator" },
                      { action: "Prompt edited", time: "3 hours ago", user: "Editor" },
                      { action: "User registered", time: "5 hours ago", user: "System" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                        <div className="mt-1 w-2 h-2 rounded-full bg-cyan-500" />
                        <div>
                          <p className="text-gray-200">{activity.action}</p>
                          <p className="text-gray-400 text-sm">{activity.time} by {activity.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}