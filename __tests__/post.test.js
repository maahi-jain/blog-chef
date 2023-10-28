import { app } from "../app";

describe("Get Post", () => {
  // Arrange
  const postId = "6537cd70e8312c4468df0fe7";
  const expectedResponse = {
    isApproved: true,
    _id: "6537cd70e8312c4468df0fe7",
    title: "post",
    content: "great!",
    user: {
      _id: "6537800acbe552082897f5e5",
      name: "Joe",
    },
    createdAt: "2023-10-24T13:58:08.180Z",
    __v: 0,
  };
  // Act
  const actualResponse = request(app).get(`/api/post/${postId}`);

  // Assert
  expect(actualResponse.post).toEqual(expectedResponse);
});
