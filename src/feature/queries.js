import axios from "axios";

export const money = {
  transition: async () => {
    try {
      const { data } = await axios.get(
        `https://v6.exchangerate-api.com/v6/6252a4148204f6512a56647d/latest/USD`
      );

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
