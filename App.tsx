import * as React from 'react';

import './style.css';

import create from 'zustand';

type StoreState = {
  count1: number;
  count2: number;
  inc1: () => void;
  inc2: () => void;
};

const useStore = create<StoreState>((set) => ({
  count1: 0,
  count2: 0,
  inc1: () =>
    set((prev) => ({
      ...prev,
      count1: prev.count1 + 1,
      total: prev.count1 + prev.count2,
    })),
  inc2: () =>
    set((prev) => ({
      ...prev,
      count2: prev.count2 + 1,
      total: prev.count2 + prev.count1,
    })),
}));

const selectCount1 = (state: StoreState) => state.count1;
const selectInc1 = (state: StoreState) => state.inc1;

const Counter1 = () => {
  const count1 = useStore(selectCount1);
  const inc1 = useStore(selectInc1);

  console.log('re-render 1');

  return (
    <div>
      count1: {count1} <button onClick={inc1}>+1</button>
    </div>
  );
};

const selectCount2 = (state: StoreState) => state.count2;
const selectInc2 = (state: StoreState) => state.inc2;

const Counter2 = () => {
  const count2 = useStore(selectCount2);
  const inc2 = useStore(selectInc2);

  console.log('re-render 2');

  return (
    <div>
      count2: {count2} <button onClick={inc2}>+1</button>
    </div>
  );
};

const selectTotal = (state: StoreState) => state.count1 + state.count2;

const Total = () => {
  console.log('Total');

  const total = useStore(selectTotal);
  return <div>total: {total}</div>;
};

const App = () => (
  <>
    <Counter1 />
    <Counter2 />
    <Total />
  </>
);

export default App;
