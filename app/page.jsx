"use client";
import useSWR from "swr";
import SwipeToFetch from "./components/SwipeToFetch";
import styles from "./styles/home.module.css";
import { fetchNewsData } from "./hooks/useFetch";
import React, { useState } from "react";
import dynamic from "next/dynamic";
// imported NewsItem dynamically 
const NewsItem = dynamic(() => import("./components/NewsItem"));

export default function Home() {
    // getting data from fetchcall 
  const { data, error } = useSWR("news", fetchNewsData);
//   setting the random news from the data
  const [displayedNews, setDisplayedNews] = useState(null);

  const getRandomNews = () => {
    if (data) {
      const filteredData = data.filter((item) => item.title !== "[Removed]");
      if (filteredData.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        setDisplayedNews(filteredData[randomIndex]);
      }
    }
  };

  const handleFullSwipe = () => {
    getRandomNews();
  };

  return (
    <main className={styles.main}>
      {!displayedNews ? (
        
        <h2 className={styles.title}>Welcome to newsfeed App</h2>
      ) : (
        <NewsItem title={displayedNews.title} url={displayedNews.url} />
      )}
      {error && <p>Error loading news</p>}
      <SwipeToFetch fullSwiped={handleFullSwipe} />
    </main>
  );
}
