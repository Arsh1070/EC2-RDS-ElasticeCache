import { useState, useCallback } from "react";
import {
  TOAST_DURATION_DEFAULT,
  TOAST_DURATION_ERROR,
  TOAST_DURATION_SUCCESS,
  TOAST_TYPE,
} from "../etc/constants";

/**
 * useToast
 * Returns { toasts, add } where:
 *   toasts — current list of { id, msg, type }
 *   add(msg, type) — push a new toast; auto-removes after its duration
 *
 * Duration per type:
 *   success → TOAST_DURATION_SUCCESS
 *   error   → TOAST_DURATION_ERROR
 *   info    → TOAST_DURATION_DEFAULT
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const durationFor = (type) => {
    if (type === TOAST_TYPE.SUCCESS) return TOAST_DURATION_SUCCESS;
    if (type === TOAST_TYPE.ERROR)   return TOAST_DURATION_ERROR;
    return TOAST_DURATION_DEFAULT;
  };

  const add = useCallback((msg, type = TOAST_TYPE.INFO) => {
    const id = Date.now() + Math.random();

    setToasts((prev) => [...prev, { id, msg, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, durationFor(type));
  }, []);

  /** Convenience shorthands */
  const success = useCallback((msg) => add(msg, TOAST_TYPE.SUCCESS), [add]);
  const error   = useCallback((msg) => add(msg, TOAST_TYPE.ERROR),   [add]);
  const info    = useCallback((msg) => add(msg, TOAST_TYPE.INFO),    [add]);

  return { toasts, add, success, error, info };
}