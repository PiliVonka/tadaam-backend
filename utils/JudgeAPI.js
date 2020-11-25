import fetch from "node-fetch";

// Declare API URL
const { JUDGE_API_URL } = process.env;

/**
 * parseJSON - converts response to JSON
 *
 * @param  {Response} response
 */
const parseJSON = response => {
  console.log({ response });
  if (response.status >= 400) {
    throw new Error(`Response status is 400. Response: ${JSON.stringify(response)}`);
  }
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response;
};

/**
   * runCode - Requests to api for traffic check
   *
   * @param  {Date} startTime
   * @param  {Date} endTime
   */
export const runCode = async (code, stdin, stdout) => {
  console.log({ JUDGE_API_URL });
  const url = `${JUDGE_API_URL}/submissions?source_code=${encodeURIComponent(code)}&stdin=${stdin}&expected_output=${stdout}&wait=false&base64_encoded=false&language_id=52`;
  const response = await fetch(url, { method: "POST" });
  return parseJSON(response);
};

/**
   * getStatus - Requests to api for statistics
   *
   * @param  {Date} startTime
   * @param  {Date} endTime
   */
export const getStatus = async (codeKey) => {
  const url = `${JUDGE_API_URL}/submissions/${codeKey}?base64_encoded=false&&fields=status_id,compile_output`;
  const response = await fetch(url);
  return parseJSON(response);
};
