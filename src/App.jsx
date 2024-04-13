// components/StudentList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentsFailure,
  fetchStudentsStart,
  fetchStudentsSuccess,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./store/slices/student.slice";
import StudentRow from "./components/student-row";
import axios from "axios";

const StudentList = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.student.data);
  const loading = useSelector((state) => state.student.loading);

  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    classid: "",
    classname: "",
    classdescription: "",
    sectionid: "",
    sectionname: "",
  });

  useEffect(() => {
    fetchStudentsStart();
    axios
      .get("https://661ac53465444945d04e7705.mockapi.io/api/student")
      .then((response) => {
        dispatch(fetchStudentsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchStudentsFailure(error.message));
      });
    // fetchStudentsFromAPI();
  }, [dispatch]);

  const handleAddStudent = () => {
    if (!newStudent.id) {
      alert("Please enter a data");
      return;
    } else if (!newStudent.name) {
      alert("Please enter a data");
      return;
    }

    dispatch(addStudent(newStudent));
    setNewStudent({
      id: "",
      name: "",
      classid: "",
      classname: "",
      classdescription: "",
      sectionid: "",
      sectionname: "",
    });
    axios.post(
      "https://661ac53465444945d04e7705.mockapi.io/api/student",
      newStudent
    );
  };

  const handleUpdateStudent = (student) => {
    dispatch(updateStudent(student));
    axios.put(
      `https://661ac53465444945d04e7705.mockapi.io/api/student/${student.id}`,
      student
    );
  };

  const handleDeleteStudent = (id) => {
    dispatch(deleteStudent(id));
    axios.delete(
      `https://661ac53465444945d04e7705.mockapi.io/api/student/${id}`
    );
  };

  return (
    <div className="space-x-4 space-y-4">
      <h2 className="text-center mb-4 text-3xl font-bold">Add Student</h2>
      <input
        type="text"
        placeholder="ID"
        value={newStudent.id}
        onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Name"
        value={newStudent.name}
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Class ID"
        value={newStudent.classid}
        onChange={(e) =>
          setNewStudent({ ...newStudent, classid: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Class Name"
        value={newStudent.classname}
        onChange={(e) =>
          setNewStudent({ ...newStudent, classname: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Class Description"
        value={newStudent.classdescription}
        onChange={(e) =>
          setNewStudent({ ...newStudent, classdescription: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Section ID"
        value={newStudent.sectionid}
        onChange={(e) =>
          setNewStudent({ ...newStudent, sectionid: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Section Name"
        value={newStudent.sectionname}
        onChange={(e) =>
          setNewStudent({ ...newStudent, sectionname: e.target.value })
        }
      />
      <div className="flex justify-center">
        <button
          className="text-white mt-4 bg-blue-400"
          onClick={handleAddStudent}
        >
          Add
        </button>
      </div>

      <table id="customers" className="space-x-4 space-y-4">
        <thead className="space-x-4 space-y-4">
          <tr className="space-x-4">
            <th>ID</th>
            <th>Name</th>
            <th>Class ID</th>
            <th>Class Name</th>
            <th>Class Description</th>
            <th>Section ID</th>
            <th>Section Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onUpdate={handleUpdateStudent}
              onDelete={handleDeleteStudent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
