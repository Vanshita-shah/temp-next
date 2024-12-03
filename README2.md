# ArtSnap Frontend

- **Demo Link**: [ArtSnap Demo](https://artsnap-demo-link.com)
- **Description**: ArtSnap is a Progressive Web App (PWA) that allows users to capture pictures using their native camera or desktop webcam and upload them to Firebase. The app utilizes modern PWA features, including push notifications, background sync, camera access, and caching strategies to enhance the user experience.

---

## Features

- **Capture Image**: Take pictures directly from your device’s camera or desktop webcam.
- **Upload Image**: Upload the captured images to Firebase.
- **Push Notifications**: Stay updated with notifications even when the app is in the background.
- **Background Sync**: Sync data when the app comes back online.
- **Camera Access**: Native mobile camera and desktop webcam support.
- **Caching Strategy**: Caching for offline use and faster loading times.

---

## Technologies Used

- **React.js**: For building the frontend interface.
- **TypeScript**
- **Service Workers**: To enable background sync, push notifications, and caching.
- **Push Notifications**: For real-time notifications.
- **Webcam API / MediaDevices API**: For accessing the user's camera on both mobile and desktop devices.
- **Firebase**: For storing and managing uploaded images.
- **Firestore**: Firebase’s NoSQL database to store image metadata and user information.
- **Firebase Storage**: For storing image files.

---

## Folder Structure

```plaintext
.
├── dist/
│   ├── assets/
│   │   ├── styles.css
│   │   ├── app.js
│   ├── imgs/
│   │   ├── example-image.jpg
│   └── index.html
├── public/
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── CameraCapture.tsx
│   │   ├── Navbar.tsx
│   │   ├── Notification.tsx
│   ├── hooks/
│   │   └── useCamera.ts
│   ├── services/
│   │   └── pushNotifica
```

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
2. **`dev`**: This branch holds all the latest development code that will be merged into `main`.

---
