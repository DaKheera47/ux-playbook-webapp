"use client";

import {
  $baseQuestions,
  $isLandscape,
  $numberOfUsers,
  $randomizeAlgorithm,
  $randomizeQuestions,
  $showIntroduction,
} from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import GeneratePDFSet from "./GeneratePDFSet";
import QuestionPreview from "./QuestionPreview";

type Props = {};

export default function OptionsMenu({}: Props) {
  const isLandscape = useStore($isLandscape);
  const numberOfUsers = useStore($numberOfUsers);
  const showIntroduction = useStore($showIntroduction);
  const randomizeQuestions = useStore($randomizeQuestions);
  const randomizeAlgorithm = useStore($randomizeAlgorithm);

  return (
    <div className="flex min-h-screen w-2/5 flex-col space-y-4 overflow-y-scroll px-4 py-12">
      <div className="space-y-2 rounded border bg-gray-50 p-4">
        <QuestionPreview type="base" />
      </div>

      <div className="space-y-2 rounded border bg-gray-50 p-4">
        <Label htmlFor="users">Number of users</Label>

        <Input
          type="number"
          id="users"
          required
          placeholder="Number of users"
          value={numberOfUsers}
          min={1}
          onChange={(e) => $numberOfUsers.set(e.target.valueAsNumber)}
        />
      </div>

      <div className="space-y-4">
        <div
          onClick={() => $isLandscape.set(!isLandscape)}
          className="flex w-full items-center justify-between rounded border bg-gray-50 p-4 hover:cursor-pointer"
        >
          <Label htmlFor="landscape">Landscape</Label>
          <Switch checked={isLandscape} id="landscape" />
        </div>

        <div className="space-y-4 rounded border bg-gray-50 p-4">
          <div
            onClick={() => $randomizeQuestions.set(!randomizeQuestions)}
            className="flex w-full items-center justify-between hover:cursor-pointer"
          >
            <Label htmlFor="randomize-questions">
              Randomize Questions in PDF Set
            </Label>
            <Switch checked={randomizeQuestions} id="randomize-questions" />
          </div>

          {randomizeQuestions && (
            <div className="space-y-1">
              <Label htmlFor="randomize-algorithm">
                Randomization Algorithm
              </Label>

              <Select
                onValueChange={(value) =>
                  $randomizeAlgorithm.set(value as IRandomizeAlgorithm)
                }
                value={randomizeAlgorithm}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Randomization Algorithm" />
                </SelectTrigger>

                <SelectContent id="randomize-algorithm">
                  <SelectItem value="linear-down">Linear Shift</SelectItem>
                  <SelectItem value="random">Completely Randomized</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-4 rounded border bg-gray-50 p-4">
          <div
            onClick={() => $showIntroduction.set(!showIntroduction)}
            className="flex w-full items-center justify-between hover:cursor-pointer"
          >
            <Label htmlFor="show-introduction">Show Introduction</Label>
            <Switch checked={showIntroduction} id="show-introduction" />
          </div>

          {showIntroduction && <QuestionPreview type="introduction" />}
        </div>
      </div>

      <GeneratePDFSet />
    </div>
  );
}
