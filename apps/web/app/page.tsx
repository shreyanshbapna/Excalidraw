"use client"
import { useReducer, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";


export default function Home() {
  const [roomId, setroomId] = useState("");
  const router = useRouter();

  return (
    <div className={styles.page}>
      <input value={roomId} type="text"  placeholder="Room Id" onChange={(e) => {
          setroomId(e.target.value);
      }}/>
      <button onClick={() => {
        router.push(`/room/${roomId}`)
      }}> Join Room </button>
    </div>
  );
}
