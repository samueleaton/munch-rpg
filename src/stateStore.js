import _ from 'lodash';

const states = [];

/*
*/
function currentState() {
  return states[states.length - 1];
}

/*
*/
function previousState() {
  if (states.length <= 2)
    return states[1];
  else
    return states[states.length - 2];
}

/*
*/
function setInitialState(obj) {
  if (!_.isPlainObject(obj))
    throw new Error('Must pass plain object to setInitialState.');

  states[0] = obj;
}

/*
*/
function modifyState(func) {
  const tempState = _.cloneDeep(currentState());
  func(tempState);
  setNewState(tempState);
  return currentState();
}

/*
*/
function setNewState(obj) {
  states.push(obj);
}

/*
*/
function resetState() {
  states.splice(1);
}

/*
*/
function stateHistory() {
  return states;
}

/*
*/
function purgeStateHistory() {
  states.splice(1, states.length - 2);
}


const stateStore = {
	modifyState,
	resetState,
	purgeStateHistory,
	setInitialState
};

Object.defineProperty(stateStore, 'state', {
  get: () => currentState()
});

Object.defineProperty(stateStore, 'previousState', {
  get: () => previousState(),
});

export default stateStore;
