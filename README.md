# CourseForge

CourseForge is a comprehensive web application built using **Next.js** and **TypeScript**, designed to showcase modern web development practices. It features advanced routing, robust authentication, and image cropping functionalities.

## Demo Link

- [CourseForge Live Demo](https://demo-nextapp-courseforge.vercel.app/login)

---

## Technologies Used

- **Next.js**: Framework for server-rendered and statically generated React applications.
- **TypeScript**: Static type-checking for JavaScript.
- **NextAuth v4**: Authentication library for Next.js.
- **CropperJS**: Library for image cropping functionality.

---

## Features

1. **Authentication**:

   - Credential-based authentication.
   - OAuth login with **Google** and **GitHub** providers.
   - Refresh token support for Google login.
   - Session expiration management.

2. **Routing**:

   - Parallel and intercepting routes for seamless navigation.

3. **Image Cropping**:

   - Integrated **CropperJS** for image cropping.

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/vanshitaa-shah/CourseForge.git
   ```
2. Navigate to the project directory and install dependencies:

   ```bash
   cd CourseForge
   npm install
   ```

3. Create a .env.local file in the root of the project and add the following example environment variables:

   ```bash
    MONGODB_URI=<your-mongodb-uri>
    NEXTAUTH_SECRET=<your-nextauth-secret>
    GITHUB_ID=<your-github-client-id>
    GITHUB_SECRET=<your-github-client-secret>
    GOOGLE_CLIENT_ID=<your-google-client-id>
    GOOGLE_CLIENT_SECRET=<your-google-client-secret>
    BASE_URL="http://localhost:3000"

   ```

4. Run the development server:

   ```bash
    npm run dev
   ```

---

## Git Branching Strategy

### Main Branches

1. **`main`**: The stable production branch. All verified and stable code should be merged into this branch.
2. **`dev`**: This branch holds all the latest development code. Feature branches are merged into `dev` before being merged into `main`.

### Feature Branches

3. **`feature/*`**: A new feature branch created from `dev`. Once the feature is complete, it is merged back into `dev`.

---

## Learn More

To deepen your understanding of the technologies used in this project, explore the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Official documentation for Next.js, a React framework for building production-grade applications.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn TypeScript, a superset of JavaScript that adds static types.
- [NextAuth.js Documentation](https://next-auth.js.org/) - Official documentation for NextAuth.js, a library for authentication in Next.js apps.
- [MongoDB Documentation](https://www.mongodb.com/docs/) - Learn how to work with MongoDB, a NoSQL database.
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2) - Official guide for implementing Google authentication with OAuth2.
- [Cropper.js Documentation](https://fengyuanchen.github.io/cropperjs/) - Learn how to integrate image cropping in your web applications using Cropper.js.

---
