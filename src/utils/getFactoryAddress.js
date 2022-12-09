const getFactoryAddress = (chainId) => {
  if (chainId === 5) {
    // Goerli
    return "0xAcE146f6154A08f784273eC754031D9A3a942b4E";
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

export default getFactoryAddress;
