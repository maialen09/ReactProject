import { describe, expect, it } from 'vitest'
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App';


describe("App Component Tests", ()=> {
    it('App renders', () => {
    render(<App />);
    let element = screen.getByText(/Customer/i);
    expect(element).toBeInTheDocument()
})
})

describe("Customer Table Loading", ()=> {
    it('App renders', () => {
    render(<App />);
    let element = screen.getByTestId("customer-table");
    expect(element).toBeInTheDocument()
})
})
