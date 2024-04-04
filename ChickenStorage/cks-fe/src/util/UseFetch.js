const fetchData = async (url, param = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("3: "+result.body);
    if (response.ok) {
      return result;
    } else {
      return "ERROR";
    }
  } catch (err) {
    return "ERROR";
  }
};

export default fetchData;
