"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { LatLngExpression } from "leaflet"
import { useState } from "react"
import ToggleSelector from "@/components/ToggleSelector"
import { createPushpinWithImage } from "@/lib/createPushpinWithImage"

type LocalsType = {
  address: string
  name: string
  pos: LatLngExpression
  avatar: string
}

import L from "leaflet"

const MY_COORDS: LatLngExpression = [40.4168, -3.7038]

const LOCALS: LocalsType[] = [
  { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "Shoko Madrid", pos: [40.4168, -3.7038], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401692095521099816/42782377_2177276065880462_2480425505581432832_n.jpg?ex=689132fd&is=688fe17d&hm=f0010de11d76ebe509e609b2a429f628a1394deb1a96fb557ca47b00030b18ee&=&format=webp" },
  { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "Razzmatazz", pos: [40.4168, -3.7048], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401695579603730573/475188156_1396627395120639_8702148795932096688_n.jpg?ex=6891363c&is=688fe4bc&hm=596c26dc3c242a587220c786d0c415da5b59679213d44f17a31dd9d66eace2ce&=&format=webp" },
  { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "Occo Club", pos: [40.4178, -3.7038], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401704946650316920/482449353_2010945336083565_9171959327985736811_n.jpg?ex=68913ef5&is=688fed75&hm=8c746f66f429b151a86b0a4acb29dbaae05eeb6a37c06cad261b6ac6ffa3f699&=&format=webp&width=165&height=165" },
  { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "Rosé THE CLUB", pos: [40.4178, -3.7048], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401705051046543421/459486322_739101345009792_8827784081967403956_n.jpg?ex=68913f0e&is=688fed8e&hm=d14bd5cc4c2d97ef577e0632f0b35cef26e3f16d14dae4263058730b0f46e542&=&format=webp&width=165&height=165" },
  { address: "C/ Toledo, 86, Madrid, Spain 28005", name: "WOLF BARCELONA", pos: [40.4178, -3.7058], avatar: "https://media.discordapp.net/attachments/952540649322860584/1401706078973984879/325829368_100504782944058_4590624841775239610_n.jpg?ex=68914003&is=688fee83&hm=3d2bec685194f4df798303519adf9921b7410242e8a2d90e31607561d644f1a3&=&format=webp&width=165&height=165" }
]

const OPTIONS: [string, string] = ["Calles", "Satélite"]

export default function MapView() {
  const [map, setMap] = useState(true)
  
  

  return (
    <>
      <ToggleSelector options={OPTIONS} selected={map} setSelected={setMap} tailwindStyles="bg-red-500" />
      <MapContainer center={MY_COORDS} zoom={15} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url={
            map
              ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          }

          attribution="&copy; <a href='https://carto.com/'>CARTO</a>"
        />
        {
          LOCALS.map(async (local, index) => {
            const customIcon = new L.Icon({
              iconUrl: await createPushpinWithImage(local.avatar),
              iconSize: [48, 48],
              iconAnchor: [24, 48],
              popupAnchor: [0, -46],
            })

            return (
              <Marker key={index} position={local.pos} icon={customIcon}>
                <Popup className="custom-popup">
                  <div className="text-gray-800 font-semibold">
                    {local.name}
                  </div>
                  <div className="text-sm text-gray-600 italic">
                    {local.address}
                  </div>
                </Popup>
              </Marker>
            )
          })
        }
      </MapContainer>
    </>
  )
}