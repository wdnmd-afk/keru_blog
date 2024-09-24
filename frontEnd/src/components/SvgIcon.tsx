import React from "react";

interface SvgIconProps {
  name: string;
  color?: string;
  size?: number;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  color = "black",
  size = 24,
}) => {
  return (
    <svg style={{ fill: color, width: size, height: size }}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default SvgIcon;
