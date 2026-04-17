"use client";

import React, { useState } from "react";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import ShapeButton from "./ShapeButton";
import styles from "./ShapeGrid.module.scss";

interface ShapeGridProps {
  rotation: number;
  order: "normal" | "reversed";
  isMounted: boolean;
  moveShape: boolean; // Added prop to trigger shape movement
  cycleCount: number; // Number of times to cycle the shapes
}

const ShapeGrid: React.FC<ShapeGridProps> = ({
  rotation,
  order,
  isMounted,
  moveShape,
  cycleCount, // Added prop to cycle shapes
}) => {
  const { t } = useTranslation();
  const [shuffledKeys, setShuffledKeys] = useState<string[] | null>(null);

  let shapes: Array<{
    key: string;
    label: string;
    shape: "circle" | "square" | "triangle" | "oval" | "pentagon" | "hexagon";
  }> = [
    {
      key: "circle",
      label: isMounted ? t("shapes.circle") : "",
      shape: "circle",
    },
    {
      key: "square",
      label: isMounted ? t("shapes.square") : "",
      shape: "square",
    },
    {
      key: "triangle",
      label: isMounted ? t("shapes.triangle") : "",
      shape: "triangle",
    },
    {
      key: "oval",
      label: isMounted ? t("shapes.oval") : "",
      shape: "oval",
    },
    {
      key: "pentagon",
      label: isMounted ? t("shapes.pentagon") : "",
      shape: "pentagon",
    },
    {
      key: "hexagon",
      label: isMounted ? t("shapes.hexagon") : "",
      shape: "hexagon",
    },
  ];

  if (shuffledKeys) {
    const shapeMap = new Map(shapes.map((shape) => [shape.key, shape]));
    const reorderedShapes = shuffledKeys
      .map((key) => shapeMap.get(key))
      .filter((shape): shape is NonNullable<typeof shape> => Boolean(shape));

    if (reorderedShapes.length === shapes.length) {
      shapes = reorderedShapes;
    }
  }

  const normalizedCycleCount =
    ((cycleCount % shapes.length) + shapes.length) % shapes.length;

  if (normalizedCycleCount > 0) {
    if (cycleCount >= 0) {
      shapes = [
        ...shapes.slice(normalizedCycleCount),
        ...shapes.slice(0, normalizedCycleCount),
      ];
    } else {
      shapes = [
        ...shapes.slice(shapes.length - normalizedCycleCount),
        ...shapes.slice(0, shapes.length - normalizedCycleCount),
      ];
    }
  }

  const row1 = shapes.slice(0, 3);
  const row2 = shapes.slice(3, 6);

  const topRow = order === "normal" ? row1 : row2;
  const bottomRow = order === "normal" ? row2 : row1;

  const bottomRowOffset = moveShape ? -20 : 0;

  const handleShapeClick = () => {
    const randomizedShapes = [...shapes];

    for (let i = randomizedShapes.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [randomizedShapes[i], randomizedShapes[randomIndex]] = [
        randomizedShapes[randomIndex],
        randomizedShapes[i],
      ];
    }

    setShuffledKeys(randomizedShapes.map((shape) => shape.key));
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="start">
        {topRow.map((shape) => (
          <Col key={shape.key} xs={8} sm={8} md={8} lg={8}>
            <div
              className={styles.shapeWrapper}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 0.3s ease",
              }}
            >
              <ShapeButton
                // label={shape.label}
                shape={shape.shape}
                onClick={handleShapeClick}
              />
            </div>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]} justify="end" style={{ marginTop: 16 }}>
        {bottomRow.map((shape) => (
          <Col key={shape.key} xs={8} sm={8} md={8} lg={8}>
            <div
              className={styles.shapeWrapper}
              style={{
                transform: `translateX(${bottomRowOffset}px) rotate(${rotation}deg)`,
                transition: "transform 0.3s ease",
              }}
            >
              <ShapeButton
                // label={shape.label}
                shape={shape.shape}
                onClick={handleShapeClick}
              />
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ShapeGrid;
