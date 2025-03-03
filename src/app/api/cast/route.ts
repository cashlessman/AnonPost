import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {

  const  encodedtext= req.nextUrl.searchParams.get("text") || "";
  const text= decodeURIComponent(encodedtext)
  const signerPrivateKey = process.env.PRIVATE_KEY;
 const fid= 1009125

  try {
   const res= await axios.post('https://publish.justcast.me/', {
      data: {
      text,
      embeds: [],
      mentions: [],
      mentionsPositions: []},
     fid,
      signerPrivateKey,
    });
    return NextResponse.json({
      message: res.data.message,
      success: res.data.success
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
