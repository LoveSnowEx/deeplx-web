import Translator from "../islands/Translator.tsx";

export default function Home() {
  const languages = [
    { code: "AR", name: "Arabic" },
    { code: "BG", name: "Bulgarian" },
    { code: "CS", name: "Czech" },
    { code: "DA", name: "Danish" },
    { code: "DE", name: "German" },
    { code: "EL", name: "Greek" },
    { code: "EN-GB", name: "English (British)" },
    { code: "EN-US", name: "English (American)" },
    { code: "ES", name: "Spanish" },
    { code: "ET", name: "Estonian" },
    { code: "FI", name: "Finnish" },
    { code: "FR", name: "French" },
    { code: "HU", name: "Hungarian" },
    { code: "ID", name: "Indonesian" },
    { code: "IT", name: "Italian" },
    { code: "JA", name: "Japanese" },
    { code: "KO", name: "Korean" },
    { code: "LT", name: "Lithuanian" },
    { code: "LV", name: "Latvian" },
    { code: "NB", name: "Norwegian" },
    { code: "NL", name: "Dutch" },
    { code: "PL", name: "Polish" },
    { code: "PT-BR", name: "Portuguese (Brazilian)" },
    { code: "PT-PT", name: "Portuguese (Excluding Brazilian)" },
    { code: "RO", name: "Romanian" },
    { code: "RU", name: "Russian" },
    { code: "SK", name: "Slovak" },
    { code: "SL", name: "Slovenian" },
    { code: "SV", name: "Swedish" },
    { code: "TR", name: "Turkish" },
    { code: "UK", name: "Ukrainian" },
    { code: "ZH-HANS", name: "Chinese (simplified)" },
    { code: "ZH-HANT", name: "Chinese (traditional)" },
  ];

  return (
    <div class="my-12 w-full flex flex-grow">
      <Translator
        languages={languages}
      />
    </div>
  );
}
