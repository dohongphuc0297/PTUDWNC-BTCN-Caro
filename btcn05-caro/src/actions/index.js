import * as types from "./types";

export const ClickSquare = value => ({
  type: types.CLICK,
  value: value
})

export const Reset = () => ({
  type: types.RESET
})

export const Toogle = () => ({
  type: types.TOOGLE
})

export const JumpTo = (value) => ({
  type: types.JUMP_TO,
  value: value
})