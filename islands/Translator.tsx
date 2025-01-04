import type { Signal } from "@preact/signals";
import LanguageSelector from "../components/LanguageSelector.tsx";
import TranslationArea from "../components/TranslationArea.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

const TRANSLATION_API_URL = "/api/translate";

interface TranslatorProps {
  sourceLanguage: Signal<string>;
  targetLanguage: Signal<string>;
  sourceText: Signal<string>;
  targetText: Signal<string>;
  languages: { code: string; name: string }[];
}

export default function Translator(
  { sourceLanguage, targetLanguage, sourceText, targetText, languages }:
    TranslatorProps,
) {
  function handleSwapLanguages() {
    [sourceLanguage.value, targetLanguage.value] = [
      targetLanguage.value,
      sourceLanguage.value,
    ];
    [sourceText.value, targetText.value] = [targetText.value, sourceText.value];
  }
  sourceText.subscribe(async () => {
    if (!IS_BROWSER) {
      return;
    }
    if (sourceText.value === "") {
      targetText.value = "";
      return;
    }
    const response = await fetch(TRANSLATION_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "source_lang": sourceLanguage.value,
        "target_lang": targetLanguage.value,
        "text": sourceText.value,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    targetText.value = result.data;
  });
  return (
    <div class="w-full flex flex-col shadow-md">
      <div class="w-full flex flex-row">
        <LanguageSelector
          id="source-language"
          value={sourceLanguage}
          languages={languages}
          props={{ class: "flex-1" }}
        />
        <button
          class="px-2 py-1 w-10 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
          onClick={handleSwapLanguages}
          aria-label="Swap languages"
        >
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background:new 0 0 512 512;"
            xml:space="preserve"
          >
            <g>
              <path d="M358.4,133.1v71.7h-256v46.1L0,169l102.4-87v51.2H358.4 M512,348.2l-102.4,81.9V384h-256v-71.7h256v-51.2L512,348.2" />
            </g>
          </svg>
        </button>
        <LanguageSelector
          id="target-language"
          value={targetLanguage}
          languages={languages}
          props={{ class: "flex-1" }}
        />
      </div>
      <div class="w-full flex flex-grow flex-row">
        <div class="w-full flex flex-row">
          <TranslationArea
            id="source-text"
            value={sourceText}
            placeholder="Enter source text"
            readonly={false}
            rows={10}
            props={{ class: "flex-1" }}
          >
          </TranslationArea>
          <TranslationArea
            id="target-text"
            value={targetText}
            placeholder="Translation will appear here"
            readonly={true}
            rows={10}
            props={{ class: "flex-1" }}
          >
          </TranslationArea>
        </div>
      </div>
    </div>
  );
}
