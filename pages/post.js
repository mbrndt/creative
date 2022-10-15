import { auth, db } from "../utils/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";

export default function Post() {
  //Form state
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  //submit post
  const submitPost = async (e) => {
    e.preventDefault();

    // run checks for description
    if (!post.description.length) {
      toast.error("Please enter text.", {
        duration: 1500,
        position: "top-center",
      });
      return;
    }

    if (post.description.length > 300) {
      toast.error("Text input is  too long.", {
        duration: 1500,
        position: "top-center",
      });
      return;
    }

    //make a new post
    const collectionRef = collection(db, "posts");
    await addDoc(collectionRef, {
      ...post,
      timestamp: serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName,
    });
    setPost({ description: "" });
    return route.push("/");
  };

  return (
    <div className=",y-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">Create a new post</h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-200 h-48 w-full text-gray-700 rounded-lg p-2 text-small"
          ></textarea>
          <p
            className={`text-gray-500 font-medium text-sm ${
              post.description.length > 300 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 font-medium p-2 my-2 rounded-lg text-sm text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
