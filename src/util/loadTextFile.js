export default file => new Promise(resolve => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    resolve(fileReader.result);
  };
  fileReader.readAsText(file);
})



