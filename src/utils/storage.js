// 封装存储本地数据功能
export const setLocat = (key, data) => {
  localStorage.setItem(
    key,
    typeof data === "object" ? JSON.stringify(data) : data
  );
};
// 封装获取数据
export const getLocat = (key) => {
  let data = localStorage.getItem(key);
  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
  return data;
};
