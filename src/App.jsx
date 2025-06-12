import React, { useState } from "react";
import axios from "axios";

function App() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  const user = {
    name: "@rafael_dev",
    avatar: "https://i.pravatar.cc/150?img=68"
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const response = await axios.get("https://api.thecatapi.com/v1/images/search");
    const catImage = response.data[0].url;

    const newPost = {
      id: Date.now(),
      text: postText,
      date: new Date(),
      image: catImage,
      likes: 0,
      ...user
    };

    setPosts([newPost, ...posts]);
    setPostText("");
  };

  const likePost = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handlePost} className="sticky top-0 bg-white p-4 shadow mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="O que está acontecendo?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Postar</button>
      </form>

      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded mb-4 bg-gray-50">
          <div className="flex items-center gap-3 mb-2">
            <img src={post.avatar} className="w-10 h-10 rounded-full" />
            <span className="font-bold">{post.name}</span>
          </div>
          <p className="mb-2">{post.text}</p>
          <img src={post.image} alt="gato fofo" className="rounded mb-2" />
          <button onClick={() => likePost(post.id)} className="text-sm text-pink-600">
            ❤️ Curtir ({post.likes})
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
