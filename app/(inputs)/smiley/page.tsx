import React from "react"

import { Input } from "@/components/ui/input"

type Props = {}

export default function SmileyPage({}: Props) {
  return (
    <div className="w-96">
      <h1>Enter text that will show on the generated PDF file</h1>

      <Input type="text" placeholder="Please enter your text here!" />
    </div>
  )
}
