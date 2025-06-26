import React, { useState, useEffect } from 'react';

const Test = () => {
  const [playlistTitle, setPlaylistTitle] = useState('プレイリスト情報を取得中...');
  const [trackList, setTrackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://m2fjzdgb4f.execute-api.ap-northeast-1.amazonaws.com/test-spotify/callback';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let responseData = data;
        if (typeof data.body === "string") {
          responseData = JSON.parse(data.body);
        }
        
        setPlaylistTitle(`${responseData.playlistName}（全${responseData.total}曲）`);
        setTrackList(responseData.trackNames || []);
        setLoading(false);
      })
      .catch(err => {
        setPlaylistTitle(`取得エラー: ${err}`);
        setError(err);
        setLoading(false);
      });
  }, []); // 空配列なので初回レンダリング時のみ実行

  if (loading) {
    return <div>読み込み中です...</div>;
  }

  if (error) {
    return <div>エラーが発生しました: {error.message}</div>;
  }

  return (
    <div>
      <h1>{playlistTitle}</h1>
      <ul>
        {trackList.map((trackName, index) => (
          <li key={index}>{trackName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Test;