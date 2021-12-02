import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.getByText("Contact Form");
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent("Contact Form");
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameField = screen.getByLabelText("First Name*");
    userEvent.type(firstNameField, "yo");
    await waitFor(() => {
        const error = screen.queryByText(/Error: firstName must have at least 5 characters./);
        expect(error).toBeInTheDocument();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    await waitFor(() => {
        const submit = screen.queryByRole("button");
        const errorOne = screen.queryByText(/Error: firstName must have at least 5 characters./);
        const errorTwo = screen.queryByText(/Error: lastName is a required field./);
        const errorThree = screen.queryByText(/Error: email must be a valid email address./);
        userEvent.click(submit);
        expect(errorOne).toBeInTheDocument();
        expect(errorTwo).toBeInTheDocument();
        expect(errorThree).toBeInTheDocument();
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameField = screen.getByLabelText("First Name*");
    const lastNameField = screen.getByLabelText("Last Name*");
    const submit = screen.queryByRole("button");
    await waitFor(() => {
        const emailError = screen.queryByText(/Error: email must be a valid email address./);
        userEvent.type(firstNameField, "Charizard");
        userEvent.type(lastNameField, "Pokemon");
        userEvent.click(submit);
        expect(emailError).toBeInTheDocument();
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailField = screen.getByLabelText("Email*");
    await waitFor(() => {
        const emailError = screen.queryByText(/Error: email must be a valid email address./);
        userEvent.type(emailField, "blah");
        expect(emailError).toBeInTheDocument();
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstNameField = screen.getByLabelText("First Name*");
    const emailField = screen.getByLabelText("Email*");
    const submit = screen.queryByRole("button");
    await waitFor(() => {
        const lastNameError = screen.queryByText(/Error: lastName is a required field./);
        userEvent.type(firstNameField, "Ivysaur");
        userEvent.type(emailField, "test@hotmail.com");
        userEvent.click(submit);
        expect(lastNameError).toBeInTheDocument();
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstNameField = screen.getByLabelText("First Name*");
    const lastNameField = screen.getByLabelText("Last Name*");
    const emailField = screen.getByLabelText("Email*");
    const submit = screen.getByRole("button");
    await waitFor(() => {
        const firstNameDisplay = screen.queryByTestId("firstnameDisplay");
        const lastNameDisplay = screen.queryByTestId("lastnameDisplay");
        const emailDisplay = screen.queryByTestId("emailDisplay");
        const messageDisplay = screen.queryByTestId("messageDisplay");
        userEvent.type(firstNameField, "Mewtwo");
        userEvent.type(lastNameField, "Pokemon");
        userEvent.type(emailField, "test@hotmail.com");
        userEvent.click(submit);
        expect(firstNameDisplay).toBeTruthy();
        expect(lastNameDisplay).toBeTruthy();
        expect(emailDisplay).toBeTruthy();
        expect(messageDisplay).toBeFalsy();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
});