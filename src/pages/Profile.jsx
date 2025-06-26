// // import React from 'react'
// // import NavigationBar from './NavigationBar';

import NavigationBar from "./NavigationBar";

// // const Profile = () => {
// //   return (
// //     <div className="text-center p-4">
// //       <h1>Profile</h1>
// //       <p>This is the profile page.</p>
// //       <NavigationBar/>
// //     </div>
// //   )
// // }

// // export default Profile


// import React from "react";
// import NavigationBar from "./NavigationBar"; // 完成済みコンポーネントをimport
// import { FaUserCircle, FaMusic, FaListUl, FaHome, FaSearch, FaWrench } from "react-icons/fa";

// const UserProfile = () => (
//   <div className="user-profile">
//     <div className="user-info">
//       <FaUserCircle size={60} />
//       <div>
//         <div className="user-name">ユーザー名</div>
//         <div className="user-comment">コメント</div>
//       </div>
//     </div>
//     <div className="user-actions">
//       <button>編集</button>
//       <button>SHARE</button>
//     </div>
//     <div className="user-stats">
//       <div><b>100</b><br />Music</div>
//       <div><b>100</b><br />Playlists</div>
//       <div><b>100</b><br />Following</div>
//       <div><b>100</b><br />Follows</div>
//     </div>
//   </div>
// );

// const BestMusicSection = () => (
//   <div className="best-section">
//     <div className="best-titles">
//       <span><FaMusic color="#9370DB" /> Best Music</span>
//       <span><FaListUl color="#9370DB" /> Best PlayList</span>
//     </div>
//     <div className="best-images">
//       <div className="jacket">ジャケ写</div>
//       <div className="jacket">ジャケ写</div>
//     </div>
//   </div>
// );

// const MusicListSection = () => (
//   <div className="list-section">
//     <span><FaMusic color="#9370DB" /> 曲</span>
//     <span>...</span>
//   </div>
// );

// const PlaylistSection = () => (
//   <div className="list-section">
//     <span><FaListUl color="#9370DB" /> プレイリスト</span>
//     <span>...</span>
//   </div>
// );

// const Profile = () => {
//   return (
//     <div className="container">
//       <UserProfile />
//       <BestMusicSection />
//       <MusicListSection />
//       <PlaylistSection />
//       <NavigationBar />
//     </div>
//   );
// }

// export default Profile;

// profile.jsx
export default function Profile() {
  return (
    <div className="w-[340px] border-2 border-[#222] bg-[#FFF9C4] mx-auto font-sans">
      {/* ユーザープロフィール */}
      <div className="p-2.5 border-b-2 border-[#222]">
        <div className="flex items-center gap-2.5">
          {/* アイコン */}
          <div className="w-[60px] h-[60px] flex items-center justify-center border-2 border-[#222] rounded-full bg-white text-center text-base">
            アイコン
          </div>
          <div>
            <div className="text-[1.5em] font-bold">ユーザー名</div>
            <div className="text-[#888] text-[0.9em]">コメント</div>
          </div>
        </div>
        {/* アクションボタン */}
        <div className="my-2.5 flex gap-2.5">
          <button className="flex-1 border-2 border-[#222] rounded-full bg-white py-2 text-base">編集</button>
          <button className="flex-1 border-2 border-[#222] rounded-full bg-white py-2 text-base">SHARE</button>
        </div>
        {/* ユーザーステータス */}
        <div className="flex justify-around border-2 border-[#222] rounded-[10px] bg-white mt-2.5 py-1.5 text-[0.9em]">
          <div className="text-center">
            <div>100</div>
            <div>Music</div>
          </div>
          <div className="text-center">
            <div>100</div>
            <div>Playlists</div>
          </div>
          <div className="text-center">
            <div>100</div>
            <div>Following</div>
          </div>
          <div className="text-center">
            <div>100</div>
            <div>Follows</div>
          </div>
        </div>
      </div>

      {/* ベストセクション */}
      <div className="border-b-2 border-[#222] p-2.5">
        <div className="flex justify-between text-[1.1em] font-bold">
          <div className="flex items-center gap-1">
            <span className="text-[1.3em] text-purple-400">🎵</span>
            Best Music
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[1.3em] text-purple-400">📃</span>
            Best PlayList
          </div>
        </div>
        <div className="flex justify-between mt-2.5">
          <div className="w-[90px] h-[60px] border-2 border-[#222] rounded-[10px] bg-white flex items-center justify-center">
            ジャケ写
          </div>
          <div className="w-[90px] h-[60px] border-2 border-[#222] rounded-[10px] bg-white flex items-center justify-center">
            ジャケ写
          </div>
        </div>
      </div>

      {/* 曲リストセクション */}
      <div className="flex justify-between items-center border-b-2 border-[#222] p-2.5 text-[1.2em]">
        <div className="flex items-center gap-1">
          <span className="text-[1.3em] text-purple-400">🎵</span>
          曲
        </div>
        <span>…</span>
      </div>

      {/* プレイリストセクション */}
      <div className="flex justify-between items-center border-b-2 border-[#222] p-2.5 text-[1.2em]">
        <div className="flex items-center gap-1">
          <span className="text-[1.3em] text-purple-400">📃</span>
          プレイリスト
        </div>
        <span>…</span>
      </div>

     
      <NavigationBar/>
    </div>
  );
}