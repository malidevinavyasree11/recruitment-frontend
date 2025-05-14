export function formatDatesInObject(obj) {
  const isValidDate = (value) => {
      if (value instanceof Date) {
          return !isNaN(value.getTime());
      }
      if (typeof value === "string" && !isNaN(Date.parse(value))) {
          return true;
      }
      return false;
  };
  const formatDate = (date) => {
      const d = new Date(date);
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      return d.toLocaleDateString('en-US', options);
  };
  if (Array.isArray(obj)) {
      return obj.map(item => formatDatesInObject(item));
  } else if (typeof obj === 'object' && obj !== null) {
      const formattedObj = {};

      for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
              const value = obj[key];
              if (isValidDate(value)) {
                  formattedObj[key] = formatDate(value);
              } else if (typeof value === 'object' || Array.isArray(value)) {
                  formattedObj[key] = formatDatesInObject(value);
              } else {
                  formattedObj[key] = value;
              }
          }
      }

      return formattedObj;
  }
  return obj;
}