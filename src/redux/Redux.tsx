import { useDispatch, useSelector } from "react-redux";
import { create, removeUser, update } from "../redux/counterSlicer";
import { useState } from "react";

export const Redux = () => {
  const [name,setName] = useState("")
  const [surname,setSurname] = useState("")
  const {user} = useSelector((state) => state);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (!name || !surname) return;

    if (editingId) {
      dispatch(
        update({
          id: editingId,
          name,
          surname,
        })
      );

      setEditingId(null);
    } else {
      dispatch(
        create({
          id: Date.now(),
          name,
          surname,
        })
      );
    }
    setName("");
    setSurname("");
  }
    const handleEdit = (item) => {
      setName(item.name);
      setSurname(item.surname);
      setEditingId(item.id);
    };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
    <div className="mx-auto max-w-2xl">
  
     
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Add New User
        </h1>
  
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3
                       text-gray-800 outline-none transition
                       placeholder:text-gray-400
                       focus:border-blue-500 focus:bg-white
                       focus:ring-2 focus:ring-blue-100"
          />
  
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            placeholder="Surname"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3
                       text-gray-800 outline-none transition
                       placeholder:text-gray-400
                       focus:border-blue-500 focus:bg-white
                       focus:ring-2 focus:ring-blue-100"
          />
  
          <button
          
            onClick={handleSubmit}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white
                       shadow-md transition duration-200
                       hover:bg-blue-700 hover:shadow-lg
                       active:scale-95"
          >
            {editingId? "Update" : "Add"}
          </button>
        </div>
      </div>
  
      {/* Users */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Users
        </h2>
  
        <ul className="space-y-3">
          {user.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-2xl
                         border border-gray-200 bg-white p-5
                         shadow-sm transition
                         hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
  
                <p className="text-sm text-gray-500">
                  {item.surname}
                </p>
              </div>
  
              <div>
              <button
                onClick={() => handleEdit(item)}
                className="rounded-lg bg-indigo-100 px-4 py-2
                           text-sm font-semibold text-indigo-500
                           transition hover:bg-indigo-200
                           active:scale-95"
              >
                Update
              </button>
              <button
                onClick={() => dispatch(removeUser(item.id))}
                className="rounded-lg bg-red-50 px-4 py-2
                           text-sm font-semibold text-red-600
                           transition hover:bg-red-100
                           active:scale-95"
              >
                Delete
              </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
  
    </div>
  </div>
  );
};
