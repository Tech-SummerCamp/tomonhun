import { signIn, signOut, useSession } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <>
          <h1>ログイン</h1>
          <button onClick={() => signIn("twitter")}>Twitterでログイン</button>
        </>
      ) : (
        <>
          <h1>ようこそ、{session.user?.name}さん</h1>
          <button onClick={() => signOut()}>ログアウト</button>
        </>
      )}
    </div>
  );
}