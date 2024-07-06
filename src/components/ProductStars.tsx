import { EmptyStar, HalfStarIcon, StarIcon } from "@/icons/ProductsIcons"



export const ProductStars = ({ calificacion, cantidadCalificaciones } : { calificacion: number, cantidadCalificaciones: number }) => {
  const roundedRating = Math.round(calificacion * 2) / 2
  
  const fullStars = Math.floor(roundedRating)
  const hasHalfStar = roundedRating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1 px-4">
      <span className="text-gray-700 text-sm pt-0.5 pr-1">{calificacion}</span>
      <span className="flex">
        {Array(fullStars).fill(0).map((_, i) => (
          <StarIcon key={i} />
        ))}
        {hasHalfStar && <HalfStarIcon/>}
        {Array(emptyStars).fill(0).map((_, i) => (
          <EmptyStar key={i}/>
        ))}
      </span>
      <span className="pt-0.5 text-sm text-gray-500">({cantidadCalificaciones})</span>
    </div>
  )
}