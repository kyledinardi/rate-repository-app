const formatNumber = (n) => (n >= 1000 ? `${Math.round(n / 100) / 10}k` : n);
export default formatNumber;
