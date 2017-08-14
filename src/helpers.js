export const generateRandomWithSize = (size) => {
  return () => {
    const numCached = Math.floor(Math.random() * Math.pow(10, size))
    return numCached.toString().length === 4 ? numCached : generateRandomWithSize(size)()
  } 
}

export const generateRandomOfFour = generateRandomWithSize(4)