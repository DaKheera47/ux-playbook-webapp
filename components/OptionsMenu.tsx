"use client";

import {
  $isLandscape,
  $numberOfUsers,
  $ratingType,
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
  const ratingType = useStore($ratingType);
  const showIntroduction = useStore($showIntroduction);

  return (
    <div className="flex min-h-screen w-2/5 flex-col justify-center space-y-4 overflow-y-scroll px-2">
      <QuestionPreview type="base" />

      <div>
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

      <div>
        <Label htmlFor="rating-type">Rating Type</Label>

        <Select
          value={ratingType}
          onValueChange={(value) => $ratingType.set(value as IRatingType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Rating Type" />
          </SelectTrigger>

          <SelectContent id="rating-type">
            <SelectItem value="words">Words</SelectItem>
            <SelectItem value="smilies">Smiley-o-Meter</SelectItem>
            <SelectItem value="thumbs">Thumbs Ups</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div
          onClick={() => $isLandscape.set(!isLandscape)}
          className="flex w-full items-center justify-between hover:cursor-pointer"
        >
          <Label htmlFor="landscape">Landscape</Label>
          <Switch checked={isLandscape} id="landscape" />
        </div>

        <div className="space-y-4">
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
