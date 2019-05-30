const loadTextFile = (file: File) =>
  new Promise<string>(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.readAsText(file);
  });

export default loadTextFile;
