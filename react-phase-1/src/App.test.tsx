import { describe, expect, it } from 'vitest'
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import App from './App';


// 1.1 Checking that the table of customers loads
describe("Customer Table Loading", ()=> {
    it('loads the customer table', () => {
    render(<App />);
    let element = screen.getByTestId("customer-table");
    expect(element).toBeInTheDocument()
})
})

//1.2 The customer list should show all available customer records
describe("Customer Table Rendering", () => {
  it('renders customer rows correctly', async () => {
    window.fetch = async () =>
      ({
        ok: true,
        json: async () => [
          { id: 1, name: "Alice", email: "alice@example.com", password: "pass1" },
          { id: 2, name: "Bob", email: "bob@example.com", password: "pass2" }
        ]
      } as Response);

    render(<App />);

    // Check for customer names in the table
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(await screen.findByText("Bob")).toBeInTheDocument();
  });
});

//2.1, 2.2 The label of the table appears above the list of customers
describe("Database name appears above table", () => {
    it('h5 is above the table element', async () => {
        render(<App />);
        const heading = screen.getByRole('heading', { level: 5, name: /Customer List/i });
        const table = await screen.findByTestId("customer-table");
        // Check that heading comes before table in the DOM
        expect(heading.compareDocumentPosition(table) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
});

//3.1, 3.2 Checking that Name, Email and Password appear in the table
describe("Name, Email and Password checking", () => {
  it('checks the different inputs appear in the table', async () => {
    window.fetch = async () =>
      ({
        ok: true,
        json: async () => [
          { id: 3, name: "Tom", email: "tom@example.com", password: "pass3" },
          { id: 4, name: "Erika", email: "erika@example.com", password: "pass4" }
        ]
      } as Response);

    render(<App />);

    // Check for customer names in the table
    expect(await screen.findByText("Tom")).toBeInTheDocument();
    expect(await screen.findByText("Erika")).toBeInTheDocument();
    // Check for customer emails in the table
    expect(await screen.findByText("tom@example.com")).toBeInTheDocument();
    expect(await screen.findByText("erika@example.com")).toBeInTheDocument();
    // Check for customer passwords in the table
    expect(await screen.findByText("pass4")).toBeInTheDocument();
    expect(await screen.findByText("pass3")).toBeInTheDocument();

  });
});

//3.3 The fields of the form are working correctly for adding or updating a customer

describe("Add/Update Form Field Entry", () => {
  it('allows entry of text for name, email, and password fields', async () => {
    window.fetch = async () =>
      ({
        ok: true,
        json: async () => []
      } as Response);

    render(<App />);
    // Click the Add button to show the form
    const addButton = screen.getByRole('button', { name: /add/i });
    await userEvent.click(addButton);

    // Find the input fields
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Type into the fields
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'secret123');

    // Assert the values
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('secret123');
  });
});

//4. Checking if clicking on a customer row selects it and makes it bold
describe("Customer row selection", () => {
  it('allows users to select a record by clicking on it', async () => {
    window.fetch = async () =>
      ({
        ok: true,
        json: async () => [
          { id: 1, name: "Alice", email: "alice@example.com", password: "pass1" },
          { id: 2, name: "Bob", email: "bob@example.com", password: "pass2" }
        ]
      } as Response);

    render(<App />);

    const aliceRow = await screen.findByText("Alice");
    const aliceTr = aliceRow.closest('tr');

    const bobRow = await screen.findByText("Bob");
    const bobTr = bobRow.closest('tr');

    // Simulate clicking on Alice's row
    await userEvent.click(aliceRow);

    // Check if Alice's row is now bold
    expect(aliceTr).toHaveStyle({ fontWeight: 'bold' });
    // Check that Bob's row is not bold
    expect(bobTr).toHaveStyle({ fontWeight: 'normal' });
  });
});

// 5.1 Checking of the fontWeight changes when a customer is deselected

describe("Changes in style when a customer is selected", () => {
  it('changes the fontWeight of a selected customer', async () => {
    window.fetch = async () =>
      ({
        ok: true,
        json: async () => [
          { id: 1, name: "Alice", email: "alice@example.com", password: "pass1" },
          { id: 2, name: "Bob", email: "bob@example.com", password: "pass2" }
        ]
      } as Response);

    render(<App />);

    const aliceRow = await screen.findByText("Alice");
    const aliceTr = aliceRow.closest('tr');


    // Simulate clicking on Alice's row
    await userEvent.click(aliceRow);

    // Check if Alice's row is now bold
    expect(aliceTr).toHaveStyle({ fontWeight: 'bold' });

    // Simulate clicking again to deselect
    await userEvent.click(aliceRow);

    // Check that Alice's row is no longer bold 
    expect(aliceTr).toHaveStyle({ fontWeight: 'normal' });

  });


  //5.4 Checking if the update form appears and disappears correctly with the data
  describe("Update form appears and populates correctly", () => {
    it('shows update form with correct data when a customer row is clicked', async () => {
      window.fetch = async () =>
        ({
          ok: true,
          json: async () => [
            { id: 1, name: "Alice", email: "alice@example.com", password: "pass1" },
            { id: 2, name: "Bob", email: "bob@example.com", password: "pass2" }
          ]
        } as Response);

      render(<App />);

      const aliceRow = await screen.findByText("Alice");

      // Simulate clicking on Alice's row
      await userEvent.click(aliceRow);

      // Check that the update form appears and is populated with Alice's data
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(nameInput).toHaveValue("Alice");
      expect(emailInput).toHaveValue("alice@example.com");
      expect(passwordInput).toHaveValue("pass1");

      // Simulate clicking again to deselect
      await userEvent.click(aliceRow);

      // Check that the form disappears (inputs are not in the document)
      expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    });
  });

  //7.1 The update form is showing when a customer is selected
  describe("Update form appears and populates correctly", () => {
    it('shows update form with correct data when a customer row is clicked', async () => {
      window.fetch = async () =>
        ({
          ok: true,
          json: async () => [
            { id: 1, name: "Alice", email: "alice@example.com", password: "pass1" },
            { id: 2, name: "Bob", email: "bob@example.com", password: "pass2" }
          ]
        } as Response);

      render(<App />);

      const aliceRow = await screen.findByText("Alice");

      // Simulate clicking on Alice's row
      await userEvent.click(aliceRow);

      // Check that the update form appears and is populated with Alice's data
      expect(screen.getByRole('heading', { level: 5, name: /Update Customer/i })).toBeInTheDocument();


    });
  });

  //7 The add form and the update form shows correctly 
  describe("Add and Update forms appears and populates correctly", () => {
    it('shows add/update form correctly', async () => {

      window.fetch = async () =>
        ({
          ok: true,
          json: async () => [
            { id: 1, name: "Alice", email: "alice@example.com", password: "pass1" },
            { id: 2, name: "Bob", email: "bob@example.com", password: "pass2" }
          ]
        } as Response);

      render(<App />);

       const addButton = screen.getByRole('button', { name: /add/i });
       await userEvent.click(addButton);

      // Check that the add form appears
      expect(screen.getByText(/Add New Customer/i)).toBeInTheDocument();

      const aliceRow = await screen.findByText("Alice");

      await userEvent.click(aliceRow);

      expect(screen.getByRole('heading', { level: 5, name: /Update Customer/i })).toBeInTheDocument();

      expect(screen.queryByText(/Add New Customer/i)).not.toBeInTheDocument();


    });
  });

  // 8. The add-update form shows the name, email and password of the selected customer 
  describe("Update form appears and populates correctly", () => {
    it('shows update form with correct data when a customer row is clicked', async () => {
      window.fetch = async () =>
        ({
          ok: true,
          json: async () => [
            { id: 1, name: "Tom", email: "tom@example.com", password: "pass10" },
            { id: 2, name: "Leo", email: "leo@example.com", password: "pass11" }
          ]
        } as Response);

      render(<App />);

      const tomRow = await screen.findByText("Tom");
      const leoRow = await screen.findByText("Leo");

      // Simulate clicking on Alice's row
      await userEvent.click(tomRow);

      // Check that the update form appears and is populated with Tom's data
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(nameInput).toHaveValue("Tom");
      expect(emailInput).toHaveValue("tom@example.com");
      expect(passwordInput).toHaveValue("pass10");

      // Simulate clicking again to deselect
      await userEvent.click(leoRow);

      // Check that the update form appears and is populated with Leo's data
      expect(nameInput).toHaveValue("Leo");
      expect(emailInput).toHaveValue("leo@example.com");
      expect(passwordInput).toHaveValue("pass11");

      
    });
  });

  // 9. The buttons delete, save and cancel appear below the add-update form section
  describe("Database name appears above table", () => {
    it('h5 is above the table element', async () => {

      window.fetch = async () =>
        ({
          ok: true,
          json: async () => [
            { id: 1, name: "Tom", email: "tom@example.com", password: "pass10" },
            { id: 2, name: "Leo", email: "leo@example.com", password: "pass11" }
          ]
        } as Response);

        render(<App />);

       const addButton = screen.getByRole('button', { name: /add/i });
       await userEvent.click(addButton);

        // Check that the buttons appear below the add-update form
        const form = screen.getByTestId('customer-form');
        const saveButton = screen.getByRole('button', { name: /save/i });
        const cancelButton = screen.getByRole('button', { name: /cancel/i });

        // Check that the buttons are in the document
        expect(saveButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();

        // Check that the buttons appear after the form in the DOM
        expect(form.compareDocumentPosition(saveButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(form.compareDocumentPosition(cancelButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    
        // When trying to add a new customer the delete button should not be present
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();

        
        const tomRow = await screen.findByText("Tom");
        await userEvent.click(tomRow);

        //When trying to update a customer the delete button should be present

        const saveButtonUpdate = screen.getByRole('button', { name: /save/i });
        const cancelButtonUpdate = screen.getByRole('button', { name: /cancel/i });
        const DeleteButtonUpdate = screen.getByRole('button', { name: /delete/i });

        expect(form.compareDocumentPosition(saveButtonUpdate) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(form.compareDocumentPosition(cancelButtonUpdate) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(form.compareDocumentPosition(DeleteButtonUpdate) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
             
    
      });


      //10. The delete button works correctly and removes the selected customer from the list

    describe("Delete customer", () => {
      it('removes the selected customer from the table when delete is clicked', async () => {
        // Mock fetch for initial load and after deletion
        let customers = [
          { id: 1, name: "Alice", email: "alice@example.com", password: "pass1" },
          { id: 2, name: "Bob", email: "bob@example.com", password: "pass2" }
        ];
        window.fetch = async (_, options) => {
          if (options && options.method === 'DELETE') {
            // Simulate deletion by removing Alice
            customers = customers.filter(c => c.id !== 1);
            return { ok: true, json: async () => ({}) } as Response;
          }
          return { ok: true, json: async () => customers } as Response;
        };

        render(<App />);

        // Select Alice
        const aliceRow = await screen.findByText("Alice");
        await userEvent.click(aliceRow);

        // Click Delete button
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        await userEvent.click(deleteButton);

        // Alice should disappear from the table
        await waitFor(() => {
        expect(screen.queryByText("Alice")).not.toBeInTheDocument();
});
        // Bob should still be present
        expect(screen.getByText("Bob")).toBeInTheDocument();
      });
    });
  });
    });
