"use client"
import { Map } from "@/components/ui/map";
import {useTheme} from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { useCompany } from "@/app/data/useCompany";
export default function Page() {
  const {theme, setTheme} = useTheme();

  return (
  
    <div className="relative h-screen w-full">
       <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="z-50 top-4 right-4 rounded border p-2
          bg-background/80 backdrop-blur absolute">
        {theme === "dark"
          ? <HugeiconsIcon icon={Sun03Icon} size={22}/>
          : <HugeiconsIcon icon={Moon02Icon} size={22}/>
        }
      </button>
      <Map center={[-74.006, 40.7128]} zoom={12}></Map>
    </div>
  )
}
