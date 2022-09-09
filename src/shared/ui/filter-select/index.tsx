import {Select} from '@chakra-ui/react'
import React from 'react'

interface FilterSelectProps {
  onChange: any
  value: string
  disabled: boolean
}

export const FilterSelect = ({onChange, value, disabled}: FilterSelectProps) => {
  return (
    <Select maxW={28} size="xs" variant="filled" onChange={onChange} value={value} disabled={disabled}>
      <option value="count">Count</option>
      <option value="rating">Rating</option>
    </Select>
  )
}
