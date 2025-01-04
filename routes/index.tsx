import { useSignal } from "@preact/signals";
import Translator from "../islands/Translator.tsx";

export default function Home() {
  const sourceLanguage = useSignal("EN-US");
  const targetLanguage = useSignal("ZH-HANT");
  const sourceText = useSignal("");
  const targetText = useSignal("");
  const languages = [
    { code: "EN-US", name: "English (American)" },
    { code: "ZH-HANT", name: "Chinese (traditional)" },
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
