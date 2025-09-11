function deepEqual(a, b) {
  if (a === b)
    return true;
  if (a == null || b == null)
    return a === b;
  if (typeof a !== typeof b)
    return false;
  if (typeof a !== "object")
    return a === b;
  if (Array.isArray(a) !== Array.isArray(b))
    return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length)
      return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length)
    return false;
  return keysA.every((key) => deepEqual(a[key], b[key]));
}
function shallowEqual(a, b) {
  return a === b;
}
function createMemoComparator(keys, options) {
  const { mode, deepCompare = false, customCompare = {} } = options;
  return (prevProps, nextProps) => {
    const propsToCompare = mode === "include" ? keys : Object.keys(prevProps).filter(
      (key) => !keys.includes(key)
    );
    const compareFunc = deepCompare ? deepEqual : shallowEqual;
    for (const key of propsToCompare) {
      const prevValue = prevProps[key];
      const nextValue = nextProps[key];
      if (customCompare[key]) {
        if (!customCompare[key](prevValue, nextValue)) {
          return false;
        }
        continue;
      }
      if (!compareFunc(prevValue, nextValue)) {
        return false;
      }
    }
    return true;
  };
}
function createIncludeComparator(keys, deepCompare = false, customCompare) {
  return createMemoComparator(keys, {
    mode: "include",
    deepCompare,
    customCompare
  });
}
function createExcludeComparator(keys, deepCompare = false, customCompare) {
  return createMemoComparator(keys, {
    mode: "exclude",
    deepCompare,
    customCompare
  });
}
const commonComparators = {
  /**
   * 忽略函数类型的props（如回调函数）
   */
  ignoreFunctions: (prevProps, nextProps) => {
    const keys = Object.keys(prevProps).filter(
      (key) => typeof prevProps[key] !== "function"
    );
    return createIncludeComparator(keys)(prevProps, nextProps);
  },
  /**
   * 只比较基础类型的props
   */
  primitiveOnly: (prevProps, nextProps) => {
    const keys = Object.keys(prevProps).filter((key) => {
      const value = prevProps[key];
      return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value == null;
    });
    return createIncludeComparator(keys)(prevProps, nextProps);
  }
};
function createDebugComparator(comparator, componentName) {
  return (prevProps, nextProps) => {
    const result = comparator(prevProps, nextProps);
    if (process.env.NODE_ENV === "development" && !result) {
      const changedKeys = Object.keys(prevProps).filter(
        (key) => prevProps[key] !== nextProps[key]
      );
      console.log(`[${componentName || "Component"}] Props changed:`, changedKeys);
      console.log("Previous props:", prevProps);
      console.log("Next props:", nextProps);
    }
    return result;
  };
}
function withPerformanceMonitoring(comparator, componentName) {
  return (prevProps, nextProps) => {
    const startTime = performance.now();
    const result = comparator(prevProps, nextProps);
    const endTime = performance.now();
    if (process.env.NODE_ENV === "development") {
      const duration = endTime - startTime;
      if (duration > 1) {
        console.warn(
          `[${componentName || "Component"}] Slow memo comparison: ${duration.toFixed(2)}ms`
        );
      }
    }
    return result;
  };
}
export {
  commonComparators,
  createDebugComparator,
  createExcludeComparator,
  createIncludeComparator,
  createMemoComparator,
  withPerformanceMonitoring
};
//# sourceMappingURL=utils.js.map
