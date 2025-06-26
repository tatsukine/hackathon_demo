// /src/SpotifyCallback.jsx
import React, { useEffect } from "react";

const SpotifyCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (window.opener && code) {
      // 親ウィンドウにpostMessage
      window.opener.postMessage({ type: "SPOTIFY_AUTH_CODE", code }, "*");
      window.close(); // 必要ならポップアップを自動で閉じる
    }
  }, []);
  return <div>ログイン完了！ウィンドウは自動で閉じます。</div>;
};

export default SpotifyCallback;