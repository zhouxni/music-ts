export const formatDate = (time = 0, format = "yyyy-MM-dd HH:mm:ss") => {
  var t = new Date(time);
  var tf = function (i: number) {
    return (i < 10 ? "0" : "") + i;
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a: string): any {
    switch (a) {
      case "yyyy":
        return tf(t.getFullYear());
      case "MM":
        return tf(t.getMonth() + 1);
      case "mm":
        return tf(t.getMinutes());
      case "dd":
        return tf(t.getDate());
      case "HH":
        return tf(t.getHours());
      case "ss":
        return tf(t.getSeconds());
    }
  });
};

export const getUrlQuery = (search: string) => {
  const paramsString = search.substring(1);
  return new URLSearchParams(paramsString);
};