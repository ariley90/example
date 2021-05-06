import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("by default it should sort the results by price", () => {
  render(<App />);
  expect(screen.getByRole("list")).toMatchSnapshot();
  const results = screen.getAllByRole("heading");
  expect(results[0]).toHaveTextContent("Iberostar Grand Salome");
  expect(results[1]).toHaveTextContent("Aguamarina Golf Hotel");
  expect(results[2]).toHaveTextContent("Las Piramides Resort");
});

test("results can be sorted alphapetically", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: "sort alphabetically" }));
  const results = screen.getAllByRole("heading");
  expect(results[0]).toHaveTextContent("Aguamarina Golf Hotel");
  expect(results[1]).toHaveTextContent("Iberostar Grand Salome");
  expect(results[2]).toHaveTextContent("Las Piramides Resort");
});

test("results can be sorted by rating", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: "sort by rating" }));
  const results = screen.getAllByRole("heading");
  expect(results[0]).toHaveTextContent("Iberostar Grand Salome");
  expect(results[1]).toHaveTextContent("Las Piramides Resort");
  expect(results[2]).toHaveTextContent("Aguamarina Golf Hotel");
});

test("a search result can toggle an overview ", () => {
  render(<App />);
  expect(screen.queryByText("overview 1")).not.toBeInTheDocument();
  userEvent.click(screen.getAllByText(/Read more/i)[0]);
  expect(screen.getByText("overview 1")).toBeInTheDocument();
  userEvent.click(screen.getByText(/Read less/i));
  expect(screen.queryByText("overvi ew 1")).not.toBeInTheDocument();
});

test("the visibility of a result overview should be maintained when re-sorting results", () => {
  render(<App />);
  expect(screen.queryByText("overview 1")).not.toBeInTheDocument();
  userEvent.click(screen.getAllByText(/Read more/i)[0]);
  expect(screen.getByText("overview 1")).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "sort by rating" }));
  expect(screen.getByText("overview 1")).toBeInTheDocument();
});
