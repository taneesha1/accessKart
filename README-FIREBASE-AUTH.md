# AccessKart Firebase Authentication setup

## 1. Install Firebase

```bash
npm install firebase
```

## 2. Create a Firebase project

1. Open https://console.firebase.google.com/ and create a project.
2. Add a Web app to the project and copy its Firebase configuration.
3. In **Authentication → Sign-in method**, enable **Email/Password** and **Google**.
4. In **Authentication → Settings → Authorized domains**, ensure `localhost` and your deployed domain are listed.

## 3. Configure environment variables

Copy `.env.example` to `.env` in the same directory as `package.json`. Replace each value with the matching value from Firebase Project settings → General → Your apps → SDK setup and configuration.

Restart the Vite dev server after changing `.env`:

```bash
npm run dev
```

Do not commit `.env` to source control. Firebase web config values identify the Firebase project; they are not server secrets. Security must be enforced with Firebase Security Rules for any database or storage you add later.

## 4. Routes

- `/login` — email/password and Google sign-in
- `/register` — create an email/password account or use Google
- `/forgot-password` — send Firebase password reset email
- `/account`, `/checkout`, `/order-confirmation/:id` — require sign-in

## Important current project limitation

This adds real Firebase Authentication only. AccessKart's products still use the existing mock API. Profile, cart, wishlist, comparison and demo orders are stored in browser localStorage under account-specific keys, so different signed-in users on the same browser do not share those local records. These records are not uploaded to Firebase or synchronized across devices. Checkout still creates demo orders and does not process payments. Add Firestore and per-user security rules before treating customer profiles, addresses or orders as production data.
