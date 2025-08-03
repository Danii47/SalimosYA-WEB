import { useLayoutEffect, useRef, useState } from "react"

type ToggleSelectorProps = {
  options: [string, string]
  selected: boolean
  setSelected: (value: boolean) => void
  tailwindStyles?: string
}

export default function ToggleSelector({ options, selected, setSelected, tailwindStyles }: ToggleSelectorProps) {
  const button1Ref = useRef<HTMLButtonElement>(null)
  const button2Ref = useRef<HTMLButtonElement>(null)
  const [bgStyle, setBgStyle] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const btn = selected ? button1Ref.current : button2Ref.current
    if (btn) {
      const { offsetLeft, offsetWidth } = btn
      setBgStyle({ left: offsetLeft, width: offsetWidth })
    }
  }, [selected])

  return (
    <div className="relative inline-flex text-xs font-medium text-white">
      <div
        className={`absolute top-1 bottom-1 z-[-1] bg-gray-500 transition-all duration-200
          ${selected ? "rounded-l-lg clip-diagonal-right" : "rounded-r-lg clip-diagonal-left"}
          ${tailwindStyles}
        `}
        style={{
          left: `${bgStyle.left - ((selected) ? 0 : bgStyle.left * .05)}px`,
          width: `${bgStyle.width + ((selected) ? bgStyle.width * .05 : bgStyle.width * .05)}px`
        }}
      />
      <button
        ref={button1Ref}
        onClick={() => setSelected(true)}
        className="px-2 py-2"
      >
        {options[0]}
      </button>
      <button
        ref={button2Ref}
        onClick={() => setSelected(false)}
        className="px-2 py-2"
      >
        {options[1]}
      </button>
    </div>
  )
}