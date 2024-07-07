"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  const userNameInput = useRef(null);
  const passwordInput = useRef(null);
  const inputIdValue = useRef(null);

  const call = () => {
    fetch("api/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((Response) => {
        setUsers(Response.data);
        console.log("setUsers");
      });
  };

  useEffect(() => {
    call();
  }, []);

  const addUser = async () => {
    const nameValue = userNameInput.current.value;
    const passwordValue = passwordInput.current.value;

    const newUser = {
      userName: nameValue,
      psw: passwordValue,
    };

    const res = await fetch("api/users", {
      method: "POST",
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    console.log(data);

    call();
  };

  const selectUser = async () => {
    console.log("modifyUser");

    await fetch(`api/users/?id=${inputIdValue.current.value}`, {
      method: "PATCH",
      body: JSON.stringify({
        userName: userNameInput.current.value,
        psw: passwordInput.current.value,
      }),
    });

    call();
  };

  return (
    <main>
      <h1>Fish Page</h1>
      {users.map((user, idx) => (
        <p key={idx}>
          {user.userName} - {user._id}
        </p>
      ))}

      <p>Add User:</p>
      <input ref={userNameInput} type="text" placeholder="name" />
      <input ref={passwordInput} type="password" placeholder="password" />

      <button onClick={addUser}>Add User</button>

      <div>
        <input ref={inputIdValue} type="text" placeholder="id" />
      </div>

      <div>
        <input ref={userNameInput} type="text" placeholder="name" />
        <input ref={passwordInput} type="password" placeholder="password" />
        <button onClick={selectUser}>select</button>
      </div>
    </main>
  );
}
