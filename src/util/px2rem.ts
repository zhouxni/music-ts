const px2rem = (px: number): string => {
  return `${(px / 37.5).toFixed(4)}rem`;
};

export default px2rem;
