const calculateBottom = (FABOpen, FABNum) =>
  (FABOpen * (92 + (FABNum * 50))) + (!FABOpen * 32);

export default calculateBottom;
