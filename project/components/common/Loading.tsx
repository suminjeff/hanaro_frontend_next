import React from "react";
import styles from "@/styles/Loading.module.css";

export default function Loading() {
  return (
    <h1 className={styles.loader}>
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </h1>
  );
}
