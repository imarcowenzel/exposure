import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Submit from "./submit";

const SubmitPage: React.FC = async () => {

  const session = await getServerSession(authOptions);

  if (!session) redirect("/log-in");

  const { user } = session;

  return <Submit user={user} />;
};

export default SubmitPage;
