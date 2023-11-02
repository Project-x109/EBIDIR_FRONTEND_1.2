export const ASCSort = (prop) => {
  return (a, b) => {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
};
export const DESCSort = (prop) => {
  return (a, b) => {
    if (a[prop] < b[prop]) {
      return 1;
    } else if (a[prop] > b[prop]) {
      return -1;
    }
    return 0;
  };
};
export const formatCompactNumber = (number) => {
  const suffixes = ["", "K", "M ", "B", "T", "Qd", "Qi", "S", "Se", "O", "N"];
  let suffixIndex = 0;
  let formattedNumber = number;

  while (formattedNumber >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedNumber /= 1000;
    suffixIndex++;
  }

  const roundedNumber = Number.isInteger(formattedNumber)
    ? formattedNumber.toFixed(0)
    : formattedNumber.toFixed(2);

  const suffix = suffixes[suffixIndex];

  if (suffix === "N") {
    return formattedNumber.toExponential(2) + " " + suffix;
  }

  return roundedNumber.replace(/\.0$/, "") + " " + suffix;
};
export const swapArray = (arr, xp, yp) => {
  var temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
};
export const selectionSort = (arr) => {
  var i, j, min_idx;
  var indexArry = [];
  Object.keys(arr).forEach((item) => {
    indexArry[item] = item;
  });
  const n = indexArry.length;
  for (i = 0; i < n - 1; i++) {
    min_idx = indexArry[i];
    for (j = i + 1; j < n; j++)
      if (arr[indexArry[j]].length > arr[min_idx].length)
        min_idx = indexArry[j];
    swapArray(arr, min_idx, indexArry[i]);
  }
  return arr;
};
export const sendToRole = (role, useNavigate, login) => {
  if (role !== login?.role) {
    role = role === "çompany" ? "user" : role;
    useNavigate.push(`/${role}/dashboard`);
  }
};
export const reverse = (data) => {
  let data2 = Object.keys(data);
  data2 = data2.reverse();
  let temp = [];
  data2.map((item) => {
    temp[item] = data[item];
  });
  return temp;
};
