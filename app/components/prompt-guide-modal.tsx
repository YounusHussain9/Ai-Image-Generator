import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
              <strong> ✅ Be Specific: </strong> &quot;A neon-lit cyberpunk city
              with flying cars at night.&quot;
            </p>
            <p className="text-sm">
              <strong>❌ Vague:</strong> &quot;A futuristic city.&quot;
            </p>
            <p className="text-sm">
              <strong>✅ Use Strong Descriptors:</strong> lighting (cinematic,
              neon), style (digital painting, watercolor), atmosphere (mystical,
              eerie).
            </p>
            <p className="text-sm">
              <strong>✅ Define Subject & Background:</strong> &quot;A knight in
              silver armor, standing in a foggy forest with moonlight
              shadows.&quot;
            </p>
            <p className="text-sm">
              <strong>✅ Use Camera & Art Terms:</strong> close-up, wide-angle,
              macro, bokeh, depth of field.
            </p>
            <p className="text-sm">
              <strong> ✅ Good Prompt: </strong> &quot;A rugged old man with a
              weathered face, wearing a tattered coat, standing in a dimly lit
              alley under a flickering streetlamp.&quot;
            </p>
            <p className="text-sm">
              <strong>❌ Poor Prompt:</strong> &quot;A man standing.&quot;
            </p>
            <p className="text-sm font-bold">
              🚀 Tip: Start simple &amp; refine based on results!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
