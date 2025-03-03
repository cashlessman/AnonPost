"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
 type Context,
} from "@farcaster/frame-sdk";
import { Button } from "~/components/ui/Button";

export default function Demo(
) {
  const [context, setContext] = useState<Context.FrameContext>();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  interface CastResponse{
    success: boolean;
    message: string;
  }
  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready({});
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);


const [castData, setCastData] = useState<CastResponse | null>(null);
  const cast = useCallback(async(text: string) => {
    try {
    const res=await fetch(`/api/cast?text=${text}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const castResponseData = await res.json();
    if (
      castResponseData
        ) {
          setCastData({
        success: castResponseData.success,
        message: castResponseData.message,
      });
    } else {
      throw new Error("Invalid response structure");
    }
    } catch (err) {
      console.error("Error sendinding cast", err);
    }
  }, []);

    if (!context)
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-4">You do not have permission to view this page.</p>
        <button 
          onClick={() => window.close()} 
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Close Tab
        </button>
      </div>
    </div>
      );

  return (
    <div style={{ 
      paddingTop: context?.client.safeAreaInsets?.top ?? 0, 
      paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
      paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
      paddingRight: context?.client.safeAreaInsets?.right ?? 0 ,
    }}>
<AnonPost/>
  </div>
  );

  function AnonPost() {
    const [text, setText] = useState("");
    const [isCasted, setIsCasted] = useState(false);
    const [showMessage, setShowMessage] = useState(castData?.message);
    const maxChars = 320;
    const encodedText = encodeURIComponent(text);
    const handleCast = () => {
      cast(encodedText);
      setIsCasted(true);
    };
    useEffect(() => {
      if (castData?.message) {
        const timer = setTimeout(() => setShowMessage(undefined), 5000);
        return () => clearTimeout(timer);
      }
    }, [isCasted]);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#2A2D34] text-white p-4">
              {showMessage && (
        <div className="absolute top-4 px-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-lime-500 p-3 rounded shadow-lg w-full max-w-lg flex justify-between items-center">
          <span className={`${castData?.success=== false ? "text-red-500" : ""}`}>{castData?.message}</span>
          <button className="text-red-400" onClick={() => setShowMessage(undefined)}>✖</button>
        </div>
      )}
        <h1 className="text-3xl font-bold text-center relative glitch">Anon Post</h1>
        <h2 className="text-xl mb-4 text-center relative italic glitch">Post anonymously, for free</h2>

        <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-lg glitch">
          <textarea
            className="w-full h-60 p-3 bg-[#525760] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Start writing..."
            maxLength={maxChars}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ whiteSpace: "pre-wrap" }}
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            <span className={`text-sm ${text.length >= maxChars ? "text-red-500" : "text-gray-400"}`}>
              {text.length} / {maxChars}
            </span>
            <Button
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition disabled:opacity-50"
              disabled={!text.trim() || text.length > maxChars}
              onClick={!isCasted ? handleCast : undefined}
            >
              {isCasted ? "Posting" : "Post"}
            </Button>
          </div>
        </div>
        <style jsx>{`
        @keyframes glitch {
          0% { text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.2); }
          25% { text-shadow: -2px -2px 5px rgba(255, 0, 0, 0.3); transform: translate(1px, -1px); }
          50% { text-shadow: 2px -2px 5px rgba(0, 255, 0, 0.3); transform: translate(-1px, 1px); }
          75% { text-shadow: -2px 2px 5px rgba(0, 0, 255, 0.3); transform: translate(1px, 1px); }
          100% { text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.2); }
        }

        .glitch {
          animation: glitch 0.5s infinite alternate;
        }
      `}</style>
      </div>
    );
  }
  
}
