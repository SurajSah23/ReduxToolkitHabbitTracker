import { useSelector, useDispatch } from "react-redux";
import { removeHabit, toggleHabit } from "../store/habit-slice";

const HabitList = () => {
  const habits = useSelector((state) => state.habits.habits);
  const dispatch = useDispatch();

  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <div className="space-y-4 mt-4">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="p-4 border rounded-lg shadow-md flex flex-col gap-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{habit.name}</h3>
              <p className="text-sm text-gray-500">
                {habit.frequency.charAt(0).toUpperCase() +
                  habit.frequency.slice(1)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-md text-white ${
                  habit.completedDates.includes(today)
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
                onClick={() =>
                  dispatch(toggleHabit({ id: habit.id, date: today }))
                }
              >
                {habit.completedDates.includes(today)
                  ? "Completed"
                  : "Mark Complete"}
              </button>
              <button
                className="px-4 py-2 rounded-md text-white bg-red-500"
                onClick={() => dispatch(removeHabit(habit.id))}
              >
                Remove
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm">Current Streak: {getStreak(habit)} days</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                    {`${getStreak(habit)}%`}
                  </span>
                </div>
              </div>
              <div className="flex mb-2">
                <div
                  className="w-full bg-gray-200 rounded-full h-2"
                  style={{
                    width: `${(getStreak(habit) / 30) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitList;
