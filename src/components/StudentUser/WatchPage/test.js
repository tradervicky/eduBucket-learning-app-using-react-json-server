// code for passing video
<ul>
{unit.map((unitData) => (
  <div key={unitData.id}>
    <h2>Unit: {unitData.unitname}</h2>
    <ul>
      {chapter
        .filter((chapterData) => parseInt(chapterData.uid) === unitData.id)
        .map((filteredChapter) => (
          <li key={filteredChapter.id} onClick={() => setCurrentVideo(filteredChapter.videoLink)}>
            Chapter {filteredChapter.id}: {filteredChapter.chapter}
          </li>
        ))}
    </ul>
  </div>
))}
</ul>


// logic for watchFAQ

import React, { useState } from 'react';
import styles from './WatchPage.module.css';

function WatchFAQ({ que, ans, chapters }) {
  const [show, setShow] = useState(false);

  const handleChapterClick = (videoLink) => {
    const videoPlayer = document.getElementById('videoPlayer');
    const source = document.createElement('source');
    source.setAttribute('src', videoLink);
    source.setAttribute('type', 'video/mp4'); 
  
    videoPlayer.innerHTML = ''; 
    videoPlayer.appendChild(source);
    videoPlayer.load();
    videoPlayer.play();
  };
  

  return (
    <div className={styles.Faqqueans}>
      <div className={styles.faqqueheading}>
        <h3 onClick={() => setShow(!show)}>{que}</h3>
        <p onClick={() => setShow(!show)}>{show ? <img src="/images/minus2.svg" alt="" /> : <img src="/images/plus.svg" alt="" />}</p>
      </div>
      {show && <p className={styles.answers}>{ans}</p>}
      {chapters && (
        <div>
          <h4>Chapters:</h4>
          <ul>
            {chapters.map((chapter, index) => (
               <li key={index} onClick={() => handleChapterClick(chapter.videoLink)}>
               {chapter.chapter}
             </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default WatchFAQ;

