import CryptoJS from 'crypto-js'

export const encryptByDES = (ciphertext, key) => {
  console.log(CryptoJS.enc.Base64.parse(ciphertext));
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse(ciphertext), keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
