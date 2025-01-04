import { useSignal } from "@preact/signals";
import Translator from "../islands/Translator.tsx";

export default function Home() {
  const sourceLanguage = useSignal("AR");
  const targetLanguage = useSignal("DE");
  const sourceText = useSignal("");
  const targetText = useSignal("");
  const languages = [
    { code: "AR", name: "Arabic" },
    { code: "BG", name: "Bulgarian" },
    { code: "CS", name: "Czech" },
    { code: "DA", name: "Danish" },
    { code: "DE", name: "German" },
    { code: "EL", name: "Greek" },
  ];

  return (
    <div class="my-12 w-full flex flex-grow">
      <Translator
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        sourceText={sourceText}
        targetText={targetText}
        languages={languages}
      />
    </div>
  );
}
