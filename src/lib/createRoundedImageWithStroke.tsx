export async function createRoundedImageWithStroke({
  imageUrl,
  diameter = 48,
  strokeColor = "#ffffff",
  strokeWidth = 3
}: {
  imageUrl: string,
  diameter?: number,
  strokeColor?: string,
  strokeWidth?: number
}): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = diameter
      canvas.height = diameter

      const ctx = canvas.getContext("2d")
      if (!ctx) return reject("Not possible to get the canvas context")

      const radius = diameter / 2

      ctx.beginPath()
      ctx.arc(radius, radius, radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      ctx.drawImage(img, 0, 0, diameter, diameter)

      ctx.beginPath()
      ctx.arc(radius, radius, radius, 0, Math.PI * 2)
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = strokeWidth
      ctx.stroke()

      const dataUrl = canvas.toDataURL("image/png")
      resolve(dataUrl)
    }

    img.onerror = () => reject("Not possible to load the image")
    img.src = imageUrl
  })
}
