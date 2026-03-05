import { GoogleIcon } from "./GoogleLogo";
import { Button } from "./ui/button";

export default function GoogleButton() {
    return (<Button
                type="button"
                variant="outline"
                className="w-full hover:cursor-pointer flex items-center justify-center gap-2 p-5"
              >
                <GoogleIcon />
                Continue with Google
    </Button>);
}