# EduNexus SaaS Platform

EduNexus is a modern, multi-role education management platform designed for schools, teachers, students, and administrators. It features a premium UI, AI-powered lesson planning, and real-time analytics.

## Features

*   **Role-Based Access Control:** Distinct dashboards for Students, Teachers, Directors, and Super Admins.
*   **Premium UI/UX:** Glassmorphism design, smooth transitions (Framer Motion), and responsive layout.
*   **AI Integration:** Google Gemini integration for generating lesson plans and AI tutoring.
*   **Academic Tools:** Gradebook, Attendance tracking, Assignment submission, and Course management.
*   **Analytics:** Visual charts for performance tracking using Recharts.
*   **Internationalization:** Multi-language support (UZ, EN, RU).

## Tech Stack

*   **Frontend:** React (TypeScript), Vite
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion
*   **Charts:** Recharts
*   **Icons:** Lucide React
*   **AI:** @google/genai SDK

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/edunexus.git
    cd edunexus
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory and add your Gemini API key:
    ```env
    API_KEY=your_google_gemini_api_key
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

## Project Structure

*   `/src/pages` - Page components for different routes and roles.
*   `/src/components` - Reusable UI components (Layout, Widgets, etc.).
*   `/src/services` - Mock data, API wrappers, and AI service logic.
*   `/src/types` - TypeScript interfaces.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
