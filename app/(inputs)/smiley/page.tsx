import React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {}

export default function SmileyPage({}: Props) {
  return (
    <div className="flex w-96 flex-col justify-center space-y-4">
      <h1 className="text-balance text-center text-2xl font-bold">
        Enter text that will show on the generated PDF file
      </h1>

      <Input type="text" placeholder="Please enter your text here!" />

      <Button className="mx-auto">Generate PDF</Button>
    </div>
  )
}
