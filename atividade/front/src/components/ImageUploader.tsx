import { useState, useRef } from 'react'
import { loadImageData } from '../utils/imageProcessor'

interface ImageUploaderProps {
  onImageUpload: (imageData: ImageData) => void
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Criar preview
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    // Processar imagem
    try {
      const imageData = await loadImageData(file)
      onImageUpload(imageData)
    } catch (error) {
      console.error('Error loading image:', error)
      alert('Failed to load image')
    }
  }

  return (
    <div className="uploader-container">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current?.click()}>
        Upload Imagem
      </button>
      {previewUrl && (
        <div className="image-preview">
          <img src={previewUrl} alt="Preview" />
        </div>
      )}
    </div>
  )
}