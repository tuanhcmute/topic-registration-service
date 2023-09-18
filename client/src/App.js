import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./features/counter/counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  console.log(count);
  const dispatch = useDispatch();

  return (
    <div className='App'>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <button onClick={() => dispatch(increment())}>increment</button>
      <div>{count}</div>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  );
}

export default App;
