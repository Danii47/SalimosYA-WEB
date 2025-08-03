export async function createPushpinWithImage(
  imageSrc: string,
  circleSize: number = 100
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.src = imageSrc

    image.onload = () => {
      const totalSize = circleSize + 50
      const canvas = document.createElement("canvas")
      canvas.width = totalSize
      canvas.height = totalSize

      const ctx = canvas.getContext("2d")
      if (!ctx) return reject("It was not possible to get the context.")

      const centerX = totalSize / 2
      const centerY = circleSize / 2 + 10

      const widthFactor = 0.25

      ctx.beginPath()
      ctx.moveTo(centerX - widthFactor * circleSize, circleSize)
      ctx.lineTo(centerX + widthFactor * circleSize, circleSize)
      ctx.lineTo(centerX, totalSize)
      ctx.closePath()
      ctx.fillStyle = "#000"
      ctx.fill()
      ctx.stroke()

      ctx.save()
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleSize / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      ctx.drawImage(
        image,
        centerX - circleSize / 2,
        centerY - circleSize / 2,
        circleSize,
        circleSize
      )

      ctx.restore()

      ctx.beginPath()
      ctx.arc(centerX, centerY, circleSize / 2, 0, Math.PI * 2)
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 3
      ctx.stroke()

      const dataUrl = canvas.toDataURL("image/png")
      resolve(dataUrl)
    }

    image.onerror = () => reject("It was not possible to load the image.")
  })
}
