import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import Profile from "@/models/profile";
import Link from "@/models/link";
import { spawn } from "child_process";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IProfile as ProfileType } from "@/types";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    if (!url.startsWith("https://scholar.google.com/citations")) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    await connect();

    let profile = await Profile.findOne({ url });

    if (!profile) {
      const profileId = url.split("user=")[1].split("&")[0];

      const profileData = await new Promise((resolve, reject) => {
        const py = spawn("py", ["./scholar scripts/get.py", profileId]);

        let output = "";
        let errorOutput = "";

        py.stdout.on("data", (data) => {
          output += data.toString();
        });

        py.stderr.on("data", (data) => {
          errorOutput += data.toString();
        });

        py.on("close", (code) => {
          if (code !== 0) {
            return reject(
              new Error(
                `Python script exited with code ${code}: ${errorOutput}`
              )
            );
          }

          try {
            const parsed = JSON.parse(output);
            resolve(parsed);
          } catch (err) {
            reject(new Error("Failed to parse Python output"));
          }
        });
      });

      const { name, citations, hIndex, publications } =
        profileData as ProfileType;

      profile = new Profile({
        name,
        url,
        citations,
        hIndex,
        publications,
      });
      await profile.save();
    }

    const existingLink = await Link.findOne({
      profileId: profile._id,
      userId: session.user.id,
    });
    if (existingLink) {
      return NextResponse.json(
        { error: "Profile already exists" },
        { status: 400 }
      );
    }

    const newLink = new Link({
      profileId: profile._id,
      userId: session.user.id,
    });
    await newLink.save();

    return NextResponse.json(
      {
        message: "Profile created successfully",
        profile,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Please check the URL and try again" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connect();

    const links = await Link.find({ userId: session.user.id });
    if (links.length === 0) {
      return NextResponse.json(
        { message: "No profiles found" },
        { status: 404 }
      );
    }

    const profileIds = links.map((link) => link.profileId);
    const profiles = await Profile.find({ _id: { $in: profileIds } });
    return NextResponse.json(profiles, { status: 200 });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { profileId } = await request.json();

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 }
      );
    }

    await connect();

    const link = await Link.findOneAndDelete({
      profileId,
      userId: session.user.id,
    });

    if (!link) {
      return NextResponse.json(
        { error: "Profile not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Profile deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profileIds = await Link.find({ userId: session.user.id }).distinct("profileId");
    if (profileIds.length === 0) {
      return NextResponse.json(
        { error: "No profiles found for the user" },
        { status: 404 }
      );
    }

    const userProfiles = await Profile.find({ _id: { $in: profileIds } });
    if (userProfiles.length === 0) {
      return NextResponse.json(
        { error: "No profiles found" },
        { status: 404 }
      );
    }

    for (const profile of userProfiles) {
      const profileId = profile.url.split("user=")[1].split("&")[0];

      const profileData = await new Promise((resolve, reject) => {
        const py = spawn("py", ["./scholar scripts/get.py", profileId]);

        let output = "";
        let errorOutput = "";

        py.stdout.on("data", (data) => {
          output += data.toString();
        });

        py.stderr.on("data", (data) => {
          errorOutput += data.toString();
        });

        py.on("close", (code) => {
          if (code !== 0) {
            return reject(
              new Error(
                `Python script exited with code ${code}: ${errorOutput}`
              )
            );
          }

          try {
            const parsed = JSON.parse(output);
            resolve(parsed);
          } catch (err) {
            reject(new Error("Failed to parse Python output"));
          }
        });
      });

      const { name, citations, hIndex, publications } =
        profileData as ProfileType;

      profile.name = name;
      profile.citations = citations;
      profile.hIndex = hIndex;
      profile.publications = publications;

      await profile.save();
    }

   
    return NextResponse.json(
      { message: "Profiles updated successfully", profiles: userProfiles },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
