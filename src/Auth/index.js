const authorise = async (setUser) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, { credentials: "include" });
    const data = await response.json();
    if (!data.errors) {
      setUser(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export { authorise };
