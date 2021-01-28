
// Following two methods are created to convert data response to image source
// https://stackoverflow.com/questions/59430269/how-to-convert-buffer-object-to-image-in-javascript
export const  toBase64 = (arr) => {
  return btoa(
    arr.reduce(
      (data, byte) => data + String.fromCharCode(byte), ''
    )
  );
}
export const uint8ArrayToImageSource = (data) => {
  return `data:image/jpeg;base64,${toBase64(data)}`
}