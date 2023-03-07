import React, { useEffect, useState } from "react";
import Styles from "./Advice.module.scss";

export default function Advice() {
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const fetchData = async () => {
    const fetchBtn = document.querySelector("[data-fetch]");
    fetchBtn?.classList.add("dice-loading");

    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let data = await response.json();
      // Added delay and random to showcase css keyframe animation 🤣
      await delay(random(1, 3) * 1000);
      setText(data.slip);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
      fetchBtn?.classList.remove("dice-loading");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <div className={Styles.placeholderText}>Loading advice...</div>
      )}
      {error && (
        <div
          className={Styles.placeholderText}
        >{`There is a problem fetching the data - ${error}`}</div>
      )}

      {text.id && text.advice && (
        <>
          <span className={Styles.title}>Advice #{text.id}</span>
          <p className={Styles.text}>“{text.advice}”</p>
          <hr className={Styles.separator} />
          <button
            className={Styles.dice || "test"}
            onClick={fetchData}
            data-fetch
          >
            <span>🎲</span>
          </button>{" "}
        </>
      )}
    </>
  );
}
