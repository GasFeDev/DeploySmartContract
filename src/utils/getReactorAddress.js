const getReactorAddress = (chainId) => {
  if (chainId === 5) {
    // Goerli
    return "0x69d20b5E52C9Fa9df554eD1092abE9A7e7376eb7";
  }
  if (chainId === 137) {
    // Polygon
    return "";
  }
  if (chainId === 80001) {
    // Polygon Mumbai
      return ""
    //return "";
  }  
  return "0x000000000000000000000000000000000000dEaD";  
  
};

export default getReactorAddress;
