export const debouce = function (fn, delayTime) {
  let timeoutId = null;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      return fn.apply(this, args);
    }, delayTime);
  };
};

const ResolvePromise = () =>
  new Promise((resolve) => setTimeout(() => resolve(["a", "b", "c"]), 10));

export const apiHelper = async function () {
  const result = await ResolvePromise();
  return result;
};
