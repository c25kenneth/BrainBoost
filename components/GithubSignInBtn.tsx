import Image from "next/image";

export default function GitHubSignInButton() {
  return (
    <button
      className="
        flex items-center justify-center gap-3
        w-full
        rounded-lg
        bg-zinc-900 px-4 py-3
        text-sm font-medium text-white
        shadow-sm
        hover:bg-zinc-800
        transition
        hover:cursor-pointer
      "
    >
      <Image
        src="/github-logo.svg"
        alt="GitHub logo"
        width={20}
        height={20}
      />
      Continue with GitHub
    </button>
  );
}
