import type { Signal } from "@preact/signals";
import LanguageSelector from "../components/LanguageSelector.tsx";

interface LanguageSelectorsProps {
  sourceLabel?: string;
  targetLabel?: string;
  sourceLanguage: Signal<string>;
  targetLanguage: Signal<string>;
  languages: { code: string; name: string }[];
}

export default function LanguageSelectors(
  { sourceLabel, targetLabel, sourceLanguage, targetLanguage, languages }:
    LanguageSelectorsProps,
) {
  function handleSwapLanguages() {
    [sourceLanguage.value, targetLanguage.value] = [
      targetLanguage.value,
      sourceLanguage.value,
    ];
  }
  return (
    <>
      <LanguageSelector
        id="source-language"
        label={sourceLabel}
        value={sourceLanguage}
        languages={languages}
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
        label={targetLabel}
        value={targetLanguage}
        languages={languages}
      />
    </>
  );
}
