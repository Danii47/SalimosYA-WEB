import { useMap } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import { useEffect } from "react"

export default function RecenterMap({ coords }: { coords: LatLngExpression }) {
  const map = useMap()
  useEffect(() => {
    map.setView(coords)
  }, [coords, map])
  return null
}
