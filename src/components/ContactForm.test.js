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
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
});