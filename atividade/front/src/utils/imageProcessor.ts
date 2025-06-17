export function applyContrast(
  imageData: ImageData,
  contrastFactor: number
): ImageData {
  const data = new Uint8ClampedArray(imageData.data)
  const factor = (259 * (contrastFactor + 255)) / (255 * (259 - contrastFactor))

  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(factor * (data[i] - 128) + 128)     // R
    data[i + 1] = clamp(factor * (data[i + 1] - 128) + 128) // G
    data[i + 2] = clamp(factor * (data[i + 2] - 128) + 128) // B
  }

  return new ImageData(data, imageData.width, imageData.height)
}

function clamp(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)))
}

export async function loadImageData(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }
      
      ctx.drawImage(img, 0, 0)
      resolve(ctx.getImageData(0, 0, img.width, img.height))
      URL.revokeObjectURL(url)
    }
    
    img.onerror = () => {
      reject(new Error('Failed to load image'))
      URL.revokeObjectURL(url)
    }
    
    img.src = url
  })
}