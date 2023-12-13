"use client";

import { Separator } from "@/components/ui/separator";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { PiSignOutFill as LogOutIcon } from "react-icons/pi";
import { RxPerson as InfoIcon } from "react-icons/rx";

const Account = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <main className="flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-10 py-12 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)]">
      <section className="flex w-11/12 flex-col items-center justify-center gap-y-12 md:w-2/4 lg:w-1/3">
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

          {/* Change Picture */}

          <div className="flex w-11/12 items-center justify-center gap-x-6">
            {/* Modal */}

            {/* <Modal isOpen={isModalOpen} onClose={toggleModal}>
              <div className="flex flex-col items-center justify-center gap-y-6">
                <div className="relative h-24 w-24 rounded-full">
                  {photoPreview && (
                    <Image
                      src={photoPreview}
                      alt="Avatar"
                      fill
                      priority
                      sizes="100svh"
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="flex w-full justify-center gap-x-5">
                  <button
                    className="text-black"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Confirm
                  </button>
                  <button onClick={toggleModal}>Delete</button>
                </div>
              </div>
            </Modal> */}

            <div className="relative h-24 w-24 rounded-full">
              <Image
                src={"/assets/profile-picture.svg"}
                alt="Avatar"
                fill
                priority
                sizes="100svh"
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-y-1">
              <form noValidate>
                <label className="cursor-pointer">
                  <p className="whitespace-nowrap text-sm font-semibold">
                    Change photo
                  </p>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    multiple={false}
                    aria-label="Select a photo"
                    onChange={() => {}}
                    className="hidden h-full w-full"
                  />
                </label>
              </form>

              <button
                type="button"
                name="deletePhoto"
                aria-label="Delete Photo"
                onClick={() => {}}
                className="whitespace-nowrap text-sm font-semibold text-red-500"
              >
                Delete photo
              </button>
            </div>
          </div>

          {/* Edit Profile */}

          <div className="flex w-11/12  flex-col items-center gap-y-10 lg:w-3/4">
            <form
              noValidate
              className="flex w-full flex-col items-center justify-center gap-y-5"
            >
              <input
                type="text"
                name="newUsername"
                aria-label="New Username"
                placeholder="New username"
                pattern="^[a-z]+$"
                className="w-full border-2 border-[#88888] bg-transparent p-2 pl-4 placeholder:text-sm placeholder:font-bold focus-within:border-black "
              />

              <button
                type="submit"
                aria-label="Save Changes"
                className="flex w-full items-center justify-center border-2 border-[#88888] bg-transparent p-3 text-xs text-[#88888] transition duration-300 ease-in-out hover:border-black hover:text-black"
              >
                Save changes
              </button>
            </form>
          </div>

          <Separator className="w-1/5" />

          <h3 className="text-sm font-bold">Password</h3>

          {/* <ChangePasswordForm session={JSON.parse(JSON.stringify(session))} /> */}

          {/* Change Password */}

          <div className="flex w-11/12 flex-col items-center  gap-y-10 lg:w-3/4">
            <form
              noValidate
              className="flex w-full flex-col items-center justify-center gap-y-5"
            >
              <input
                type="password"
                name="currentPassword"
                aria-label="Current Password"
                placeholder="Current password"
                pattern="^(?!\s*$).+"
                className="w-full border-2 border-[#88888] bg-transparent p-2 pl-4 placeholder:text-sm placeholder:font-bold focus-within:border-black"
              />

              <input
                type="password"
                name="newPassword"
                aria-label="New Password"
                placeholder="New password"
                pattern="^(?!\s*$).+"
                className="w-full border-2 border-[#88888] bg-transparent p-2 pl-4 placeholder:text-sm placeholder:font-bold focus-within:border-black"
              />

              <input
                type="password"
                name="confirmPassword"
                aria-label="Confirm Password"
                placeholder="Confirm new password"
                pattern="^(?!\s*$).+"
                className="w-full border-2 border-[#88888] bg-transparent p-2 pl-4 placeholder:text-sm placeholder:font-bold focus-within:border-black"
              />

              <button
                type="submit"
                aria-label="Save Changes"
                className="flex w-full items-center justify-center border-2 border-[#88888] bg-transparent p-3 text-xs text-[#88888] transition duration-300 ease-in-out hover:border-black hover:text-black"
              >
                Save changes
              </button>
            </form>
          </div>

          <Separator className="w-1/5" />

          {/* Delete Account */}
          <div className="flex w-11/12 items-center justify-center lg:w-3/4">
            <button
              onClick={onOpen}
              className="flex w-full items-center justify-center bg-red-500 p-3 text-xs font-bold text-white transition duration-300 ease-in-out hover:bg-red-600"
            >
              Delete my account
            </button>

            {/* Modal */}

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="center"
            >
              <ModalContent className="flex flex-col items-center gap-y-4 bg-white">
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Delete my account
                    </ModalHeader>
                    <ModalBody className="flex flex-col gap-y-4">
                      <p className="text-justify text-xs">
                        Do you really want to delete your EXPOSURE account? You
                        will no longer be able to acccess your profile and your
                        photos will be deleted.
                      </p>
                      <p className="text-xs font-semibold">
                        For your security, please re-enter your password:
                      </p>
                    </ModalBody>
                    <ModalFooter className="flex flex-col gap-y-4">
                      <form className="flex w-full flex-col items-center gap-y-3">
                        <input
                          type="password"
                          aria-label="password"
                          id=""
                          className="w-full border-2 border-[#88888] bg-transparent p-2 pl-4 placeholder:text-sm placeholder:font-bold focus-within:border-black"
                        />
                        <Button
                          className="flex w-full items-center justify-center bg-red-500 p-3 text-xs font-bold text-white transition duration-300 ease-in-out hover:bg-red-600"
                          onPress={onClose}
                        >
                          Delete EXPOSURE account
                        </Button>
                      </form>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            {/* <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="flex flex-col items-center gap-y-4">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-sm font-semibold">
              Delete my account
            </h1>
            <button onClick={toggleModal} className="text-lg">
              x
            </button>
          </div>

          <hr className="w-full border-[0.5px] border-[#ccc]" />

          <div className="flex flex-col gap-y-4">
            <p className="text-justify text-xs">
              Do you really want to delete your EXPOSURE account? You will no
              longer be able to acccess your profile and your photos will be
              deleted.
            </p>
            {!session.user.googleProvider && (
              <p className="text-xs font-semibold">
                For your security, please re-enter your password:
              </p>
            )}
          </div>

          <div className="w-full">
            {session.user.googleProvider ? (
              <div className="flex w-full flex-col items-center gap-y-3">
                <button
                  type="button"
                  onClick={handleDeleteAccountGoogle}
                  className="btnDelete text-xs"
                >
                  {isSubmitting ? <Spinner /> : "Delete account"}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(handleDeleteAccount)}
                className="flex w-full flex-col items-center gap-y-3"
              >
                <input
                  {...register("password")}
                  type="password"
                  aria-label="password"
                  id=""
                  className="w-full border-2 border-[#88888] bg-transparent p-2 pl-4 placeholder:text-sm placeholder:font-bold focus-within:border-black"
                />
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="btnDelete text-xs"
                >
                  {isSubmitting ? <Spinner /> : "Delete account"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Modal> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Account;
