"use client";

import React, { useState, useEffect } from "react";
import { Badge, Button, Divider, Space } from "antd";
import { useTranslation } from "react-i18next";
import ShapeGrid from "./ShapeGrid";
import styles from "./ShapesSection.module.scss";
import stylesButton from "./ShapeButton.module.scss";
import stylesGrid from "./ShapeGrid.module.scss";

const ShapesSection: React.FC = () => {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState(0);
  const [gridOrder, setGridOrder] = useState<"normal" | "reversed">("normal");
  const [isMounted, setIsMounted] = useState(false);
  const [moveShape, setMoveShape] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMoveShapeLeft = () => {
    setCycleCount((prev) => prev - 1);
  };

  const handleMoveShapeRight = () => {
    setCycleCount((prev) => prev + 1);
  };

  const handleMovePosition = () => {
    setGridOrder((prev) => (prev === "normal" ? "reversed" : "normal"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button
          className={stylesButton.shapeButton}
          onClick={handleMoveShapeLeft}
        >
          <div
            style={{ rotate: "-90deg" }}
            className={`${stylesButton.shape} ${stylesButton.triangle}`}
          />
          <div className={stylesButton.badgeContainer}>
            <Badge count={t("shapes.moveShape")} color="#6eda78" />
          </div>
        </button>
        <button
          className={stylesButton.shapeButton}
          onClick={handleMovePosition}
          style={{
            backgroundColor: "#fff",
            borderColor: "#ffa200",
            position: "relative",
            overflow: "visible",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <div
              style={{ transform: "rotate(180deg)" }}
              className={`${stylesButton.shape} ${stylesButton.triangle}`}
            />

            <div className={`${stylesButton.shape} ${stylesButton.triangle}`} />
          </div>

          <div
            className={stylesButton.badgeContainer}
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translate(-50%, 50%)",
              width: "max-content",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Badge
              count={t("shapes.movePosition")}
              color="#6eda78"
              style={{ borderRadius: "10px" }}
            />
          </div>
        </button>
        <button
          className={stylesButton.shapeButton}
          onClick={handleMoveShapeRight}
        >
          <div
            style={{ rotate: "90deg" }}
            className={`${stylesButton.shape} ${stylesButton.triangle}`}
          />

          <div className={stylesButton.badgeContainer}>
            <Badge count={t("shapes.moveShape")} color="#6eda78" />
          </div>
        </button>
      </div>
      <Divider />
      <ShapeGrid
        rotation={rotation}
        order={gridOrder}
        isMounted={isMounted}
        moveShape={moveShape}
        cycleCount={cycleCount}
      />
    </div>
  );
};

export default ShapesSection;
