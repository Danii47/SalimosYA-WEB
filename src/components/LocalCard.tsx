// const localData = {
//   name: "Local Name",
//   description: "This is a description of the local.",
//*   address: "123 Local St, City, Country",
//*   rate: 4.5,
//*   distance: "501m",
//*   banner: "https://b3h9h6w4.delivery.rocketcdn.me/wp-content/uploads/2022/01/header-1.jpg",
//*   avatar: "https://media.discordapp.net/attachments/952540649322860584/1401705051046543421/459486322_739101345009792_8827784081967403956_n.jpg?ex=6891e7ce&is=6890964e&hm=0721c24286ffd10f6acd3142d6cd8904da68ed63a8eddd01be7dde49d5a18aad&=&format=webp&width=165&height=165",
//   time: "22:00 - 05:30",
// }
import Image from "next/image"
import { FaRegHeart } from "react-icons/fa6"
// TODO: boton que cambie al darle click (me apunto / cancelar)
// TODO: boton favorito (me gusta)

type Local = {
  name: string;
  address: string;
  rate: number;
  distance: string;
  banner: string;
  avatar: string;
  time: string;
  assistants: number;
  price: string;
  minAge: number;
  dressCode: string;
}

export default function LocalCard({ local }: { local: Local }) {
  return (
    <div className="flex flex-col items-center justify-center mt-10">

      <div className="bg-[#131313] rounded-lg shadow-md md:w-[60%] w-[95%]">
        <div
          className="relative flex flex-col items-left gap-3 rounded-t-lg p-3 bg-black/50 bg-blend-multiply"
          style={{
            backgroundImage: `url(${local.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex gap-2">
            <p className="text-sm rounded-2xl bg-red-500 w-fit px-2 py-0.5 [text-shadow:1px_1px_5px_#0009]">{local.assistants} apuntados</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={local.avatar}
              alt="Avatar"
              width={45}
              height={45}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold leading-none">{local.name}</h3>
              <p className="text-xs italic">{local.address}</p>
            </div>
          </div>
          <span className="absolute right-4 top-4 transition transform hover:-translate-y-0.5 will-change-transform backface-hidden duration-200">
            <FaRegHeart />
          </span>
          <p className="absolute rounded-2xl bottom-2 right-2 bg-red-500 px-2 py-0.5 [text-shadow:1px_1px_5px_#0009]">+{local.minAge}</p>
        </div>
        <div className="p-3">
          
          <p>{local.time}</p>
          <p>{local.dressCode}</p>
        </div>
        <div className="relative flex p-3 gap-2">
          <p>⭐ {local.rate}</p>
          <p className="text-[rgba(255,255,255,0.35)]">|</p>
          <p>{local.distance}</p>
          <div className="absolute right-3 bottom-3 flex flex-col gap-1">
            <p className="text-right">{local.price} €</p>
            <button className=" bg-red-500 rounded-md px-2 py-1 shadow-lg transition transform hover:-translate-y-0.5 will-change-transform backface-hidden duration-200 [text-shadow:1px_1px_5px_#0009]">Me apunto!</button>
          </div>
        </div>
      </div>
    </div>
  )
}