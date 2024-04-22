export const processVolume = (property, propertyName) => {
    const result = [];
  
    if (property) {
      const volume = parseInt(property, 16);
      result.push({ property: propertyName, value: `${volume}` });
    } else {
      result.push({ property: propertyName, value: '不明' });
    }
  
    return result;
  };