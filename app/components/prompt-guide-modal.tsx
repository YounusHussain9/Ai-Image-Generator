import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PromptGuideModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-none hover:bg-transparent underline underline-offset-4 text-blue-800 hover:text-blue-900"
        >
          Prompt Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>AI Image Generator - Prompt Guide</DialogTitle>
        </DialogHeader>
        <div>
          <div className="space-y-2">
            <p className="text-sm">
              <strong> ✅ Be Specific: </strong> "A neon-lit cyberpunk city with
              flying cars at night."
            </p>
            <p className="text-sm">
              <strong>❌ Vague:</strong> "A futuristic city."
            </p>
            <p className="text-sm">
              <strong>✅ Use Strong Descriptors:</strong> lighting (cinematic,
              neon), style (digital painting, watercolor), atmosphere (mystical,
              eerie).
            </p>
            <p className="text-sm">
              <strong>✅ Define Subject & Background:</strong> "A knight in
              silver armor, standing in a foggy forest with moonlight shadows.
            </p>
            <p className="text-sm">
              <strong>✅ Use Camera & Art Terms:</strong> close-up, wide-angle,
              macro, bokeh, depth of field.
            </p>
            <p className="text-sm">
              <strong> ✅ Good Prompt: </strong> "A rugged old man with a
              weathered face, wearing a tattered coat, standing in a dimly lit
              alley under a flickering streetlamp."
            </p>
            <p className="text-sm">
              <strong>❌ Poor Prompt:</strong> "A man standing."
            </p>
            <p className="text-sm font-bold">
              {" "}
              🚀 Tip: Start simple & refine based on results!
            </p>{" "}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
