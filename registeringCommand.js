import "dotenv/config";
import axios from "axios";

const RegisteringCommand = async () => {
  const url = `https://discord.com/api/v10/applications/${process.env.APPLICATION_ID}/commands`;

  // const data = {
  //   name: "회원가입",
  //   description: "바니에게 게임을 하고싶다고 말합니다.",
  //   options: [],
  // };

  // const data = {
  //   name: "다이사이",
  //   description: "다이사이 보드판을 만듭니다.",
  //   options: [],
  // };

  // const data = {
  //   name: "구걸",
  //   description: "바니에게 구걸을 합니다.",
  //   options: [],
  // };

  // const data = {
  //   name: "잔액조회",
  //   description: "현재 보유하고 있는 돈을 확인합니다.",
  //   options: [],
  // };

  const data = {
    name: "music",
    description: "play music",
    options: [
      {
        name: "title",
        description: "music title",
        type: 3, // Type 3 corresponds to a string
        required: true,
      },
    ],
  };

  axios
    .post(url, data, {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Status Code:", response.status);
      console.log("Response Data:", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

RegisteringCommand();
