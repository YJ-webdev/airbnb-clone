import React, { useState, useEffect } from "react";

interface ProgressProps {
  value: number;
}

export const ProgressBar = ({ value }: ProgressProps) => {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${value}%` }} />
    </div>
  );
};
