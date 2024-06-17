import dynamic from "next/dynamic";

const OptionsMenu = dynamic(() => import("@/components/OptionsMenu"));

// https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr
const RenderPreview = dynamic(() => import("@/components/RenderPreview"), {
  ssr: false,
});

type Props = {};

export default function SmileyPage({}: Props) {
  return (
    <div className="flex w-full space-x-8">
      <OptionsMenu />
      <RenderPreview />
    </div>
  );
}
