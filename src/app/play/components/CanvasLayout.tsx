import { ReactNode } from 'react';

type Props = {
  canvas: ReactNode;
  secondary: ReactNode;
  sidebar: ReactNode;
};

export default function CanvasPageLayout({
  canvas,
  secondary,
  sidebar
}: Props) {
  return (
    <div className="w-screen h-screen bg-[#97c8ff] p-2.5 overflow-hidden">
      <div
        className="
          h-full
          grid
          grid-cols-[1fr_360px]
          grid-rows-[1fr_auto]
          gap-2.5
        "
      >
        {/* MAIN CANVAS */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {canvas}
        </div>

        {/* SIDEBAR (FULL HEIGHT) */}
        <div className="row-span-2 flex flex-col gap-2.5">
          {sidebar}
        </div>

        {/* SECONDARY CANVAS */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-[22vh] min-h-[160px]">
          {secondary}
        </div>
      </div>
    </div>
  );
}
