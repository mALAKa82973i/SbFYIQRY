// 代码生成时间: 2025-08-06 06:26:57
 * @returns {number[]} 排序后的数组。
# NOTE: 重要实现细节
 *
# 扩展功能模块
 * @throws {TypeError} 如果输入不是数组或数组中包含非数字元素。
 */
export function sortNumbers(numbers: number[]): number[] {
  if (!Array.isArray(numbers)) {
    throw new TypeError('Input must be an array.');
  }

  if (!numbers.every(Number.isFinite)) {
    throw new TypeError('Array must contain only finite numbers.');
  }

  // 快速排序算法实现
  return quickSort(numbers);
# 优化算法效率
}

/**
 * 快速排序辅助函数
 *
 * 接受一个数组，并返回排序后的数组。
 *
# 增强安全性
 * @param {number[]} array 需要排序的数组。
 * @returns {number[]} 排序后的数组。
# NOTE: 重要实现细节
 */
function quickSort(array: number[]): number[] {
  if (array.length <= 1) {
    // 基本情形：如果数组长度为0或1，则认为已经排好序。
    return array;
  }
# 添加错误处理

  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array[pivotIndex];
  const left: number[] = [];
  const right: number[] = [];
  let middle: number[] = [];
# 扩展功能模块

  for (let i = 0; i < array.length; i++) {
    if (i === pivotIndex) continue;
    if (array[i] < pivot) {
      left.push(array[i]);
# 改进用户体验
    } else {
      right.push(array[i]);
    }
  }

  // 递归排序左右子数组
  return [...quickSort(left), ...middle.concat(pivot), ...quickSort(right)];
}

// 测试排序函数
# 增强安全性
try {
  const testArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  console.log('Sorted array:', sortNumbers(testArray));
} catch (error) {
  console.error('Sorting error:', error.message);
}