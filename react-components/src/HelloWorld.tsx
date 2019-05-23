import React, { useEffect, useState } from "react";

export function HelloWorld(props: { message?: string }) {
  useEffect(
    () =>
      console.log(
        "Hello world created! If you see this React hooks are working!"
      ),
    []
  );

  const [message, setMessage] = useState("");

  return (
    <div
      style={{ fontSize: 100 }}
      onClick={() => {
        alert("I was clicked!");
        setMessage("- Clicked!");
      }}
    >
      <div>🎉🎉🎉 Hello world from React!🎉🎉🎉 </div>
      <div>
        Server side says: {props.message} {message}
      </div>
    </div>
  );
}
