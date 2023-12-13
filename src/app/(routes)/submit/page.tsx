import { getServerSession } from "next-auth";

import Submit from "./submit";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotFound from "@/app/not-found";

const SubmitPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) <NotFound />;

  return <Submit session={session} />;
};

export default SubmitPage;
