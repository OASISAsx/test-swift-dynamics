"use client";

import React from "react";
import styles from "./ShapeButton.module.scss";

interface ShapeButtonProps {
  // label: string;
  shape: "circle" | "square" | "triangle" | "oval" | "pentagon" | "hexagon";
  onClick: () => void;
}

const ShapeButton: React.FC<ShapeButtonProps> = ({
  /* label, */ shape,
  onClick,
}) => {
  const renderShape = () => {
    switch (shape) {
      case "circle":
        return <div className={`${styles.shape} ${styles.circle}`} />;
      case "square":
        return <div className={`${styles.shape} ${styles.square}`} />;
      case "triangle":
        return <div className={`${styles.shape} ${styles.triangle}`} />;
      case "oval":
        return <div className={`${styles.shape} ${styles.oval}`} />;
      case "pentagon":
        return <div className={`${styles.shape} ${styles.pentagon}`} />;
      case "hexagon":
        return <div className={`${styles.shape} ${styles.hexagon}`} />;
      default:
        return null;
    }
  };

  return (
    <button className={styles.shapeButton} onClick={onClick}>
      {renderShape()}
      {/* <span className={styles.label}>{label}</span> */}
    </button>
  );
};

export default ShapeButton;
