import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotFound from "@/app/not-found";
import Account from "./account";

export const metadata: Metadata = {
  title: "EXPOSURE | Account",
  description: "A ficctitional website to post photographies",
};

const AccountPage = async ({
  params,
}: {
  params: { id: string };
}) => {

  const session = await getServerSession(authOptions);

  if (
    !session ||
    JSON.stringify(session.user._id).replace(/^"(.*)"$/, "$1") !== params.id
  ) {
    return <NotFound />;
  }

  const { user } = session;

  return <Account user={JSON.parse(JSON.stringify(user))} />;
};

export default AccountPage;
