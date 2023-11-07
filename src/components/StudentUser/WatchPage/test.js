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