"use client";

import Form from "@components/Form";
import { UserType } from "@types";
import { useStore } from "@utils/store/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function CreatePrompt() {
  const router = useRouter();
  const { userInfo } = useStore();
  console.log("🚀 ~ file: page.tsx:13 ~ CreatePrompt ~ userInfo:", userInfo);
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let userId = "";
      if (session?.user) {
        userId = (session?.user as UserType).sessionId;
      } else if (userInfo?.isAuthorized) {
        userId = userInfo._id;
      }
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}

export default CreatePrompt;
