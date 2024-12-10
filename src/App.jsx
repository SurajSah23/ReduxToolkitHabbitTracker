import { Provider } from "react-redux";
import AddHabitForm from "./components/add-habit-form";
import HabitList from "./components/habit-list";
import HabitStats from "./components/habit-stats";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-green-500">Habit Tracker</h1>
        </div>
        <AddHabitForm />
        <HabitList />
        <HabitStats />
      </div>
    </Provider>
  );
};

export default App;
