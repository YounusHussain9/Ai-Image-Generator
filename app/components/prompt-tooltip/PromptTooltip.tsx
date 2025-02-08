"use client";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const PromptTooltip = ({
  children,
  prompt,
}: {
  children: React.ReactNode;
  prompt: string;
}) => {
  return (
    <div>
      {" "}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{children}</div>
          </TooltipTrigger>
          <TooltipContent className="w-[340px] text-wrap">
            <p>{prompt}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PromptTooltip;
