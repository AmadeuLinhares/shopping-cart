# Shopping Cart

# Operation

**Shopping cart** was built to simulate user purchases in a typical e-commerce app. It includes 4 different screens:

1.  **Products List** (Screen that displays the available products for the user to purchase)
2.  Login (Login screen)
3.  **Sign Up** (Screen for creating a new account, where the user can select their role — VIP or USER. This will affect the final discount on purchases.)
4.  **Cart** (User’s cart screen, where it’s possible to view the added products, quantities, and prices.)

## Flow

The user can navigate between the product cart and the list of available products without being logged into the application. They can add any products they want to their cart. At this stage, some validations are performed. The first is to check whether the product still has available stock. The second is an API check to see if the product already exists in the cart — if it does, we simply increase the quantity of that product.

On the product list cards, there are two buttons. The first is the cart icon: when clicked, the product is added to the cart without redirecting the user to the cart screen. The second is the **Buy** button: when clicked, the product is added to the cart and the user is redirected to the cart screen.

To view the invoice and complete the purchase, the user must be logged in. Upon logging in, we inject an HTTP-only cookie containing only the user ID, which we use to validate whether the user is authenticated. This flow was created to simulate authentication in a real system, but it was implemented in the simplest way possible for demonstration purposes only.

The list of products is preloaded into the application using a mock.

To log in, the user must create an email and password and use the same credentials to authenticate, as the password is validated. Keep in mind that everything is stored **only in memory** — meaning if the server is stopped and restarted, all cart contents and accounts will be lost. The products remain, as they are re-injected via mock.
