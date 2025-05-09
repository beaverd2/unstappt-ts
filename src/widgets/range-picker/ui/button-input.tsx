import { forwardRef } from 'react'
import { Button } from '@/components/ui/button'

export const ButtonInput = forwardRef(({ value, onClick }: any, ref: any) => {
  return (
    <Button onClick={onClick} ref={ref} className="w-full" type="button" variant="outline">
      {value}
    </Button>
  )
})

ButtonInput.displayName = 'ButtonInput'
