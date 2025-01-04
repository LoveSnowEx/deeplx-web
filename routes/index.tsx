import Translator from "../islands/Translator.tsx";

export default function Home() {
  const languages = [
    { code: "EN-US", name: "English (American)" },
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
