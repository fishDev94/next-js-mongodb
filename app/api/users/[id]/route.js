import User from "@/app/model/user";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const id = params.id;

  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function DELETE(_, { params }) {
  const id = params.id;

  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  console.log(user)
  await user.deleteOne();

  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}