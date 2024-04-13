import { useState } from "react";

const StudentRow = ({ student, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(student);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(editedStudent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedStudent(student);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({ ...editedStudent, [name]: value });
  };

  return (
    <tr key={student.id}>
      <td>{student.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedStudent.name}
            onChange={handleChange}
          />
        ) : (
          student.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="classid"
            value={editedStudent.classid}
            onChange={handleChange}
          />
        ) : (
          student.classid
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="classname"
            value={editedStudent.classname}
            onChange={handleChange}
          />
        ) : (
          student.classname
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="classdescription"
            value={editedStudent.classdescription}
            onChange={handleChange}
          />
        ) : (
          student.classdescription
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="sectionid"
            value={editedStudent.sectionid}
            onChange={handleChange}
          />
        ) : (
          student.sectionid
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="sectionname"
            value={editedStudent.sectionname}
            onChange={handleChange}
          />
        ) : (
          student.sectionname
        )}
      </td>
      <td className="space-x-3">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick} className="text-white">
              Save
            </button>
            <button onClick={handleCancelClick} className="text-white">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleUpdateClick} className="text-white">
            Update
          </button>
        )}
        <button onClick={() => onDelete(student.id)} className="text-white">
          Delete
        </button>
      </td>
    </tr>
  );
};
export default StudentRow;
