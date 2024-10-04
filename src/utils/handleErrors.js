export const handleErrors = () => {
  res.status(500).json({ message: err.message });
};
