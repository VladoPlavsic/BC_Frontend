

function toBase64(file) {
 return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve([reader.result, file.name]);
    reader.onerror = reject;
})}

module.exports = {
  toBase64: toBase64
}; 
