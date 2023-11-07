import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CourseCreate.module.css";

const CoursesCreate = () => {
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [chapters, setChapters] = useState([]);

  // add teachers states
  const [courseInput, setCourseInput] = useState({ course: "", educator: "" });
  const [unitInput, setUnitInput] = useState({ cid: 0, unitname: "" });
  const [chapterInput, setChapterInput] = useState({ uid: 0, chapter: "", videoLink: "" });
  const [selectedCourseId, setSelectedCourseId] = useState(0);
const [selectedUnitId, setSelectedUnitId] = useState(0);
  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      const coursesResult = await axios.get("http://localhost:8080/courses");
      setCourses(coursesResult.data);

      const unitsResult = await axios.get("http://localhost:8080/units");
      setUnits(unitsResult.data);

      const chaptersResult = await axios.get("http://localhost:8080/chapters");
      setChapters(chaptersResult.data);
    };

    fetchData();
  }, []);

  // Function to add a new course
  const addCourse = async () => {
    await axios.post("http://localhost:8080/courses", courseInput);
    // Fetch updated data
    const coursesResult = await axios.get("http://localhost:8080/courses");
    setCourses(coursesResult.data);
    setCourseInput({ course: "", educator: "" });
  };

  // Function to add a new unit
  const addUnit = async () => {
    if (!unitInput.unitname || !selectedCourseId) {
      // Validate if the required fields are not empty
      return;
    }
    const unitData = { cid: parseInt(selectedCourseId), unitname: unitInput.unitname };
    await axios.post("http://localhost:8080/units", unitData);
    // Fetch updated data
    const unitsResult = await axios.get("http://localhost:8080/units");
    setUnits(unitsResult.data);
    setUnitInput({ cid: 0, unitname: "" }); 
    setSelectedCourseId(0); 
    setSelectedUnitId(0); 
  };

  // Function to add a new chapter
  const addChapter = async () => {
    if (!chapterInput.chapter || !selectedUnitId || !selectedCourseId) {
      // Validate if the required fields are not empty
      return;
    }
    const chapterData = {
      uid: parseInt(selectedUnitId),
      chapter: chapterInput.chapter,
      videoLink: chapterInput.videoLink,
      cid: parseInt(selectedCourseId), // Parse selectedCourseId to an integer
    };
    await axios.post("http://localhost:8080/chapters", chapterData);
    // Fetch updated data
    const chaptersResult = await axios.get("http://localhost:8080/chapters");
    setChapters(chaptersResult.data);
    setChapterInput({ uid: 0, chapter: "", videoLink: "" });
    setSelectedCourseId(0); // Clear the selected course ID
    setSelectedUnitId(0); // Clear the selected unit ID
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logicPart}>
        <h2>Add Course </h2>
        <div className={styles.Educator}>
          <div className={styles.educatorInput}>
            <input type="text" placeholder="Enter course name" value={courseInput.course}
              onChange={(e) => setCourseInput({ ...courseInput, course: e.target.value })}/>
            <input type="text" placeholder="Enter Educator name" value={courseInput.educator}
              onChange={(e) => setCourseInput({ ...courseInput, educator: e.target.value })}/>
          </div>
          <div className={styles.Educatorbtn}>
            <button onClick={addCourse}>Add Course</button>
          </div>
        </div>

        <h2>Add Unit List</h2>
        <select
  name="course"
  className={styles.unitSelect}
  value={selectedCourseId}
  onChange={(e) => setSelectedCourseId(e.target.value)}
>
  <option value="">select Course</option>
  {courses.map((course) => (
    <option key={course.id} value={course.id}>
      {course.course}
    </option>
  ))}
</select>
    <div className={styles.unitEntry}>
      <div className={styles.unitInput}>
        <input
          type="text"
          placeholder="enter unit name"
          value={unitInput.unitname}
          onChange={(e) => setUnitInput({ ...unitInput, unitname: e.target.value })}
        />
      </div>

      <button onClick={addUnit}>Add Unit</button>
    </div>

        <h2>Add Chapter List</h2>

        <select
  name="course"
  className={styles.unitSelect}
  value={selectedCourseId}
  onChange={(e) => setSelectedCourseId(e.target.value)}
>
  <option value="">select Course</option>
  {courses.map((course) => (
    <option key={course.id} value={course.id}>
      {course.course}
    </option>
  ))}
</select>
<select
  name="unit"
  className={styles.unitSelect}
  value={selectedUnitId}
  onChange={(e) => setSelectedUnitId(e.target.value)}
>
  <option value="">select unit</option>
  {units.map((unit) => (
    <option key={unit.id} value={unit.id}>
      {unit.unitname}
    </option>
  ))}
</select>
        <div className={styles.CapterMain}>
          <div className={styles.chapterInput}>
            <input type="text" placeholder="enter chapter name" value={chapterInput.chapter}
            onChange={(e) => setChapterInput({ ...chapterInput, chapter: e.target.value })}/>
            <input type="text" placeholder="Enter CDN link for video"  value={chapterInput.videoLink}
            onChange={(e) => setChapterInput({ ...chapterInput, videoLink: e.target.value })}/>
          </div>
          <button onClick={addChapter}>Add Chapter</button>
        </div>
      </div>
      {/* iske uper fetch and add kar raha hai niche k code m print  */}
      <div className={styles.CourseContent}>
        <div className={styles.card}>
          <div className={styles.courseList}>
            <h2>Course</h2>
            <ol>
              {courses.map((course) => (
                <li key={course.id}>
                  {course.course} -By {course.educator}
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.Unitlist}>
            <h2>Unit List</h2>
            <ol>
              {units.map((unit) => (
                <li key={unit.id}>{unit.unitname}</li>
              ))}
            </ol>
          </div>
          <div className={styles.chapterlist}>
            <h2>Chapter List</h2>
            <ol>
              {chapters.map((chapter) => (
                <li key={chapter.id}>{chapter.chapter}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesCreate;
