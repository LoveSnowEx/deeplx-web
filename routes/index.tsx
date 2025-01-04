import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import LanguageSelectors from "../islands/Translator.tsx";

export default function Home() {
  const count = useSignal(3);
  const sourceLanguage = useSignal("AR");
  const targetLanguage = useSignal("DE");
  const languages = [
    { code: "AR", name: "Arabic" },
    { code: "BG", name: "Bulgarian" },
    { code: "CS", name: "Czech" },
    { code: "DA", name: "Danish" },
    { code: "DE", name: "German" },
    { code: "EL", name: "Greek" },
  ];

  return (
    <div class="my-12 w-full flex-grow bg-[#86efac]">
      <div class="w-full flex">
        <LanguageSelectors
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          languages={languages}
        />
      </div>
    </div>
  );
}
