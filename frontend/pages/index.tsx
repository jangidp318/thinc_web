import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [content, setContent] = useState({ title: "THINC", description: "", keyPoints: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/api/content")
      .then(res => setContent(res.data[0] || {}))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ul>{(content.keyPoints || []).map((p,i)=> <li key={i}>{p}</li>)}</ul>
    </div>
  );
}

