import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../store/habit-slice";

const HabitStats = () => {
  const { habits, isLoading, error } = useSelector((state) => state.habits);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const getTotalHabits = () => habits.length;

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completedDates.includes(today))
      .length;
  };

  const getLongestStreak = () => {
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

    return Math.max(...habits.map(getStreak), 0);
  };

  if (isLoading) {
    return <div className="w-full h-2 bg-gray-300 animate-pulse" />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 mt-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Habit Statistics</h2>
      <div className="flex flex-col gap-2">
        <p className="text-base">Total Habits: {getTotalHabits()}</p>
        <p className="text-base">Completed Today: {getCompletedToday()}</p>
        <p className="text-base">Longest Streak: {getLongestStreak()} days</p>
      </div>
    </div>
  );
};

export default HabitStats;
