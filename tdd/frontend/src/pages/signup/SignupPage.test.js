import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent  from "@testing-library/user-event";
import axios from "axios";
import SignupPage from "./SignupPage";
import { server, setupServer } from 'msw/node'
import { rest } from 'msw';

beforeEach(() => {

});



describe("Signup page", () => {
  describe("Layout", () => {
    it("has header", () => {
      render(<SignupPage />);
      const header = screen.getByRole("heading", { name: /Sign up/i });
      expect(header).toBeInTheDocument();
    });

    it("has username input", () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('username');
      expect(input).toBeInTheDocument();
    });

    it("has email input", () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('email');
      expect(input).toBeInTheDocument();
    });

    it("has password input and type password", () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('password');
      expect(input.type).toBe('password');
      expect(input).toBeInTheDocument();
    });

    it("has password repeat input and type password", () => {
      render(<SignupPage />);
      const input = screen.getByLabelText('password repeat');
      expect(input.type).toBe('password');
      expect(input).toBeInTheDocument();
    });

    it("has sign up btn", () => {
      render(<SignupPage />);
      const btn = screen.getByRole("button", { name: /Sign up/i });
      expect(btn).toBeInTheDocument();
    });

    // it("is disabled btn initially", () => {
    //   render(<SignupPage />);
    //   const btn = screen.getByRole("button", { name: /Sign up/i });
    //   expect(btn).toBeDisabled();
    // });
  })

  describe('Interactions', () => {
    let btn;
    const setUp = () => {
      render(<SignupPage />);
      const usernameInput = screen.getByLabelText('username');
      const emailInput = screen.getByLabelText('email');
      const passwordInput = screen.getByLabelText('password');
      const repeatPasswordInput = screen.getByLabelText('password repeat');
      userEvent.type(usernameInput, "user1");
      userEvent.type(emailInput, "user@example.com");
      userEvent.type(passwordInput, "P4ssword");
      userEvent.type(repeatPasswordInput, "P4ssword");
      btn = screen.getByRole("button", { name: /Sign up/i });
    }
    it("eneables the btn when password and repeat password fields have same values", () => {
      render(<SignupPage />);
      const passwordInput = screen.getByLabelText('password');
      const repeatPasswordInput = screen.getByLabelText('password repeat');
      const password = userEvent.type(passwordInput, "P4ssword");
      const repeatPassword = userEvent.type(repeatPasswordInput, "P4ssword");
      const btn = screen.getByRole("button", { name: /Sign up/i });
      expect(btn).toBeEnabled()
      expect(password).toBe(repeatPassword);
    })

    it("sends username, email, password to backend after clicling the btn", async () => {
      let requestBody;
      const server = setupServer(
        rest.post('http://localhost:8080/api/1.0/users', (req, res, ctx) => {
          requestBody = req.body;
          return res(ctx.status(200))
        }));
      server.listen();
      setUp();
      userEvent.click(btn);

      await screen.findByText(
        'Please check your e-mail to activate your account'
      )
      expect(requestBody).toEqual({
        username: 'user1',
        email: 'user@example.com',
        password: 'P4ssword'
      })
    })

    it("disables btn when there is an ongoing api call", async () => {
      let counter = 0;
      const server = setupServer(
        rest.post('http://localhost:8080/api/1.0/users', (req, res, ctx) => {
          counter += 1;
          return res(ctx.status(200))
        }));
      server.listen();
      setUp();
      userEvent.click(btn);

      await screen.findByText(
        'Please check your e-mail to activate your account'
      )
      expect(counter).toBe(1);
    })

    it("displays spinner while the api request in progress", async () => {
      const server = setupServer(
        rest.post('http://localhost:8080/api/1.0/users', (req, res, ctx) => {
          return res(ctx.status(200))
        }));
      server.listen();
      setUp();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      userEvent.click(btn);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    })

    it("displays account activation notification after success sign up", async () => {
      const msg = "Please check your e-mail to activate your account";
      const server = setupServer(
        rest.post('http://localhost:8080/api/1.0/users', (req, res, ctx) => {
          return res(ctx.status(200))
        }));
      server.listen();
      setUp();
      expect(screen.queryByText(msg)).not.toBeInTheDocument()
      userEvent.click(btn);
      const text = await screen.findByText(msg)
      expect(text).toBeInTheDocument();
    })
    
    it('hides sign up form after successful sign up request', async () => {
      const server = setupServer(
        rest.post('http://localhost:8080/api/1.0/users', (req, res, ctx) => {
          return res(ctx.status(200))
      }));
      server.listen();
      setUp();
      const form = screen.getByTestId('form-sign-up');
      userEvent.click(btn);
      await waitFor(() => {
        expect(form).not.toBeInTheDocument();
      })
      // await waitForElementToBeRemoved(form);
    })
  })
})