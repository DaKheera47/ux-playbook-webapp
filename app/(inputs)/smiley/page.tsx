"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {}

export default function SmileyPage({}: Props) {
  const [inputText, setInputText] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleGeneratePDF = () => {
    fetch("/api/pdf-gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        setImageUrl(url)
      })
  }

  return (
    <div className="flex w-96 flex-col justify-center space-y-4">
      <h1 className="text-balance text-center text-2xl font-bold">
        Enter text that will show on the generated PDF file
      </h1>

      <Input
        type="text"
        placeholder="Please enter your text here!"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <Button className="mx-auto" onClick={handleGeneratePDF}>
        Generate PDF
      </Button>

      {imageUrl && <img src={imageUrl} alt="Generated PDF" className="mt-4" />}
    </div>
  )
}
