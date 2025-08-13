import { createContext, useState, useEffect } from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState(null); // whole response
  const [blogIdList, setBlogIdList] = useState([]); // IDs or indexes

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${
            import.meta.env.VITE_CP_TRACKER_NEWS_API_KEY
          }`
        );
        const data = await response.json();
        setBlogData(data); // store whole API response

        // Assign IDs (index-based since NewsAPI has no unique id)
        const ids = data.articles?.map((_, index) => index) || [];
        setBlogIdList(ids);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <BlogContext.Provider value={{ blogData, blogIdList }}>
      {children}
    </BlogContext.Provider>
  );
};
