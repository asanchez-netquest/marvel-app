/* eslint-disable */
import axios from "axios";

export default {
  getDataByCharacterFunction: async function (filterValue) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}v1/public/characters/${filterValue}?ts=1695819044&apikey=92a3d00a18bd95312b01bac368d51805&hash=a66a44ceb789f9f1c5024fbf85672705`,
        {}
      );

      return response;
    } catch (error) {
      throw error;
    }
  },

  getListCharactersFunction: async function () {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}v1/public/characters?limit=100&ts=1695819044&apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
        {}
      );

      return response;
    } catch (error) {
      throw error;
    }
  },
};
