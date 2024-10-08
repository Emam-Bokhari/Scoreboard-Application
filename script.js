// select dom element
const incrementInput = document.querySelector(".lws-increment");
const decrementInput = document.querySelector(".lws-decrement");
const singleResultEl = document.querySelector(".lws-singleResult");
const incrementForm = document.querySelector(".incrementForm");
const decrementForm = document.querySelector(".decrementForm");
const resetBtn = document.querySelector(".lws-reset");

// initial state
const initialState = {
  score: 0,
};

// action identefires
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";

// action creators
const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  };
};
const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};
const reset = () => {
  return {
    type: RESET,
  };
};

// create reducer function
const createscoreboard = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      ...state,
      score: state.score + action.payload,
    };
  } else if (action.type === DECREMENT) {
    const newScore = state.score - action.payload;
    return {
      ...state,
      score: newScore > 0 ? newScore : 0,
    };
  } else if (action.type === RESET) {
    return {
      ...state,
      score: 0,
    };
  } else {
    return state;
  }
};

const store = Redux.createStore(createscoreboard);

const render = () => {
  const state = store.getState();
  singleResultEl.innerText = state.score;
  // console.log(state)
};

render();

store.subscribe(render);

// event listener
incrementForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const incrementValue = parseInt(incrementInput.value, 10) || 0;
  store.dispatch(increment(incrementValue));
  incrementInput.value = "";
});

decrementForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const decrementValue = parseInt(decrementInput.value, 10) || 0;
  store.dispatch(decrement(decrementValue));
  decrementInput.value = "";
});

resetBtn.addEventListener("click", () => {
  store.dispatch(reset());
});
