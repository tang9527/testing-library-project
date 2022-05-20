import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders learn qqNumberSearch", () => {
  render(<App />);

  const element = screen.getByText(/QQ号查询/i);
  expect(element).toBeInTheDocument();
});

test("renders valid input", async () => {
  render(<App />);

  const qqInput = (await screen.findByTestId("qq")) as HTMLInputElement;
  userEvent.type(qqInput, "a553121104b{enter}");

  expect(qqInput.value).toBe("553121104");
});

test("renders http request", async () => {
  render(<App />);

  const qqInput = (await screen.findByTestId("qq")) as HTMLInputElement;
  userEvent.type(qqInput, "a553121104b{enter}");
  await screen.findByTestId("loading");
  const qqDetailElement = await screen.findByTestId("qqDetail");
  const qlogo = qqDetailElement
    .getElementsByClassName("qq__avatar")[0]
    .getAttribute("src");
  const nick =
    qqDetailElement.getElementsByClassName("qq__nick")[0].textContent;
  const qqNumber =
    qqDetailElement.getElementsByClassName("qq_number")[0].textContent;

  expect(qlogo).toBe(
    "https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=553121104"
  );
  expect(nick).toBe("嘉陵江里捉鱼");
  expect(qqNumber).toBe("553121104");
});

test("renders invalid request", async () => {
  render(<App />);

  const qqInput = (await screen.findByTestId("qq")) as HTMLInputElement;
  userEvent.type(qqInput, "a553121104b{enter}");
  await screen.findByTestId("loading");
  await screen.findByTestId("qqDetail");
  userEvent.clear(qqInput);

  expect(screen.queryByTestId("qqDetail")).toBeNull();
});
