"use client"
import { Map, MapMarker, MarkerContent } from "@/components/ui/map";
import {useTheme} from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { useCompany } from "@/app/data/useCompany";
import dataCords from "@/app/data/cache/data-cords.json";
export default function Page() {
  const {theme, setTheme} = useTheme();
  const {companies, loading} = useCompany();
  console.log(companies)
  return (
  
    <div className="relative h-screen w-full">
       <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="z-50 top-4 right-4 rounded border p-2
          bg-background/80 backdrop-blur absolute">
        {theme === "dark"
          ? <HugeiconsIcon icon={Sun03Icon} size={22}/>
          : <HugeiconsIcon icon={Moon02Icon} size={22}/>
        }
      </button>
      <Map center={[-74.006, 40.7128]} zoom={12}>
        {!loading && companies?.map((company) => {
          const coords = dataCords[company.all_locations as keyof typeof dataCords];
          return (
            <MapMarker
              key={company.id}
              longitude={coords?.longitude}
              latitude={coords?.latitude}
            >
              <MarkerContent>
                <div className="size-3 rounded-full bg-blue-500"/>
              </MarkerContent>
            </MapMarker>
          );
        })}

      </Map>
    </div>
  )
}
