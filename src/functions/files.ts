export const fileToBase64 = (file: Blob): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    if (file instanceof Blob) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onerror = (err) => {
        reject(err)
      }
      reader.onload = () => resolve(reader.result)
    } else {
      reject(new Error('File have to be Blob!'))
    }
  })

export default {
  fileToBase64,
}
