import { NextResponse } from "next/server";
import User from "../../model/user.js";

export async function GET() {
  try {
    const users = await User.find();

    return NextResponse.json({ data: users });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req) {
  const newUser = await req.json();

  try {
    const user = new User({
      userName: newUser.userName,
      psw: newUser.psw,
    });
    user.save();

    console.log(user)
    return NextResponse.json({ message: "Added!" });
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(req) {
  const id = req.nextUrl.searchParams.get("id");
  const userByBody = await req.json();

  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  user.userName = userByBody.userName;
  user.psw = userByBody.psw;

  user.save();

  console.log(id);

  return NextResponse.json({ message: "Patching!" });
}
