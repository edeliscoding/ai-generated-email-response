"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy } from "lucide-react";

export default function EmailResponseGenerator() {
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("");
  const [response, setResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  //   const generateResponse = () => {
  //     setIsGenerating(true);
  //     // Simulate AI response generation
  //     setTimeout(() => {
  //       setResponse(`This is a ${tone} response to: "${context}"`);
  //       setIsGenerating(false);
  //     }, 2000);
  //   };

  const generateResponse = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context, tone }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error generating response:", error);
      setError("Failed to generate response. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="container mx-auto p-4 mb-48">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Email Response Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="context">Email Context</Label>
            <Textarea
              id="context"
              placeholder="Paste the email you're responding to here..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="tone">Response Tone</Label>
            <Select onValueChange={setTone}>
              <SelectTrigger id="tone" className="mt-1">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="snarky">Snarky</SelectItem>
                <SelectItem value="witty">Witty</SelectItem>
                <SelectItem value="sarcastic">Sarcastic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={generateResponse}
            disabled={!context || !tone || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Response"
            )}
          </Button>
          {response && (
            <div>
              <Label htmlFor="response">AI Generated Response</Label>
              <Textarea
                id="response"
                value={response}
                readOnly
                className="mt-1"
              />
            </div>
          )}
        </CardContent>
        {response && (
          <CardFooter className="flex justify-between">
            <div>
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => setResponse("")}
              >
                Discard
              </Button>
              <Button
                variant="outline"
                className="mr-2"
                onClick={generateResponse}
              >
                Regenerate
              </Button>
              <Button onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
