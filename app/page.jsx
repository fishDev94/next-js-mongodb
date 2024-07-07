"use client";

import { useEffect, useRef, useState } from "react";
import AppForm from "./components/AppForm/AppForm";
import UsersList from "./components/UsersList/UsersList";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const userNameInput = useRef(null);
  const passwordInput = useRef(null);
  const inputIdValue = useRef(null);
  const formRefs = { userNameInput, passwordInput };

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

    await fetch("api/users", {
      method: "POST",
      body: JSON.stringify(newUser),
    });

    // AZZERO I VALORI
    userNameInput.current.value = "";
    passwordInput.current.value = "";

    call();
  };

  const modifyUser = async () => {
    console.log("modifyUser");

    await fetch(`api/users/?id=${selectedUser._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        userName: userNameInput.current.value,
        psw: passwordInput.current.value,
      }),
    });

    // AZZERO I VALORI
    userNameInput.current.value = "";
    passwordInput.current.value = "";
    setSelectedUser({});
    call();
  };

  const handleSelectUser = async (id) => {
    console.log("handleSelectUser", id);

    const res = await fetch(`api/users/${id}`);

    const data = await res.json();

    console.log(data);
    setSelectedUser(data.user);
    userNameInput.current.value = data.user.userName;
    passwordInput.current.value = data.user.password;
  };

  return (
    <main>
      <h1>Users Fish Page</h1>
      <section>
        <AppForm
          formRefs={formRefs}
          handleSubmit={selectedUser._id ? modifyUser : addUser}
        />
      </section>
      <UsersList users={users} handleSelect={handleSelectUser} />
    </main>
  );
}
