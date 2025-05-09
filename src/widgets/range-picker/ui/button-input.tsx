import { forwardRef } from 'react'

import { Button } from '@/shared/ui/button'

export const ButtonInput = forwardRef(({ value, onClick }: any, ref: any) => {
  return (
    <Button onClick={onClick} ref={ref} className="w-full" type="button">
      {value && <p className="text-gray-900">{value}</p>}
    </Button>
  )
})

ButtonInput.displayName = 'ButtonInput'
