import { type Signal, useSignal } from "@preact/signals";
import LanguageSelector from "../components/LanguageSelector.tsx";
import TranslationArea from "../components/TranslationArea.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { debounce } from "https://deno.land/x/debounce@v0.0.7/mod.ts";
import { Cache } from "https://deno.land/x/local_cache@1.0/mod.ts";

const TRANSLATION_API_URL = "/api/translate";
const cache = new Cache<string, string>(1000 * 60 * 60 * 24);

interface TranslatorProps {
  defaultSourceLanguage?: string;
  defaultTargetLanguage?: string;
  defaultSourceText?: string;
  defaultTargetText?: string;
  languages: { code: string; name: string }[];
}

class TranslationState {
  sourceLanguage: Signal<string>;
  targetLanguage: Signal<string>;
  sourceText: Signal<string>;
  targetText: Signal<string>;

  constructor(
    sourceLanguage?: string,
    targetLanguage?: string,
    sourceText?: string,
    targetText?: string,
  ) {
    this.sourceLanguage = useSignal(
      localStorage.getItem("sourceLanguage") || sourceLanguage || "EN-US",
    );
    this.targetLanguage = useSignal(
      localStorage.getItem("targetLanguage") || targetLanguage || "ZH-HANT",
    );
    this.sourceText = useSignal(
      localStorage.getItem("sourceText") || sourceText || "",
    );
    this.targetText = useSignal(
      localStorage.getItem("targetText") || targetText || "",
    );
  }

  swapLanguages() {
    [this.sourceLanguage.value, this.targetLanguage.value] = [
      this.targetLanguage.value,
      this.sourceLanguage.value,
    ];
    [this.sourceText.value, this.targetText.value] = [
      this.targetText.value,
      this.sourceText.value,
    ];
  }

  saveLocalStorage() {
    localStorage.setItem("sourceLanguage", this.sourceLanguage.value);
    localStorage.setItem("targetLanguage", this.targetLanguage.value);
    localStorage.setItem("sourceText", this.sourceText.value);
    localStorage.setItem("targetText", this.targetText.value);
  }
}

export default function Translator(
  {
    defaultSourceLanguage,
    defaultTargetLanguage,
    defaultSourceText,
    defaultTargetText,
    languages,
  }: TranslatorProps,
) {
  if (!IS_BROWSER) return <div></div>;
  const translationState = new TranslationState(
    defaultSourceLanguage,
    defaultTargetLanguage,
    defaultSourceText,
    defaultTargetText,
  );
  function handleSwapLanguages() {
    translationState.swapLanguages();
  }
  const translate = debounce(async () => {
    if (translationState.sourceText.value === "") {
      translationState.targetText.value = "";
      translationState.saveLocalStorage();
      return;
    }
    const body = JSON.stringify({
      "source_lang": translationState.sourceLanguage.value,
      "target_lang": translationState.targetLanguage.value,
      "text": translationState.sourceText.value,
    });
    if (cache.has(body)) {
      translationState.targetText.value = cache.get(body);
      translationState.saveLocalStorage();
      return;
    }
    const response = await fetch(TRANSLATION_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    translationState.targetText.value = result.data;
    translationState.saveLocalStorage();
    cache.set(body, result.data);
  }, 500);

  translationState.sourceText.subscribe(() => {
    translate();
  });
  return (
    <div class="w-full flex flex-col shadow-md">
      <div class="w-full flex flex-row">
        <LanguageSelector
          id="source-language"
          value={translationState.sourceLanguage}
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
          value={translationState.targetLanguage}
          languages={languages}
          props={{ class: "flex-1" }}
        />
      </div>
      <div class="w-full flex flex-grow flex-row">
        <div class="w-full flex flex-row">
          <TranslationArea
            id="source-text"
            value={translationState.sourceText}
            placeholder="Enter source text"
            readonly={false}
            rows={10}
            props={{ class: "flex-1" }}
          >
          </TranslationArea>
          <TranslationArea
            id="target-text"
            value={translationState.targetText}
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
