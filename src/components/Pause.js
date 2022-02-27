function pause(s) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export default pause;
