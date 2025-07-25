export const formatNumber = (num) => {
  if (num < 1000) {
    return num.toString();
  }
  
  if (num < 1000000) {
    const thousands = num / 1000;
    if (thousands % 1 === 0) {
      return `${thousands}K`;
    }
    return `${thousands.toFixed(1)}K`;
  }
  
  if (num < 1000000000) {
    const millions = num / 1000000;
    if (millions % 1 === 0) {
      return `${millions}M`;
    }
    return `${millions.toFixed(1)}M`;
  }
  
  const billions = num / 1000000000;
  if (billions % 1 === 0) {
    return `${billions}B`;
  }
  return `${billions.toFixed(1)}B`;
};
