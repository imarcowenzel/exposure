import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotFound from "@/app/not-found";
import Account from "./account";

export const metadata: Metadata = {
  title: "EXPOSURE | Profile",
  description: "A ficctitional website to post photographies",
};

type AccountPageProps = {
  params: { id: string };
};

const AccountPage: React.FC<AccountPageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);

  // TODO: Check why user._id is coming with quotations marks
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
