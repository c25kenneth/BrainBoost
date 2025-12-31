import Image from "next/image";

export default function GoogleSignInButton() {
  return (
    <button
      className="
        flex items-center justify-center gap-3
        w-full
        rounded-lg border border-gray-300
        bg-white px-4 py-3
        text-sm font-medium text-gray-700
        shadow-sm
        hover:bg-gray-50
        hover:cursor-pointer
        transition
      "
    >
      <Image
        src="/google-logo.svg"
        alt="Google logo"
        width={20}
        height={20}
      />
      Continue with Google
    </button>
  );
}
