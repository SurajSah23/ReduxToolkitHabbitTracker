import { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../store/habit-slice";

const AddHabitForm = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addHabit({ name, frequency }));
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter habit name"
        className="p-2 border rounded-md"
      />
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded-md mt-2 hover:bg-blue-600"
      >
        Add Habit
      </button>
    </form>
  );
};

export default AddHabitForm;
