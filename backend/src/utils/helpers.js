/**
 * helpers.js — Common utility functions for the backend.
 */

/**
 * Returns a ISO string timestamp.
 */
export const getCurrentTimestamp = () => new Date().toISOString();

/**
 * Wraps an async function to catch errors and pass them to next().
 */
export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
