"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { LatLngExpression } from "leaflet"
import { useState, useEffect } from "react"
import ToggleSelector from "@/components/ToggleSelector"
import { createPushpinWithImage } from "@/lib/createPushpinWithImage"
import { createRoundedImageWithStroke } from "@/lib/createRoundedImageWithStroke"
import L from "leaflet"
import { useUserLocation } from "@/hooks/useUserLocation"
import RecenterMap from "./RecenterMap"

type LocalsType = {
  address: string
  name: string
  pos: LatLngExpression
  avatar: string
}

const MY_COORDS: LatLngExpression = [40.4168, -3.7038]

const LOCALS: LocalsType[] = [
  { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "Shoko Madrid", pos: [40.4168, -3.7038], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401705051046543421/459486322_739101345009792_8827784081967403956_n.jpg?ex=68948ace&is=6893394e&hm=94dd5a14c879bf9b354696571ad7a582215907496a55246bf30842e4861cbd65&=&format=webp&width=165&height=165" },
  { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "Razzmatazz", pos: [40.4168, -3.7048], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401706078973984879/325829368_100504782944058_4590624841775239610_n.jpg?ex=68948bc3&is=68933a43&hm=12699ae321a29793af1a142c68e6cbfabfb0ab0530cb3ca50ca4856f1f3dc651&=&format=webp&width=165&height=165" },
  // { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "Black Pearl", pos: [40.4168, -3.7058], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401704946650316920/482449353_2010945336083565_9171959327985736811_n.jpg?ex=6891e7b5&is=68909635&hm=f2c698b67848fdfd2867eebbd6f637be2587e8dc9138d31e667a2cf5825ddbb5&=&format=webp&width=165&height=165"},
  // { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "Occo Club", pos: [40.4178, -3.7038], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401705051046543421/459486322_739101345009792_8827784081967403956_n.jpg?ex=6891e7ce&is=6890964e&hm=0721c24286ffd10f6acd3142d6cd8904da68ed63a8eddd01be7dde49d5a18aad&=&format=webp&width=165&height=165"},
  // { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "Rosé THE CLUB", pos: [40.4178, -3.7048], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401706078973984879/325829368_100504782944058_4590624841775239610_n.jpg?ex=6891e8c3&is=68909743&hm=397f01ed13b12369aa335b093bc9b69c579279fc781ec1042ceb2928b951bdbc&=&format=webp&width=165&height=165"},
  // { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "WOLF BARCELONA", pos: [40.4178, -3.7058], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401713617526722620/367837302_237908545886403_4279345283884018322_n.jpg?ex=6891efc8&is=68909e48&hm=66d00ad355962d886bcbad31b2694b034a50361a83492523b476c238ed091243&=&format=webp&width=165&height=165 " }
]

const OPTIONS: [string, string] = ["Calles", "Satélite"]

type CustomIcons = {
  userIcon?: L.Icon,
  localsIcons: L.Icon[]
}

export default function MapView({ username }: { username?: string }) {
  const [map, setMap] = useState(true)
  const [customIcons, setCustomIcons] = useState<CustomIcons>({
    userIcon: undefined,
    localsIcons: []
  })
  const { location } = useUserLocation()
  const [coords, setCoords] = useState<LatLngExpression>(MY_COORDS)

  useEffect(() => {
    const createIcons = async () => {
      const userIcon = new L.Icon({
        iconUrl: await createRoundedImageWithStroke({
          imageUrl: "https://media.discordapp.net/attachments/665599910476775467/1400500617734258841/image.png?ex=689f5257&is=689e00d7&hm=f3385e5f4d03ea649fa766029ed174258961ca9c3029412fc20a7220d3848bf9&=&format=webp&quality=lossless",
          diameter: 64,
          strokeWidth: 6,
          strokeColor: "#f00",
        }),
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
      })

      const icons = await Promise.all(
        LOCALS.map(async (local) => {
          const iconUrl = await createPushpinWithImage(local.avatar)
          return new L.Icon({
            iconUrl,
            iconSize: [48, 48],
            iconAnchor: [24, 48],
            popupAnchor: [0, -46],
          })
        })
      )
      setCustomIcons({
        userIcon,
        localsIcons: icons
      })
    }

    createIcons()
  }, [])

  useEffect(() => {
    if (location) {
      setCoords([location.latitude, location.longitude])
      console.log("Location updated:", location)
    }
  }, [location])

  return (
    <>
      <ToggleSelector options={OPTIONS} selected={map} setSelected={setMap} tailwindStyles="bg-red-500" />

      <MapContainer
        center={coords}
        zoom={15}
        style={{ height: "100vh", width: "100%" }}
      >
        <RecenterMap coords={coords} />
        <TileLayer
          url={
            map
              ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          }
          attribution="&copy; <a href='https://carto.com/'>CARTO</a>"
        />
        {
          location && customIcons.userIcon && (
            <Marker position={[location.latitude, location.longitude]} icon={customIcons.userIcon}>
              <Popup>
                <span className="text-gray-800 font-semibold font-poppins">@{username} (You)</span>
              </Popup>
            </Marker>
          )
        }
        {LOCALS.map((local, index) => {
          if (!customIcons.localsIcons[index]) return null
          return (
            <Marker key={index} position={local.pos} icon={customIcons.localsIcons[index]}>
              <Popup>
                <div className="text-gray-800 font-semibold font-poppins">
                  {local.name}
                </div>
                <div className="text-sm text-gray-600 italic font-poppins">
                  {local.address}
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </>
  )
}