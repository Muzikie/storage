const request = require("supertest");
const app = require("./server");

describe("File Upload and Streaming App", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should upload a file and stream it", async () => {
    const fileId = "testfile";
    const filePath = "./test/testfile.png";

    // Upload the file
    const uploadResponse = await request(app)
      .post(`/upload/${fileId}`)
      .attach("file", filePath);

    expect(uploadResponse.status).toBe(200);
    expect(uploadResponse.text).toBe("File uploaded successfully!");

    // Stream the uploaded file
    const streamResponse = await request(app).get(`/stream/${fileId}`);

    expect(streamResponse.status).toBe(200);
    expect(streamResponse.headers["content-type"]).toBe(
      "application/octet-stream"
    );
    expect(streamResponse.headers["content-disposition"]).toBe(
      `attachment; filename="${fileId}"`
    );
  });

  it("should return 404 for non-existing file", async () => {
    const fileId = "nonexistentfile";

    const response = await request(app).get(`/stream/${fileId}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe("File not found!");
  });
});
