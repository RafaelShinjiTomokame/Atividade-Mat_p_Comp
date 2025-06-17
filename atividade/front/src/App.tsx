import { useState } from 'react'
import { ImageUploader } from './components/ImageUploader'
import { ContrastControl } from './components/ContrastControl'

export function App() {
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null)
  const [modifiedImageData, setModifiedImageData] = useState<ImageData | null>(null)

  const handleImageUpload = (imageData: ImageData) => {
    setOriginalImageData(imageData)
    setModifiedImageData(imageData)
  }

  const handleContrastChange = (imageData: ImageData) => {
    setModifiedImageData(imageData)
  }

  const renderCanvas = (imageData: ImageData | null, title: string) => {
    if (!imageData) return <div>Sem image</div>
    
    const canvas = document.createElement('canvas')
    canvas.width = imageData.width
    canvas.height = imageData.height
    const ctx = canvas.getContext('2d')
    ctx?.putImageData(imageData, 0, 0)
    
    return (
      <div className="image-container">
        <h3>{title}</h3>
        <img 
          src={canvas.toDataURL()} 
          alt={title}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Ajuste de contraste de imagem</h1>
      
      <ImageUploader onImageUpload={handleImageUpload} />
      
      {originalImageData && (
        <ContrastControl
          originalImageData={originalImageData}
          onContrastChange={handleContrastChange}
        />
      )}
      
      <div className="image-comparison">
        {renderCanvas(originalImageData, 'Imagem Original')}
        {renderCanvas(modifiedImageData, 'Imagem Modificada')}
      </div>
    </div>
  )
}