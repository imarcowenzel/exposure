import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotFound from "@/app/not-found";
import { getServerSession } from "next-auth";
import React from "react";
import Account from "./account";

type AccountPageProps = {
  params: { id: string };
};

const AccountPage: React.FC<AccountPageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);

  // TODO: Check why user._id is coming with quotations marks
  if (!session || JSON.stringify(session.user._id).replace(/^"(.*)"$/, '$1') !== params.id) {
    return <NotFound />;
  }

  const { user } = session;

  return <Account user={JSON.parse(JSON.stringify(user))} />;
};

export default AccountPage;
