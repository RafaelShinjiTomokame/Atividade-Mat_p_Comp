import { useState, useEffect } from 'react'
import { applyContrast } from '../utils/imageProcessor'

interface ContrastControlProps {
  originalImageData: ImageData | null
  onContrastChange: (imageData: ImageData) => void
}

export function ContrastControl({
  originalImageData,
  onContrastChange
}: ContrastControlProps) {
  const [contrast, setContrast] = useState(0)

  useEffect(() => {
    if (!originalImageData) return
    
    const modifiedImage = applyContrast(originalImageData, contrast)
    onContrastChange(modifiedImage)
  }, [contrast, originalImageData, onContrastChange])

  return (
    <div className="contrast-control">
      <label>
        Contraste: {contrast}
        <input
          type="range"
          min="-255"
          max="255"
          value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
        />
      </label>
    </div>
  )
}