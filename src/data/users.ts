const users = [
  {
    email: "oli@gmail.com",
    password: "123456",
  },
  {
    email: "jannat@gmail.com",
    password: "123456",
  },
  {
    email: "akhi@gmail.com",
    password: "123456",
  },
  {
    email: "toyob@gmail.com",
    password: "123456",
  },
];

export const getUserByEmail = (email: string) => {
  const found = users.find((user) => user.email === email);
  return found;
};
