import React from "react";

// 設定
const clientId = '22d113b6c798414b8c4825aa08057a35';
// const redirectUri = 'http://localhost:3000/spotify-callback'; //←自分のReactに合わせて
const redirectUri = 'https://43734y7gx3.execute-api.ap-northeast-1.amazonaws.com/default/hack-shiomi-mesic-0625-2';

const scopes = [
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-top-read',
  'user-read-recently-played',
  'user-follow-read',
  'user-library-read',
  'user-read-playback-state'
];

const SpotifyLoginButton = () => {
  // spotify認証用ポップアップ
  const handleSpotifyLoginClick = () => {
    const authUrl = `https://accounts.spotify.com/authorize`
      + `?response_type=code`
      + `&client_id=${encodeURIComponent(clientId)}`
      + `&scope=${encodeURIComponent(scopes.join(' '))}`
      + `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    const width = 500, height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(
      authUrl,
      'SpotifyLogin',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  // ポップアップから届くメッセージの受信
  React.useEffect(() => {
    const handler = (event) => {
      // セキュリティ: event.origin === 信頼できるドメイン で判定するとなお良い
      const { type, code } = event.data || {};
      if (type === "SPOTIFY_AUTH_CODE") {
        // codeにはSpotifyの認可コードが入っている
        // ここでバックエンドにPOSTしてアクセストークンを取得等
        console.log("認可コードを取得:", code);
        // 必要ならstoreやcontextに保存
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <button
      onClick={handleSpotifyLoginClick}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors cursor-pointer"
    >
      Spotifyにログインする
    </button>
  );
};

export default SpotifyLoginButton;