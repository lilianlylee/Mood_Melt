import { useState } from "react";
import { Shield, X, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg rounded-full w-12 h-12 p-0"
        aria-label="Need help?"
      >
        <Shield className="w-5 h-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <DialogHeader>
            <DialogTitle className="text-2xl text-purple-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600" />
              You're Not Alone 💜
            </DialogTitle>
            <DialogDescription className="text-purple-700">
              It's okay to ask for help. You're brave for reaching out.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-purple-800">
              Here are some ways to connect with someone who cares:
            </p>

            <div className="space-y-3">
              <div className="bg-white/60 backdrop-blur p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Crisis Support
                </h3>
                <p className="text-sm text-purple-800 mb-2">
                  <strong>Crisis Text Line:</strong> Text HOME to 741741
                </p>
                <p className="text-sm text-purple-800">
                  <strong>National Suicide Prevention:</strong> 988
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Reach Out to Someone You Trust
                </h3>
                <p className="text-sm text-purple-800">
                  Talk to a parent, teacher, school counselor, or trusted adult. They want to help you.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border border-purple-300">
              <p className="text-sm text-purple-900 text-center font-medium">
                ✨ Your feelings are valid. You matter. Things can get better. ✨
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="w-full border-purple-300 hover:bg-purple-100"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
