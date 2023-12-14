"use client";

import { signOut } from "next-auth/react";
import { PiSignOutFill as LogOutIcon } from "react-icons/pi";
import { RxPerson as InfoIcon } from "react-icons/rx";

import Container from "@/components/container";
import ChangePasswordForm from "@/components/forms/change-password-form";
import ChangePictureForm from "@/components/forms/change-picture-form";
import DeleteAccountForm from "@/components/forms/delete-account-form";
import NewUsernameForm from "@/components/forms/new-username-form";
import { Separator } from "@/components/ui/separator";
import { UserType } from "@/types";

type AccountProps = {
  user: UserType;
};

const Account: React.FC<AccountProps> = ({ user }) => {
  return (
    <Container>
      <div className="flex w-11/12 flex-col items-center justify-center gap-y-12 md:w-1/4 2xl:w-1/5">
        {/* Account Top */}
        <div className="flex w-full">
          <div className="flex flex-1 flex-col items-center gap-y-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
              <InfoIcon className="text-2xl text-white" />
            </span>
            <p className="text-xs font-bold">My Info</p>
          </div>

          {/* <SignOutBtn /> */}
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/log-in" })}
            className="flex flex-1 flex-col items-center gap-y-2"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
              <LogOutIcon className="cursor-pointer text-2xl text-white" />
            </span>
            <p className="cursor-pointer text-xs font-bold">Sign Out</p>
          </button>
        </div>

        {/* Account Bottom */}
        <div className="flex w-full flex-col items-center justify-center gap-y-7">
          
          <Separator className="w-1/5" />

          <h3 className="text-sm font-bold">Profile</h3>

          <ChangePictureForm user={user} />

          <NewUsernameForm user={user} />

          <Separator className="w-1/5" />

          <h3 className="text-sm font-bold">Password</h3>

          <ChangePasswordForm user={user} />

          <Separator className="w-1/5" />

          <DeleteAccountForm user={user} />
        </div>
      </div>
    </Container>
  );
};

export default Account;
