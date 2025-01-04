import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="flex flex-col min-h-dvh bg-gray-100">
      <div class="flex-1 flex flex-col justify-center items-center w-full max-w-screen-xl mx-auto">
        <Component />
      </div>
    </div>
  );
}
