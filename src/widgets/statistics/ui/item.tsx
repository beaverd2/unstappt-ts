type Props = {
  label: string
  count: number
}

export const Item = ({ label, count }: Props) => {
  return (
    <div className="flex basis-2/5 flex-col items-center rounded-md bg-white p-2 text-center shadow-md">
      <p className="text-lg">{label}</p>
      <p className="text-lg font-semibold">{count}</p>
    </div>
  )
}
